const file_version = "v3.0.6";
// var appify_aca_options = null;
var domain = "https://eca0-103-167-53-151.ngrok-free.app/assets/";

var objUrlParams = new URLSearchParams(window.location.search).get("aca_theme");
var isValidTheme =
  objUrlParams !== null && objUrlParams >= 0 && objUrlParams <= 2;

// New variables
var aca_data = {
  position: 0, // 0: Bottom Right, 1: Bottom Left, 2: Top Right, 3: Top Left, 4: Top Center, 5: Bottom Center
  theme_type: isValidTheme ? parseInt(objUrlParams) : 1,

  icon_size: "45px",
  widget_icon_radius: "50%",
  widget_icon_relative_position: "10px",

  widget_horizontal_relative_position: "70px",
  widget_vertical_relative_position: "10px",
  widget_radius: "20px",

  background_color: "#0C42CE",
  text_color: "#FFFFFF",
  highlight_header: "orange",
  highlight_link: "orange",
  read_focus_color: "#215852",
  tooltip_color: "orange",

  title: "Accessibility Menu",
  disable: "Reset",
  version_badge: true,
  version: "Beta v3.1.0",

  descreas_text: "Decrease Font Size",
  increase_text: "Increase Font Size",
  grayscale: "Saturation",
  invert_colors: "Invert Colors",
  heightlight_links: "Highlight Links",
  heightlight_colors: "Heightlight Headers",
  read_selected: "Read Selected",
  read_page: "Read Page",
  line_height: "Line Height",
  letter_spacing: "Letter Spacing",
  curser: "Change Curser",
  text_align: "Text Align",
  pause_animation: "Pause Animation",
  change_fonts: "Change Fonts Type",
  hide_images: "Hide Images",
  mute_sounds: "Mute Sounds",
  tooltip: "Tooltip",
  read_focus: "Read Focus",
  selected_text_warning: "Please select desired text first",

  statment: true,
  statment_link_text: "Accessibility statment",
  statment_link: "https://www.appifycommerce.com/accessibility-statement/",
  statment_type: "in-app",

  developer_badge: true,
  developed_by: "Developed by",
  organization_name: "AppifyCommerce",
  organization_link: "https://appifycommerce.com/",

  custom_css: "",
  default_language: "en-us",
};

let jsonCUSTOM;

const startV3 = () => {
  domain = "apps/accessibility/assets/";
  const dataUrl = `${domain}json/${Shopify.shop}.json`;
  fetchData(dataUrl)
    .then((data) => {
      appify_aca_options = data;
      myAccessibility();
    })
    .catch((error) => myAccessibility());
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Check if fetched data is empty
    if (Object.keys(data).length === 0) throw new Error("No data found");

    return data;
  } catch (error) {
    throw new Error("something went wrong please try again...");
  }
};

try {
  const checkLocalstorage = window.localStorage;
} catch {
  throw new Error(
    "Accessiblity preview is not supported to your window due to some localdata(localStorage) is not accessible"
  );
}

function processAccessibilityData() {
  const acaOldData = document.getElementById("accessibility_icon_theme");

  if (!acaOldData) {
    // console.error("Element with ID 'accessibility_icon_theme' not found.");
    return;
  }

  const position = acaOldData.getAttribute("Position") || 0;
  const background_color = acaOldData.getAttribute("BackgroundColor");
  const text_color = acaOldData.getAttribute("TextColor");
  const link_color = acaOldData.getAttribute("LinkColor");
  const title_color = acaOldData.getAttribute("TitleColor");
  // const popup_style = acaOldData.getAttribute("PopStyle");
  const acatheme = acaOldData.getAttribute("theme");
  const aca_desc_txt = acaOldData.getAttribute("desc_txt");
  const aca_inc_txt = acaOldData.getAttribute("inc_txt");
  const aca_gry_scl = acaOldData.getAttribute("gry_scl");
  const aca_invrt_clr = acaOldData.getAttribute("invrt_clr");
  const aca_hghlght_lnk = acaOldData.getAttribute("hghlght_lnk");
  const aca_Hghlght_hed = acaOldData.getAttribute("Hghlght_hed");
  const aca_dsbl = acaOldData.getAttribute("dsbl");
  const read_lang = acaOldData.getAttribute("readlang");
  const read_selected = acaOldData.getAttribute("readselected");
  const read_page = acaOldData.getAttribute("readpage");
  const lang_title = acaOldData.getAttribute("langtitle");
  const display = "DisplayNone";
  const count = true;
  const language = "";
  const langtitle = "";

  appify_aca_options = {
    myshopify_domain: Shopify.shop,
    access_token: "",
    options: {
      status: true,
      settings: {
        position: position,
        widget_icon_relative_position: "5px",
        icon_size: "50px",
        widget_icon_radius: "50px",
      },
      color_setting: {
        background_color: background_color,
        textColor: text_color,
        linkColor: link_color,
        titleColor: title_color,
        tooltip_color: "#FFC0CB",
        read_focus_color: "#FF0000",
      },
      theme_setting: {
        theme_type: acatheme,
        widget_radius: "30px",
        widget_horizontal_relative_position: "70px",
        widget_vertical_relative_position: "10px",
      },
      advanced_setting: {
        statment: true,
        statment_link_text: "Accessibility statment",
        statment_link:
          "https://www.appifycommerce.com/accessibility-statement/",
        developer_badge: true,
      },
      button_text_data: {
        decrease_text: aca_desc_txt,
        increase_text: aca_inc_txt,
        line_height: "Line Height",
        letter_spacing: "Letter Spacing",
        tooltip: "Tooltip",
        read_focus: "Read Focus",
        text_align: "Text Align",
        disable: aca_dsbl,
      },
      color_text_data: {
        grayscale: aca_gry_scl,
        invert_colors: aca_invrt_clr,
        highlight_links: aca_hghlght_lnk,
        highlight_headers: aca_Hghlght_hed,
      },
      speech_text_data: {
        read_selected: read_selected,
        read_page: read_page,
        mute_sounds: "Mute Sounds",
      },
      image_text_data: {
        curser: "Change Curser",
        pause_animation: "Pause Animation",
        change_fonts: "Change Fonts Type",
        hide_images: "Hide Images",
      },
      custom_css: "",
      developer_details: {
        selected_text_warning: "Please select desired text first",
        title: "Accessibility Menu",
        version_badge: true,
        version: "Beta v3.1.0",
        developed_by: "Developed by",
        organization_name: "AppifyCommerce",
        organization_link: "https://appifycommerce.com/",
      },
      default_language: "en-us",
    },
    script_details: {
      id: "gid://shopify/ScriptTag/189922607158",
      src: "https://23a5-103-167-52-28.ngrok-free.app/assets/js/mystore7395.myshopify.com.js?timestamp=1705643749",
      createdAt: "2024-01-19T05:53:23Z",
      updatedAt: "2024-01-19T05:55:49Z",
      displayScope: "ALL",
      cache: true,
    },
  };
}

const setJsonCUSTOM = (lang) => ({
  aca_card_header_title_span: lang.title,
  aca_card_footer_reset_text: lang.disable,
  aca_footer_statment_link: lang.statment_link_text,
  aca_dt: lang.descreas_text,
  aca_it: lang.increase_text,
  aca_gs: lang.grayscale,
  aca_ic: lang.invert_colors,
  aca_hl: lang.heightlight_links,
  aca_hh: lang.heightlight_colors,
  aca_rs: lang.read_selected,
  aca_rp: lang.read_page,
  aca_lh: lang.line_height,
  aca_ls: lang.letter_spacing,
  aca_cc: lang.curser,
  aca_ta: lang.text_align,
  aca_pa: lang.pause_animation,
  aca_cf: lang.change_fonts,
  aca_hi: lang.hide_images,
  aca_ms: lang.mute_sounds,
  aca_tt: lang.tooltip,
  aca_rf: lang.read_focus,
  aca_profile_select_span: "Accessibility Profile",
  aca_visually_impaired_span: "Visually-impaired",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dyslexia",
});

function AccessibilityPreview(acaData, isReset = false) {
  if (isReset) reset();
  aca_data = acaData;
  localStorage.removeItem("aca_lang");

  const elementsToRemove = [".aca_ui_container", "#aca_css"];
  elementsToRemove.forEach((selector) => {
    const element = document.querySelector(selector);
    if (element) element.remove();
  });

  myAccessibility();
}

// SVG icons
const aca_svg = {
  main_icon:
    '<svg aria-hidden="true" data-prefix="far" data-icon="universal-access" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-universal-access fa-w-16 fa-3x aca_svg_main_icon"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 456c-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208 114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208zm143.594-286.66c2.538 10.75-4.119 21.522-14.869 24.061-29.865 7.051-57.839 13.286-85.597 16.751.679 111.33 12.654 128.456 26.969 165.116 4.823 12.346-1.275 26.265-13.622 31.087-12.34 4.823-26.263-1.27-31.087-13.622-9.559-24.467-18.089-42.949-23.805-85.12h-3.164c-5.721 42.206-14.269 60.706-23.805 85.12-4.816 12.329-18.721 18.451-31.087 13.623-12.346-4.823-18.445-18.741-13.623-31.088 14.33-36.686 26.29-53.837 26.969-165.116-27.758-3.465-55.732-9.699-85.597-16.751-10.75-2.538-17.407-13.311-14.869-24.061 2.539-10.75 13.312-17.405 24.061-14.869 104.768 24.736 134.447 24.701 239.066 0 10.749-2.538 21.522 4.118 24.06 14.869zm-181.788-43.146C217.806 113.1 234.906 96 256 96s38.194 17.1 38.194 38.194-17.1 38.194-38.194 38.194-38.194-17.101-38.194-38.194z" class=""></path></svg>',
  header_close:
    '<svg class="aca_svg_header_close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m2.30436241 2.30436238 9.39127515 9.39127515m-9.39127518 6e-8 9.39127515-9.39127515"></path></svg>',
  footer_disable:
    '<svg class="aca_svg_footer" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="undo-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height:20px"><path fill="currentColor" d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path></svg>',
  descreas_text:
    '<svg class="aca_svg_descrease_text" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 30 20" style="height: 50px; padding: 15px;"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-width="1.7"><path stroke-linejoin="round" d="M22.28 18.4193548V1m-6.72 3.48387097V1H29v3.48387097"/><path d="M18.92 18.4193548h6.72"/><path stroke-linejoin="round" d="M5.48 16.0967742V4.48387097M1 6.80645161V4.48387097h8.96v2.32258064"/><path d="M3.24 16.0967742h4.48"/></g></svg>',
  increase_text:
    '<svg class="aca_svg_increase_text" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 45 29"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-width="2.5"><path stroke-linejoin="round" d="M33.16 27.1612903V2m-9.84 5.03225806V2H43v5.03225806"/><path d="M28.24 27.1612903h9.84"/><path stroke-linejoin="round" d="M8.56 23.8064516V7.03225806M2 10.38709677V7.03225806h13.12v3.35483871"/><path d="M5.28 23.8064516h6.56"/></g></svg>',
  grayscale:
    '<svg class="aca_svg_grayscale" xmlns="http://www.w3.org/2000/svg" fill="none" version="1.2" viewBox="0 0 20 28"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M17.5323 13.5777 10 1 2.34888 13.7855C1.4995 15.1093 1 16.6628 1 18.3333 1 23.1195 5.02975 27 10 27c4.9703 0 9-3.8805 9-8.6667 0-1.6457-1.3363-4.5282-1.3489-4.5478l-.1188-.2078Z" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M10 27c4.9703 0 9-3.8805 9-8.6667 0-1.6457-1.3363-4.5282-1.3489-4.5478l-.1188-.2078L10 1" clip-rule="evenodd"/></svg>',
  invert_colors:
    '<svg class="aca_svg_invert_colorss" xmlns="http://www.w3.org/2000/svg" fill="none" version="1.2" viewBox="0 0 34 32"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M31 1H3c-1.10457 0-2 .89543-2 2v18.4c0 1.1046.89543 2 2 2h28c1.1046 0 2-.8954 2-2V3c0-1.10457-.8954-2-2-2ZM10.6016 29.8h12.8M17 23.4v6.4"/><path fill="currentColor" fill-rule="evenodd" d="m13.4062 14.7134 7.3695-5.15859c1.1307 1.74369.9318 4.09849-.5969 5.62719-1.7573 1.7573-4.6066 1.7573-6.3639 0-.1488-.1488-.285-.3055-.4087-.4686Z" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M13.4094 14.7134 2.57346 22.2986c-.16808.1176-.36829.1807-.57346.1807-.55228 0-1-.4477-1-1V3c0-1.10457.89543-2 2-2h28.7311c.1305 0 .2528.06368.3276.17062.1267.18097.0827.43039-.0983.55707L20.7788 9.55483c-.1692-.26089-.3681-.5081-.5968-.73681-1.7574-1.75736-4.6066-1.75736-6.364 0-1.6085 1.60858-1.7447 4.13188-.4086 5.89538Z" clip-rule="evenodd"/></svg>',
  heightlight_links:
    '<svg class="aca_svg_highlight_links" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 38 16"  style="padding:18px;"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15H6.631C3.521 15 1 12.479 1 9.369V6.631C1 3.521 3.521 1 6.631 1H16m6 0h9.369C34.479 1 37 3.521 37 6.631v2.738C37 12.479 34.479 15 31.369 15H22M12 8h14"/></svg>',
  heightlight_colors:
    '<svg class="aca_svg_highlight_colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 107.27" style=""><path d="M22.48 0h77.92c6.15 0 11.75 2.53 15.82 6.6 4.11 4.11 6.67 9.8 6.67 16.06v61.96c0 6.26-2.55 11.94-6.67 16.06-4.07 4.07-9.67 6.6-15.82 6.6H22.48c-6.15 0-11.75-2.53-15.82-6.6C2.55 96.56 0 90.88 0 84.62V22.65C0 16.39 2.55 10.7 6.66 6.59 10.73 2.53 16.33 0 22.48 0zm20.86 28.62h11.68v13.21h12.79V28.62h11.73v37.84H67.81V51.13H55.02v15.33H43.34V28.62zm-38.8 47.6c.79 3.18 2.34 6.02 4.44 8.29 3.09 3.33 7.35 5.4 12.05 5.4h80.83c.19 0 .38 0 .57-.01l1.15-.08c4.01-.44 7.62-2.39 10.33-5.31 2.1-2.26 3.65-5.1 4.44-8.28V22.65c0-4.85-2-9.28-5.21-12.49a17.95 17.95 0 00-12.73-5.28H22.48c-4.97 0-9.48 2.02-12.73 5.28-3.22 3.22-5.21 7.64-5.21 12.49v53.57z"/></svg>',
  read_selected:
    '<svg class="aca_svg_read_selected"  xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 46 30"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M1 15h5.1c.8284271 0 1.5.6715729 1.5 1.5V19c0 1.1045695.8954305 2 2 2h.4c1.1045695 0 2-.8954305 2-2V9c0-1.1045695.8954305-2 2-2h.4c1.1045695 0 2 .8954305 2 2v18c0 1.1045695.8954305 2 2 2h.46875c1.1045695 0 2-.8954305 2-2V3c0-1.1045695.8954305-2 2-2H23.2c1.1045695 0 2 .8954305 2 2v19c0 1.1045695.8954305 2 2 2h.4c1.1045695 0 2-.8954305 2-2V11c0-1.1045695.8954305-2 2-2h.4c1.1045695 0 2 .8954305 2 2v8c0 1.1045695.8954305 2 2 2h.4c1.1045695 0 2-.8954305 2-2v-2.5c0-.8284271.6715729-1.5 1.5-1.5H45"/></svg>',
  read_page:
    '<svg class="aca_svg_read_page"  xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 70 31"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M69 18h-4.875c-.8284271 0-1.5-.6715729-1.5-1.5v-2.125c0-1.1736051-.9513949-2.125-2.125-2.125s-2.125.9513949-2.125 2.125V20.5c0 1.1045695-.8954305 2-2 2h-.25c-1.1045695 0-2-.8954305-2-2v-9.625c0-1.1736051-.9513949-2.125-2.125-2.125s-2.125.9513949-2.125 2.125V22.5c0 1.1045695-.8954305 2-2 2h-.25c-1.1045695 0-2-.8954305-2-2V7.75c0-1.1045695-.8954305-2-2-2h-.25c-1.1045695 0-2 .8954305-2 2v18c0 1.1045695-.8954305 2-2 2h-.3164062c-1.1045695 0-2-.8954305-2-2V3c0-1.1045695-.8954306-2-2-2H34.875c-1.1045695 0-2 .8954305-2 2v24.5c0 1.1045695-.8954305 2-2 2h-.25c-1.1045695 0-2-.8954305-2-2v-21c0-1.1045695-.8954305-2-2-2h-.25c-1.1045695 0-2 .8954305-2 2v17.25c0 1.1045695-.8954305 2-2 2h-.25c-1.1045695 0-2-.8954305-2-2v-13c0-1.1045695-.8954305-2-2-2h-.25c-1.1045695 0-2 .8954305-2 2v8.75c0 1.1045695-.8954305 2-2 2h-.25c-1.1045695 0-2-.8954305-2-2v-5.125c0-1.1736051-.9513949-2.125-2.125-2.125-1.173605 0-2.125.9513949-2.125 2.125V16.5c0 .8284271-.671573 1.5-1.5 1.5H1h0"/></svg>',
  line_height:
    '<svg class="aca_svg_line_height" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 47 25" style="padding: 13px;"><g fill="none" fill-rule="evenodd"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M3.99999962 2.71042226V22.7104223"/><path fill="currentColor" d="m.16814235 20.5270412 3.44487862 4.2104072c.17486379.2137224.48987514.2452235.70359754.0703597a.4999988.4999988 0 0 0 .07035976-.0703597l3.44487862-4.2104072c.17486378-.2137225.14336265-.5287338-.07035976-.7035976-.08933106-.073089-.20119771-.1130213-.31661889-.1130213H.555121c-.27614238 0-.5.2238576-.5.5 0 .1154211.0399323.2272878.11302135.3166189Zm0-16.1332381L3.61302097.18339592c.17486379-.21372241.48987514-.24522355.70359754-.07035976a.49999975.49999975 0 0 1 .07035976.07035976l3.44487862 4.2104072c.17486378.2137224.14336265.52873375-.07035976.70359754-.08933106.07308905-.20119771.11302135-.31661889.11302135H.555121c-.27614237 0-.5-.22385762-.5-.5 0-.11542118.0399323-.22728783.11302135-.3166189Z"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.4999996 1.71042226h30m-30 7h30m-30 7.00000004h30m-30 7h24"/></g></svg>',
  letter_spacing:
    '<svg class="aca_svg_letter_spacing" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 55 14" style="padding:18px"><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="4,7" d="M3.5 7h48"/><path stroke-linejoin="round" d="M7 13 1 7l6-6m41 12 6-6-6-6"/></g></svg>',
  curser:
    '<svg class="aca_svg_cursor" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 27 27"style="padding:13px"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.9983464 11.5517813 9.5269972 9.52699721-4.4465655 4.44656549-9.5269972-9.52699717-4.05145413 9.06403815L1 1.0000004l24.0623846 6.5003268z"/></svg>',
  text_align:
    '<svg class="aca_svg_text_align"  xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 32 23" style="padding:13px"><path class="aca_svg_text_align_path" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h30M1 8h25M1 15h30M1 22h24"/></svg>',
  text_align_right:
    '<svg class="aca_svg_text_align" style="padding:13px" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 32 24" > <path class="aca_svg_text_align_path" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1.5h30m-25 7h25m-30 7h30m-24 7h24" /></svg>',
  text_align_center:
    '<svg class="aca_svg_text_align" style="padding:13px" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 32 24" > <path class="aca_svg_text_align_path" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1.5h30m-26 7h22m-26 7h30m-26 7h22" /></svg>',
  text_align_justify:
    '<svg class="aca_svg_text_align" style="padding:13px" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 32 24" > <path class="aca_svg_text_align_path" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1.5h30m-30 7h30m-30 7h30m-30 7h30" /></svg> ',
  pause_animation:
    '<svg class="aca_svg_pause_animation" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 37 36"><g fill="none" fill-rule="evenodd"><path fill="currentColor" d="M15.8087111 23.6666667h-1.2702778c-.4429444 0-.8018333-.3598334-.8018333-.8027778v-9.7277778c0-.4429444.3588889-.8027778.8018333-.8027778h1.2702778c.4429445 0 .8027778.3598334.8027778.8027778v9.7277778c0 .4429444-.3598333.8027778-.8027778.8027778m6.6525722 0h-1.2702777c-.442 0-.8018334-.3598334-.8018334-.8027778v-9.7277778c0-.4429444.3598334-.8027778.8018334-.8027778h1.2702777c.4438889 0 .8027778.3598334.8027778.8027778v9.7277778c0 .4429444-.3588889.8027778-.8027778.8027778"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.88888889" d="M18.5 4.77777778V1m0 34v-3.7777778M31.7222222 18H35.5m-34 0h3.77777778m3.87278889-9.34943333L6.47873333 5.97967778M30.5204167 30.0204167l-2.6708889-2.6708889m-.0000945-18.69896113 2.6708889-2.67088889M6.47911111 30.0204167l2.67183333-2.6708889M23.5542889 5.78219444l1.4440555-3.49066666M12.0013722 33.7087556l1.4440556-3.4906667m17.2723778-7.1638 3.4906666 1.4440555M2.79124444 11.5013722l3.49066667 1.4440556m7.15274999-7.15860558L11.9877722 2.2971m13.0246445 31.4061778-1.4468889-3.4897222m7.14765-17.2788945L34.2029 11.4877722M2.79672222 24.5124167l3.48972222-1.4468889"/></g></svg>',
  change_fonts:
    '<svg class="aca_svg_change_fonts" xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 38 25" style="padding:13px"><path fill="currentColor" stroke="currentColor" stroke-width=".25" d="M2.28 23.72c.192 0 .346667-.05333.464-.16.117333-.10667.197333-.21333.24-.32l1.984-5.12h11.328l1.984 5.12c.042667.10667.122667.21333.24.32.117333.10667.272.16.464.16h.64c.170667 0 .32-.064.448-.192s.192-.27733.192-.448l-.064-.352L12.104 1.96c-.170667-.42667-.48-.64-.928-.64h-1.088c-.448 0-.757333.21333-.928.64L1.064 22.728 1 23.08c0 .17067.064.32.192.448s.277333.192.448.192h.64Zm13.248-7.52H5.736l4.896-12.608L15.528 16.2Zm15.204571 7.84c2.304 0 4.005334-.752 5.104-2.256 1.098667-1.504 1.68-3.33333 1.744-5.488.021334-.21333.032-.512.032-.896s-.010666-.68267-.032-.896c-.064-2.15467-.645333-3.984-1.744-5.488-1.098666-1.504-2.8-2.256-5.104-2.256-2.325333 0-4.117333.84267-5.376 2.528V1.704c0-.21333-.064-.384-.192-.512s-.298666-.192-.512-.192h-.544c-.213333 0-.384.064-.512.192s-.192.29867-.192.512v21.312c0 .21333.064.384.192.512s.298667.192.512.192h.544c.213334 0 .384-.064.512-.192s.192-.29867.192-.512v-1.504c1.237334 1.68533 3.029334 2.528 5.376 2.528Zm-.192-1.856c-1.685333 0-2.954666-.56-3.808-1.68-.853333-1.12-1.312-2.43733-1.376-3.952l-.032-1.248.032-1.248c.021334-.91733.224-1.78667.608-2.608.384-.82133.96-1.49867 1.728-2.032.768-.53333 1.717334-.8 2.848-.8 1.877334 0 3.2.63467 3.968 1.904.768 1.26933 1.152 2.896 1.152 4.88 0 .384-.010666.68267-.032.896-.064 1.728-.496 3.14133-1.296 4.24-.8 1.09867-2.064 1.648-3.792 1.648Z"/></svg>',
  curser_css_svg:
    '<svg class="aca_svg_cursor_css_svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="29.188px" height="43.625px" viewBox="0 0 29.188 43.625" enable-background="new 0 0 29.188 43.625" xml:space="preserve"><g><polygon fill="#FFFFFF" stroke="#D9DAD9" stroke-width="1.1406" stroke-miterlimit="10" points="2.8,4.549 26.847,19.902 16.964,22.701 24.239,37.749 18.278,42.017 9.741,30.724 1.138,35.809 "/><g><g><g><path fill="#212627" d="M29.175,21.155c0.071-0.613-0.165-1.253-0.635-1.573L2.165,0.258c-0.424-0.32-0.988-0.346-1.435-0.053C0.282,0.497,0,1.03,0,1.617v34.171c0,0.613,0.306,1.146,0.776,1.439c0.471,0.267,1.059,0.213,1.482-0.16l7.482-6.344l6.847,12.155c0.259,0.48,0.729,0.746,1.2,0.746c0.235,0,0.494-0.08,0.706-0.213l6.988-4.585c0.329-0.213,0.565-0.586,0.659-1.013c0.094-0.426,0.024-0.88-0.188-1.226l-6.376-11.382l8.611-2.745C28.705,22.274,29.105,21.768,29.175,21.155z M16.964,22.701c-0.424,0.133-0.776,0.506-0.941,0.96c-0.165,0.48-0.118,1.013,0.118,1.439l6.588,11.781l-4.541,2.985l-6.894-12.315c-0.212-0.373-0.541-0.64-0.941-0.72c-0.094-0.027-0.165-0.027-0.259-0.027c-0.306,0-0.588,0.107-0.847,0.32L2.8,32.59V4.549l21.599,15.806L16.964,22.701z"/></g></g></g></g></svg>',
  hide_images:
    '<svg class="aca_svg_hide_images"  viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg" style="height:55px;" fill="' +
    aca_data.text_color +
    '" ><defs><style>.cls-1{fill:none;}</style></defs><path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"/><path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg> ',
  mute_sounds:
    ' <svg version="1.1" class="aca_svg_mute_sounds"  id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="' +
    aca_data.text_color +
    '" viewBox="0 0 457.487 457.487" xml:space="preserve"> <g id="XMLID_3_"><g><g><path d="M349.214,164.842L334.156,179.9c19.61,7.558,33.562,26.603,33.562,48.844c0,25.431-18.239,46.683-42.322,51.364V188.66 l-20,20v82.406v84.349c0,3.189-1.762,6.074-4.597,7.529c-2.774,1.423-6.174,1.233-8.8-0.652 c-0.034-0.024-0.067-0.048-0.102-0.071l-94.236-65.827l-14.363,14.363l97.103,67.829c8.998,6.421,20.419,6.827,29.531,2.15 c9.538-4.897,15.463-14.6,15.463-25.322v-75.056c35.161-4.887,62.322-35.131,62.322-71.615 C387.719,201.076,372.096,177,349.214,164.842z"/><path d="M324.779,76.14c-1.747-8.278-7.106-15.416-14.846-19.39c-9.11-4.676-20.529-4.271-29.53,2.15l-113.278,79.128H79.769 c-5.522,0-10,4.477-10,10v161.43c0,5.523,4.478,10,10,10h1.691l20-20H89.769v-141.43h70.502v82.619l20-20V153.24l111.627-77.974 c0.034-0.024,0.067-0.048,0.102-0.072c2.678-1.921,6.082-2.047,8.799-0.652c2.836,1.456,4.598,4.341,4.598,7.53v13.45 L324.779,76.14z"/><path d="M228.743,0C102.318,0,0.001,102.306,0.001,228.743c0,61.207,23.869,118.615,66.991,161.74 c0.002,0.002,0.004,0.004,0.006,0.007c0.002,0.002,0.005,0.004,0.007,0.006c43.11,43.106,100.511,66.991,161.739,66.991 c126.426,0,228.743-102.306,228.743-228.744C457.487,102.085,354.976,0,228.743,0z M20.001,228.743 C20.001,113.642,113.643,20,228.743,20c52.595,0,102.175,19.644,140.295,54.305L74.307,369.039 C39.68,330.956,20.001,281.393,20.001,228.743z M228.743,437.487c-52.594,0-102.174-19.644-140.295-54.305L383.182,88.448 c34.696,38.158,54.306,87.751,54.306,140.295C437.487,343.845,343.846,437.487,228.743,437.487z"/></g></g></g></svg>',
  tooltip:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_svg_tooltip" version="1.2" viewBox="0 0 30 31"><g fill="none" fill-rule="evenodd" transform="translate(1 1)"><path stroke="currentColor" stroke-width="2" d="M7.12734007 22.9836493 1.59329966 28.714951C1.00533246 29.3238763 0 28.8926106 0 28.0314601V3.97380852C0 1.77913468 1.7179 0 3.83703704 0H24.162963C26.2821 0 28 1.77913468 28 3.97380852V19.0098408c0 2.1946738-1.7179 3.9738085-3.837037 3.9738085H7.12734007Z"/><path fill="currentColor" fill-rule="nonzero" d="M13 8.92811506v7.14376984C13 16.5844687 13.4477153 17 14 17s1-.4155313 1-.9281151V8.92811506C15 8.41553127 14.5522847 8 14 8s-1 .41553127-1 .92811506Z"/><circle cx="14" cy="6" r="1" fill="currentColor"/></g></svg>',
  read_focus:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_svg_read_focus" fill="none" version="1.2" viewBox="0 0 36 26"><path fill="currentColor" fill-rule="evenodd" d="M28.993.0000711V0l-.0113.0000223-24.98564.049276C3.44479.0503855 2.94455.275608 2.58439.636476 2.22424.997344 2 1.49803 2 2.04929V24c0 .552.22484 1.0533.58579 1.4142C2.94673 25.7751 3.44796 26 4 26h28c.552 0 1.0533-.2249 1.4142-.5858C33.7752 25.0533 34 24.552 34 24V13.778c-.014.1248-.1199.2219-.2484.2219H32.2V24c0 .0555-.0214.1042-.0586.1414S32.0555 24.2 32 24.2H4c-.05548 0-.10424-.0214-.14142-.0586C3.8214 24.1042 3.8 24.0555 3.8 24V13.9999H2.25156c-.13807 0-.25-.112-.25-.25v-1.5c0-.1381.11193-.25.25-.25H3.8V2.04929c0-.05539.02135-.10411.05844-.14128.03709-.03716.08577-.05861.14117-.05872l24.97999-.04926 3.0225.03203h.0001c.055.0006.1033.02223.14.05932.0367.0371.0578.08561.0578.14067v9.96785h1.5516c.1285 0 .2344.097.2484.2218V2.03205c0-.54789-.2216-1.046139-.5783-1.406664-.3567-.360523-.8525-.5873892-1.4004-.5932238v-4e-7L28.993.0000711Z" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M35 8.99976H1c-.552285 0-1 .44771-1 1v6.00004c0 .5522.447715 1 1 1h34c.5523 0 1-.4478 1-1V9.99976c0-.55229-.4477-1-1-1ZM2.25 11.9998h31.5c.1381 0 .25.1119.25.25v1.5c0 .138-.1119.25-.25.25H2.25c-.13807 0-.25-.112-.25-.25v-1.5c0-.1381.11193-.25.25-.25Z" clip-rule="evenodd"/></svg>',
  arrow_left:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_svg_arrow_left" viewBox="0 0 6 11" width="100%" height="100%"><path fill="currentColor" fill-rule="evenodd" d="m.5 10.5 5-5-5-5"></path></svg>',
  arrow_down:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_svg_arrow_down" viewBox="0 0 6 11" width="100%" height="100%"><path fill="currentColor" fill-rule="evenodd" d="m.5 10.5 5-5-5-5"></path></svg>',
  flag_usa:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_svg_flag" width="512" height="512" viewBox="0 0 512 512"><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"/><path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"/><path fill="#0052b4" d="M0 0h256v256H0Z"/><path fill="#eee" d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"/></g></svg>',
  flag_india:
    '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 85.48" style="enable-background:new 0 0 122.88 85.48" xml:space="preserve"><style type="text/css"><![CDATA[	.st0{fill:#128807;}	.st1{fill:#FF9933;}	.st2{fill:#FFFFFF;}	.st3{fill:#000088;}]]></style><g><path class="st1" d="M6.71,0h109.46c3.7,0.02,6.71,3.05,6.71,6.75v71.98c0,3.71-3.04,6.75-6.75,6.75l-109.42,0 C3.02,85.46,0,82.43,0,78.73V6.75C0,3.05,3.01,0.02,6.71,0L6.71,0z"/><polygon class="st2" points="0,28.49 122.88,28.49 122.88,56.99 0,56.99 0,28.49"/><path class="st0" d="M0,56.99h122.88v21.74c0,3.71-3.04,6.75-6.75,6.75l-109.42,0C3.02,85.46,0,82.43,0,78.73V56.99L0,56.99z"/><path class="st3" d="M72.84,42.74c0-6.3-5.1-11.4-11.4-11.4s-11.4,5.1-11.4,11.4c0,6.29,5.1,11.4,11.4,11.4 S72.84,49.04,72.84,42.74L72.84,42.74z"/><path class="st2" d="M71.41,42.74c0-5.51-4.46-9.97-9.97-9.97s-9.97,4.46-9.97,9.97c0,5.51,4.46,9.97,9.97,9.97 S71.41,48.25,71.41,42.74L71.41,42.74z"/><path class="st3" d="M63.43,42.74c0-1.1-0.89-2-1.99-2s-1.99,0.89-1.99,2c0,1.1,0.89,1.99,1.99,1.99S63.43,43.84,63.43,42.74 L63.43,42.74z"/><path class="st3" d="M71.82,44.11c0.04-0.27-0.16-0.52-0.43-0.56c-0.27-0.04-0.52,0.16-0.56,0.43s0.16,0.52,0.43,0.56 C71.54,44.57,71.79,44.38,71.82,44.11L71.82,44.11z"/><polygon class="st3" points="61.44,52.71 61.78,46.73 61.44,43.88 61.1,46.73 61.44,52.71"/><path d="M71.11,46.75c0.11-0.25-0.02-0.55-0.27-0.65c-0.25-0.11-0.55,0.02-0.65,0.27c-0.11,0.25,0.02,0.55,0.27,0.65 C70.72,47.12,71.01,47,71.11,46.75L71.11,46.75z"/><polygon points="58.86,52.37 60.74,46.68 61.15,43.84 60.08,46.51 58.86,52.37"/><path d="M69.75,49.12c0.17-0.22,0.13-0.53-0.09-0.7c-0.22-0.17-0.53-0.13-0.7,0.09c-0.17,0.22-0.13,0.53,0.09,0.7 C69.27,49.38,69.58,49.33,69.75,49.12L69.75,49.12z"/><polygon points="56.45,51.38 59.74,46.37 60.87,43.73 59.15,46.02 56.45,51.38"/><path d="M67.81,51.05c0.22-0.17,0.26-0.48,0.09-0.7c-0.17-0.22-0.48-0.26-0.7-0.09c-0.22,0.17-0.26,0.48-0.09,0.7 C67.28,51.17,67.6,51.22,67.81,51.05L67.81,51.05z"/><polygon points="54.39,49.79 58.86,45.8 60.63,43.55 58.38,45.32 54.39,49.79"/><path d="M65.45,52.42c0.25-0.11,0.38-0.4,0.27-0.65c-0.11-0.25-0.4-0.38-0.65-0.27c-0.25,0.1-0.38,0.4-0.27,0.65 C64.9,52.4,65.19,52.52,65.45,52.42L65.45,52.42z"/><polygon points="52.8,47.73 58.16,45.03 60.45,43.31 57.81,44.44 52.8,47.73"/><path d="M62.81,53.12c0.27-0.04,0.46-0.29,0.43-0.56c-0.04-0.27-0.29-0.46-0.56-0.43c-0.27,0.04-0.46,0.29-0.43,0.56 C62.28,52.97,62.53,53.16,62.81,53.12L62.81,53.12z"/><polygon points="51.81,45.32 57.68,44.1 60.34,43.04 57.5,43.44 51.81,45.32"/><path d="M60.07,53.12c0.27,0.04,0.52-0.16,0.56-0.43c0.04-0.27-0.16-0.52-0.43-0.56c-0.27-0.04-0.52,0.16-0.56,0.43 C59.61,52.84,59.8,53.09,60.07,53.12L60.07,53.12z"/><polygon points="51.47,42.74 57.45,43.08 60.3,42.74 57.45,42.4 51.47,42.74"/><path d="M57.43,52.42c0.25,0.11,0.55-0.02,0.65-0.27s-0.02-0.55-0.27-0.65c-0.25-0.11-0.55,0.02-0.65,0.27 C57.06,52.02,57.18,52.31,57.43,52.42L57.43,52.42z"/><polygon points="51.81,40.16 57.5,42.04 60.34,42.45 57.68,41.38 51.81,40.16"/><path d="M55.06,51.05c0.22,0.17,0.53,0.13,0.7-0.09c0.17-0.22,0.13-0.53-0.09-0.7c-0.22-0.17-0.53-0.13-0.7,0.09 C54.81,50.57,54.85,50.88,55.06,51.05L55.06,51.05z"/><polygon points="52.8,37.75 57.81,41.04 60.45,42.17 58.16,40.45 52.8,37.75"/><path d="M53.13,49.12c0.17,0.22,0.48,0.26,0.7,0.09c0.22-0.17,0.26-0.48,0.09-0.7c-0.17-0.22-0.48-0.26-0.7-0.09 C53.01,48.58,52.96,48.9,53.13,49.12L53.13,49.12z"/><polygon points="54.39,35.69 58.38,40.16 60.63,41.94 58.86,39.68 54.39,35.69"/><path d="M51.76,46.75c0.11,0.25,0.4,0.38,0.65,0.27c0.25-0.11,0.38-0.4,0.27-0.65c-0.11-0.25-0.4-0.38-0.65-0.27 C51.78,46.2,51.66,46.49,51.76,46.75L51.76,46.75z"/><polygon points="56.45,34.1 59.15,39.46 60.87,41.75 59.74,39.12 56.45,34.1"/><path d="M51.06,44.11c0.04,0.27,0.29,0.46,0.56,0.43c0.27-0.04,0.46-0.29,0.43-0.56c-0.04-0.27-0.29-0.46-0.56-0.43 C51.21,43.58,51.02,43.83,51.06,44.11L51.06,44.11z"/><polygon points="58.86,33.11 60.08,38.98 61.15,41.64 60.74,38.8 58.86,33.11"/><path d="M51.06,41.37c-0.04,0.27,0.16,0.52,0.43,0.56c0.27,0.04,0.52-0.16,0.56-0.43c0.04-0.27-0.16-0.52-0.43-0.56 C51.34,40.91,51.09,41.1,51.06,41.37L51.06,41.37z"/><polygon points="61.44,32.77 61.1,38.75 61.44,41.6 61.78,38.75 61.44,32.77"/><path d="M51.77,38.73c-0.11,0.25,0.02,0.55,0.27,0.65c0.25,0.1,0.55-0.02,0.65-0.27c0.11-0.25-0.02-0.55-0.27-0.65 C52.16,38.36,51.87,38.48,51.77,38.73L51.77,38.73z"/><polygon points="64.02,33.11 62.14,38.8 61.73,41.64 62.8,38.98 64.02,33.11"/><path d="M53.13,36.37c-0.17,0.22-0.13,0.53,0.09,0.7c0.22,0.17,0.53,0.13,0.7-0.09c0.17-0.22,0.13-0.53-0.09-0.7 C53.61,36.11,53.3,36.15,53.13,36.37L53.13,36.37z"/><polygon points="66.43,34.1 63.14,39.12 62.01,41.75 63.73,39.46 66.43,34.1"/><path d="M55.07,34.43c-0.22,0.17-0.26,0.48-0.09,0.7c0.17,0.22,0.48,0.26,0.7,0.09c0.22-0.17,0.26-0.48,0.09-0.7 S55.28,34.27,55.07,34.43L55.07,34.43z"/><polygon points="68.49,35.69 64.02,39.68 62.25,41.94 64.5,40.16 68.49,35.69"/><path d="M57.43,33.07c-0.25,0.11-0.37,0.4-0.27,0.65c0.11,0.25,0.4,0.38,0.65,0.27c0.25-0.11,0.38-0.4,0.27-0.65 C57.98,33.08,57.69,32.96,57.43,33.07L57.43,33.07z"/><polygon points="70.08,37.75 64.72,40.45 62.43,42.17 65.07,41.04 70.08,37.75"/><path d="M60.07,32.36c-0.27,0.04-0.46,0.29-0.43,0.56c0.04,0.27,0.29,0.46,0.56,0.43c0.27-0.04,0.47-0.29,0.43-0.56 C60.6,32.52,60.35,32.32,60.07,32.36L60.07,32.36z"/><polygon points="71.07,40.16 65.2,41.38 62.54,42.45 65.38,42.04 71.07,40.16"/><path d="M62.81,32.36c-0.27-0.04-0.52,0.16-0.56,0.43c-0.04,0.27,0.16,0.52,0.43,0.56c0.27,0.04,0.52-0.16,0.56-0.43 C63.27,32.65,63.08,32.39,62.81,32.36L62.81,32.36z"/><polygon points="71.41,42.74 65.43,42.4 62.58,42.74 65.43,43.08 71.41,42.74"/><path d="M65.45,33.07c-0.25-0.11-0.55,0.02-0.65,0.27c-0.11,0.25,0.02,0.55,0.27,0.65c0.25,0.1,0.55-0.02,0.65-0.27 C65.82,33.46,65.7,33.17,65.45,33.07L65.45,33.07z"/><polygon points="71.07,45.32 65.38,43.44 62.54,43.04 65.2,44.1 71.07,45.32"/><path d="M67.81,34.43c-0.22-0.17-0.53-0.13-0.7,0.09c-0.17,0.22-0.13,0.53,0.09,0.7c0.22,0.17,0.53,0.13,0.7-0.09 C68.07,34.91,68.03,34.6,67.81,34.43L67.81,34.43z"/><polygon points="70.08,47.73 65.07,44.44 62.43,43.31 64.72,45.03 70.08,47.73"/><path d="M69.75,36.37c-0.17-0.22-0.48-0.26-0.7-0.09s-0.26,0.48-0.09,0.7c0.17,0.22,0.48,0.26,0.7,0.09 C69.87,36.9,69.92,36.58,69.75,36.37L69.75,36.37z"/><polygon points="68.49,49.79 64.5,45.32 62.25,43.55 64.02,45.8 68.49,49.79"/><path d="M71.12,38.73c-0.11-0.25-0.4-0.38-0.65-0.27s-0.38,0.4-0.27,0.65c0.11,0.25,0.4,0.37,0.65,0.27 C71.1,39.28,71.22,38.99,71.12,38.73L71.12,38.73z"/><polygon points="66.43,51.38 63.73,46.02 62.01,43.73 63.14,46.37 66.43,51.38"/><path d="M71.82,41.37c-0.04-0.27-0.29-0.46-0.56-0.43c-0.27,0.04-0.46,0.29-0.43,0.56c0.04,0.27,0.29,0.46,0.56,0.43 C71.67,41.9,71.86,41.65,71.82,41.37L71.82,41.37z"/><polygon points="64.02,52.37 62.8,46.51 61.73,43.84 62.14,46.68 64.02,52.37"/></g></svg>',
  flag_uk:
    '<svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ns1="http://sozi.baierouge.fr" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg1" inkscape:version="0.46" viewBox="0 0 1000 500" sodipodi:version="0.32" inkscape:output_extension="org.inkscape.output.svg.inkscape" sodipodi:docname="united_kingdom.svg" > <sodipodi:namedview id="base" inkscape:window-x="353" inkscape:window-y="389" inkscape:window-height="704" inkscape:zoom="0.544" showgrid="false" inkscape:current-layer="svg1" inkscape:cx="500" inkscape:cy="250" inkscape:window-width="952" /> <g id="g578" transform="scale(16.667)" > <rect id="rect124" style="stroke-width:1pt;fill:#000066" height="30" width="60" y="0" x="0" /> <g id="g584" > <path id="path146" style="stroke-width:1pt;fill:#ffffff" d="m0 0v3.3541l53.292 26.646h6.708v-3.354l-53.292-26.646h-6.708zm60 0v3.354l-53.292 26.646h-6.708v-3.354l53.292-26.646h6.708z" /> <path id="path136" style="stroke-width:1pt;fill:#ffffff" d="m25 0v30h10v-30h-10zm-25 10v10h60v-10h-60z" /> <path id="path141" style="stroke-width:1pt;fill:#cc0000" d="m0 12v6h60v-6h-60zm27-12v30h6v-30h-6z" /> <path id="path150" style="stroke-width:1pt;fill:#cc0000" d="m0 30l20-10h4.472l-20 10h-4.472zm0-30l20 10h-4.472l-15.528-7.7639v-2.2361zm35.528 10l20-10h4.472l-20 10h-4.472zm24.472 20l-20-10h4.472l15.528 7.764v2.236z" /> </g > </g > <metadata > <rdf:RDF > <cc:Work > <dc:format >image/svg+xml</dc:format > <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <cc:license rdf:resource="http://creativecommons.org/licenses/publicdomain/" /> <dc:publisher > <cc:Agent rdf:about="http://openclipart.org/" > <dc:title >Openclipart</dc:title > </cc:Agent > </dc:publisher > <dc:title >Flag of the United Kingdom</dc:title > <dc:date >2008-07-12T12:27:21</dc:date > <dc:description /> <dc:source >https://openclipart.org/detail/17754/flag-of-the-united-kingdom-by-tobias</dc:source > <dc:creator > <cc:Agent > <dc:title >tobias</dc:title > </cc:Agent > </dc:creator > <dc:subject > <rdf:Bag > <rdf:li >country</rdf:li > <rdf:li >europe</rdf:li > <rdf:li >european union</rdf:li > <rdf:li >flag</rdf:li > <rdf:li >nation</rdf:li > <rdf:li >sign</rdf:li > <rdf:li >united nations member</rdf:li > <rdf:li >unitedkingdom</rdf:li > </rdf:Bag > </dc:subject > </cc:Work > <cc:License rdf:about="http://creativecommons.org/licenses/publicdomain/" > <cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /> <cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /> <cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /> </cc:License > </rdf:RDF > </metadata > </svg>',
  flag_germany:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.2 38.4"><g fill-rule="evenodd" clip-rule="evenodd"><path d="M3.03 0h49.13c1.67 0 3.03 1.36 3.03 3.03v32.33c0 1.66-1.36 3.02-3.02 3.03H3.02C1.36 38.4 0 37.03 0 35.37V3.03C0 1.36 1.36 0 3.03 0z"/><path d="M0 12.8h55.2v22.57c0 1.67-1.36 3.03-3.03 3.03H3.03C1.36 38.4 0 37.04 0 35.37V12.8z" fill="#d00"/><path d="M0 25.6h55.2v9.77c0 1.66-1.36 3.02-3.02 3.03H3.03A3.04 3.04 0 010 35.37V25.6z" fill="#ffce00"/></g></svg>',
  flag_da:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 28"><path fill="#c8102e" d="M0,0H37V28H0Z" /><path stroke="#fff" stroke-width="4" d="M0,14h37M14,0v28" /></svg>',
  flag_it:
    '<svg xmlns="http://www.w3.org/2000/svg" width="1500" height="1000" viewBox="0 0 3 2"><rect width="3" height="2" fill="#009246"/><rect width="2" height="2" x="1" fill="#fff"/><rect width="1" height="2" x="2" fill="#ce2b37"/></svg>',
  flag_ja:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M0 0h512v512H0z"/><circle cx="256" cy="256" r="111.3" fill="#d80027"/></g></svg>',
  flag_et:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#333" d="m0 167 254.6-36.6L512 166.9v178l-254.6 36.4L0 344.9z"/><path fill="#0052b4" d="M0 0h512v166.9H0z"/><path fill="#eee" d="M0 344.9h512V512H0z"/></g></svg>',
  flag_li:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#6da544" d="m0 167 253.8-19.3L512 167v178l-254.9 32.3L0 345z"/><path fill="#ffda44" d="M0 0h512v167H0z"/><path fill="#d80027" d="M0 345h512v167H0z"/></g></svg>',
  flag_la:
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600">< path fill="#9E3039" d="m0,0h1200v600H0z" stroke="#000" stroke- width="8" /><path fill="#FFF" d="m4,240h1192v120H4" /></svg>',
  flag_vi:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#d80027" d="M0 0h512v512H0z"/><path fill="#ffda44" d="m256 133.6 27.6 85H373L300.7 271l27.6 85-72.3-52.5-72.3 52.6 27.6-85-72.3-52.6h89.4z"/></g></svg>',
  flag_ko:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#eee" d="M0 0h512v512H0z"/><path fill="#d80027" d="M345 256c0 22.3-39.8 78-89 78s-89-55.7-89-78a89 89 0 1 1 178 0z"/><path fill="#0052b4" d="M345 256a89 89 0 1 1-178 0"/><path fill="#333" d="m350.4 334.7 23.7-23.6 15.7 15.7-23.6 23.6zm-39.3 39.4 23.6-23.7 15.7 15.8-23.6 23.6zm86.6 7.8 23.6-23.6L437 374l-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7L374 437zm15.8-63 23.6-23.6 15.7 15.7-23.6 23.7zm-39.4 39.4 23.6-23.6 15.8 15.7-23.7 23.6zm63-220.4-63-63 15.8-15.7 63 63zm-63-15.7-23.6-23.7 15.7-15.7 23.7 23.6zm39.4 39.3-23.7-23.6 15.8-15.7 23.6 23.6zm7.8-86.6-23.6-23.6L374 75l23.7 23.6zm39.4 39.4L397.7 130l15.7-15.8L437 138zM90.7 358.3l63 63-15.8 15.7-63-63zm63 15.7 23.6 23.7-15.7 15.7-23.7-23.6zm-39.4-39.3 23.6 23.6-15.7 15.8-23.6-23.7zm23.6-23.6 63 63-15.7 15.7-63-63zm15.8-220.4-63 63L75 137.9l63-63zm23.6 23.6-63 63-15.7-15.8 63-63zm23.6 23.6-63 63-15.7-15.7 63-63z"/></g></svg>',
  flag_ta:
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" ><g fill-rule="evenodd"><path d="M0 0h900v600H0z" fill="#fe0000"/><path d="M0 0h450v300H0z" fill="#000095"/></g><path d="M225 37.5l-56.25 209.928L322.428 93.75 112.5 150l209.928 56.25L168.75 52.572 225 262.5l56.25-209.928L127.572 206.25 337.5 150 127.572 93.75 281.25 247.428 225 37.5" fill="#fff" paint-order="markers fill stroke"/><circle cy="150" cx="225" r="60" fill="#fff" stroke="#000095" stroke-width="7.5"/></svg>',
  flag_sp:
    '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" ><mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask><g mask="url(#a)"><path fill="#ffda44" d="m0 128 256-32 256 32v256l-256 32L0 384Z"/><path fill="#d80027" d="M0 0h512v128H0zm0 384h512v128H0z"/><g fill="#eee"><path d="M144 304h-16v-80h16zm128 0h16v-80h-16z"/><ellipse cx="208" cy="296" rx="48" ry="32"/></g><g fill="#d80027"><rect width="16" height="24" x="128" y="192" rx="8"/><rect width="16" height="24" x="272" y="192" rx="8"/><path d="M208 272v24a24 24 0 0 0 24 24 24 24 0 0 0 24-24v-24h-24z"/></g><rect width="32" height="16" x="120" y="208" fill="#ff9811" ry="8"/><rect width="32" height="16" x="264" y="208" fill="#ff9811" ry="8"/><rect width="32" height="16" x="120" y="304" fill="#ff9811" rx="8"/><rect width="32" height="16" x="264" y="304" fill="#ff9811" rx="8"/><path fill="#ff9811" d="M160 272v24c0 8 4 14 9 19l5-6 5 10a21 21 0 0 0 10 0l5-10 5 6c6-5 9-11 9-19v-24h-9l-5 8-5-8h-10l-5 8-5-8z"/><path d="M122 252h172m-172 24h28m116 0h28"/><path fill="#d80027" d="M122 248a4 4 0 0 0-4 4 4 4 0 0 0 4 4h172a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm0 24a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4zm144 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4h28a4 4 0 0 0 4-4 4 4 0 0 0-4-4z"/><path fill="#eee" d="M196 168c-7 0-13 5-15 11l-5-1c-9 0-16 7-16 16s7 16 16 16c7 0 13-4 15-11a16 16 0 0 0 17-4 16 16 0 0 0 17 4 16 16 0 1 0 10-20 16 16 0 0 0-27-5c-3-4-7-6-12-6zm0 8c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm24 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-8 0-4 4-8 8-8zm-44 10 4 1 4 8c0 4-4 7-8 7s-8-3-8-8c0-4 4-8 8-8zm64 0c5 0 8 4 8 8 0 5-3 8-8 8-4 0-8-3-8-7l4-8z"/><path fill="none" d="M220 284v12c0 7 5 12 12 12s12-5 12-12v-12z"/><path fill="#ff9811" d="M200 160h16v32h-16z"/><path fill="#eee" d="M208 224h48v48h-48z"/><path fill="#d80027" d="m248 208-8 8h-64l-8-8c0-13 18-24 40-24s40 11 40 24zm-88 16h48v48h-48z"/><rect width="20" height="32" x="222" y="232" fill="#d80027" rx="10" ry="10"/><path fill="#ff9811" d="M168 232v8h8v16h-8v8h32v-8h-8v-16h8v-8zm8-16h64v8h-64z"/><g fill="#ffda44"><circle cx="186" cy="202" r="6"/><circle cx="208" cy="202" r="6"/><circle cx="230" cy="202" r="6"/></g><path fill="#d80027" d="M169 272v43a24 24 0 0 0 10 4v-47h-10zm20 0v47a24 24 0 0 0 10-4v-43h-10z"/><g fill="#338af3"><circle cx="208" cy="272" r="16"/><rect width="32" height="16" x="264" y="320" ry="8"/><rect width="32" height="16" x="120" y="320" ry="8"/></g></g></svg>',
  flag_hb:
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="873" viewBox="0 0 960 873" version="1.1"><path d="M 0 41.001 L 0 82.002 480.250 81.751 L 960.500 81.500 960.761 40.750 L 961.022 -0 480.511 -0 L 0 0 0 41.001 M 0.457 41.500 C 0.456 64.050, 0.588 73.418, 0.749 62.317 C 0.909 51.216, 0.910 32.766, 0.749 21.317 C 0.589 9.868, 0.457 18.950, 0.457 41.500 M -0 436.503 L -0 655.002 480.250 654.751 L 960.500 654.500 960.752 436 L 961.004 217.500 480.502 217.752 L 0 218.004 -0 436.503 M 0.491 436.500 C 0.491 556.950, 0.608 606.373, 0.750 546.330 C 0.892 486.286, 0.892 387.736, 0.750 327.330 C 0.608 266.923, 0.491 316.050, 0.491 436.500 M 452.500 295.026 L 425.500 341.990 371.250 341.995 C 341.413 341.998, 317 342.246, 317 342.546 C 317 342.847, 329 363.881, 343.667 389.289 C 358.333 414.697, 370.333 435.944, 370.333 436.504 C 370.333 437.065, 358.333 458.300, 343.667 483.693 C 329 509.086, 317 530.118, 317 530.431 C 317 530.744, 341.413 531.002, 371.250 531.005 L 425.500 531.010 452.500 577.974 C 467.350 603.804, 479.725 624.938, 480 624.938 C 480.275 624.938, 492.650 603.804, 507.500 577.974 L 534.500 531.010 588.750 531.005 C 618.587 531.002, 643 530.754, 643 530.454 C 643 530.153, 631 509.119, 616.333 483.711 C 601.667 458.303, 589.667 437.058, 589.667 436.500 C 589.667 435.942, 601.667 414.697, 616.333 389.289 C 631 363.881, 643 342.847, 643 342.546 C 643 342.246, 618.587 341.998, 588.750 341.995 L 534.500 341.990 507.500 295.026 C 492.650 269.196, 480.275 248.062, 480 248.062 C 479.725 248.062, 467.350 269.196, 452.500 295.026 M 469.805 325.036 L 460.110 342 480 342 L 499.890 342 490.195 325.036 C 484.863 315.706, 480.275 308.072, 480 308.072 C 479.725 308.072, 475.137 315.706, 469.805 325.036 M 369 372.527 C 369 373.204, 385.465 401.919, 387.215 404.294 C 388.400 405.901, 389.417 404.558, 397.019 391.351 C 401.683 383.246, 406.077 375.576, 406.782 374.307 L 408.064 372 388.532 372 C 377.789 372, 369 372.237, 369 372.527 M 424.131 404.119 C 409.725 429.244, 405.950 436.560, 406.631 438.038 C 407.109 439.074, 415.375 453.646, 425 470.420 L 442.500 500.918 480 500.917 L 517.500 500.916 535.869 468.881 C 550.275 443.756, 554.050 436.440, 553.369 434.962 C 552.891 433.926, 544.625 419.354, 535 402.580 L 517.500 372.082 480 372.083 L 442.500 372.084 424.131 404.119 M 553.218 374.307 C 553.923 375.576, 558.317 383.246, 562.981 391.351 C 570.583 404.558, 571.600 405.901, 572.785 404.294 C 574.535 401.919, 591 373.204, 591 372.527 C 591 372.237, 582.211 372, 571.468 372 L 551.936 372 553.218 374.307 M 384.780 472.632 C 375.190 488.673, 368.809 500.142, 369.236 500.569 C 369.497 500.830, 378.289 500.922, 388.773 500.772 L 407.834 500.500 398.865 485 C 393.933 476.475, 389.535 468.884, 389.092 468.132 C 388.517 467.152, 387.292 468.430, 384.780 472.632 M 561.830 483.726 L 552.167 500.500 571.228 500.772 C 581.712 500.922, 590.481 500.852, 590.715 500.618 C 591.124 500.209, 575.487 472.373, 572.799 468.726 C 571.636 467.148, 570.431 468.796, 561.830 483.726 M 469.805 547.964 C 475.137 557.294, 479.725 564.928, 480 564.928 C 480.275 564.928, 484.863 557.294, 490.195 547.964 L 499.890 531 480 531 L 460.110 531 469.805 547.964 M 0 832.003 L 0 873.002 480.250 872.751 L 960.500 872.500 960.761 831.500 L 961.022 790.500 480.511 790.752 L 0 791.004 0 832.003 M 0.457 832 C 0.457 854.825, 0.588 864.163, 0.749 852.750 C 0.909 841.338, 0.909 822.663, 0.749 811.250 C 0.588 799.837, 0.457 809.175, 0.457 832" stroke="none" fill="#fbfbfb" fill-rule="evenodd"/><path d="M 0 150.003 L 0 218.002 480.250 217.751 L 960.500 217.500 960.757 149.500 L 961.014 81.500 480.507 81.752 L 0 82.004 0 150.003 M 0.473 150 C 0.473 187.675, 0.597 203.087, 0.750 184.250 C 0.902 165.412, 0.902 134.587, 0.750 115.750 C 0.597 96.912, 0.473 112.325, 0.473 150 M 452.500 295.026 L 425.500 341.990 371.250 341.995 C 341.413 341.998, 317 342.246, 317 342.546 C 317 342.847, 329 363.881, 343.667 389.289 C 358.333 414.697, 370.333 435.944, 370.333 436.504 C 370.333 437.065, 358.333 458.300, 343.667 483.693 C 329 509.086, 317 530.118, 317 530.431 C 317 530.744, 341.413 531.002, 371.250 531.005 L 425.500 531.010 452.500 577.974 C 467.350 603.804, 479.725 624.938, 480 624.938 C 480.275 624.938, 492.650 603.804, 507.500 577.974 L 534.500 531.010 588.750 531.005 C 618.587 531.002, 643 530.754, 643 530.454 C 643 530.153, 631 509.119, 616.333 483.711 C 601.667 458.303, 589.667 437.058, 589.667 436.500 C 589.667 435.942, 601.667 414.697, 616.333 389.289 C 631 363.881, 643 342.847, 643 342.546 C 643 342.246, 618.587 341.998, 588.750 341.995 L 534.500 341.990 507.500 295.026 C 492.650 269.196, 480.275 248.062, 480 248.062 C 479.725 248.062, 467.350 269.196, 452.500 295.026 M 469.805 325.036 L 460.110 342 480 342 L 499.890 342 490.195 325.036 C 484.863 315.706, 480.275 308.072, 480 308.072 C 479.725 308.072, 475.137 315.706, 469.805 325.036 M 369 372.527 C 369 373.204, 385.465 401.919, 387.215 404.294 C 388.400 405.901, 389.417 404.558, 397.019 391.351 C 401.683 383.246, 406.077 375.576, 406.782 374.307 L 408.064 372 388.532 372 C 377.789 372, 369 372.237, 369 372.527 M 424.131 404.119 C 409.725 429.244, 405.950 436.560, 406.631 438.038 C 407.109 439.074, 415.375 453.646, 425 470.420 L 442.500 500.918 480 500.917 L 517.500 500.916 535.869 468.881 C 550.275 443.756, 554.050 436.440, 553.369 434.962 C 552.891 433.926, 544.625 419.354, 535 402.580 L 517.500 372.082 480 372.083 L 442.500 372.084 424.131 404.119 M 553.218 374.307 C 553.923 375.576, 558.317 383.246, 562.981 391.351 C 570.583 404.558, 571.600 405.901, 572.785 404.294 C 574.535 401.919, 591 373.204, 591 372.527 C 591 372.237, 582.211 372, 571.468 372 L 551.936 372 553.218 374.307 M 384.780 472.632 C 375.190 488.673, 368.809 500.142, 369.236 500.569 C 369.497 500.830, 378.289 500.922, 388.773 500.772 L 407.834 500.500 398.865 485 C 393.933 476.475, 389.535 468.884, 389.092 468.132 C 388.517 467.152, 387.292 468.430, 384.780 472.632 M 561.830 483.726 L 552.167 500.500 571.228 500.772 C 581.712 500.922, 590.481 500.852, 590.715 500.618 C 591.124 500.209, 575.487 472.373, 572.799 468.726 C 571.636 467.148, 570.431 468.796, 561.830 483.726 M 469.805 547.964 C 475.137 557.294, 479.725 564.928, 480 564.928 C 480.275 564.928, 484.863 557.294, 490.195 547.964 L 499.890 531 480 531 L 460.110 531 469.805 547.964 M 0 723.003 L 0 791.002 480.250 790.751 L 960.500 790.500 960.757 722.500 L 961.014 654.500 480.507 654.752 L 0 655.004 0 723.003 M 0.473 723 C 0.473 760.675, 0.597 776.087, 0.750 757.250 C 0.902 738.413, 0.902 707.587, 0.750 688.750 C 0.597 669.913, 0.473 685.325, 0.473 723" stroke="none" fill="#043cbc" fill-rule="evenodd"/></svg>',
  check_mark:
    '<svg xmlns="http://www.w3.org/2000/svg"  class="aca_svg_check_mark DisplayNone" viewBox="0 0 12 8" width="100%" height="100%"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m1.625 4.625 2.5 2.5 6.25-6.25"></path></svg>',
  check_mark2:
    '<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="style=fill"> <g id="check-circle"> <path id="Subtract" fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM16.5303 10.0303C16.8232 9.73744 16.8232 9.26256 16.5303 8.96967C16.2374 8.67678 15.7626 8.67678 15.4697 8.96967L10.8434 13.5959C10.7458 13.6935 10.5875 13.6935 10.4899 13.5959L8.53033 11.6363C8.23744 11.3434 7.76256 11.3434 7.46967 11.6363C7.17678 11.9292 7.17678 12.4041 7.46967 12.697L9.42923 14.6566C10.1126 15.34 11.2207 15.34 11.9041 14.6566L16.5303 10.0303Z" fill="#000000"/> </g> </g> </svg>',
  visually_impaired:
    '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21.938,10.654a.993.993,0,0,1,0,.692,13.449,13.449,0,0,1-1.08,2.263,1,1,0,0,1-1.715-1.029A11.284,11.284,0,0,0,19.928,11C18.451,7.343,15.374,5,12,5S5.549,7.343,4.072,11a9.315,9.315,0,0,0,6.167,5.787,1,1,0,1,1-.478,1.942,11.393,11.393,0,0,1-7.7-7.383.993.993,0,0,1,0-.692C3.773,6.005,7.674,3,12,3S20.227,6.005,21.938,10.654ZM12,15a4,4,0,1,1,4-4A4,4,0,0,1,12,15Zm2-4a2,2,0,1,0-2,2A2,2,0,0,0,14,11Zm5.707,4.293a1,1,0,0,0-1.414,0L17,16.586l-1.293-1.293a1,1,0,0,0-1.414,1.414L15.586,18l-1.293,1.293a1,1,0,1,0,1.414,1.414L17,19.414l1.293,1.293a1,1,0,0,0,1.414-1.414L18.414,18l1.293-1.293A1,1,0,0,0,19.707,15.293Z"/></svg>',
  blind:
    '<svg fill="#000000" viewBox="-64 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M380.15 510.837a8 8 0 0 1-10.989-2.687l-125.33-206.427a31.923 31.923 0 0 0 12.958-9.485l126.048 207.608a8 8 0 0 1-2.687 10.991zM142.803 314.338l-32.54 89.485 36.12 88.285c6.693 16.36 25.377 24.192 41.733 17.501 16.357-6.692 24.193-25.376 17.501-41.734l-62.814-153.537zM96 88c24.301 0 44-19.699 44-44S120.301 0 96 0 52 19.699 52 44s19.699 44 44 44zm154.837 169.128l-120-152c-4.733-5.995-11.75-9.108-18.837-9.112V96H80v.026c-7.146.003-14.217 3.161-18.944 9.24L0 183.766v95.694c0 13.455 11.011 24.791 24.464 24.536C37.505 303.748 48 293.1 48 280v-79.766l16-20.571v140.698L9.927 469.055c-6.04 16.609 2.528 34.969 19.138 41.009 16.602 6.039 34.968-2.524 41.009-19.138L136 309.638V202.441l-31.406-39.816a4 4 0 1 1 6.269-4.971l102.3 129.217c9.145 11.584 24.368 11.339 33.708 3.965 10.41-8.216 12.159-23.334 3.966-33.708z"/></svg>',
  adhd: '<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 569.16 569.16" xml:space="preserve"> <g> <g> <path d="M284.58,0C127.663,0,0,127.663,0,284.58s127.663,284.58,284.58,284.58s284.58-127.663,284.58-284.58S441.497,0,284.58,0z M284.58,507.96c-123.171,0-223.38-100.209-223.38-223.38S161.409,61.2,284.58,61.2s223.38,100.209,223.38,223.38 S407.751,507.96,284.58,507.96z"/> <path d="M284.58,113.709c-94.217,0-170.871,76.653-170.871,170.871c0,94.218,76.653,170.87,170.871,170.87 c94.218,0,170.87-76.652,170.87-170.87C455.45,190.363,378.798,113.709,284.58,113.709z M284.58,394.25 c-60.472,0-109.67-49.198-109.67-109.67s49.199-109.67,109.67-109.67s109.67,49.199,109.67,109.67S345.052,394.25,284.58,394.25z" /> <circle cx="284.58" cy="284.58" r="64.933"/> </g> </g> </svg>',
  dyslexia:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 11" width="100%" height="100%"><path fill="currentColor" fill-rule="evenodd" stroke="currentColor" stroke-width="0.5" d="M1 10V1.4125h2.8968759c2.7220645 0 4.6449908 1.775 4.6449908 4.2875 0 2.5125-1.9229263 4.3-4.6449908 4.3H1Zm.97395-1.7631818h1.9229263c2.1476839 0 3.6585545-1.1706833 3.6585545-2.9740909C7.5554308 3.470591 6.0445602 2.3 3.8968763 2.3H1.97395v5.9368182ZM11.809437 2.65l.004584.8875h1.605048v.8375h-1.600688L12.008 10h-1.414166L10.812 4.375h-.969534v-.8375h1.023692l.030044-.8875c.0320746-.9625.6440977-1.65 1.482911-1.65.396736 0 .7919618.15 1.120887.4125l-.385091.6875c-.1391915-.15-.3806405-.2625-.651108-.2625-.3527837 0-.6568024.3375-.654364.8125Z"></path></svg>',
  play: '<svg xmlns="http://www.w3.org/2000/svg" class="aca_play_icon" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill-rule="nonzero" d="M255.99 0c70.68 0 134.7 28.66 181.02 74.98C483.33 121.3 512 185.31 512 256c0 70.68-28.67 134.69-74.99 181.01C390.69 483.33 326.67 512 255.99 512S121.3 483.33 74.98 437.01C28.66 390.69 0 326.68 0 256c0-70.67 28.66-134.7 74.98-181.02C121.3 28.66 185.31 0 255.99 0zm77.4 269.81c13.75-8.88 13.7-18.77 0-26.63l-110.27-76.77c-11.19-7.04-22.89-2.9-22.58 11.72l.44 154.47c.96 15.86 10.02 20.21 23.37 12.87l109.04-75.66zm79.35-170.56c-40.1-40.1-95.54-64.92-156.75-64.92-61.21 0-116.63 24.82-156.74 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.22 24.82 116.64 64.92 156.74 40.11 40.11 95.53 64.93 156.74 64.93 61.21 0 116.65-24.82 156.75-64.93 40.11-40.1 64.93-95.52 64.93-156.74 0-61.22-24.82-116.64-64.93-156.75z"/></svg>',
  pause:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_pause_icon" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 511.99"><path fill-rule="nonzero" d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-66.92 168.32h38.04c5.09 0 9.24 4.21 9.24 9.24v156.87c0 5.03-4.19 9.23-9.24 9.23h-38.04c-5.03 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.15-9.24 9.23-9.24zm95.77 0h38.06c5.08 0 9.23 4.2 9.23 9.24v156.87c0 5.03-4.19 9.23-9.23 9.23h-38.06c-5.04 0-9.23-4.16-9.23-9.23V177.56c0-5.09 4.16-9.24 9.23-9.24zm127.9-69.07C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"/></svg>',
  cancle:
    '<svg xmlns="http://www.w3.org/2000/svg" class="aca_cancel_icon" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 511.99"><path fill-rule="nonzero" d="M256 0c70.68 0 134.7 28.66 181.02 74.98C483.34 121.3 512 185.32 512 256s-28.66 134.69-74.98 181.01C390.7 483.33 326.68 511.99 256 511.99s-134.7-28.66-181.02-74.98C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.7 74.98-181.02C121.3 28.66 185.32 0 256 0zm-73.19 174.9h146.37c4.81 0 8.74 4.02 8.74 8.75v144.68c0 4.73-4 8.74-8.74 8.74H182.81c-4.73 0-8.73-3.92-8.73-8.74V183.65c0-4.81 3.93-8.75 8.73-8.75zm229.94-75.65C372.64 59.15 317.21 34.33 256 34.33c-61.21 0-116.64 24.82-156.75 64.92-40.1 40.11-64.92 95.54-64.92 156.75 0 61.21 24.82 116.63 64.92 156.74 40.11 40.1 95.54 64.92 156.75 64.92 61.21 0 116.64-24.82 156.75-64.92 40.1-40.11 64.92-95.53 64.92-156.74 0-61.21-24.82-116.64-64.92-156.75z"/></svg>',
  back: `<svg xmlns="http://www.w3.org/2000/svg" class="aca_statement_icon ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 160l-64 64 64 64"/><path d="M64 224h294c58.76 0 106 49.33 106 108v20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`,
};

const jsonEN = {
  aca_card_header_title_span: "Accessibility Menu",
  aca_card_footer_reset_text: "Reset",
  aca_footer_statment_link: "Accessibility Statement",
  aca_dt: "Decrease Font Size",
  aca_it: "Increase Font Size",
  aca_gs: "Saturation",
  aca_ic: "Invert Colors",
  aca_hl: "Highlight Links",
  aca_hh: "Highlight Headers",
  aca_rs: "Read Selected",
  aca_rp: "Read Page",
  aca_lh: "Line Height",
  aca_ls: "Letter Spacing",
  aca_cc: "Cursor",
  aca_ta: "Text Align",
  aca_pa: "Pause Animation",
  aca_cf: "Fonts Type",
  aca_hi: "Hide Images",
  aca_ms: "Mute Sounds",
  aca_tt: "Tooltips",
  aca_rf: "Read Focus",
  aca_profile_select_span: "Accessibility Profile",
  aca_visually_impaired_span: "Visually-impaired",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dyslexia",
};

const jsonHI = {
  aca_card_header_title_span: "अभिगम्यता मेनू",
  aca_card_footer_reset_text: "रीसेट",
  aca_footer_statment_link: "अभिगम्यता कथन",
  aca_dt: "फ़ॉन्ट आकार घटाएँ",
  aca_it: "फ़ॉन्ट आकार बढ़ाएँ",
  aca_gs: "असंतृप्त",
  aca_ic: "रंग बदलें",
  aca_hl: "लिंक हाइलाइट करें",
  aca_hh: "हाइलाइट हेडर",
  aca_rs: "चयनित पढ़ें",
  aca_rp: "पेज पढ़ें",
  aca_lh: "ऊंची लाईन",
  aca_ls: "पत्र अंतराल",
  aca_cc: "कर्सर बदलें",
  aca_ta: "पाठ संरेखित",
  aca_pa: "एनीमेशन रोकें",
  aca_cf: "फ़ॉन्ट्स प्रकार",
  aca_hi: "छवियां छुपाएं",
  aca_ms: "मूक ध्वनि",
  aca_tt: "टूलटिप्स",
  aca_rf: "फोकस पढ़ें",
  aca_profile_select_span: "अभिगम्यता प्रोफ़ाइल",
  aca_visually_impaired_span: "नेत्रहीन",
  aca_blind_span: "अंधा",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "डिस्लेक्सिया",
};

const jsonUK = {
  aca_card_header_title_span: "Accessibility Menu",
  aca_card_footer_reset_text: "Reset",
  aca_footer_statment_link: "Accessibility Statement",
  aca_dt: "Decrease Font Size",
  aca_it: "Increase Font Size",
  aca_gs: "Grayscale",
  aca_ic: "Invert Colors",
  aca_hl: "Highlight Links",
  aca_hh: "Highlight Headers",
  aca_rs: "Read Selected",
  aca_rp: "Read Page",
  aca_lh: "Line Height",
  aca_ls: "Letter Spacing",
  aca_cc: "Cursor",
  aca_ta: "Text Align",
  aca_pa: "Pause Animation",
  aca_cf: "Fonts Type",
  aca_hi: "Hide Images",
  aca_ms: "Mute Sounds",
  aca_tt: "Tooltips",
  aca_rf: "Read Focus",
  aca_profile_select_span: "Accessibility Profile",
  aca_visually_impaired_span: "Visually-impaired",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dyslexia",
};

const jsonDE = {
  aca_card_header_title_span: "Barrierefreiheitsmenü",
  aca_card_footer_reset_text: "Zurücksetzen",
  aca_footer_statment_link: "Erklärung zur Barrierefreiheit",
  aca_dt: "Verringern Sie die Schriftgröße",
  aca_it: "Schriftgröße vergrößern",
  aca_gs: "Graustufen",
  aca_ic: "Farben umkehren",
  aca_hl: "Links hervorheben",
  aca_hh: "Kopfzeilen hervorheben",
  aca_rs: "Ausgewählt lesen",
  aca_rp: "Seite lesen",
  aca_lh: "Zeilenhöhe",
  aca_ls: "Buchstaben-Abstand",
  aca_cc: "Mauszeiger",
  aca_ta: "Textausrichtung",
  aca_pa: "Animation anhalten",
  aca_cf: "Schriftartentyp",
  aca_hi: "Bilder ausblenden",
  aca_ms: "Töne stummschalten",
  aca_tt: "Kurzinfos",
  aca_rf: "Fokus lesen",
  aca_profile_select_span: "Zugänglichkeitsprofil",
  aca_visually_impaired_span: "Sehbehindert",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dyslexie",
};

const jsonDA = {
  aca_card_header_title_span: "Tilgængelighedsmenu",
  aca_card_footer_reset_text: "Nulstil",
  aca_footer_statment_link: "Tilgængelighedserklæring",
  aca_dt: "Formindsk skriftstørrelse",
  aca_it: "Forøg skriftstørrelse",
  aca_gs: "Gråtoner",
  aca_ic: "Inverter farver",
  aca_hl: "Fremhæv links",
  aca_hh: "Fremhæv overskrifter",
  aca_rs: "Læs udvalgte",
  aca_rp: "Læs side",
  aca_lh: "Linjehøjde",
  aca_ls: "Bogstavafstand",
  aca_cc: "cursoren",
  aca_ta: "Tekstjustering",
  aca_pa: "Sæt animation på pause",
  aca_cf: "Skrifttype",
  aca_hi: "Skjul billeder",
  aca_ms: "Slå lyde fra",
  aca_tt: "Værktøjstip",
  aca_rf: "Læs Fokus",
  aca_profile_select_span: "Tilgængelighedsprofil",
  aca_visually_impaired_span: "Svagtseende",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Ordblindhed",
};

const jsonIT = {
  aca_card_header_title_span: "Menù Accessibilità",
  aca_card_footer_reset_text: "Ripristina",
  aca_footer_statment_link: "Dichiarazione di accessibilità",
  aca_dt: "Riduci la dimensione del carattere",
  aca_it: "Aumenta la dimensione del carattere",
  aca_gs: "Scala di grigi",
  aca_ic: "Inverti i colori",
  aca_hl: "Evidenzia collegamenti",
  aca_hh: "Evidenzia le intestazioni",
  aca_rs: "Leggi selezionato",
  aca_rp: "Leggi pagina",
  aca_lh: "Altezza della linea",
  aca_ls: "Spaziatura del carattere",
  aca_cc: "Cursore",
  aca_ta: "Allinea il testo",
  aca_pa: "Metti in pausa l'animazione",
  aca_cf: "Tipo di carattere",
  aca_hi: "Nascondi immagini",
  aca_ms: "Suoni muti",
  aca_tt: "Suggerimenti",
  aca_rf: "Leggi Fuoco",
  aca_profile_select_span: "Profilo di accessibilità",
  aca_visually_impaired_span: "Ipovedente",
  aca_blind_span: "Cieco",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dislessia",
};

const jsonJA = {
  aca_card_header_title_span: "アクセシビリティ メニュー",
  aca_card_footer_reset_text: "リセット",
  aca_footer_statment_link: "アクセシビリティに関する声明",
  aca_dt: "フォントサイズを小さくする",
  aca_it: "フォントサイズを大きくする",
  aca_gs: "グレースケール",
  aca_ic: "色を反転",
  aca_hl: "リンクをハイライト",
  aca_hh: "ヘッダーを強調表示",
  aca_rs: "選択したものを読む",
  aca_rp: "ページを読む",
  aca_lh: "行の高さ",
  aca_ls: "文字間隔",
  aca_cc: "カーソル",
  aca_ta: "テキストの整列",
  aca_pa: "アニメーションを一時停止",
  aca_cf: "フォントの種類",
  aca_hi: "画像を非表示",
  aca_ms: "ミュート音",
  aca_tt: "ツールチップ",
  aca_rf: "フォーカスを読む",
  aca_profile_select_span: "アクセシビリティ プロファイル",
  aca_visually_impaired_span: "視覚障害",
  aca_blind_span: "盲目",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "失読症",
};

const jsonET = {
  aca_card_header_title_span: "Juurdepääsetavusmenüü",
  aca_card_footer_reset_text: "Lähtesta",
  aca_footer_statment_link: "Juurdepääsetavuse avaldus",
  aca_dt: "Vähenda fondi suurust",
  aca_it: "Suurendage fondi suurust",
  aca_gs: "Halltoonid",
  aca_ic: "Inverteeri värvid",
  aca_hl: "Tõstke esile Lingid",
  aca_hh: "Tõstke esile Päised",
  aca_rs: "Lugege valitud",
  aca_rp: "Loe lehte",
  aca_lh: "Reakõrgus",
  aca_ls: "Tähevahe",
  aca_cc: "Kursor",
  aca_ta: "Teksti joondamine",
  aca_pa: "Peata animatsioon",
  aca_cf: "Fontide tüüp",
  aca_hi: "Peida pildid",
  aca_ms: "Vaigista helid",
  aca_tt: "Tööriistanõuanded",
  aca_rf: "Lugege Fookus",
  aca_profile_select_span: "Juurdepääsetavuse profiil",
  aca_visually_impaired_span: "Nägemispuudega",
  aca_blind_span: "Pime",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Düsleksia",
};

const jsonLI = {
  aca_card_header_title_span: "Prieinamumo meniu",
  aca_card_footer_reset_text: "Nustatyti iš naujo",
  aca_footer_statment_link: "Prieinamumo pareiškimas",
  aca_dt: "Sumažinti šrifto dydį",
  aca_it: "Padidinkite šrifto dydį",
  aca_gs: "Pilkos spalvos",
  aca_ic: "Invertuoti spalvas",
  aca_hl: "Pažymėkite nuorodas",
  aca_hh: "Paryškinkite antraštes",
  aca_rs: "Skaityti pasirinktus",
  aca_rp: "Skaityti puslapį",
  aca_lh: "Linijos aukštis",
  aca_ls: "Tarpai tarp raidžių",
  aca_cc: "Žymeklis",
  aca_ta: "Teksto lygiavimas",
  aca_pa: "Pristabdyti animaciją",
  aca_cf: "Šriftų tipas",
  aca_hi: "Slėpti vaizdus",
  aca_ms: "Nutildyti garsus",
  aca_tt: "Patarimai",
  aca_rf: "Skaitykite Focus",
  aca_profile_select_span: "Pritaikymo neįgaliesiems profilis",
  aca_visually_impaired_span: "Regėjimo negalia",
  aca_blind_span: "Aklas",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Disleksija",
};

const jsonLA = {
  aca_card_header_title_span: "Pieejamības izvēlne",
  aca_card_footer_reset_text: "Atiestatīt",
  aca_footer_statment_link: "Pieejamības paziņojums",
  aca_dt: "Samaziniet fonta lielumu",
  aca_it: "Palieliniet fonta lielumu",
  aca_gs: "Pelēktoņi",
  aca_ic: "Invertēt krāsas",
  aca_hl: "Iezīmējiet saites",
  aca_hh: "Iezīmējiet galvenes",
  aca_rs: "Lasīt atlasītos",
  aca_rp: "Lasīt lapu",
  aca_lh: "Līnijas augstums",
  aca_ls: "Burtu atstarpes",
  aca_cc: "Kursors",
  aca_ta: "Teksta līdzināšana",
  aca_pa: "Pauzēt animāciju",
  aca_cf: "Fontu veids",
  aca_hi: "Slēpt attēlus",
  aca_ms: "Izslēgt skaņas",
  aca_tt: "Rīku padomi",
  aca_rf: "Izlasiet Fokuss",
  aca_profile_select_span: "Pieejamības profils",
  aca_visually_impaired_span: "Vājredzīgi",
  aca_blind_span: "Akls",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Disleksija",
};

const jsonVI = {
  aca_card_header_title_span: "Trình đơn trợ năng",
  aca_card_footer_reset_text: "Cài lại",
  aca_footer_statment_link: "Tuyên bố khả năng tiếp cận",
  aca_dt: "Giảm cỡ chữ",
  aca_it: "Tăng kích thước phông chữ",
  aca_gs: "thang độ xám",
  aca_ic: "Đảo ngược màu sắc",
  aca_hl: "Liên kết đánh dấu",
  aca_hh: "Tiêu đề nổi bật",
  aca_rs: "Đọc đã chọn",
  aca_rp: "Đọc trang",
  aca_lh: "Chiều cao giữa các dòng",
  aca_ls: "Khoảng cách chữ cái",
  aca_cc: "con trỏ",
  aca_ta: "Căn chỉnh văn bản",
  aca_pa: "Tạm dừng hoạt hình",
  aca_cf: "Loại phông chữ",
  aca_hi: "Ẩn hình ảnh",
  aca_ms: "âm thanh tắt tiếng",
  aca_tt: "Chú giải công cụ",
  aca_rf: "Đọc tập trung",
  aca_profile_select_span: "Hồ sơ trợ năng",
  aca_visually_impaired_span: "Khiếm thị",
  aca_blind_span: "Mù",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "chứng khó đọc",
};
const jsonKO = {
  aca_card_header_title_span: "접근성 메뉴",
  aca_card_footer_reset_text: "초기화",
  aca_footer_statment_link: "접근성 설명",
  aca_dt: "글꼴 크기 줄이기",
  aca_it: "글꼴 크기 늘리기",
  aca_gs: "그레이스케일",
  aca_ic: "색상 반전",
  aca_hl: "하이라이트 링크",
  aca_hh: "머리글 강조 표시",
  aca_rs: "선택한 항목 읽기",
  aca_rp: "페이지 읽기",
  aca_lh: "선 높이",
  aca_ls: "문자 간격",
  aca_cc: "커서",
  aca_ta: "텍스트 정렬",
  aca_pa: "애니메이션 일시중지",
  aca_cf: "글꼴 유형",
  aca_hi: "이미지 숨기기",
  aca_ms: "음소거",
  aca_tt: "툴팁",
  aca_rf: "포커스 읽기",
  aca_profile_select_span: "접근성 프로필",
  aca_visually_impaired_span: "시각 장애인",
  aca_blind_span: "눈이 먼",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "실독증",
};
const jsonTA = {
  aca_card_header_title_span: "Accessibility Menu",
  aca_card_footer_reset_text: "Reset",
  aca_footer_statment_link: "Accessibility Statement",
  aca_dt: "Decrease Font Size",
  aca_it: "Increase Font Size",
  aca_gs: "Grayscale",
  aca_ic: "Invert Colors",
  aca_hl: "Highlight Links",
  aca_hh: "Highlight Headers",
  aca_rs: "Read Selected",
  aca_rp: "Read Page",
  aca_lh: "Line Height",
  aca_ls: "Letter Spacing",
  aca_cc: "Cursor",
  aca_ta: "Text Align",
  aca_pa: "Pause Animation",
  aca_cf: "Fonts Type",
  aca_hi: "Hide Images",
  aca_ms: "Mute Sounds",
  aca_tt: "Tooltips",
  aca_rf: "Read Focus",
  aca_profile_select_span: "Accessibility Profile",
  aca_visually_impaired_span: "Visually-impaired",
  aca_blind_span: "Blind",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dyslexia",
};
const jsonSP = {
  aca_card_header_title_span: "Menú de accesibilidad",
  aca_card_footer_reset_text: "Reiniciar",
  aca_footer_statment_link: "Declaración de accesibilidad",
  aca_dt: "Disminuir tamaño de fuente",
  aca_it: "Aumenta el tamaño de la fuente",
  aca_gs: "escala de grises",
  aca_ic: "Colores invertidos",
  aca_hl: "Destacar enlaces",
  aca_hh: "Destacar encabezados",
  aca_rs: "Leer seleccionada",
  aca_rp: "Leer página",
  aca_lh: "Altura de la línea",
  aca_ls: "Espaciado de letras",
  aca_cc: "Cursor",
  aca_ta: "Texto alineado",
  aca_pa: "Pausar animación",
  aca_cf: "Tipo de fuente",
  aca_hi: "Ocultar imágenes",
  aca_ms: "Silenciar sonidos",
  aca_tt: "Información sobre herramientas",
  aca_rf: "Enfoque de lectura",
  aca_profile_select_span: "Perfil de accesibilidad",
  aca_visually_impaired_span: "Discapacitados visuales",
  aca_blind_span: "Ciego",
  aca_adhd_span: "ADHD",
  aca_dyslexia_span: "Dislexia",
};

const jsonHB = {
  aca_card_header_title_span: "תפריט נגישות",
  aca_card_footer_reset_text: "אִתחוּל",
  aca_footer_statment_link: "הצהרת נגישות",
  aca_dt: "הקטנת גודל גופן",
  aca_it: "הגדל את גודל הגופן",
  aca_gs: "רִוּוּי",
  aca_ic: "הפוך צבעים",
  aca_hl: "הדגש קישורים",
  aca_hh: "הדגש כותרות",
  aca_rs: "קרא את נבחרים",
  aca_rp: "קרא עמוד",
  aca_lh: "גובה קו",
  aca_ls: "ריווח אותיות",
  aca_cc: "סַמָן",
  aca_ta: "יישור טקסט",
  aca_pa: "השהה אנימציה",
  aca_cf: "סוג גופנים",
  aca_hi: "הסתר תמונות",
  aca_ms: "השתקת צלילים",
  aca_tt: "עצות כלים",
  aca_rf: "קרא פוקוס",
  aca_profile_select_span: "פרופיל נגישות",
  aca_visually_impaired_span: "לקוי ראייה",
  aca_blind_span: "סומא",
  aca_adhd_span: "הפרעת קשב וריכוז",
  aca_dyslexia_span: "דיסלקציה",
};

var aca_languages = [
  {
    label: "Custom",
    value: "custom",
    icon: aca_svg.flag_usa,
    data: jsonCUSTOM,
  },
  {
    label: "English (USA)",
    value: "en-us",
    icon: aca_svg.flag_usa,
    data: jsonEN,
  },
  {
    label: "हिंदी (Hindi)",
    value: "hi-in",
    icon: aca_svg.flag_india,
    data: jsonHI,
  },
  {
    label: "English (UK)",
    value: "en-uk",
    icon: aca_svg.flag_uk,
    data: jsonUK,
  },
  {
    label: "Deutsch (German)",
    value: "de-de",
    icon: aca_svg.flag_germany,
    data: jsonDE,
  },
  {
    label: "Danish (Denmark)",
    value: "da-de",
    icon: aca_svg.flag_da,
    data: jsonDA,
  },
  {
    label: "Italiano (Italian)",
    value: "it-it",
    icon: aca_svg.flag_it,
    data: jsonIT,
  },
  {
    label: "日本 (Japanese)",
    value: "ja-ja",
    icon: aca_svg.flag_ja,
    data: jsonJA,
  },
  {
    label: "eesti keel (Estonian)",
    value: "et-et",
    icon: aca_svg.flag_et,
    data: jsonET,
  },
  {
    label: "Lietuvių (Lithuanian)",
    value: "li-li",
    icon: aca_svg.flag_li,
    data: jsonLI,
  },
  {
    label: "latvian (Latviski)",
    value: "la-la",
    icon: aca_svg.flag_la,
    data: jsonLA,
  },
  {
    label: "Việt Nam (Vietnamese)",
    value: "vi-vi",
    icon: aca_svg.flag_vi,
    data: jsonVI,
  },
  {
    label: "한국어 (Korean)",
    value: "ko-ko",
    icon: aca_svg.flag_ko,
    data: jsonKO,
  },
  // {
  //   label: "Taiwanese (Taiwan)",
  //   value: "ta-ta",
  //   icon: aca_svg.flag_ta,
  //   data: jsonTA,
  // },
  {
    label: "Español (Spanish)",
    value: "sp-sp",
    icon: aca_svg.flag_sp,
    data: jsonSP,
  },
  {
    label: "עִברִית (Israel)",
    value: "hb-is",
    icon: aca_svg.flag_hb,
    data: jsonHB,
  },
];

// let speech = new SpeechSynthesisUtterance();
// let speech_running_check = false;
// var onload_flag = true;

const assignData = () => {
  if (
    window.hasOwnProperty("appify_aca_options") &&
    appify_aca_options !== null
  ) {
    let acop = appify_aca_options.options;
    aca_data = {
      position: parseInt(acop.settings.position),
      theme_type: parseInt(acop.theme_setting.theme_type),

      icon_size: acop.settings.icon_size,
      widget_icon_radius: acop.settings.widget_icon_radius,
      widget_icon_relative_position:
        acop.settings.widget_icon_relative_position,

      widget_horizontal_relative_position:
        acop.theme_setting.widget_horizontal_relative_position,
      widget_vertical_relative_position:
        acop.theme_setting.widget_vertical_relative_position,
      widget_radius: acop.theme_setting.widget_radius,

      background_color: acop.color_setting.background_color,
      text_color: acop.color_setting.textColor,
      highlight_header: acop.color_setting.titleColor,
      highlight_link: acop.color_setting.linkColor,
      read_focus_color: acop.color_setting.read_focus_color,
      tooltip_color: acop.color_setting.tooltip_color,

      title: acop.developer_details.title,
      disable: acop.button_text_data.disable,
      version_badge: acop.developer_details.version_badge,
      version: acop.developer_details.version,

      descreas_text: acop.button_text_data.decrease_text,
      increase_text: acop.button_text_data.increase_text,
      grayscale: acop.color_text_data.grayscale,
      invert_colors: acop.color_text_data.invert_colors,
      heightlight_links: acop.color_text_data.highlight_links,
      heightlight_colors: acop.color_text_data.highlight_headers,
      read_selected: acop.speech_text_data.read_selected,
      read_page: acop.speech_text_data.read_page,
      line_height: acop.button_text_data.line_height,
      letter_spacing: acop.button_text_data.letter_spacing,
      curser: acop.image_text_data.curser,
      text_align: acop.button_text_data.text_align,
      pause_animation: acop.image_text_data.pause_animation,
      change_fonts: acop.image_text_data.change_fonts,
      hide_images: acop.image_text_data.hide_images,
      mute_sounds: acop.speech_text_data.mute_sounds,
      tooltip: acop.button_text_data.tooltip,
      read_focus: acop.button_text_data.read_focus,
      selected_text_warning: acop.developer_details.selected_text_warning,

      statment: acop.advanced_setting.statment,
      statment_link_text: acop.advanced_setting.statment_link_text,
      statment_link: acop.advanced_setting.statment_link,
      statment_type: acop.advanced_setting.statment_type || "external", // in-app, external

      developer_badge: acop.advanced_setting.developer_badge,
      developed_by: acop.developer_details.developed_by,
      organization_name: acop.developer_details.organization_name,
      organization_link: acop.developer_details.organization_link,

      custom_css: acop.custom_css,
      default_language:
        acop.default_language !== undefined ? acop.default_language : "en-us",
    };
  }
};
// On load code injection
function myAccessibility() {
  processAccessibilityData();
  assignData();
  fnBrowserDetect();

  const UI = document.createElement("div");
  UI.className = "aca_ui_container";
  UI.innerHTML = aca_widget_icon() + aca_widget_card() + aca_widget_toast();

  document.body.appendChild(UI, document.body.firstChild);
  widget_icon_click();
  aca_widget_style();
  bind_buttons_click();
  set_last_used_options();
  aca_count_badge_display();

  loadFonts();
  aca_pre_lang_selected();
}

const loadFonts = () => {
  const fontFamily =
    "https://fonts.googleapis.com/css2?family=Lobster&family=Montserrat&family=Prompt:wght@100;300;400;500;600;700;900&family=Roboto:wght@100&display=swap";
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = fontFamily;
  document.head.appendChild(link);
};

// Set accessibility options on load based on last usage
function set_last_used_options() {
  const elements = document.body.querySelectorAll(
    "*:not([class*='aca_']):not(img)"
  );

  elements.forEach((element) => {
    if (!isHidden(element)) {
      const style = window.getComputedStyle(element);
      const properties = ["font-size", "line-height", "letter-spacing"];
      properties.forEach((property) => {
        // const propertyValue = parseFloat(style.getPropertyValue(property));
        // if (!element.hasAttribute(`aca-${property}`)) {
        //   element.setAttribute(`aca-${property}`, `${propertyValue}px`);
        // }

        // let propertyValue = 0;
        const propertyValue = style.getPropertyValue(property);
        let floatValue = parseFloat(propertyValue);
        if (property == "letter-spacing" && propertyValue == "normal") {
          floatValue = "0px";
        } else {
          floatValue = parseFloat(propertyValue);
        }

        if (!element.hasAttribute(`aca-${property}`)) {
          element.setAttribute(`aca-${property}`, `${floatValue}px`);
        }
      });
    }
  });

  const localStorageKeys = [
    { key: "dt", type: "aca_dt" },
    { key: "it", type: "aca_it" },
    { key: "gs", type: "aca_gs" },
    { key: "ic", type: "aca_ic" },
    { key: "hl", type: "aca_hl" },
    { key: "hh", type: "aca_hh" },
    { key: "lh", type: "aca_lh" },
    { key: "ls", type: "aca_ls" },
    { key: "cc", type: "aca_cc" },
    { key: "ta", type: "aca_ta" },
    { key: "pa", type: "aca_pa" },
    { key: "cf", type: "aca_cf" },
    { key: "hi", type: "aca_hi" },
    { key: "ms", type: "aca_ms" },
    { key: "tt", type: "aca_tt" },
    { key: "rf", type: "aca_rf" },
    { key: "rs", type: "aca_rs" },
    { key: "rp", type: "aca_rp" },
  ];

  const selectedProfile = localStorage.getItem("aca_profile");
  if (selectedProfile) {
    document.querySelector(`div[type=aca_${selectedProfile}]`)?.click();
    if (selectedProfile === "blind") {
      const indexToRemove = localStorageKeys.findIndex(
        (item) => item.key === "rp"
      );
      localStorageKeys.splice(indexToRemove, 1);
    }
  }

  localStorageKeys.forEach(({ key, type }) => {
    const keyValue = localStorage.getItem(key);
    if (keyValue != null && keyValue > 0) {
      localStorage.setItem(key, parseInt(keyValue) - 1);
      document.querySelector(`div[type=${type}]`).click();
    }
  });
}

// Inject style
const aca_widget_style = () => {
  const styles = `
    :root {
      --aca-text-color: ${aca_data.text_color};
      --aca-background-color: ${aca_data.background_color};
      --aca-icon-size: ${aca_data.icon_size};
      --aca-read-focus-color: ${aca_data.read_focus_color};
      --aca-tooltip-color: ${aca_data.tooltip_color};
      --aca-widget-radius: ${aca_data.widget_radius};
      --aca-widget-icon-radius: ${aca_data.widget_icon_radius};
      --aca-widget-vertical-relative-position: ${aca_data.widget_vertical_relative_position};
      --aca-widget-icon-relative-position: ${aca_data.widget_icon_relative_position};
      --aca-highlight-header: ${aca_data.highlight_header};
      --aca-highlight-link: ${aca_data.highlight_link};
    }
    ${aca_data.custom_css}
    ${aca_css}
  `;
  const appify_aca_style = document.createElement("style");
  appify_aca_style.setAttribute("id", "aca_css");
  appify_aca_style.textContent = styles;
  document.body.appendChild(appify_aca_style);
};

const getLangData = async () => {
  try {
    const dataUrl = "/apps/accessibility/assets/locale/en.json";
    const response = await fetch(dataUrl, {
      headers: new Headers({ "ngrok-skip-browser-warning": "69420" }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return "something went wrong please try again...";
  }
};

async function aca_lang_selected(selectedValue) {
  document.querySelector(".aca-box-loader").style.display = "block";
  document.querySelector(".aca-icon-loader").style.display = "block";
  // Update selected language in local storage and aca_data
  aca_data.default_language = selectedValue;
  localStorage.setItem("aca_lang", selectedValue);

  // const dataUrl = `${domain}/locale/${selectedValue}.json`;
  // const langData = await fetchData(dataUrl);

  // Find the selected language object
  const selectedLang = aca_languages.find((l) => l.value === selectedValue);

  // Update UI elements based on selected language
  const langList = document.querySelectorAll(".aca_svg_check_mark");
  langList.forEach((l) => l.classList.add("DisplayNone"));

  const langSelector = document.querySelector(".aca_lang_selector");
  langSelector.innerHTML = `${selectedLang.icon}
  <span class='aca_lang_select_span'>${selectedLang.label}</span>
  <div id="aca-box-loader" class="aca-box-loader aca-box-loader-2">&nbsp;</div>`;

  // Show the selected language icon
  const selectedLangIcon = document.querySelector(
    `[data-val="${selectedValue}"] .aca_svg_check_mark`
  );
  if (selectedLangIcon) selectedLangIcon.classList.remove("DisplayNone");

  // Update text content of elements based on selected language data
  for (let key in selectedLang.data) {
    const textSpan = document.querySelector(`.${key}`);
    if (textSpan) textSpan.textContent = selectedLang.data[key];
  }

  // Additional logic for special cases
  if (selectedValue === "custom") {
    selectedLang.data = setJsonCUSTOM(aca_data);
    // Update text content of elements with custom data
    for (let key in selectedLang.data) {
      const textSpan = document.querySelector(`.${key}`);
      if (textSpan) textSpan.textContent = selectedLang.data[key];
    }
  }
  document.querySelector(".aca-box-loader").style.display = "none";
  document.querySelector(".aca-icon-loader").style.display = "none";
}

function aca_pre_lang_selected() {
  let lang = localStorage.getItem("aca_lang");
  if (!lang) {
    lang = aca_data.default_language;
    localStorage.setItem("aca_lang", lang);
  }
  aca_lang_selected(lang);
}

function aca_lang_select() {
  const selectedValue = this.getAttribute("data-val");
  aca_lang_selected(selectedValue);

  // Call additional function for language selection click event
  aca_lang_select_click();
}

// Bind click event on buttons
function bind_buttons_click() {
  const buttons = document.querySelectorAll(
    ".aca_card_box, .aca_profile_box, .aca_card_footer_reset_button"
  );
  buttons.forEach((button) =>
    button.addEventListener("click", button_click_functions, false)
  );

  const closeButton = document.querySelector(".aca_card_header_close");
  closeButton.addEventListener("click", () =>
    document.querySelector(".aca_card").classList.add("DisplayNone")
  );

  const langButton = document.querySelector(".aca_lang_select");
  langButton.addEventListener("click", aca_lang_select_click, false);

  const profileButton = document.querySelector(".aca_profile_select");
  profileButton.addEventListener("click", aca_profile_select_click, false);

  const langList = document.querySelectorAll(".aca_lang_list_li");
  langList.forEach((item) => item.addEventListener("click", aca_lang_select));

  if (aca_data.statment_type === "in-app") {
    const statementButton = document.querySelector(".aca_footer_statment_link");
    const statementBackButton = document.querySelector(".aca_statement_back");
    statementButton.addEventListener("click", acaToggleStatementContainer);
    statementBackButton.addEventListener("click", acaToggleStatementContainer);
  }
}

const acaToggleStatementContainer = (event) => {
  event.preventDefault();
  const statementContainer = document.querySelector(".aca_statement_container");
  statementContainer.classList.toggle("DisplayNone");
  document.querySelector(".aca_card_row").classList.toggle("DisplayNone");
  document
    .querySelector(".aca_card_footer_reset")
    .classList.toggle("DisplayNone");
  document.querySelector(".aca_profile_select").classList.toggle("DisplayNone");
};

const isHidden = (e) => {
  const style = window.getComputedStyle(e);
  return style.display === "none" || style.visibility === "hidden";
};

// function for buttons
const button_click_functions = function () {
  const type = this.getAttribute("type");
  // const body_classlist = document.querySelector("HTML").classList.toString();
  const hlStyle = `border-bottom:2px solid ${aca_data.highlight_link}!important;color:${aca_data.highlight_link}!important;`;
  const hhStyle = `background:${aca_data.highlight_header}!important;`;
  const ccStyle = `cursor: url('https://cdn.appifycommerce.com/apps/shopify/aca/assets/images/aca_cursor.svg'), auto !important;`;

  // Mapping of button types to their corresponding functions
  const buttonFunctions = {
    aca_dt: descreas_text,
    aca_it: increase_text,
    aca_gs: grayscale,
    aca_ic: invert_colors,
    aca_hl: () =>
      toggleHighlight(
        this,
        "hl",
        hlStyle,
        "a:not(.aca_developer_link):not(.aca_footer_statment_link)"
      ),
    aca_hh: () =>
      toggleHighlight(
        this,
        "hh",
        hhStyle,
        "h1,h2,h3,h4,h5,h6:not(.aca_developer_link)"
      ),
    aca_rs: read_selected_text,
    aca_rp: read_page_text,
    aca_lh: () => adjustProperty(this, "line-height", "lh"),
    aca_ls: () => adjustProperty(this, "letter-spacing", "ls"),
    aca_cc: () => toggleHighlight(this, "cc", ccStyle, "*"),
    aca_ta: text_align,
    aca_pa: pause_animation,
    aca_cf: change_fonts,
    aca_hi: hide_images,
    aca_ms: mute_sounds,
    aca_tt: tooltip,
    aca_rf: read_focus,
    aca_visually_impaired: aca_visually_impaired,
    aca_blind: aca_blind,
    aca_adhd: aca_adhd,
    aca_dyslexia: aca_dyslexia,
    aca_reset: reset,
  };

  // Execute the corresponding function based on the button type
  const buttonFunction = buttonFunctions[type];
  if (buttonFunction) buttonFunction(this);
};

// Widget icon
const aca_widget_icon = () => {
  const positions = [
    "bottom_right",
    "bottom_left",
    "top_right",
    "top_left",
    "top_center",
    "bottom_center",
    "center_left",
    "center_right",
  ];

  const positionClass = `aca_postion_${positions[aca_data.position]}`;

  return `<div class="aca_position ${positionClass}">
    ${aca_svg.main_icon}
    ${aca_count_badge()}
    <div id="aca-icon-loader" class="aca-icon-loader">&nbsp;</div>
    </div>`;
};

// Selected tools count baadge
const aca_count_badge = () => {
  return `<div class="aca_count_badge"><span class="aca_count_badge_text">0</span></div>`;
};

const aca_count_badge_display = () => {
  const tools = [
    "dt",
    "it",
    "ic",
    "gs",
    "hh",
    "hl",
    "rp",
    "rs",
    "lh",
    "ls",
    "cc",
    "ta",
    "cf",
    "pa",
    "hi",
    "ms",
    "tt",
    "rf",
    "aca-zoom-out",
    "aca-zoom-in",
  ];

  let count = 0;
  tools.forEach((t) => {
    if (parseInt(localStorage.getItem(t)) >= 1) count++;
  });
  const badgeElement = document.querySelector(".aca_count_badge");
  if (count > 0) {
    badgeElement.querySelector("span").innerHTML = count.toString();
    badgeElement.classList.remove("DisplayNone");
  } else {
    badgeElement.classList.add("DisplayNone");
  }
};

// Widget card
const aca_widget_card = () => {
  const positionsWithRightSpace = [0, 2, 4, 5, 7];
  const positionsWithLeftSpace = [1, 3, 6];

  let aca_side_space = "";
  const position = parseInt(aca_data.position);
  if (positionsWithRightSpace.includes(position)) {
    aca_side_space = `right: ${aca_data.widget_horizontal_relative_position};`;
  } else if (positionsWithLeftSpace.includes(position)) {
    aca_side_space = `left: ${aca_data.widget_horizontal_relative_position};`;
  } else {
    aca_side_space = "right: 0;";
  }

  const cardColumns = [
    "aca_card_one_column",
    "aca_card_two_column",
    "aca_card_three_column",
  ];
  const cardClass = `aca_card DisplayNone ${
    cardColumns[aca_data.theme_type]
  } aca_scrollbar2`;

  return `
    <div class="${cardClass}" style="${aca_side_space}">
      ${aca_card_header()}
      ${aca_card_language()}
      ${aca_card_profiles()}
      ${aca_card_row()}
      ${acaStatmentContainer()}
      ${aca_card_footer()}
    </div>`;
};

// Widget card header
const aca_card_header = () => {
  const isVersionBadge = aca_data.version_badge ? "" : "DisplayNone";
  return `
    <div class="aca_card_header">
      <div class="aca_card_header_title">
        <span class="aca_card_header_title_span">${aca_data.title}</span>
        <sup class="aca_version ${isVersionBadge}">${file_version}</sup>
      </div>
      <div class="aca_card_header_close">${aca_svg.header_close}</div>
    </div>
  `;
};

const aca_card_language = () => {
  const list = (lang) => `
    <li class='aca_lang_list_li' data-val='${lang.value}'>
      <span class='aca_lang_list_li_span'>
        ${lang.icon}
        <span class='aca_lang_select_span'>${lang.label}</span>
      </span>
      ${aca_svg.check_mark}
    </li>`;

  const langList = aca_languages.map((lang) => list(lang)).join("");
  const settings = `
    <div class='aca_settings'>
      <div class='aca_lang_list DisplayNone'>
        <ul class='aca_lang_list_ul'>${langList}</ul>
      </div>
    </div>`;

  return `
    <div class='aca_lang_select'>
      <div class='aca_lang_selector'>
        ${aca_svg.flag_usa}<span class='aca_lang_select_span'>English (USA)</span>
        <div id="aca-box-loader" class="aca-box-loader">&nbsp;</div>
      </div>
      <div class='aca_lang_select_arrow'>${aca_svg.arrow_left}</div>
    </div>
    ${settings}`;
};

const aca_card_profiles = () => {
  const profiles = [
    {
      icon: aca_svg.visually_impaired,
      label: "Visually-impaired",
      className: "aca_visually_impaired",
    },
    { icon: aca_svg.blind, label: "Blind", className: "aca_blind" },
    { icon: aca_svg.adhd, label: "ADHD", className: "aca_adhd" },
    { icon: aca_svg.dyslexia, label: "Dyslexia", className: "aca_dyslexia" },
  ];
  const profileBoxes = profiles
    .map((profile) =>
      aca_card_profile_box(profile.icon, profile.label, profile.className)
    )
    .join("");

  const profilesList = `
    <div class='aca_profiles DisplayNone'>
      <div class='aca_profile_row'>${profileBoxes}</div>
    </div>`;

  return `
    <div class='aca_profile_select'>
      <div class='aca_profile_selector'>
        ${aca_svg.main_icon}
        <span class='aca_profile_select_span'>Accessibility Profiles</span>
        <sup class='aca_profile_active_badge DisplayNone'>None</sup>
      </div>
      <div class='aca_profile_select_arrow'>${aca_svg.arrow_left}</div>
    </div>
    ${profilesList}`;
};

const aca_card_profile_box = (icon, title, type) => {
  const className =
    "aca_profile_box aca_profile_box_left aca_profile_box_two_column";
  return `
    <div class="${className}" type="${type}">
      ${icon}
      <span class="${type}_span">${title}</span>
      <div class="aca_profile_box_selected DisplayNone">${aca_svg.check_mark2}</div>
    </div>`;
};

const aca_active_profile_badge_update = (profile) => {
  localStorage.setItem("aca_profile", profile);
  // const selectedLangValue = localStorage.getItem("aca_lang");
  let lang = localStorage.getItem("aca_lang");
  if (!lang) {
    lang = aca_data.default_language;
    localStorage.setItem("aca_lang", lang);
  }
  const selectedLang = aca_languages.find((l) => l.value === lang);
  if (lang == "custom") selectedLang.data = setJsonCUSTOM(aca_data);
  const activeBadge = document.querySelector(".aca_profile_active_badge");
  activeBadge.classList.remove("DisplayNone");
  activeBadge.textContent = selectedLang.data[`aca_${profile}_span`];
};

const acaHandleProfile = ($this, profile, toolsList) => {
  const isSelected = $this.querySelector(".aca_profile_box_selected");

  if (isSelected.classList.contains("DisplayNone")) {
    reset();
    isSelected.classList.remove("DisplayNone");
    $this.style.opacity = 1;
    aca_active_profile_badge_update(profile);

    toolsList.forEach((setting) => {
      localStorage.setItem(setting.key, setting.value);
      document.querySelector(setting.selector).click();
    });
  } else {
    acaResetProfile(toolsList);
  }
};

const aca_visually_impaired = ($this) => {
  // Settings to be toggled
  const tools = [
    { key: "it", selector: "div[type=aca_it]", value: 0 }, // Increase font size
    { key: "pa", selector: "div[type=aca_pa]", value: 0 }, // Pause animation
    { key: "cf", selector: "div[type=aca_cf]", value: 0 }, // Change fonts family type
    { key: "gs", selector: "div[type=aca_gs]", value: 1 }, // Saturation
    { key: "cc", selector: "div[type=aca_cc]", value: 0 }, // Change cursor type
    { key: "tt", selector: "div[type=aca_tt]", value: 0 }, // Tooltips
  ];
  acaHandleProfile($this, "visually_impaired", tools);
};

const aca_blind = ($this) => {
  const tools = [
    { key: "rp", selector: "div[type=aca_rp]", value: 0 }, // Read page
  ];
  acaHandleProfile($this, "blind", tools);
};

function aca_adhd($this) {
  // Settings to be toggled
  const tools = [
    { key: "pa", selector: "div[type=aca_pa]", value: 0 }, // Increase font size
    { key: "rf", selector: "div[type=aca_rf]", value: 1 }, // Pause animation
    { key: "gs", selector: "div[type=aca_gs]", value: 1 }, // Saturation
  ];
  acaHandleProfile($this, "adhd", tools);
}

function aca_dyslexia($this) {
  // Settings to be toggled
  const tools = [
    { key: "pa", selector: "div[type=aca_pa]", value: 0 }, // Increase font size
    { key: "cf", selector: "div[type=aca_cf]", value: 0 }, // Pause animation
  ];
  acaHandleProfile($this, "dyslexia", tools);
}

const acaResetProfile = (toolsList) => {
  toolsList.forEach((setting) => {
    localStorage.setItem(setting.key, -1);
    document.querySelector(setting.selector).click();
  });

  const profileCheck = document.querySelectorAll(".aca_profile_box_selected");
  profileCheck.forEach((profile) => profile.classList.add("DisplayNone"));

  const activeProfiles = document.querySelectorAll(".aca_profile_box");
  activeProfiles.forEach((profile) => (profile.style.opacity = 0.9));

  const profileBadge = document.querySelector(".aca_profile_active_badge");
  profileBadge.classList.add("DisplayNone");
  localStorage.removeItem("aca_profile");
};

// Widget card footer
function aca_card_footer() {
  const {
    developer_badge,
    statment,
    statment_link,
    statment_link_text,
    organization_link,
    developed_by,
    organization_name,
    disable,
  } = aca_data;

  const disableButtonStyle = !developer_badge ? `style="width:100%;"` : ``;

  const statmentLink = statment
    ? `<div class="aca_footer_link">
        <a class="aca_footer_statment_link" href="${statment_link}" target="_blank">${statment_link_text}</a>
      </div>`
    : "";

  const developerBadge = developer_badge
    ? `<a class="aca_developer_link" href="${organization_link}" target="blank">${developed_by}<br class="aca-line-break"/>${organization_name}</a>`
    : "";

  const resetButton = `
  <div class="aca_card_footer_reset">
    <div class="aca_card_footer_reset_button" type="aca_reset" ${disableButtonStyle}>
      ${aca_svg.footer_disable}
      <div class="aca_card_footer_reset_text">${disable}</div>
    </div>
    ${developerBadge}
  </div>`;

  return `${resetButton} ${statmentLink}`;
}

// Widget card row
function aca_card_row() {
  const cardData = [
    {
      icon: aca_svg.descreas_text,
      data: aca_data.descreas_text,
      className: "aca_dt",
      alignment: "left",
    },
    {
      icon: aca_svg.increase_text,
      data: aca_data.increase_text,
      className: "aca_it",
      alignment: "right",
    },
    {
      icon: aca_svg.grayscale,
      data: aca_data.grayscale,
      className: "aca_gs",
      alignment: "left",
    },
    {
      icon: aca_svg.invert_colors,
      data: aca_data.invert_colors,
      className: "aca_ic",
      alignment: "right",
    },
    {
      icon: aca_svg.heightlight_links,
      data: aca_data.heightlight_links,
      className: "aca_hl",
      alignment: "left",
    },
    {
      icon: aca_svg.heightlight_colors,
      data: aca_data.heightlight_colors,
      className: "aca_hh",
      alignment: "right",
    },
    {
      icon: aca_svg.read_selected,
      data: aca_data.read_selected,
      className: "aca_rs",
      alignment: "left",
    },
    {
      icon: aca_svg.read_page,
      data: aca_data.read_page,
      className: "aca_rp",
      alignment: "right",
    },
    {
      icon: aca_svg.line_height,
      data: aca_data.line_height,
      className: "aca_lh",
      alignment: "left",
    },
    {
      icon: aca_svg.letter_spacing,
      data: aca_data.letter_spacing,
      className: "aca_ls",
      alignment: "right",
    },
    {
      icon: aca_svg.curser,
      data: aca_data.curser,
      className: "aca_cc",
      alignment: "left",
    },
    {
      icon: aca_svg.text_align,
      data: aca_data.text_align,
      className: "aca_ta",
      alignment: "right",
    },
    {
      icon: aca_svg.pause_animation,
      data: aca_data.pause_animation,
      className: "aca_pa",
      alignment: "left",
    },
    {
      icon: aca_svg.change_fonts,
      data: aca_data.change_fonts,
      className: "aca_cf",
      alignment: "right",
    },
    {
      icon: aca_svg.hide_images,
      data: aca_data.hide_images,
      className: "aca_hi",
      alignment: "left",
    },
    {
      icon: aca_svg.mute_sounds,
      data: aca_data.mute_sounds,
      className: "aca_ms",
      alignment: "right",
    },
    {
      icon: aca_svg.tooltip,
      data: aca_data.tooltip,
      className: "aca_tt",
      alignment: "left",
    },
    {
      icon: aca_svg.read_focus,
      data: aca_data.read_focus,
      className: "aca_rf",
      alignment: "right",
    },
  ];

  const cardBoxes = cardData
    .map((card) =>
      aca_card_box(card.icon, card.data, card.className, card.alignment)
    )
    .join("");

  return `<div class="aca_card_row">${cardBoxes}</div>`;
}

const acaStatmentContainer = () => {
  return `
    <div class="aca_statement_container DisplayNone">
      <div class="aca_statement_header">
      <div class="aca_statement_back">${aca_svg.back} Back</div>
        <div class="aca_statement_title">Accessibility Statement</div>
      </div>
    <div class="aca_statement_body aca_scrollbar">
      <p>
        We understand the importance of accessibility for all of our customers, including those with disabilities. While our website may not currently meet the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, we are actively working towards compliance and constantly seeking ways to improve the user experience for all of our customers.
      </p>
      <p>
        To that end, we have implemented a variety of accessibility tools provided by third-party app, AppifyCommerce. These tools include features such as keyboard navigation, high contrast mode, font resizing, and alternative text for images read focus, various cursor sizes. We have also incorporated tools to help with visual impairments, such as screen readers and text-to-speech functionality.
      </p>
      <p>
        In addition to these technical solutions, we have also made a commitment to providing clear and easy-to-understand information on our website. This includes using simple and straightforward language, providing alternative text for images and videos, and including clear and detailed product descriptions.
      </p>
      <p>
        We understand that accessibility is an ongoing effort and that there may be areas of our website that are not fully accessible. If you have any difficulty accessing our website or have any suggestions for improvements, please contact us at [email or phone number]. We will make every effort to respond to your request as soon as possible and work towards resolving any issues you may have encountered.
      </p>
      <p>
        We also strive to provide equal access to our products and services, including our online store and customer service channels. So, we are always open to feedback, suggestions, and ideas on how we can continue to improve accessibility on our website and in all aspects of our business.
      </p>
      <p>
        Our ultimate goal is to ensure that all of our customers, regardless of ability, have a positive and seamless experience when visiting our website and purchasing from our store. Thank you for visiting our store and for your patience as we continue to work towards full compliance with the WCAG guidelines.
      </p>
      </div>
      <a class="aca_developer_link" href="https://appifycommerce.com/" target="blank">Developed by<br class="aca-line-break" aca-font-size="12px" aca-line-height="14px" aca-letter-spacing="0pxpx">AppifyCommerce</a>
    </div>`;
};

// Widget card box
const aca_card_box = (icon, text, type, position) => {
  const column = ["one", "two", "three"];
  const classList = `aca_card_box aca_card_box_${position} aca_card_box_${
    column[aca_data.theme_type]
  }_column`;
  return `
    <div class="${classList}" type="${type}">
      ${icon}
      <div id="aca-box-loader" class="aca-box-loader">&nbsp;</div>
      <div class="aca_card_box_text ${type}">${text}</div>
      <div class="aca_card_box_steps DisplayNone"></div>
      <div class="aca_card_box_steps_count DisplayNone">info</div>
    </div>`;
};

const aca_card_box_steps_add = (steps) => {
  const stepsUI = [];
  for (let index = 0; index < steps; index++) {
    stepsUI.push('<div class="aca_card_box_steps_sub"></div>');
  }
  return stepsUI.join("");
};

const aca_widget_toast = () => {
  return `
    <div id="aca_toast" class="DisplayNone">
      <div id="aca_toast_close">${aca_svg.header_close}</div>
      <div id="aca_toast_message"></div>
    </div>
  `;
};

// Widget icon click to show & hide card
const widget_icon_click = () => {
  const card = document.querySelector(".aca_card");
  const position = document.querySelector(`.aca_position`);

  position.addEventListener("click", () =>
    card.classList.toggle("DisplayNone")
  );

  window.addEventListener("click", function (e) {
    const target = e.target;
    const isIcon =
      target.classList.contains("aca_svg_text_align") ||
      target.classList.contains("aca_svg_check_mark") ||
      target.classList.contains("aca_svg_text_align_path");

    const isTextOrLang =
      target.classList.contains("aca_card_box_text") ||
      target.classList.contains("aca_lang_select_span");

    const isAcaDiv = position.contains(e.target);
    if (!isAcaDiv && !card.contains(target) && !isIcon && !isTextOrLang) {
      card.classList.add("DisplayNone");
    }
  });
};

// Define loader object outside of the function
const acaLoader = {
  show: ($this) => {
    $this.querySelector("#aca-box-loader").style.display = "block";
    $this.querySelector(".aca_card_box_text").style.opacity = 0.5;
    $this.querySelector('[class^="aca_svg_"]').style.opacity = 0.5;
    $this.querySelector(".aca_card_box_steps_count").style.opacity = 0.5;
  },
  hide: ($this) => {
    $this.querySelector("#aca-box-loader").style.display = "none";
    $this.querySelector(".aca_card_box_text").style.opacity = 1;
    $this.querySelector('[class^="aca_svg_"]').style.opacity = 1;
    $this.querySelector(".aca_card_box_steps_count").style.opacity = 1;
    aca_count_badge_display();
  },
};

const aca_card_box_steps_count_click = ($this, text, show) => {
  const countBadge = $this.querySelector(".aca_card_box_steps_count");
  countBadge.textContent = text;
  countBadge.classList.toggle("DisplayNone", !show);
};

const aca_lang_select_click = () => {
  const langList = document.querySelector(".aca_lang_list");
  const langSelectArrow = document.querySelector(".aca_lang_select_arrow");
  langList.classList.toggle("DisplayNone");
  langSelectArrow.classList.toggle("aca_arrow_down");
};

const aca_profile_select_click = () => {
  const profiles = document.querySelector(".aca_profiles");
  const arrow = document.querySelector(".aca_profile_select_arrow");
  profiles.classList.toggle("DisplayNone");
  arrow.classList.toggle("aca_arrow_down");
};

// Descrease text size click event
const descreas_text = ($this) => {
  if (parseFloat(localStorage.getItem("it")) > 0) {
    localStorage.setItem("it", 3);
    document.querySelector("div[type=aca_it]").click();
  }
  adjustProperty($this, "font-size", "dt", "-");
  return;
  acaLoader.show($this);

  if (parseFloat(localStorage.getItem("aca-zoom-in")) > 0) {
    localStorage.setItem("aca-zoom-in", 3);
    document.querySelector("div[type=aca_it]").click();
  }

  /*
    0 = OFF, 
    1 = -2px font, 
    2 = -4px font, 
    3 = -6px font 
  */

  const localStorageKey = "aca-zoom-out";
  let keyValue = parseInt(localStorage.getItem(localStorageKey)) || 0;

  if (keyValue >= 3) {
    keyValue = 0;
  } else {
    keyValue++;
  }
  localStorage.setItem(localStorageKey, keyValue);

  if (keyValue > 0) {
    $this.classList.add("aca_selected_box");
    aca_card_box_steps_count_click($this, `${keyValue * 10}%`, true);
    document.body.style.transition = "all 0s ease 0s;";
    document.body.style.zoom = `${1 - keyValue / 10}`;
  } else {
    $this.classList.remove("aca_selected_box");
    aca_card_box_steps_count_click($this, null, false);
    document.body.style.transition = "";
    document.body.style.zoom = "";
  }
  aca_count_badge_display();
  acaLoader.hide($this);
};

// Descrease text size click event
const increase_text = ($this) => {
  if (parseFloat(localStorage.getItem("dt")) > 0) {
    localStorage.setItem("dt", 3);
    document.querySelector("div[type=aca_dt]").click();
  }
  adjustProperty($this, "font-size", "it");
  return;
  acaLoader.show($this);

  if (parseFloat(localStorage.getItem("aca-zoom-out")) > 0) {
    localStorage.setItem("aca-zoom-out", 3);
    document.querySelector("div[type=aca_dt]").click();
  }

  /*
    0 = OFF, 
    1 = -2px font, 
    2 = -4px font, 
    3 = -6px font 
  */

  const localStorageKey = "aca-zoom-in";
  let lit = parseInt(localStorage.getItem(localStorageKey)) || 0;
  let it = lit >= 3 ? 0 : lit + 1;

  localStorage.setItem(localStorageKey, it);

  if (it > 0) {
    $this.classList.add("aca_selected_box");
    aca_card_box_steps_count_click($this, `${it * 10}%`, true);
    document.body.style.transition = "all 0s ease 0s;";
    document.body.style.zoom = `${1 + it / 10}`;

    if ($this.classList.contains("aca_card")) {
      document.body.style.transition = "all 0s ease 0s;";
      document.body.style.zoom = "1";
    }
  } else {
    $this.classList.remove("aca_selected_box");
    aca_card_box_steps_count_click($this, null, false);
    document.body.style.transition = "";
    document.body.style.zoom = "";
  }
  aca_count_badge_display();
  acaLoader.hide($this);
};

// Grayscale click event
const grayscale = ($this) => {
  acaLoader.show($this);
  const lgs = parseInt(localStorage.getItem("gs")) || 0;
  let gs = lgs >= 3 ? 0 : lgs + 1;

  const countBadge = $this.querySelector(".aca_card_box_steps_count");
  const steps = $this.querySelector(".aca_card_box_steps");
  steps.innerHTML = aca_card_box_steps_add(3);

  switch (gs) {
    case 1:
      updateGrayscale($this, 1, "Low saturation", 0.5, countBadge, steps);
      break;

    case 2:
      updateGrayscale($this, 2, "High saturation", 3, countBadge, steps);
      break;

    case 3:
      updateGrayscale($this, 3, "Grayscale", 0, countBadge, steps);
      break;

    case 0:
    default:
      removeGrayscale($this, countBadge, steps);
      break;
  }

  // aca_count_badge_display();
  acaLoader.hide($this);
};

const removeGrayscale = ($this, countBadge, steps) => {
  $this.classList.remove("aca_selected_box");
  localStorage.setItem("gs", 0);
  countBadge.classList.add("DisplayNone");
  steps.classList.add("DisplayNone");
  document.querySelector("HTML").style.removeProperty("filter");
};

const updateGrayscale = (
  $this,
  value,
  badgeText,
  filterValue,
  countBadge,
  steps
) => {
  $this.classList.add("aca_selected_box");
  localStorage.setItem("gs", value);
  countBadge.innerHTML = badgeText;
  countBadge.classList.remove("DisplayNone");
  steps.classList.remove("DisplayNone");
  document.querySelector("HTML").style.filter = `saturate(${filterValue})`;
  const subSteps = steps.querySelectorAll(".aca_card_box_steps_sub");
  subSteps[value - 1].style.opacity = 1;
};

// Invert colors click event
const invert_colors = ($this) => {
  acaLoader.show($this);
  const lic = parseInt(localStorage.getItem("ic")) || 0;
  const ic = lic >= 1 ? 0 : lic + 1;
  localStorage.setItem("ic", ic);
  if (ic === 1) {
    document.querySelector("HTML").classList.add("invertcolor");
    $this.classList.add("aca_selected_box");
  } else {
    document.querySelector("HTML").classList.remove("invertcolor");
    $this.classList.remove("aca_selected_box");
  }
  // aca_count_badge_display();
  acaLoader.hide($this);
};

const reading = {
  start: (selection) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "en-US"; // Adjust the language if needed
    utterance.text = selection;
    speechSynthesis.speak(utterance);
  },
  startSelected: (event) => {
    if (!event) {
      const selection = getSelection()?.toString().trim();
      if (selection.length > 0) reading.start(selection);
      return;
    }
    const target = event.target;
    // Check if the target element is an SVG or has an SVG ancestor
    if (target.tagName.toLowerCase() === "svg" || target.closest("svg")) return; // If target is SVG or has SVG ancestor, do nothing

    const targetClassList = event.target.classList;
    const acaDivs = Array.from(targetClassList).some((className) =>
      className.includes("aca_")
    );
    if (!acaDivs) {
      const selection = getSelection()?.toString().trim();
      if (selection.length > 0) reading.start(selection);
    }
  },
  startPage: () => {
    const selection = document.documentElement.innerText.trim();

    reading.start(selection);
  },
};

// Read selected text click event
const read_selected_text = ($this) => {
  if (parseFloat(localStorage.getItem("rp")) > 0) {
    localStorage.setItem("rp", -1);
    document.querySelector("div[type=aca_rp]").click();
  }

  acaLoader.show($this);
  const lrs = parseInt(localStorage.getItem("rs")) || 0;
  const rs = lrs >= 1 ? 0 : lrs + 1;
  localStorage.setItem("rs", rs);
  $this.classList.toggle("aca_selected_box", rs > 0);

  if (rs > 0) {
    aca_toast(aca_data.selected_text_warning);
    reading.startSelected();
    document.addEventListener("mouseup", reading.startSelected);
  } else {
    document.removeEventListener("mouseup", reading.startSelected);
    speechSynthesis.cancel();
  }

  acaLoader.hide($this);
};

// Read page click event
const read_page_text = ($this) => {
  if (parseFloat(localStorage.getItem("rs")) > 0) {
    localStorage.setItem("rs", -1);
    document.querySelector("div[type=aca_rs]").click();
  }

  acaLoader.show($this);
  const lrp = parseInt(localStorage.getItem("rp")) || 0;
  const rp = lrp >= 1 ? 0 : lrp + 1;
  localStorage.setItem("rp", rp);
  $this.classList.toggle("aca_selected_box", rp > 0);

  if (rp > 0) {
    reading.startPage();

    const playButtons = `
      <div class="acc_card_read_buttons">
        <div class="acc_card_play_button">${aca_svg.play}</div>
        <div class="acc_card_pause_button">${aca_svg.pause}</div>
        <div class="acc_card_cancle_button">${aca_svg.cancle}</div>
      </div>`;

    $this.insertAdjacentHTML("beforeend", playButtons);

    const playButton = $this.querySelector(".acc_card_play_button");
    const pauseButton = $this.querySelector(".acc_card_pause_button");
    const cancelButton = $this.querySelector(".acc_card_cancle_button");
    playButton.style.display = "none";

    const togglePause = (event) => {
      reading.startPage();
      localStorage.setItem("aca-reading-pause", "true");
      if (event && event.stopPropagation) event.stopPropagation();
      speechSynthesis.pause();
      playButton.style.display = "";
      pauseButton.style.display = "none";
    };

    const togglePlay = (event) => {
      reading.startPage();
      localStorage.removeItem("aca-reading-pause");
      if (event && event.stopPropagation) event.stopPropagation();
      speechSynthesis.resume();
      playButton.style.display = "none";
      pauseButton.style.display = "";
    };

    const cancelSpeech = () => {
      speechSynthesis.cancel();
      localStorage.removeItem("aca-reading-pause");
    };

    if (pauseButton) pauseButton.addEventListener("click", togglePause);
    if (playButton) playButton.addEventListener("click", togglePlay);
    if (cancelButton) cancelButton.addEventListener("click", cancelSpeech);
    if (localStorage.getItem("aca-reading-pause") == "true") togglePause();
    else togglePlay();

    if (localStorage.getItem("aca_profile") === "blind")
      window.onload = () => togglePause();
  } else {
    const readButtons = document.querySelector(".acc_card_read_buttons");
    if (readButtons) readButtons.remove();
    speechSynthesis.cancel();
    localStorage.removeItem("aca-reading-pause");
  }

  acaLoader.hide($this);
};

// Generic function to handle adjustments
const adjustProperty = ($this, property, storageKey, mathOparation = "+") => {
  acaLoader.show($this);
  const currentValue = parseInt(localStorage.getItem(storageKey)) || 0;
  const newValue = currentValue >= 3 ? 0 : currentValue + 1;
  localStorage.setItem(storageKey, newValue);
  $this.classList.toggle("aca_selected_box", newValue > 0);

  if (newValue > 0) {
    aca_card_box_steps_count_click(
      $this,
      `${mathOparation}${2 * newValue}px`,
      true
    );
  } else {
    aca_card_box_steps_count_click($this, null, false);
  }

  if (newValue > 0) {
    const elements = document.body.querySelectorAll("*:not([class*='aca_'])");
    elements.forEach((element) => {
      if (
        !isHidden(element) &&
        element.tagName !== "IMG" &&
        element !== document.body
      ) {
        const style = element.hasAttribute(`aca-${property}`)
          ? element.getAttribute(`aca-${property}`)
          : window.getComputedStyle(element, null).getPropertyValue(property);
        const propertyValue = parseFloat(style);
        const newPropertyValue =
          mathOparation == "+"
            ? propertyValue + newValue * 2
            : propertyValue - newValue * 2;

        element.style[property] = `${newPropertyValue}px`;
        if (!element.hasAttribute(`aca-${property}`)) {
          element.setAttribute(`aca-${property}`, `${propertyValue}px`);
        }
        // }
      }
    });
  } else {
    const elements = document.body.querySelectorAll("*");
    elements.forEach((element) => {
      element.style[property] = "";
      // if (element.hasAttribute(`aca-${property}`) && property !== "font-size") {
      //   element.removeAttribute(`aca-${property}`);
      // }
    });
  }
  acaLoader.hide($this);
};

// Toggle highlighting based on localStorage key and style
const toggleHighlight = ($this, localStorageKey, style, selector) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem(localStorageKey)) || 0;
  const value = lValue >= 1 ? 0 : lValue + 1;
  localStorage.setItem(localStorageKey, value);
  $this.classList.toggle("aca_selected_box", value > 0);

  if (value === 1) {
    const acaHighLightStyle = document.createElement("style");
    acaHighLightStyle.setAttribute("id", `aca_${localStorageKey}_style`);
    acaHighLightStyle.innerHTML = `${selector}{${style}}`;
    document.body.appendChild(acaHighLightStyle, document.body.lastChild);
  } else {
    document.querySelector(`#aca_${localStorageKey}_style`)?.remove();
  }
  acaLoader.hide($this);
};

// Text align click event
const text_align = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("ta")) || 0;
  const value = lValue >= 4 ? 0 : lValue + 1;
  localStorage.setItem("ta", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  const alignValue = ["Left", "Right", "Center", "Justify"];
  const alignSvg = [
    aca_svg.text_align,
    aca_svg.text_align_right,
    aca_svg.text_align_center,
    aca_svg.text_align_justify,
  ];

  if (value > 0) {
    aca_card_box_steps_count_click($this, alignValue[value - 1], true);
    $this.querySelector(".aca_svg_text_align").remove();
    $this.innerHTML = alignSvg[value - 1] + $this.innerHTML;
  } else {
    aca_card_box_steps_count_click($this, null, false);
  }

  const elements = document.body.querySelectorAll(
    "*:not([class*='aca_']):not(img)"
    // "*"
  );
  const property = "text-align";
  elements.forEach((element) => {
    if (!isHidden(element) && element.tagName !== "IMG") {
      const propertyValue = element.hasAttribute(`aca-${property}`)
        ? element.getAttribute(`aca-${property}`)
        : window.getComputedStyle(element, null).getPropertyValue(property);

      if (value > 4 || value === 0) {
        element.style[property] = "";
        if (element.hasAttribute(`aca-${property}`)) {
          element.removeAttribute(`aca-${property}`);
        }
      } else {
        element.style[property] = alignValue[value - 1];
        if (!element.hasAttribute(`aca-${property}`)) {
          element.setAttribute(`aca-${property}`, propertyValue);
        }
      }
    }
  });

  // aca_count_badge_display();
  acaLoader.hide($this);
};

// Pause animation click event
const pause_animation = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("pa")) || 0;
  const value = lValue >= 1 ? 0 : lValue + 1;
  localStorage.setItem("pa", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  const className = "aca-pause-animation";
  const elements = document.body.querySelectorAll("*:not([class*='aca_'])");

  if (value > 0) {
    elements.forEach((element) => element.classList.add(className));
    // $this.classList.add("aca_selected_box");
  } else {
    elements.forEach((element) => element.classList.remove(className));
    // $this.classList.remove("aca_selected_box");
  }

  // aca_count_badge_display();
  acaLoader.hide($this);
};

// Change fonts click event
const change_fonts = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("cf")) || 0;
  const value = lValue >= 4 ? 0 : lValue + 1;
  localStorage.setItem("cf", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  const fontNames = [
    "Dyslexia",
    "Times New Romen",
    "Arial, serif",
    "Helvetica",
  ];

  if (value > 0) {
    // $this.classList.add("aca_selected_box");
    aca_card_box_steps_count_click($this, fontNames[value - 1], true);
    if (value === 1) {
      const url =
        "url('https://cdn.appifycommerce.com/apps/shopify/aca/assets/fonts/OpenDyslexic3-Bold.ttf')";
      const dyslexiaFont = new FontFace("aca Dyslexia", url, {});
      dyslexiaFont.load().then((font) => document.fonts.add(font));
      fontNames[value - 1] = `aca ${fontNames[value - 1]}`;
    }
  } else {
    // $this.classList.remove("aca_selected_box");
    aca_card_box_steps_count_click($this, null, false);
  }

  const elements = document.body.querySelectorAll(
    "*:not([class*='aca_']):not(img)"
    // "*:not(img)"
  );
  const property = "font-family";
  elements.forEach((element) => {
    if (!isHidden(element) && element.tagName !== "IMG") {
      const propertyValue = element.hasAttribute(`aca-${property}`)
        ? element.getAttribute(`aca-${property}`)
        : window.getComputedStyle(element, null).getPropertyValue(property);

      if (value > 4 || value === 0) {
        element.style[property] = "";
        if (element.hasAttribute(`aca-${property}`)) {
          element.removeAttribute(`aca-${property}`);
        }
      } else {
        // if (value === 1) {
        //   fontNames[value - 1] = `aca ${fontNames[value - 1]}`;
        // }
        element.style[property] = fontNames[value - 1];
        if (!element.hasAttribute(`aca-${property}`)) {
          element.setAttribute(`aca-${property}`, propertyValue);
        }
      }
    }
  });

  acaLoader.hide($this);
};

// Change cursor click event
const mute_sounds = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("ms")) || 0;
  const value = lValue >= 1 ? 0 : lValue + 1;
  localStorage.setItem("ms", value);
  $this.classList.toggle("aca_selected_box", value > 0);
  if (value > 0) {
    const elements = document.querySelectorAll("video, audio");
    elements.forEach((element) => {
      element.muted = true;
      element.pause();
    });
  }

  // Mute or unmute YouTube videos
  muteUnmuteYouTubeVideos(value > 0);
  acaLoader.hide($this);
};

// Function to mute or unmute all YouTube videos on the page
function muteUnmuteYouTubeVideos(mute) {
  // Get all iframes on the page
  const iframes = document.getElementsByTagName("iframe");

  // Iterate through each iframe
  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes[i];

    // Check if the iframe is from YouTube
    if (iframe.src && iframe.src.includes("youtube.com")) {
      // Send message to iframe to mute or unmute
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: mute ? "mute" : "unMute" }),
        "*"
      );
      // Check if video is muted, and if not, mute it
      const videoElement = iframe.closest("video");
      if (videoElement && !videoElement.muted) {
        videoElement.muted = true;
      }
    }
  }
}

// Hide images click event
const hide_images = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("hi")) || 0;
  const value = lValue >= 1 ? 0 : lValue + 1;
  localStorage.setItem("hi", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  if (value > 0) {
    const elements = document.querySelectorAll(
      "*:not([class*='aca_']):not(.aca_lang_list_li_span svg):not(.aca_lang_selector svg):not(.aca_profile_row svg)"
    );
    elements.forEach((e) => {
      e.classList.add("aca-remove-background");
      if (
        e.tagName.toLowerCase() === "img" ||
        e.tagName.toLowerCase() === "svg"
      )
        e.classList.add("aca-hide-images");
    });
  } else {
    const elements = document.querySelectorAll("*");
    elements.forEach((e) => {
      e.classList.remove("aca-remove-background", "aca-hide-images");
    });
  }
  acaLoader.hide($this);
};

// Change cursor click event
const tooltip = ($this) => {
  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("tt")) || 0;
  const value = lValue >= 1 ? 0 : lValue + 1;
  localStorage.setItem("tt", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  if (value > 0) {
    const elements = document.body.querySelectorAll("img");
    elements.forEach((e) => {
      let tooltipUI = document.createElement("div");
      tooltipUI.setAttribute("class", "aca_tooltip");
      tooltipUI.innerHTML = e.alt || e.src?.split("/").pop();
      e.after(tooltipUI);
    });
  } else {
    const elements = document.querySelectorAll(".aca_tooltip");
    elements.forEach((e) => e.remove());
  }
  acaLoader.hide($this);
};

// Reading lines
function read_focus($this) {
  // Reading mask event
  const aca_read_mask_mousemove = (event) => {
    const topOverlay = document.querySelector("#aca_read_mask_top");
    const bottomOverlay = document.querySelector("#aca_read_mask_bottom");

    if (!topOverlay || !bottomOverlay) return;

    const topOverlayHeight = event.clientY - 40; // Get Mouse Y
    const bottomOverlayHeight = window.innerHeight - topOverlayHeight - 100;

    topOverlay.style.minHeight = `${topOverlayHeight}px`;
    bottomOverlay.style.minHeight = `${bottomOverlayHeight}px`;
  };

  // Reading mask
  const aca_read_mask = () => {
    //Top overlay
    const readMaskTop = document.createElement("div");
    readMaskTop.id = "aca_read_mask_top";
    readMaskTop.className = "aca_read_mask_top";
    readMaskTop.innerHTML = `<div class="aca_read_mask_top_sub"></div>`;
    document.body.appendChild(readMaskTop);

    //Bottom overlay
    const readMaskBottom = document.createElement("div");
    readMaskBottom.id = "aca_read_mask_bottom";
    readMaskBottom.className = "aca_read_mask_bottom";
    readMaskBottom.innerHTML = `<div class="aca_read_mask_bottom_sub"></div>`;
    document.body.appendChild(readMaskBottom);

    //Masking event
    document.addEventListener("mousemove", aca_read_mask_mousemove, false);
  };

  //Read focus line event
  const aca_read_focus_arraow_mousemove = (event) => {
    const readFocus = document.querySelector("#aca_read_focus");
    const focusArrow = document.querySelector(".aca_read_focus_arrow");

    if (!readFocus) return;

    const mousex = event.clientX + window.scrollX; // Gets Mouse X
    const mousey = event.clientY + window.scrollY - 20; // Gets Mouse Y

    if (pxTOvw(mousex) <= 79 && pxTOvw(mousex) >= 20) {
      readFocus.style.top = `${mousey}px`;
      readFocus.style.left = `${mousex}px`;
      focusArrow.style.left = "50%";
    } else {
      if (mousex >= 15 && pxTOvw(mousex) <= 79) {
        focusArrow.style.left = `${mousex}px`;
      } else {
        const t = (mousex * 100) / document.body.clientWidth;
        if (t > 1 && t < 98) focusArrow.style.left = `${t}%`;
      }
    }
  };

  //Read focus line
  const aca_read_focus = () => {
    const readFocus = document.createElement("div");
    readFocus.id = "aca_read_focus";
    readFocus.className = "aca_read_focus";
    readFocus.innerHTML = `<div class="aca_read_focus_arrow" style="left: 50%;"></div>`;
    document.body.appendChild(readFocus);
    document.addEventListener(
      "mousemove",
      aca_read_focus_arraow_mousemove,
      false
    );
  };

  // Remove reading div tags if already
  const aca_remove_read_mode = () => {
    const elementsToRemove = document.querySelectorAll(
      "#aca_read_focus, #aca_read_mask_top, #aca_read_mask_bottom"
    );
    elementsToRemove.forEach((element) => {
      if (element) element.remove();
    });
    document.removeEventListener("mousemove", aca_read_mask_mousemove);
    document.removeEventListener("mousemove", aca_read_focus_arraow_mousemove);
  };

  acaLoader.show($this);
  const lValue = parseInt(localStorage.getItem("rf")) || 0;
  const value = lValue >= 2 ? 0 : lValue + 1;
  localStorage.setItem("rf", value);
  $this.classList.toggle("aca_selected_box", value > 0);

  const badge = $this.querySelector(".aca_card_box_steps_count");
  badge.classList.toggle("DisplayNone", value <= 0);

  const steps = $this.querySelector(".aca_card_box_steps");
  steps.classList.toggle("DisplayNone", value <= 0);

  aca_remove_read_mode();

  const readType = ["Line Focus", "Reading Mask"];

  if (value > 0) {
    steps.innerHTML = aca_card_box_steps_add(2);
    const subStep = steps.querySelectorAll(".aca_card_box_steps_sub");
    subStep[value - 1].style.opacity = 1;
    badge.innerHTML = readType[value - 1];
    value === 1 ? aca_read_focus() : aca_read_mask();
  }
  acaLoader.hide($this);
}

// Toast message render & click event
const aca_toast = (message) => {
  const toast = document.querySelector("#aca_toast");
  const toastClose = document.querySelector("#aca_toast_close");
  document.querySelector("#aca_toast_message").innerText = message;
  toast.classList.remove("DisplayNone");
  setTimeout(() => toast.classList.add("DisplayNone"), 3500);
  toastClose.addEventListener("click", () =>
    toast.classList.add("DisplayNone")
  );
};

// Reset button click event
function reset() {
  const profileCheck = document.querySelectorAll(".aca_profile_box_selected");
  const activeProfiles = document.querySelectorAll(".aca_profile_box");

  activeProfiles?.forEach((profile) => (profile.style.opacity = 0.9));
  profileCheck?.forEach((profile) => profile.classList.add("DisplayNone"));
  const profileBadge = document.querySelector(".aca_profile_active_badge");
  profileBadge?.classList.add("DisplayNone");
  localStorage.removeItem("aca_profile");

  const localStorageKeys = [
    "dt",
    "it",
    "gs",
    "ic",
    "hl",
    "hh",
    "lh",
    "ls",
    "cc",
    "ta",
    "pa",
    "cf",
    "hi",
    "ms",
    "tt",
    "rf",
    "rs",
    "rp",
  ];

  localStorageKeys.forEach((key) => {
    const button = document.querySelector(`div[type=aca_${key}]`);
    if (button) localStorage.setItem(key, -1);
    button?.click();
  });
}

function pxTOvw(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  var result = (100 * value) / x;

  return result;
}

function vwTOpx(value) {
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  var result = (x * value) / 100;
  return result;
}

function fnBrowserDetect() {
  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "safari";
    console.log("You are using " + browserName + " browser");
    // let off_rs_style = document.createElement("style");
    // off_rs_style.innerHTML = 'div[type="aca_rs"] {  display: none !important;}';
    // document.head.appendChild(off_rs_style);
  } else if (userAgent.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
  return browserName;
}

var aca_css = `.aca_count_badge_text,.aca_position{border-radius:var(--aca-widget-icon-radius)}.aca_card,.aca_position{z-index:999999!important;box-shadow:0 0 10px 0 rgb(0 0 0 / 10%);display:flex;color:var(--aca-text-color);background:var(--aca-background-color)}.aca_card_footer_reset_button,.aca_selected_box,.aca_settings,sup.aca_version{color:var(--aca-background-color)}.aca_ui_container{letter-spacing:normal!important;bottom:10%!important;top:unset!important;right:0!important;z-index:999999!important;font-family:Prompt,sans-serif;font-weight:300;-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;-ms-user-select:none}.aca_position{position:fixed;box-sizing:initial;padding:5px;cursor:pointer;margin:var(--aca-widget-icon-relative-position)}.aca_postion_bottom_right{bottom:50px;right:0}.aca_postion_center_right{right:0}.aca_postion_bottom_left{bottom:50px;left:0}.aca_postion_center_left{left:0}.aca_postion_top_right{top:50px;right:0}.aca_postion_top_left{top:50px;left:0}.aca_postion_top_center{top:0;left:50%}.aca_postion_bottom_center{bottom:0;left:50%}.aca_count_badge{position:absolute;margin:-5px;z-index:1}.aca_count_badge_text{background:#ff0000dd;min-height:20px;max-height:20px;display:flex;min-width:20px;max-width:20px;align-items:center;justify-content:center;font-weight:500;font-size:10px;line-height:10px!important;margin:0}.aca_card_footer_reset_button,.aca_selected_box,sup.aca_version{background:var(--aca-text-color)}.svg-inline--fa{height:50px}.aca_card{overflow-y:auto;position:fixed;text-align:right;padding:10px;flex-direction:column;justify-content:space-between;top:var(--aca-widget-vertical-relative-position);bottom:var(--aca-widget-vertical-relative-position)}.aca_card_one_column,.aca_card_two_column{width:375px}#aca_toast,.aca_card_three_column{width:500px}.aca_card_header{align-items:center!important;display:-ms-flexbox;display:flex;justify-content:space-between;padding:10px 15px;line-height:17px!important;font-size:17px!important}.aca_card_header_title{margin:0;font-size:17px;font-weight:500;letter-spacing:0}sup.aca_version{font-size:12px;padding:0 5px;font-weight:400;margin:5px}.aca_card_header_close{cursor:pointer}#aca_toast_close svg,.aca_card_header_close svg{height:30px!important;padding:5px;margin-bottom:-5px}.aca_card_footer_reset{align-items:center!important;display:-ms-flexbox;display:flex;justify-content:space-between;padding:10px;font-size:13px;line-height:20px;letter-spacing:0}.aca_card_footer_reset_text{padding-left:10px;font-size:15px;text-align:center;line-height:20px}.aca_card_footer_reset_button{display:flex;padding:5px 10px;cursor:pointer;font-weight:400;justify-content:center}.aca_footer_statment_link,.aca_svg_check_mark,.aca_tooltip,.appfiy_aca_menu_item{color:var(--aca-text-color)}.aca_card_footer_reset a{font-size:12px!important;line-height:14px!important}.aca_footer_link{text-align:center}.aca_footer_link a{text-decoration:none!important;font-size:13px!important;line-height:13px!important;letter-spacing:0!important}.aca_footer_link a:hover{padding:0 10px;font-weight:400;background-color:var(--aca-text-color)!important;color:var(--aca-background-color)!important}.aca_1_row:after,.aca_2_row:after,.aca_card_row:after{content:"";display:table;clear:both}.aca_1_row,.aca_2_row,.aca_card_row{overflow-y:auto;scrollbar-width:auto;scrollbar-color:auto!important}.aca_1_row::-webkit-scrollbar,.aca_2_row::-webkit-scrollbar,.aca_card_row::-webkit-scrollbar,.aca_lang_list_ul::-webkit-scrollbar{visibility:hidden!important;width:6px!important}.aca_1_row::-webkit-scrollbar-thumb,.aca_2_row::-webkit-scrollbar-thumb,.aca_card_row::-webkit-scrollbar-thumb,.aca_lang_list_ul::-webkit-scrollbar-thumb{border-radius:30px!important}.aca_1_row::-webkit-scrollbar-track,.aca_2_row::-webkit-scrollbar-track,.aca_card_row::-webkit-scrollbar-track,.aca_lang_list_ul::-webkit-scrollbar-track{background-color:#ffffff50;border-radius:30px}.aca_lang_list_ul::-webkit-scrollbar:end{background:0 0;margin-bottom:10px}.aca_lang_list_ul::-webkit-scrollbar:start{background:0 0;margin-top:10px}.aca_card_box{align-items:center;position:relative;cursor:pointer;padding:12px;border-width:1px;border-style:solid;display:flex;margin:2%}.aca_card_box_two_column{justify-content:center;flex-direction:column;width:46%;height:125px}.aca_card_box_one_column{justify-content:flex-start;flex-direction:row;width:96%;height:50px}.aca_card_box_three_column{justify-content:center;flex-direction:column;width:29.2%;height:125px}.aca_card_box svg{height:50px;padding:10px}.aca_card_box_right{float:right}.aca_card_box_left,.aca_profile_box_left{float:left}.aca_card_box_text{text-align:center;line-height:20px;font-size:14px;font-family:Prompt,sans-serif;letter-spacing:0}.aca_selected_box{border-radius:20px;border-width:1px;border-style:double;transition:border-color 3s;border-color:var(--aca-text-color)!important;box-shadow:inset 0 0 0 2px var(--aca-background-color)}.aca_card_box_steps{display:flex}.aca_card_box_steps1,.aca_card_box_steps2,.aca_card_box_steps3,.aca_card_box_steps4,.aca_card_box_steps_sub{background-color:var(--aca-background-color);display:block!important;padding:2px 10px;border-radius:20px;margin:10px 1.5px 0;opacity:.3}.aca_card_box_selected,.aca_card_box_steps_count,.aca_profile_box_selected{position:absolute;right:0;margin:10px;top:0;line-height:14px;text-align:center;font-size:12px!important;padding:0 5px;letter-spacing:0!important}.aca_card_box_steps_count_number{background-color:transparent!important}#aca_toast{margin:auto;background-color:rgba(211,40,25,.9);color:#fff;border-radius:20px;position:fixed;z-index:999;left:0;right:0;bottom:30px}#aca_toast #aca_toast_close{margin:15px;float:right;border-radius:30px;cursor:pointer;line-height:20px!important}#aca_toast #aca_toast_message{padding:15px 30px;line-height:30px;font-size:16px!important}.DisplayNone{display:none!important}.aca_read_focus,.aca_read_focus_arrow{display:block!important;transform:translateX(-50%)}.grayscale{filter:grayscale(100%)}.invertcolor{filter:invert(100%)}.invertcolor_greayscale{filter:invert(1) grayscale(100%)}.aca_cursor{cursor:url("/apps/accessibility/assets/images/aca_cursor.svg"),auto!important}@media only screen and (max-width:600px){.aca_card_one_column,.aca_card_three_column,.aca_card_two_column{width:100%;bottom:0!important;right:0!important;left:0!important;top:30vh}.aca_card_postion_bottom_left,.aca_card_postion_bottom_right,.aca_card_postion_top_left,.aca_card_postion_top_right{bottom:0;right:0}}.aca_tooltip{font-size:14px;height:auto!important;width:auto!important;padding:5px 10px;border:2px solid;margin:10px;text-align:center;box-shadow:0 0 5px 5px #ccc;border-radius:10px;z-index:9999;opacity:.9;position:relative!important;background-color:var(--aca-tooltip-color);border-color:var(--aca-text-color)}li.aca_lang_list_li,li.aca_lang_list_li_span{font-size:13px;font-weight:400}.aca_tooltip:hover{opacity:1!important}.aca_read_focus{box-sizing:border-box;width:40vw!important;min-width:200px!important;position:absolute!important;height:8px!important;border-radius:5px;top:20px;z-index:2147483647;background:var(--aca-read-focus-color);border-color:var(--aca-read-focus-color)}.aca_read_focus_arrow{bottom:100%;left:50%;width:20px;height:0;position:absolute}.aca_read_focus_arrow:after,.aca_read_focus_arrow:before{content:"";bottom:100%;left:50%;border:solid transparent;height:0;width:0;position:absolute;pointer-events:none}.aca_read_focus_arrow:before{border-width:17px;margin-left:-17px}.aca_read_focus_arrow:after{border-width:14px;margin-left:-14px}.aca_settings{padding:0;border-radius:var(--aca-widget-radius)}.aca_lang_select,.aca_profile_select{cursor:pointer;padding:10px 15px;font-size:13px;font-weight:500;display:flex;justify-content:space-between}.aca_svg_arrow_down,.aca_svg_arrow_left{height:15px;width:auto;margin:auto 0}.aca_lang_list_li_span,.aca_lang_selector,.aca_profile_selector{display:flex;gap:5px}.aca_svg_flag{height:25px;width:25px;margin:auto 0;border:1px solid;border-radius:var(--aca-widget-radius)}.aca_lang_list{text-align:left;margin-bottom:2%;width:100%;padding:2px;cursor:pointer;background:var(--aca-text-color);border-radius:var(--aca-widget-radius)}ul.aca_lang_list_ul{list-style:none;position:relative;padding:0 5px;margin:2%;overflow:auto;max-height:200px}li.aca_lang_list_li{padding:5px 5px 5px 0;display:flex;justify-content:space-between}li.aca_lang_list_li:not(:last-child){border-bottom:1px solid}.aca_lang_select_arrow{margin:auto 0;display:flex}.aca_arrow_down{transform:rotate(90deg)}.aca_svg_check_mark{width:15px;height:15px;border-radius:100%;padding:2px;margin:auto 0;background-color:var(--aca-background-color);border-radius:var(--aca-widget-radius)}.aca_lang_select,.aca_profile_select{width:100%}.aca_profile_list_li_span svg,.aca_profile_selector svg{max-width:30px;max-height:30px;height:28px;width:28px;border:1px solid var(--aca-text-color);border-radius:20px;background-color:var(--aca-text-color);color:var(--aca-background-color)}.aca_lang_list_li_span svg,.aca_lang_selector svg{max-width:30px;max-height:30px;height:25px;width:25px;border:1px solid;border-radius:20px}[class*=aca_position] svg{height:var(--aca-icon-size)}.aca_card_row::-webkit-scrollbar-track{background-color:var(--aca-background-color);border:.1px solid var(--aca-text-color)}.aca_lang_list_ul::-webkit-scrollbar-track{background-color:var(--aca-text-color);border:.1px solid var(--aca-background-color)}.aca_selected_box .aca_svg_hide_images path,.aca_selected_box .aca_svg_highlight_colors path,.aca_selected_box .aca_svg_mute_sounds path,.aca_selected_box svg{fill:var(--aca-background-color)!important}.aca_card_box:hover{box-shadow:0 0 0 2px var(--aca-text-color)}.aca_1_row::-webkit-scrollbar-thumb,.aca_2_row::-webkit-scrollbar-thumb,.aca_card_row::-webkit-scrollbar-thumb{background:var(--aca-text-color)}.aca_lang_list_ul::-webkit-scrollbar-thumb{background:var(--aca-background-color)}.aca_read_focus_arrow:after,.aca_read_focus_arrow:before{border-bottom-color:var(--aca-read-focus-color)}.aca_card,.aca_card_box,.aca_card_box_steps_count,.aca_card_footer_reset_button,.aca_count_badge,.aca_footer_link a,.aca_version{border-radius:var(--aca-widget-radius)!important}#aca_toast_close svg,.aca_card_header_close svg{background:var(--aca-text-color);color:var(--aca-background-color);border-radius:var(--aca-widget-radius)}.aca_svg_hide_images path,.aca_svg_highlight_colors path,.aca_svg_mute_sounds path{fill:var(--aca-text-color)!important}.aca_postion_center_left,.aca_postion_center_right{bottom:calc(50% - var(--aca-widget-icon-relative-position))}.aca_read_mask_top{position:fixed!important;z-index:2147483647!important;width:100%!important;background:rgba(0,0,0,.5)!important;top:0}.aca_read_mask_top_sub{width:100%!important;height:8px!important;position:absolute!important;background:var(--aca-read-focus-color);bottom:0;display:block!important}.aca_read_mask_bottom{position:fixed!important;z-index:2147483647!important;width:100%!important;background:rgba(0,0,0,.5)!important;bottom:0}.aca_read_mask_bottom_sub{width:100%!important;height:8px!important;position:absolute!important;background:var(--aca-read-focus-color);top:0;display:block!important}.aca_highlighted_text{background:var(--aca-highlight-header)}.aca_profile_active_badge,.aca_profile_box{font-weight:400;background:var(--aca-text-color);color:var(--aca-background-color)}.aca_profile_box_two_column{justify-content:center;flex-direction:column;width:50%}.aca_profile_box{align-items:center;position:relative;cursor:pointer;padding:12px;border-width:1px;border-style:solid;display:flex;margin:0%;height:80px;font-size:14px;border-radius:var(--aca-widget-radius);opacity:.9}.aca_card_box_selected svg,.aca_profile_box_selected svg{height:20px;width:20px}.aca_profile_select{border-top:1px solid}.aca_profile_box svg{width:auto;color:var(--aca-background-color);fill:var(--aca-background-color)}.aca_profile_active_badge{line-height:16px;letter-spacing:.6px;animation:none;font-size:12px;padding:0 5px;margin:0!important;height:16px;min-height:auto;border-radius:10px}.aca_lang_select_span,.aca_profile_select_span{margin:auto}.aca-box-loader{border:3px dotted var(--aca-background-color);border-radius:50%;border-top:3px solid var(--aca-background-color);width:40px;height:40px;animation:1s linear infinite spin;position:absolute;top:50%;left:50%;margin-top:-20px;margin-left:-20px;z-index:9999;display:none}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}.aca-pause-animation{transform:none!important;transition:none!important;animation:none!important}.aca-remove-background{background-size:0!important}.aca-hide-images{opacity:0!important}.acc_card_read_buttons{display:flex;gap:5px;margin-bottom:-10px}.acc_card_read_buttons svg{padding:0;height:30px}.aca_developer_link{display:inline-block;color:var(--aca-text-color);text-decoration:none}.aca_card_box_steps_count{background-color:var(--aca-background-color);color:var(--aca-text-color);border:2px solid var(--aca-background-color);opacity:1}.aca-box-loader-2{display:block;border-color:var(--aca-text-color);position:relative;height:30px;width:30px}.aca-icon-loader{display:none;height:var(--aca-icon-size);width:var(--aca-icon-size);margin:var(--aca-widget-icon-relative-position);bottom:0;right:0;animation:1s linear infinite spin;border:calc(var(--aca-icon-size)/ 10) dotted var(--aca-background-color);border-radius:50%;position:absolute}.aca_statement_container{overflow:hidden;background:var(--aca-text-color);color:var(--aca-background-color);border-radius:var(--aca-widget-radius);text-align:left;font-family:Prompt;font-size:15px;padding:10px}.aca_statement_title{font-weight:600;font-size:18px;padding:0 10px}.aca_scrollbar::-webkit-scrollbar{width:6px}.aca_scrollbar::-webkit-scrollbar-thumb{background-color:var(--aca-background-color);border-radius:30px}.aca_scrollbar::-webkit-scrollbar-track{background-color:var(--aca-text-color);border-radius:30px;border:1px solid var(--aca-background-color)}.aca_statement_body{padding:0 10px;overflow-y:scroll;scrollbar-width:auto;scrollbar-color:auto!important;height:92%;max-height:92%}.aca_statement_header{display:flex;justify-content:space-between;align-items:center}.aca_statement_back{background:var(--aca-background-color);color:var(--aca-text-color);padding:0 10px!important;height:fit-content;border-radius:var(--aca-widget-radius);align-items:center;display:flex;gap:5px;cursor:pointer}.aca_statement_back svg{height:24px}.aca_position::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100%;height:100%;border-radius:var(--aca-widget-icon-radius);box-shadow:0 0 0 0 var(--aca-background-color);animation:2s infinite highlight;opacity:.5}@keyframes highlight{0%,100%{box-shadow:0 0 0 10px var(--aca-text-color)}50%{box-shadow:0 0 0 20px var(--aca-background-color)}}.aca_scrollbar2::-webkit-scrollbar{width:6px;}.aca_scrollbar2::-webkit-scrollbar-thumb{height: 100px;background-color:var(--aca-text-color);border-radius:30px}.aca_scrollbar2::-webkit-scrollbar-track{background-color:var(--aca-background-color);border-radius:30px;border:1px solid var(--aca-text-color)}`;

//window.addEventListener("load", myAccessibility, false);

if (window.location.origin == "https://www.appifycommerce.com") {
  myAccessibility();
}
if (window.hasOwnProperty("appify_aca_options")) {
  if (appify_aca_options?.myshopify_domain === Shopify.shop) {
    myAccessibility();
  } else {
    console.warn("Accessibility toolkit not working only on registered URL");
  }
}

// if (window.location.origin == "https://mystore7395.myshopify.com") {
//   startV3();
//
