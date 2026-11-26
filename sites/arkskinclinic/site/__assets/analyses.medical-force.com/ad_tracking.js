;(() => {
  /*
   * Utility Functions
   */
  // UUID生成
  const generateUUID = () => crypto.randomUUID()

  // Cookie の属性は書き込み・削除で揃える（path・domain が置いたときと違うと削除が黙って効かない）
  const COOKIE_ATTRIBUTES = 'path=/; secure; SameSite=Strict'
  const writeCookie = (name, value, { domain, maxAgeSeconds }) => {
    const domainAttribute = domain != null ? `; domain=${domain}` : ''
    document.cookie = `${name}=${value}; ${COOKIE_ATTRIBUTES}${domainAttribute}; max-age=${maxAgeSeconds}`
  }
  const deleteCookie = (name, { domain }) =>
    writeCookie(name, '', { domain, maxAgeSeconds: 0 })
  const readCookieValues = (name) =>
    document.cookie
      .split('; ')
      .filter((row) => row.startsWith(`${name}=`))
      .map((row) => row.slice(name.length + 1))

  // .co.jp 等のパブリックサフィックス（ブラウザがドメイン指定を拒否する接尾辞）はラベル数から判定できないため、
  // 短い候補から順にブラウザへ実際に置いて、受け付けられた最初のドメインを使う。
  // 既存の Cookie と取り違えないよう、確認用の Cookie に置いた値が読めたかで判定する
  const COOKIE_DOMAIN_PROBE_NAME = 'mf_cookie_domain_probe'
  const probeCookieDomain = () => {
    const labels = window.location.hostname.split('.')
    const probeValue = Math.random().toString(36).slice(2)
    for (let i = 2; i <= labels.length; i++) {
      const domain = `.${labels.slice(-i).join('.')}`
      writeCookie(COOKIE_DOMAIN_PROBE_NAME, probeValue, {
        domain,
        maxAgeSeconds: 60,
      })
      if (readCookieValues(COOKIE_DOMAIN_PROBE_NAME).includes(probeValue)) {
        deleteCookie(COOKIE_DOMAIN_PROBE_NAME, { domain })
        return domain
      }
    }
    return null
  }

  // 以前のタグは末尾2ラベルにだけ置こうとし、拒否されると host-only に置いていた
  const legacyParentDomain = () => {
    const labels = window.location.hostname.split('.')
    return `.${labels.slice(-2).join('.')}`
  }

  // session_idの保持秒数(60日)。サーバー側 session_landing_events のTTLと揃える。
  // max-ageを付けないとセッションCookieになり、ブラウザセッションが切れた時点で
  // 接触履歴(間接CV)を引けなくなる。
  const SESSION_ID_MAX_AGE_SECONDS = 60 * 24 * 60 * 60

  // Cookieからsession_idを取得または新しく生成する
  // 既存Cookieでも毎回書き直して有効期限をローリング更新する。
  // サーバー側の session_landing_events は接触のたびに TTL が60日へ更新されるため、
  // クライアント側だけ初回作成から固定60日だと先に失効して接触履歴が分断される。
  // 本対応より前に発行されたセッションCookie(有効期限なし)の永続化もここで行われる。
  const getSessionId = () => {
    const cookieDomain = probeCookieDomain()
    const [existingSessionId] = readCookieValues('session_id')
    let sessionId = existingSessionId ?? generateUUID()

    // 以前のタグが host-only に置いていたホスト（.co.jp 等）だけ、その host-only を消してドメインの Cookie に移す。
    // 残すと同じ名前が2つ並び、サブドメインごとに古い host-only の値が先に読まれて共有されない。
    // 消した後にドメインの Cookie が残っていれば（別のサブドメインで移行済み）、共有済みのその値を使う。
    // それ以外のホストでは消さない（以前のタグは host-only を作っておらず、消すと LP 自身の同名 Cookie を壊しうる）
    if (cookieDomain != null && cookieDomain !== legacyParentDomain()) {
      deleteCookie('session_id', { domain: null })
      const [sharedSessionId] = readCookieValues('session_id')
      sessionId = sharedSessionId ?? sessionId
    }

    writeCookie('session_id', sessionId, {
      domain: cookieDomain,
      maxAgeSeconds: SESSION_ID_MAX_AGE_SECONDS,
    })
    return sessionId
  }

  // utm の値を正規化する。null・undefined・空文字・"null" の文字は値が無いものとして null にする。
  // BE の集計キーにも同じ規則がある（api/medicalforce/src/util/analysis/utmParameterKey.ts
  // の normalizeUtmValue）。変えるときは両方を直す
  const normalizeUtmValue = (value) =>
    value == null || value === '' || value === 'null' ? null : value

  // utmパラメータの取得と直接流入時のパラメータ生成
  const getUtmParams = () => {
    const urlParams = new URLSearchParams(window.location.search)

    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ]

    const mfTmKeys = [
      'mf_tm_source',
      'mf_tm_medium',
      'mf_tm_campaign',
      'mf_tm_term',
      'mf_tm_content',
    ]

    // 空文字と "null" の文字は値が無いものとして読む
    // （以前の計測タグは空の項目を "null" の文字でリンクに付けていた）
    const getParam = (key) => normalizeUtmValue(urlParams.get(key))

    const hasUtmOrMf = [...utmKeys, ...mfTmKeys].some((key) => getParam(key))

    if (hasUtmOrMf) {
      // mf_tm_xxx があればそれを優先、なければ utm_xxx の値を利用する。
      // 選んでから正規化する（mf_tm_xxx が "null" でも utm_xxx へは落とさない。変更前からの優先順位を保つ）。
      // hasUtmOrMf だけはキーごとに正規化して判定する（"null" だけの URL を自然流入として読むため）
      const pick = (name) =>
        urlParams.get(`mf_tm_${name}`) ?? urlParams.get(`utm_${name}`)
      const raw = {
        source: pick('source'),
        medium: pick('medium'),
        campaign: pick('campaign'),
        term: pick('term'),
        content: pick('content'),
      }

      return {
        hasUtm: true,
        utmSource: normalizeUtmValue(raw.source),
        utmMedium: normalizeUtmValue(raw.medium),
        utmCampaign: normalizeUtmValue(raw.campaign),
        utmTerm: normalizeUtmValue(raw.term),
        utmContent: normalizeUtmValue(raw.content),
        raw,
      }
    }

    const adTrackingTag = document.getElementById('mf-ad-tracking-tag')
    const directParam = adTrackingTag.getAttribute('direct-param') || 'noparam'

    return {
      hasUtm: false,
      utmSource: 'direct',
      utmMedium: directParam,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      raw: {
        source: 'direct',
        medium: directParam,
        campaign: null,
        term: null,
        content: null,
      },
    }
  }

  // 値が無いときはリンクから外す utm の項目
  // （付けないだけだと、リンクに元から付いている同じ名前の項目が LINE 側へ渡る）
  const utmParamKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ]

  // URLにパラメータを付与する。utm の項目は値が無ければ付けずに、リンクに元から付いている同じ名前の項目も削除する
  const addUrlParams = (anchor, params) => {
    const url = new URL(anchor.href)
    params.forEach((value, key) => {
      if (utmParamKeys.includes(key) && normalizeUtmValue(value) == null) {
        url.searchParams.delete(key)
        return
      }
      url.searchParams.set(key, value)
    })
    anchor.href = url.toString()
  }

  // 該当するリンクにパラメータを付与
  const addTrackingParametersToLinks = ({
    landingEventId,
    sessionId,
    analysisTenantId,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    query,
  }) => {
    const paramsToAdd = {
      'reservation.medical-force.com': ['landing_event_id'],
      'liff.line.me': [
        'landing_event_id',
        'analysis_tenant_id',
        'session_id',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'query',
      ],
      'localhost:3001': ['landing_event_id'],
    }

    Object.entries(paramsToAdd).forEach(([domain, paramKeys]) => {
      document.querySelectorAll(`a[href*="${domain}"]`).forEach((anchor) => {
        const params = new Map()
        paramKeys.forEach((key) => {
          switch (key) {
            case 'landing_event_id':
              params.set(key, landingEventId)
              break
            case 'analysis_tenant_id':
              params.set(key, analysisTenantId)
              break
            case 'session_id':
              params.set(key, sessionId)
              break
            case 'utm_source':
              params.set(key, utmSource)
              break
            case 'utm_medium':
              params.set(key, utmMedium)
              break
            case 'utm_campaign':
              params.set(key, utmCampaign)
              break
            case 'utm_term':
              params.set(key, utmTerm)
              break
            case 'utm_content':
              params.set(key, utmContent)
              break
            case 'query':
              params.set(key, query)
              break
          }
        })
        addUrlParams(anchor, params)

        // クリック時にsessionStorageをクリア
        anchor.addEventListener('click', () => {
          sessionStorage.removeItem('landing_event_id')
          sessionStorage.removeItem('mf_utm_str')
        })
      })
    })
  }

  // LPイベント送信
  const postData = async (apiUrl, payload) => {
    console.log('POST Data:', payload)
    try {
      const response = await fetch(`${apiUrl}/public/landing-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error('Error with POST request:', response)
        throw new Error('Error with POST request')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      throw error
    }
  }

  /*
   * メイン
   */
  const main = async () => {
    const {
      hasUtm,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm: _utmTerm,
      utmContent,
      raw,
    } = getUtmParams()

    // facebook広告の場合termはany
    let utmTerm = _utmTerm
    if (utmSource === 'facebook') {
      utmTerm = null
    }

    // 同じセッション内で流入元が変わったかの判定キー。sessionStorage に残る値と比べるので、
    // 正規化前の値から変更前と同じ形で組み立てる（正規化後の値にすると、空文字の utm が付いた URL を
    // 計測タグの更新前後で開き直したときに別の流入元と判定され、流入が二重に記録される）
    const rawTerm = utmSource === 'facebook' ? null : raw.term
    const utmStr = `${raw.source}_${raw.medium}_${raw.campaign}_${raw.content}_${rawTerm}`

    const adTrackingTag = document.getElementById('mf-ad-tracking-tag')
    const analysisTenantId = adTrackingTag.getAttribute(
      'data-analysis-tenant-id'
    )
    const apiUrl = adTrackingTag.getAttribute('data-medicalforce-api-url')

    const sessionId = getSessionId()
    const query = window.location.search.slice(1)

    const landingEventIdFromStorage = sessionStorage.getItem('landing_event_id')

    const utmStrFromStorage = sessionStorage.getItem('mf_utm_str')

    // テナント不明の場合は何もしない
    if (!analysisTenantId) {
      console.error('Error with Tenant ID')
      return
    }

    let landingEventId = landingEventIdFromStorage

    // 起点となるLPの場合
    // utm値が変更された場合上書き
    if (!landingEventId || (hasUtm && utmStr !== utmStrFromStorage)) {
      landingEventId = generateUUID()
      sessionStorage.setItem('landing_event_id', landingEventId)
      sessionStorage.setItem('mf_utm_str', utmStr)

      const payload = {
        landing_event_id: landingEventId,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
        session_id: sessionId,
        analysis_tenant_id: analysisTenantId,
        query: query,
        // Facebook CAPI の event_source_url に使用 (origin + pathname のみ。クエリは既存の query フィールドへ)
        url: window.location.origin + window.location.pathname,
        // Facebook CAPI の user_data.client_user_agent に使用
        client_user_agent: navigator.userAgent,
      }

      try {
        await postData(apiUrl, payload)
      } catch (_) {
        sessionStorage.removeItem('landing_event_id')
        sessionStorage.removeItem('mf_utm_str')
        return
      }
    }

    // landing_event_idがある場合のみパラメータ付与処理とクリック時セッションストレージクリアを行う
    if (landingEventId) {
      addTrackingParametersToLinks({
        landingEventId,
        sessionId,
        analysisTenantId,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        query,
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
  } else {
    main()
  }
})()
