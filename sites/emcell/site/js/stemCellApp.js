( function( window, document, undefined ) {

	"use strict";
	const TWOPI = Math.PI * 2;
	const HALFPI = Math.PI * .5;
	const WGL1 = 2000;
	const WGL2 = 2001;
	const NOWGL = 2002;

	//	Store here only scalar values
	const DEFAULTSETTINGS = {
		containerLoaderId: 'loaderLayout',
		containerBGId: 'containerBG',
		containerMaskId: 'containerMask',
		containerCellId: 'containerCell',
		containerFooterId: 'containerFooter',
		containerCurtainsId: 'svgCurtains',
		cssClassHidden: 'hidden2',
		videoId: 'video',
		texNoiseGeneralId: 'texNoise0',
		texNoiseMaskId: 'texNoise1',
		curtainsSvgId: 'svgSnapshot',
		//	mask parameters
		homeId: 'mainPage',
		// transitionTimeMaskFwd: 3.5,	//	transtion time in seconds
		transitionTimeMaskFwd: 1.5,	//	transtion time in seconds
		transitionTimeMaskRwd: .5,	//	transtion time in seconds
		maskSize: 2048,
		maskHeightMin: 0.5,
		maskHeightMax: 1.,
		maskBorderAlpha: 0.02,
		maskBGColor: new THREE.Color( '#ede0dd' ),
		maskDefaultFontSize: 32,
		//	wobble parameters: direction, strength
		transitionTimeWobble: 1.1,	//	transtion time in seconds
		wobbleStrMin: 0.0,
		wobbleStrMax: 0.02,
		noiseDirX: 1.,
		noiseDirY: .2,
		noiseStrength: .2,
		//	cell
		blobSvgCubeId: 'svgCubeFront',
		blobDiameter: 100,
		blobMinSpeed: 5,
		blobMaxSpeed: 20.,
		blobColKernel0: new THREE.Color( .008, .203, .293 ),
		//RGB: 135, 232, 239
		blobColKernel1: new THREE.Color( .527, .906, .934 ),
		//125 186 181
		blobColCell: new THREE.Color( .488, .726, .707 ),
		blobCubeMapRes: 1024,
		blobCubeMapGradientLength: 1.2,
		//rgb(227, 210, 206)
		// blobCubeMapColBase: new THREE.Vector3( .8902, .8235, .8078 ),	//	#e3d2ce
		blobCubeMapColBase: new THREE.Color( '#e3d2ce' ),	//	#e3d2ce
		blobCubeMapColBack: new THREE.Color( 1., 1., 1. ),
		blobCubeMapColAmbient: new THREE.Color( .0, .0, .0 )

	};

	const SHADER_CHUNKS = {
		'wglTypeVS' :
`
#if __VERSION__ == 300
#define IN in
#define OUT out
#else
#define IN attribute
#define OUT varying
#endif
`,		
'wglTypeFS' :
`
#if __VERSION__ == 300
#define IN in
#define FRAGCOLOR pc_fragColor
#else
#define IN varying
#define FRAGCOLOR gl_FragColor
#endif
`		
	};

	//	All shaders that are used by App go here
	const SHADERS = {
		'vertOrthoPlane': SHADER_CHUNKS["wglTypeVS"] + 
`
precision highp float;
precision highp int;

OUT vec2 vUv;

void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,
'fragDownscaling': SHADER_CHUNKS["wglType"] + 
`
uniform sampler2D utexDif0;

vec4 cubic(float v)
{
    vec4 n = vec4(1.0, 2.0, 3.0, 4.0) - v;
    vec4 s = n * n * n;
    float x = s.x;
    float y = s.y - 4.0 * s.x;
    float z = s.z - 4.0 * s.y + 6.0 * s.x;
    float w = 6.0 - x - y - z;
    return vec4(x, y, z, w);
}

vec4 filter( sampler2D texture, vec2 texcoord, vec2 texscale ) {
	// float fx = fract(texcoord.x);
	// float fy = fract(texcoord.y);
	// texcoord.x -= fx;
	// texcoord.y -= fy;
	vec2 f = fract( texcoord );
	texcoord -= f;

	// vec4 xcubic = cubic(fx);
	// vec4 ycubic = cubic(fy);
	vec4 xcubic = cubic( f.x );
	vec4 ycubic = cubic( f.y );

	vec4 c = vec4(texcoord.x - 0.5, texcoord.x + 1.5, texcoord.y - 0.5, texcoord.y + 1.5);
	vec4 s = vec4(xcubic.x + xcubic.y, xcubic.z + xcubic.w, ycubic.x + ycubic.y, ycubic.z + ycubic.w);
	// vec4 offset = c + vec4(xcubic.y, xcubic.w, ycubic.y, ycubic.w) / s;
	vec4 offset = c + vec4( xcubic.yw, ycubic.yw ) / s;

	vec4 sample0 = texture2D( texture, vec2( offset.x, offset.z ) * texscale );
	vec4 sample1 = texture2D( texture, vec2( offset.y, offset.z ) * texscale );
	vec4 sample2 = texture2D( texture, vec2( offset.x, offset.w ) * texscale );
	vec4 sample3 = texture2D( texture, vec2( offset.y, offset.w ) * texscale );

	float sx = s.x / (s.x + s.y);
	float sy = s.z / (s.z + s.w);

	return mix( mix( sample3, sample2, sx ), mix( sample1, sample0, sx ), sy );
}

main() {
	filter( utexDif0, gl_FragCoord,  );
}

`

	};
	/* SHADERS END */

	class Settings {
		constructor( defaults ) {
			this.defaults = defaults;
			this.guiProperties = [];
			this.loadDefaults();
		};

		loadDefaults() {
			let o = this.defaults,
				newAttr;
			for ( let attr in o ) {
				if ( attr[ 0 ] == '_' ) {
					newAttr = attr.substring( 1 );
					this.guiProperties.push( newAttr );
				}
				else newAttr = attr;
				if ( o.hasOwnProperty( attr ) ) this[ newAttr ] = o[ attr ];
			}
		};
	};

	const ZMath = ( function() {
		class ZMath {
			constructor() {};

			clampToZero2PI( theta ) {
				theta = theta % TWOPI;
				return theta < 0 ? TWOPI + theta : theta;
			}
	
			lerp( x, y, a ) {
				return x * ( 1. - a ) + y * a;
			}
	
			clamp( v, lo, hi ) {
				return hi < lo ? v : ( (v < lo) ? lo : (hi < v) ? hi : v );
			}
	
			smoothstep( e0, e1, x ) {
				let t = this.clamp(( x - e0 ) / ( e1 - e0 ), 0., 1. );
				return t * t * ( 3. - 2. * t);
			}
	
		}
		return new ZMath();
	} )();
	

	//	SVG Utility functions

	const SVGU = ( function( window, document, undefined ) {
		class SVGU {
			constructor() {
				this.templates = {};
				this.counter = 0;
			}
	
			createElement( tag, attrs, ens ) {
				let ns;
				switch ( nsid ) {
					case 'svg': ns = 'http://www.w3.org/2000/svg'; break;
					default: ns = null;
				}
	
			}
	
			test() {
				this.templates[ 'asd' + this.counter ] = 123;
				this.counter++;
				// console.log( 'SVGU.works' );
				// console.log( this.templates[ 'asd' ] );
				//console.log( this.templates );
			}
		}
	
		return new SVGU();
	} )( document, window );

	//console.log( SVGU );


	let MD5 = ( function() {

		return function(d){
			var r = M(V(Y(X(d),8*d.length)));
			return r.toLowerCase()
		}

		function M(d){
			for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);
			return f
		}

		function X(d){
			for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;
			for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;
			return _
		}

		function V(d){
			for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);
			return _
		}

		function Y(d,_){
			d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;
			for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){
				var h=m,t=f,g=r,e=i;
				f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),
				m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)
			}
			return Array(m,f,r,i)
		}

		function md5_cmn(d,_,m,f,r,i){
			return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)
		}

		function md5_ff(d,_,m,f,r,i,n){
			return md5_cmn(_&m|~_&f,d,_,r,i,n)
		}

		function md5_gg(d,_,m,f,r,i,n){
			return md5_cmn(_&f|m&~f,d,_,r,i,n)
		}

		function md5_hh(d,_,m,f,r,i,n){
			return md5_cmn(_^m^f,d,_,r,i,n)
		}

		function md5_ii(d,_,m,f,r,i,n){
			return md5_cmn(m^(_|~f),d,_,r,i,n)
		}

		function safe_add(d,_){
			var m=(65535&d)+(65535&_);
			return(d>>16)+(_>>16)+(m>>16)<<16|65535&m
		}

		function bit_rol(d,_){
			return d<<_|d>>>32-_
		}

	})();

	/*
		WGL parent class
		It is not meant to do anything useful on its own.		
		Creates appropriate context and adds neccessary functionality for child classes

		controler			reference to controller instance
		parent				reference to parent object
		containerElement 	container element in html, if none is specified, context is not attaced
							to anything
		ctxSize				THREE.Vector2 context size

	*/
	class WGLContext {
		constructor( controller, parent, containerElement, ctxSize, props ) {
			//console.log(this);
			this.controller = controller;
			this.ctrl = controller;
			this.parent = parent;
			// this.S = parent.S;
			this.flgIsLoaded = !0;
			this.flgActive = !1;		//	is context currnetly rendered
			this.flgResiszable = !1;	//	should resize be invoked for this context
			// this.flgRenderToTexture = !1;
			this.flgCtxSizeUpdated = !1;


			this.clkAge = 0;

			this.materials = {};
			this.textures = {};
			this.svgTextures = {};
			this.childContexts = {};
			this.targetTexture = void 0;
			// this.container = document.getElementById( tagId );
			this.container = containerElement;
			// this.ctxSize = ctxSize;
			// console.log( tagId );
			// console.log( this.container );
			// console.log( this.container.clientWidth, this.container.clientHeight );
	
			// this.ctxSize = ctxSize;
			// console.log( controller, parent, containerElement, ctxSize );
			// console.log( this.container, ctxSize );
			// console.log( ctxSize );
			if ( ctxSize ) {
				this.ctxSize = ctxSize;
				this.width = ctxSize.x;
				this.height = ctxSize.y;
				// console.log( 'using ctxSize', this.ctxSize, this.width, this.height );
			}
			else {
				this.width = this.container.clientWidth;
				this.height = this.container.clientHeight;
				this.ctxSize = new THREE.Vector2( this.width, this.height );
				// console.log( 'using container', this.ctxSize, this.width, this.height );
			}

			this.setProperties( props );

			if ( this.controller.wglType = WGL2 ) {
				// console.log('using wgl2');
				this.renderer = new THREE.WebGLRenderer( { autoclear: !1, alpha: !0, antialias: !1 } );
			}
			else {
				// console.log('using wgl1');
				this.renderer = new THREE.WebGL1Renderer( { autoclear: !1, alpha: !0, antialias: !1 } );
			}
			// this.renderer.setPixelRatio( window.devicePixelRatio );
//*
			const gl = this.renderer.getContext();
			//console.log( gl.enabledCapabilities );
			// console.log( this.renderer );
			// console.log( this.renderer.getContextAttributes() );
			// console.log( this.renderer.state );
			// console.log( gl );
			// console.log( gl.TEXTURE_CUBE_MAP_SEAMLESS );
			// console.log( gl.TEXTURE_CUBE_MAP );
			// console.log( this.renderer.domElement.GL_TEXTURE_CUBE_MAP_SEAMLESS );

			// this.renderer.state.enable( gl.TEXTURE_CUBE_MAP_SEAMLESS );
			// gl.Enable( gl.GL_TEXTURE_CUBE_MAP_SEAMLESS );
//*/
			// console.log( this.ctxSize );
			// console.log( window.innerWidth, window.innerHeight );

			//this.renderer.setSize( this.ctxSize.x, this.ctxSize.y );

			// this.renderer.setSize( window.innerWidth, window.innerHeight );
			this.container && this.container.appendChild( this.renderer.domElement );
			// this.renderer.setSize( window.innerWidth, window.innerHeight );
			// console.log( this.ctxSize, this.width );
			this.renderer.setPixelRatio( 1 );
			this.renderer.setSize( this.width, this.height, !0 );

		}

		//	returns canvas with current frame
		//	Careful with those uniforms, Eugene
		getFrame() {
			this.render();
			return this.renderer.domElement;
		}

		setFragmentShader( s ) {
			this.fragmentShader = this.controller.shaderChunks[ 'wglTypeFS' ] + s;
		}

		setProperties( props ) {
			if ( props instanceof Object ) {
				for ( e in props ) {
					if ( this.hasOwnProperty( e ) ) this[ e ] = props[ e ];
				}
			}
		}

		createScene() {
			this.scene = new THREE.Scene();
			//this.scene.background = new THREE.Color( "rgb(255, 255, 255)" );
		}

		addMaterial( name, props, vs, fs ) {
			// console.log( 'wglctx.addMaterial' );
			// console.log( name, props, vs, fs );
			let p = {
				uniforms: {},
				vertexShader: vs,
				fragmentShader: fs,
				depthTest: !1,
				depthWrite: !1,
				clipping: !1,
				wireframe: !1,
				transparent: !0,
				vertexColors: !1 
			};

			if ( props instanceof Object ) {
				for ( e in props ) {
					p[ e ] = props[ e ];
				}
			}

			this.materials[ name ] = new THREE.ShaderMaterial( p );
			this.setUniform( name, 'uTime', this.clkAge );

		}

		setUniform( mName, uName, value ) {
			// console.log( 'wglctx.setUniform' );
			// console.log( this.materials );
			// console.log( mName, uName, value );

			this.materials[ mName ].uniforms[ uName ] = { 'value': value };
		}

		resize() {
			if ( !this.flgCtxSizeUpdated ) {
				this.width = this.container.clientWidth;
				this.height = this.container.clientHeight;
				// this.ctxSize = new THREE.Vector2( this.width, this.height );
				this.ctxSize.set( this.width, this.height );
				this.flgCtxSizeUpdated = !1;
			}
		}

		render() {
			// console.log("ctx.render");
			this.clkAge += this.parent.clkDelta;
			//	is it neccessary to check flgActive?
			// this.flgActive = this.flgActive && !this.flgSingleFrame;
			// console.log( "WGLContext.render clkAge", this.clkAge );
		}
	}

	class WGLContextOrthoPlane extends WGLContext {
		constructor( controller, parent, containerElement, ctxSize, props ) {
			super( controller, parent, containerElement, ctxSize, props );
			this.fragmentShader = '';
			this.setProperties( props );
			// console.log( this.container, this.ctxSize );

		}

		addMaterial( name, props, vs, fs ) {
			//	all materials will have the same vertex shader
			super.addMaterial( name, props, this.controller.shaders[ 'vertOrthoPlane' ], fs );
			this.setUniform( name, 'uRes', this.ctxSize );
		}

		createScene( matId ) {
			super.createScene();
			this.gSize = 1024;
			this.hs = this.gSize * .5;
			//	create ortho camera
			// const hw = this.width * .5;
			// const hh = this.height * .5;
			const hw = 512;
			const hh = 512;
			this.camera = new THREE.OrthographicCamera( -hw, hw, hh, -hh, 0, 1000 );
			this.scene.add( this.camera );

			//	create plane mesh
			let geometry = new THREE.PlaneBufferGeometry( this.gSize, this.gSize );
			// let geometry = new THREE.PlaneBufferGeometry( this.controller.S.maskSize, this.controller.S.maskSize );
			// let geometry = new THREE.PlaneBufferGeometry( this.ctxSize.x, this.ctxSize.y );
			this.plane = new THREE.Mesh( geometry, this.materials[ matId ] );
			this.scene.add( this.plane );

		}

		resize() {
			super.resize();
			// console.log( 'ortho reisze', this.ctxSize );
			// console.log( this.width, this.height );
			// console.log( 'ortho reisze', this.ctxSize );
			// const frustumSize = 600.
			// const aspect = this.width / this.height;
			//	should this be here or in child classes
			this.flgResiszable && this.setUniform( 'main', 'uRes', this.ctxSize );

			const a = this.width / this.height;
			// const a = this.height / this.width;
			let hw, hh;
			if ( this.width > this.height ) {
				hw = 512;
				hh = 512 / a;
			}
			else {
				hw = 512 * a;
				hh = 512;
			}
			// hw *= 1; hh *= 1;

			this.camera.left = -hw;
			this.camera.right = hw;
			this.camera.top = hh;
			this.camera.bottom = -hh;

			// this.camera.left = -this.width *.5;
			// this.camera.right = this.width * .5;
			// this.camera.top = this.height * .5;
			// this.camera.bottom = -this.height * .5;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( this.width, this.height );
		}

	}

	class WGLContextMask extends WGLContextOrthoPlane {
		constructor( controller, parent, containerElement, ctxSize, text, props ) {
			super( controller, parent, containerElement, ctxSize, props );
			this.flgPlayDirFwd = !0;
			this.flgPlaybackAfter = !1;
			//	is true for 0..1 -> 1..0, else for 1..0
			this.flgTransition = !1;
			this.text = text;
			this.svgTexture = void 0;
			const s = this.controller.S.maskSize;
			// console.log(s);
			this.svgTextureSize = new THREE.Vector2( s, s );
			// const S = this.S;
			// this.S.maskSize
			// console.log( this.svgTextureSize );
			this.setProperties( props );

			this.svgTexture = new SVGTextureCurtains( 
				this.controller, 
				this, 
				// document.getElementById( this.controller.S.curtainsSvgId ), 
				null,
				this.svgTextureSize, 
				this.text 
			);

			const fs = 
			`
			precision highp float;
			precision highp int;
			
			uniform sampler2D uTexDiffuse;
			uniform sampler2D uTexNoise0;
			uniform float uTime;
			uniform float uMaskK;
			uniform float uHeightMin;
			uniform float uHeightMax;
			uniform float uBorderAlpha;
			uniform vec2 uNoiseDir;
			uniform float uNoiseStr;
			
			IN vec2 vUv;
			
			void main() {
				float time1 = uTime * .1;
				float height = texture2D( uTexNoise0, vUv * 1. + uNoiseDir * uNoiseStr * time1 ).r;
				float alpha = 0.;
				vec3 colBg;
				height = smoothstep( uHeightMin, uHeightMax, height );
				alpha = height - uMaskK;
				float aalpha = abs( alpha );
				alpha = alpha < 0. ? ( aalpha >= uBorderAlpha ? 1. : aalpha / uBorderAlpha ) : 0.;
				colBg = alpha > 0. ? texture2D( uTexDiffuse, vUv ).rgb : vec3( 0. );
				// alpha = 1.;
				// colBg = vec3( 0., 0., 1. );
				FRAGCOLOR = vec4( colBg, alpha );
			}
			`;
			this.setFragmentShader( fs );
			
			// console.log( this.controller.shaders[ 'vertOrthoPlane' ] );
			// console.log( this.controller.shaders[ 'fragTrans' ] );
			this.addMaterial( 'main', {}, null, this.fragmentShader );
			this.createScene( 'main' );

		}

		addMaterial( n, props, vs, fs ) {
			super.addMaterial( n, props, vs, fs );
			const S = this.controller.settings;
			this.setUniform( n, 'uTexOffset', new THREE.Vector2( 0., 0. ) );
			this.setUniform( n, 'uMaskK', 0. );
			this.setUniform( n, 'uHeightMin', S.maskHeightMin );
			this.setUniform( n, 'uHeightMax', S.maskHeightMax );
			this.setUniform( n, 'uBorderAlpha', S.maskBorderAlpha );
			this.setUniform( n, 'uNoiseDir', new THREE.Vector2( S.noiseDirX, S.noiseDirY ).normalize() );
			this.setUniform( n, 'uTexDiffuse', null );
			this.setUniform( n, 'uTexNoise0', this.parent.textures[ 'noiseMask2' ] );
		}

		async updateSvgTexture() {
			// text && ( this.text = text );
			// this.svgTexture.setSize( this.ctxSize );
			// console.log( this.text );
			await this.svgTexture.upadeteDocument( this.text );
			// let mu = this.materials[ "planeMask" ].uniforms;
			//	this is a temporary crutch
			// console.log( ctx );
			let mu = this.materials[ 'main' ].uniforms;

			// console.log( this.svgTexture );
			mu.uTexDiffuse.value = this.svgTexture.data;
			//mu.uTexDiffuse.value = this.textures[ 'diffuse0' ];
			mu.uTexDiffuse.value.minFilter = mu.uTexDiffuse.value.magFilter = THREE.LinearFilter;
			mu.uTexDiffuse.value.format = THREE.RGBFormat;
		}
	
		async resize() {
			// console.log( "ctxMask.resize()" );
			// console.log( this.ctxSize );
			await this.updateSvgTexture();
			this.setUniform( 'main', 'uRes', this.ctxSize );
			this.setUniform( 'main', 'uTexDiffuse', this.svgTexture.data );
			super.resize();
		}

		render() {
			super.render();
			//console.log("ctxMask.render");
			//	updating uniforms
			//	TODO: correct this!!!!
			let f0 = this.flgPlayDirFwd;
			const transTime = this.flgPlayDirFwd ? this.controller.S.transitionTimeMaskFwd : this.controller.S.transitionTimeMaskRwd;
			this.materials[ 'main' ].uniforms.uMaskK.value =
				//1 - ( Math.cos( ( GLApp.clamp( this.clkAge, 0, this.S.transitionTimeMask ) / this.S.transitionTimeMask ) * Math.PI ) + 1 ) * .5;
				//	Linear transition
				// ( f0 ? 1 : 0 ) + ( f0 ? -1 : 1 ) * ZMath.lerp( 0, 1, ( ZMath.clamp( this.clkAge, 0, this.controller.S.transitionTimeMask ) / this.controller.S.transitionTimeMask ) );
				( f0 ? 1 : 0 ) + ( f0 ? -1 : 1 ) * ZMath.lerp( 0, 1, ( ZMath.clamp( this.clkAge, 0, transTime ) / transTime ) );
			this.materials[ 'main' ].uniforms.uTime.value = this.clkAge * 1e+0;
			this.renderer.render( this.scene, this.camera );
			// if ( this.clkAge > this.parent.S.transitionTimeMask ) {
			if ( this.clkAge > transTime ) {
					// console.log( "WGLContextMask.render clkAge", this.clkAge );
				this.clkAge = 0;
				if ( this.flgPlaybackAfter ) {

					this.flgPlayDirFwd = !this.flgPlayDirFwd;
					this.flgPlaybackAfter = !1;
				}
				else {
					// console.log( "WGLContextMask.render:", "ctx inactive" );
					this.flgActive = !1;
					//	unhides svg preloader for home screen
					
				}
				!this.flgTransition && this.parent.hideLayer( this.container );
				this.flgTransition = !1;
			}

			if ( this.flgRenderToTexture ) {
				// this.svgTextures this.renderer.canvas
			}
		}
	}

	class WGLContextWobble extends WGLContextOrthoPlane {
		constructor( controller, parent, containerElement, ctxSize, material, props ) {
			super( controller, parent, containerElement, ctxSize, material, props );
			this.setProperties( props );
			const fs =
			`
			precision highp float;
			precision highp int;
			
			const float PI = 3.14159265359;
			const float TAU = 6.28318530718;
			
			uniform sampler2D uTexDiffuse;
			uniform sampler2D uTexNoise0;
			uniform float uTime;
			uniform float uMaskK;
			uniform float uWobbleK;
			uniform vec2 uNoiseDir;
			uniform float uNoiseStr;
			
			IN vec2 vUv;
			
			//out vec4 out_FragColor;
			
			void main() {
			
				float time1 = uTime * .1;
				float time2 = uTime;
				vec2 uvN = vUv;
				//uvN = uvN * .64 + .0;
				vec2 noise = texture2D( uTexNoise0, vUv + uNoiseDir * uNoiseStr * time1 ).gb;
				vec3 colBg;
			
				if ( alpha != 0. ) {
					vec2 uvDif = vUv;
					uvDif = uvDif * .9 + .05;
					vec2 theta2 = noise * TAU;
					uvDif += vec2( cos( theta2.x ), sin( theta2.y ) ) * sin( time2 ) * mix( uWobbleMin, uWobbleMax, uWobbleK );
					colBg = texture2D( uTexDiffuse, uvDif ).rgb;
				}
			
				//	DEBUG
				if ( abs( vUv.x - .05 )  < .0005 ) {
					colBg = vec3( 0., 1., 0. );
					alpha = 1.;
				}
				if ( abs( vUv.y - .05 )  < .0005 ) {
					colBg = vec3( 0., 1., 0. );
					alpha = 1.;
				}
				if ( abs( vUv.x - .5 )  < .0005 ) {
					colBg = vec3( 0., 1., 0. );
					alpha = 1.;
				}
				if ( abs( vUv.y - .5 )  < .0005 ) {
					colBg = vec3( 0., 1., 0. );
					alpha = 1.;
				}
			
				FRAGCOLOR = vec4( colBg, 1. );
			
			}
			`;
			this.setFragmentShader( fs );

		}

		render() {
			super.render();
			// console.log("ctxMask.render");

		}
	}

	class WGLContextCell extends WGLContextOrthoPlane {
		constructor( controller, parent, containerElement, ctxSize, props ) {
			super( controller, parent, containerElement, ctxSize, props );
			this.containerSizeTargetId = this.parent.S.containerFooterId;
			this.containerSizeTarget = document.getElementById( this.containerSizeTargetId );
			this.flgUndone = !0;
			this.ctxAspect = 1.;
			// this.vMouse = new THREE.Vector2();
			// this.vMouseNorm = new THREE.Vector2();
			this.vAspectAdjust = new THREE.Vector2();
			this.vBlobDir = new THREE.Vector2();
			this.vBlobPos = new THREE.Vector2();
			this.blobSpeed = 0.;
			this.cubeMapSize = this.controller.S.blobCubeMapRes;
			this.setProperties( props );
			//console.log( 'cubemapsize:', this.cubeMapSize )

			const fs =
			`
			const float TAU = 6.28318530718;
			const float PI = 3.14159265359;
			const float HALFPI = 1.5707963268;
			const float EPS = .001;
			const float EPS2 = EPS * 2.;
			const vec4 V = vec4( -1., 1., 0., EPS );

			const int SHADINGMODE = 2;
			const float GAMMA = 2.2;

			const float MAXD = 100.;
			const int RMSTEPS = 128;	//	raymarching steps
			const vec2 REFR = vec2( .4, .4 );
			// const vec2 REFR = vec2( 1., 0. );
			const vec2 REFL = vec2( .03, .1 );
			// const vec2 REFL = vec2( .0, .0 );
			
			//	camera
			// const vec3 CAMPOS = vec3( 0., 5., 0. );	//	original
			// const vec3 CAMPOS = vec3( .0, 7.0, 12. );
			const vec3 CAMPOS = vec3( .0, .0, 12. );
			const vec3 CAMTAR = vec3( 0., 0., 0. );
			
			//	bump map
			// const float BMPGRAIN = .7355;	//	original
			const float BMPGRAIN = 3.7355;
			const float BMPSTR = .313;		//	original
			// const float BMPSTR = .00210;
			//	kernel and cell angular size limits
			const vec4 CELLAS = vec4( .34, .85, .765, 1.615 );
			
			//	spheres
			const int SPHERECNT = 8;
			const int MMKN = 16;
			const float AMMK[MMKN] = float[](1.13,1.32,1.67,.69,1.72,2.32,.37,2.91,.73,.52,1.54,1.23,.76,.58,1.62,.87);

			//	material
			const float MATSHININESS = 81.5;
			const vec3 MATAMBCOL = vec3( 0. );
			const vec3 MATSPECCOL = vec3( .9 );
			
			//	individual sphere radius
			const float SR = .15;
			//	marching cube sphere max deviation from origin
			const float DFO = .4355;

			uniform float uTime;
			uniform vec2 uRes;
			uniform vec3 uColk0;
			uniform vec3 uColk1;
			uniform vec3 uColc;
			uniform vec2 uMouse;
			uniform samplerCube uDifH;
			uniform samplerCube uDifL;
			uniform sampler2D uNoise;

			IN vec2 vUv;
			
			float scene(vec3 pos) {
				const float k = 2.0;
				vec3 s;
				float res = V.z;
				vec2 mouse = -( uMouse.xy - uRes.xy / 2. ) / min(uRes.xy.x, uRes.xy.y);
				// mouse = vec2( .0 );
				// mouse = uMouse;
				// debug
				// mouse = vec2( 0.5 );
				mouse = uMouse * 1.7;
				vec3 offset = vec3( mouse.xy, 0. ) * V.xyz;
				// vec3 offset = vec3( 0. );
				for ( int i = 0; i < SPHERECNT; i++ ){
					s = cos( uTime * vec3( AMMK[ i % MMKN ], AMMK[ ( i + 5 ) % MMKN ], AMMK[ ( i + 3 ) % MMKN ] ) );
					res += exp( -k * ( length( ( pos + offset + DFO * s ) ) - SR * AMMK[ i % MMKN ] ) );
				}
				return -log( res ) / k;
			}
			
			//	arguments:
			//	cp = campos
			//	cd = camdir
			
			float intersection( in vec3 cp, in vec3 cd ) {
				float h = EPS2;
				float t = V.z;
				float res = V.x;
				for( int i = 0; i < RMSTEPS; i++ ) {
					if( h < EPS || t > MAXD ) break;
					h = scene( cp + cd * t );
					t += h;
				}
			
				if( t < MAXD ) res = t;
				return res;
			}
			
			vec3 getNormal( in vec3 pos ) {
				//	inverted vectors also work e.g. zxx -> xxz
				return normalize(
					V.yxx * scene( pos + V.yxx * EPS2 ) +
					V.xxy * scene( pos + V.xxy * EPS2 ) +
					V.xyx * scene( pos + V.xyx * EPS2 ) +
					V.y * scene( pos + V.y * EPS2 ) );
			}
			
			vec3 getBGcol( vec3 camdir ) {
				return textureCube( uDifH, camdir ).rgb;
				// return vec3(1., 0., 0.) ;
			}
			
			vec3 calcLightOriginal( in vec3 pos, in vec3 camdir, in vec3 lpos, in vec3 lcol, in vec3 normal , in vec3 texture) {
				vec3 ldir = normalize( pos - lpos );
				float cosa = pow( .5 + .5 * dot( normal, -ldir ), 2.5 );
				float cosr = max( dot( -camdir, reflect( ldir, normal ) ), 0. );
				vec3 diffuse = 1. * cosa * texture;
				vec3 phong = vec3( 1. * pow( cosr, 64.0 ) );
				return lcol * ( diffuse + phong );
			}

			vec3 calcLight( in vec3 pos, in vec3 camdir, in vec3 lpos, in vec3 lcol, in vec3 normal , in vec3 texture) {
				vec3 ldir = normalize( pos - lpos );
				// cos(theta) = (a dot b) / |a|*|b|; 
				float cosa = pow( .5 + .5 * dot( normal, -ldir ), 2.5 );
				float cosr = max( dot( -camdir, reflect( ldir, normal ) ), 0. );
				vec3 diffuse = 1. * cosa * texture;
				vec3 phong = vec3( 1. * pow( cosr, 64.0 ) );
				return lcol * ( diffuse + phong );
			}

			vec3 shade( in vec3 pos, in vec3 camdir, in vec3 normal ) {
				normal = getNormal(pos);
				float theta = acos( dot( normal, -camdir ) );
				//vec2 texNoffset = vec2( sin( uTime * .01 ), sin( uTime * .023 ) );
				vec2 texNoffset = sin( vec2( uTime * vec2( .01, .023 ) ) );
				//texNoffset *= 0.;
				vec2 uvN = vec2( .5 + atan( normal.x, normal.z ) / TAU, .5 - asin( normal.y) / PI );
				uvN = uvN * BMPGRAIN + texNoffset;
				vec3 texN = texture2D( uNoise, uvN ).rgb;
				normal = mix( normal, normalize( texN ), BMPSTR );
			
				//	ro = campos
				//	rd = camdir
			
				const float ETA = .9;	//	original
				// const float ETA = 1.;
				vec3 refrd = -refract( camdir, normal, ETA );
				vec3 refro = pos + 10.0 * refrd;
				float refdist = intersection(refro, refrd);
				vec3 refpos = refro + refdist * refrd;
				vec3 refnormal = getNormal(refpos);
			
				//	Refraction
				vec3 tex0 = textureCube( uDifH, refract( -refrd, -refnormal, V.y / ETA ) ).rgb;
				// vec3 texuv = refract( -refrd, -refnormal, V.y / ETA );
				// vec3 tex1 = textureCube( uDifL, refract( -refrd, -refnormal, V.y / ETA ) ).rgb;
				// vec3 tex1 = tex0;
				// vec3 tex0 = V.zyz;
				vec3 tex1 = V.zzy;
				// vec3 tex1 = refract( -refrd, -refnormal, V.y / ETA );
				if ( refdist < -0.5 ) {
					tex0 = getBGcol( -refrd );
					tex1 = tex0;
				}
			
				//	kernel and cell coloring
				float k1 = smoothstep( CELLAS.x, CELLAS.y, theta );
				float k2 = V.y - smoothstep( CELLAS.z, CELLAS.w, theta );
				vec3 colk = mix( uColk0, uColk1, k1 );
				tex0 = theta < CELLAS.y ? mix( colk, tex0, .05 + k1 * .95 ) : mix( uColc, tex0, k2 );
				tex1 = theta < CELLAS.y ? mix( colk, tex1, .05 + k1 * .95 ) : mix( uColc, tex1, k2 );
			
			
				//	Reflection
				vec3 tex2 = textureCube( uDifH, reflect( camdir, normal ) ).rgb;
				// vec3 tex3 = textureCube( uDifL, reflect( camdir, normal ) ).rgb;
				vec3 tex3 = tex2;
				// tex0 = tex1;
				// vec3 tex2 = vec3(0., 1., 0.);
				// vec3 tex3 = vec3(0., 0., 1.);
				vec3 tcol = REFR.x * tex0 + REFR.y * tex1 + REFL.x * tex2 + REFL.y * tex3;
				// tcol = V.zzz;

				//	upper top back
				vec3 l1 = calcLight(pos, camdir, vec3(0., 10.,-2. ), vec3( 1. ), normal, tcol );
				//	lower left back
				vec3 l2 = calcLight(pos, camdir, vec3(-7.,-5.,-2. ), vec3( 1. ), normal, tcol );
				//	lower right back
				vec3 l3 = calcLight(pos, camdir, vec3(7.,-5.,-5. ), vec3( 1.), normal, tcol );
				//	front center
				vec3 l4 = calcLight(pos, camdir, vec3( 0., 0., 20. ), vec3( 1. ), normal, tcol );

				l1 *= 0.;
				l2 *= 0.;
				//l3 *= 0.;
				// l4 *= 0.;
			
				//l1 = refract( -refrd, -refnormal, V.y / ETA );
				// l2 = reflect(camdir,normal);
				// l3 = refrd;
				// l3 = normal;
				// l3 = camdir;
			
				// return texuv;
				// return vec3( 0. );
				return l1 + l2 + l3 + l4;
				// return vec3( uvN, 0. );
			}
			
			//CAMPOS, CAMTAR
			mat3 getLookAtMatrix( in vec3 cp, in vec3 ct ) {
				//	direction of camera
				vec3 w = normalize( ct - cp );
				vec3 u = normalize( cross( w, V.wyw ) );
				vec3 v = normalize( cross( u, w ) );
				return mat3( u, v, w );
			}
			
			void main() {
				// vec2 uv = (gl_FragCoord.xy - uRes.xy/2.0) / min(uRes.x, uRes.y);
				vec2 uv = ( vUv - .5 ) * 2.;
				float t = uTime;
				mat3 camMat = getLookAtMatrix( CAMPOS, CAMTAR );
				vec3 vdir = normalize( camMat * vec3( uv, 1. ) ); // 2.0 is the lens length
				vec3 col;
				float alpha = 0.;	//	original
				// float alpha = 1.;
				float dist = intersection( CAMPOS, vdir );
			
				if ( dist < -.5 ) {
					col = getBGcol( vdir );
					// col = col * 0. + 1.;	//	comment this to see background
					// col *= vec3( .5, 0., 0. );
					alpha = .5;
					// alpha = 1.;
				}
				else {
					vec3 inters = CAMPOS + dist * vdir;
					col = shade( inters, vdir, V.yyy );
					alpha = 1.;
				}
				// col = vec3( abs( uv.xy ), 0. );
				// col = vec3( ( vUv.xy ), abs(uv.x) );
				// col = vec3( uRes.xy, 0. );
				// col = vec3( uRes.xy / 1024., 0. );
				// col = vec3( gl_FragCoord.xy / 1024., 0. );
				// col = vec3( gl_FragCoord.xy / uRes, 0. );
				// col = vec3( gl_FragCoord.xy, 0. );
				FRAGCOLOR = vec4( col, alpha );
			}
			`;
			this.setFragmentShader( fs );			

			let cmres = new THREE.Vector2( this.cubeMapSize, this.cubeMapSize );

			// console.log( this.controller.S.blobSvgCubeId );
			// console.log( document.getElementById( this.controller.S.blobSvgCubeId ) );
			this.svgTexture = new SVGTextureCubeFront(
				this.controller, 
				this, 
				document.getElementById( this.controller.S.blobSvgCubeId ),
				cmres
			);
			this.childContexts[ 'px' ] = new WGLContextCubeSide( controller, this, null, cmres, 1 );
			this.childContexts[ 'nx' ] = new WGLContextCubeSide( controller, this, null, cmres, 2 );
			this.childContexts[ 'py' ] = new WGLContextCubeSide( controller, this, null, cmres, 3 );
			this.childContexts[ 'ny' ] = new WGLContextCubeSide( controller, this, null, cmres, 4 );
			this.childContexts[ 'pz' ] = new WGLContextCubeBack( controller, this, null, cmres );
			//front
			this.childContexts[ 'nz' ] = new WGLContextCubeSide( controller, this, null, cmres, 2 );

			// this.controller.textures['noiseGeneral'].image.cloneNode(),

			//	DEBUG
			this.dbgcnt = 0;

			//	mouse vectors
			this.mouseVectors = {
				scrSize : new THREE.Vector2( 0., 0. ), 
				vMouse : new THREE.Vector2( 0., 0. ),
				vMouseNorm : new THREE.Vector2( 0., 0. ),
				C : new THREE.Vector2( 0., 0. ),
				//	normalized position of blob 
				p : new THREE.Vector2( 0., 0. ),
				//	normalized position of mouse/repulsor 
				m : new THREE.Vector2( 0., 0. ),
				v : new THREE.Vector2( 0., 0. ),
				prevv : new THREE.Vector2( 0., 0. ),
				vi : new THREE.Vector2( 0., 0. ),
				vj : new THREE.Vector2( 0., 0. ),
				vk : new THREE.Vector2( 0., 0. ),
				vm : new THREE.Vector2( 0., 0. ),
				vs : new THREE.Vector2( 0., 0. ),
				pc : new THREE.Vector2( 0., 0. ),
				npx : new THREE.Vector2( 0., 0. ),
				nnx : new THREE.Vector2( 0., 0. ),
				npy : new THREE.Vector2( 0., 0. ),
				nny : new THREE.Vector2( 0., 0. )
			};
			this.blobPos = new THREE.Vector2( 0., 0. );
			this.blobVel = new THREE.Vector2( 0., 0. );

			// let c0 = new THREE.Color( '#ede0dd' );
			// let c0 = new THREE.Color( '#e3d2ce' );
			// console.log( c0 );

		}

		async postConstructor() {
			// console.log( 'WGLCell.postConstructor' );
			let a0 = [], a1 = [], t0, t1;

			await this.svgTexture.upadeteDocument();
			// console.log( this.svgTexture  );
			// CubeTexture( images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
			t0 = new THREE.CubeTexture( [ 
				this.childContexts[ 'px' ].getFrame(),
				this.childContexts[ 'nx' ].getFrame(),
				this.childContexts[ 'py' ].getFrame(),
				this.childContexts[ 'ny' ].getFrame(),
				this.childContexts[ 'pz' ].getFrame(),
				this.svgTexture.data.image
			], THREE.CubeRefractionMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping );

//*/
			
			// console.log( document.getElementById( 'containerDebug' ) );
			// console.log( this.childContexts[ 'nx' ] );
			// document.getElementById( 'containerDebug' ).appendChild( this.childContexts[ 'nz' ].renderer.domElement );
			// document.getElementById( 'containerDebug' ).appendChild( this.svgTexture.data.image );


			// t0.encoding = THREE.sRGBEncoding;
			t0.flipY = !1;
			t0.needsUpdate = !0;
			this.textures[ 'cubeHigh' ] = t0;
			// console.log( this.textures['cubeHigh'] );

			a1 = [];
			//.image.cloneNode()
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			a1.push( this.controller.textures['noiseGeneral'].image.cloneNode() );
			t1 = new THREE.CubeTexture( a1, THREE.CubeRefractionMapping, THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping );
			// t0.encoding = THREE.sRGBEncoding;
			// t1.flipY = !0;
			t1.generateMipmaps = !0;
			t1.needsUpdate = !0;
			this.textures[ 'cubeLow' ] = t0;

			this.addMaterial( 'main', {}, null, this.fragmentShader );
			this.createScene( 'main' );
			this.flgUndone = !1;
			// window.addEventListener( "mousemove", evt => { this.onMouseMove( evt ); } );
			// this.container.addEventListener( "mousemove", evt => { this.onMouseMove( evt ); } );
			// this.container.childNodes[1].addEventListener( "mousemove", evt => { this.onMouseMove( evt ); } );
			// console.log( this.container.childNodes[1] );
			this.containerSizeTarget.addEventListener( "mousemove", evt => { this.onMouseMove( evt ); } );
			// console.log( this.containerSizeTarget );
			// this.container.addEventListener( 'mousemove', this.onMouseMove );
			// console.log( this.container.onmousemove );

		}

		async updateSvgSnapshot() {
			await this.svgTexture.upadeteDocument( this.text );
		}

		addMaterial( n, props, vs, fs ) {
			// console.log( 'wglctxCell.addMaterial' );
			super.addMaterial( n, props, vs, fs );

			// console.log( this.materials );
			// this might be unsafe
			// console.log( this.ctxSize );
			this.setUniform( n, 'uRes', this.ctxSize );
			this.setUniform( n, 'uColk0', new THREE.Vector3( .008, .203, .293 ) );
			this.setUniform( n, 'uColk1', new THREE.Vector3( .527, .906, .934 ) );
			this.setUniform( n, 'uColc', new THREE.Vector3( .488, .726, .707 ) );
			// this.setUniform( n, 'uDifH', this.parent.textures[ 'cubeHigh' ] );
			// this.setUniform( n, 'uDifL', this.parent.textures[ 'cubeHigh' ] );
			// this.setUniform( n, 'uNoise', this.parent.textures[ 'noiseGeneral' ] );
			this.setUniform( n, 'uDifH', this.textures[ 'cubeHigh' ] );
			this.setUniform( n, 'uDifL', this.textures[ 'cubeLow' ] );
			this.setUniform( n, 'uNoise', this.controller.textures[ 'noiseGeneral' ] );

			this.setUniform( n, 'uMouse', new THREE.Vector2( .0, .0  ) );
		}

		getMouseVector() {
			// console.log( ZMath.clamp( 2, 0, 1 ) );
			let V = this.mouseVectors;
			// repulsor radius
			const uR = .15;
			// distance (influence really) from repulsor to field minimum 
			const RR = .84;
			//  side shape strength coeficient; higher - more pronounced
			const SK = .9;
			let d, dpx, dnx, dpy, dny, ax, ay, dcp;
			
			V.pc.copy( V.p ).clampScalar( -.5, .5 );
			
			if ( V.p.distanceTo( V.pc ) > .0001 ) {
				V.v.copy( V.p ).negate();
				return V,v;
			} 
		
			// change this to get a new vector field
			d = V.p.distanceTo( V.m );
			V.v = V.pc.negate().sub( V.m.multiplyScalar( V.m.distanceTo( V.C ) * .72 ) );
			V.pc.negate();
			V.vm.subVectors( V.pc, V.m );
			V.v.lerpVectors( V.vm, V.v, ZMath.smoothstep( 0., RR, d ) );
			V.vm.multiplyScalar( 10. );
			V.v.lerpVectors( V.vm.multiplyScalar( 10. ), V.v, ZMath.smoothstep( 0., uR, d * .9 ) );
		
			V.npx.set( .5, V.pc.y );
			V.nnx.set( -.5, V.pc.y );
			V.npy.set( V.pc.x, .5 );
			V.nny.set( V.pc.x, -.5 );
		
			dpx = V.pc.distanceTo( V.npx );
			dnx = V.pc.distanceTo( V.nnx );
			dpy = V.pc.distanceTo( V.npy );
			dny = V.pc.distanceTo( V.nny );
		
			ax = SK + Math.cos( V.pc.y * Math.PI * 5.5 ) * .025;
			ay = SK + Math.cos( V.pc.x * Math.PI * 7.5 ) * .025;
		
			V.vs.copy( V.pc );
			V.vs.lerpVectors( V.vs, V.npx, ZMath.smoothstep( ax, 1., dpx ) );
			V.vs.lerpVectors( V.vs, V.nnx, ZMath.smoothstep( ax, 1., dnx ) );
			V.vs.lerpVectors( V.vs, V.npy, ZMath.smoothstep( ay, 1., dpy ) );
			V.vs.lerpVectors( V.vs, V.nny, ZMath.smoothstep( ay, 1., dny ) );
		
			dcp = V.p.distanceTo( V.C );
			V.p.negate();
			V.vs.lerpVectors( V.p, V.vs, ZMath.smoothstep( .35, .62, dcp ) * .5 );
			V.v.lerpVectors( V.p, V.v, 1. - dcp );
			V.v.lerpVectors( V.v, V.vs, ZMath.smoothstep( .175, .72,  dcp ) * .5 );
			V.p.negate();
		
			V.v.normalize();

			let lv = V.v.length();
			let lvs = V.vs.length();
		 
			V.v.normalize().multiplyScalar( ZMath.smoothstep( lv, lvs, ZMath.lerp( lv, lvs, lv ) ) );

			//v *= smoothstep( 0., uR, dcp*.1 );
			// v *= smoothstep( lv, lvs, mix( lv, lvs, lv ) );

			return V.v;
		}

		onMouseMove( evt ) {
			this.mouseVectors.vMouse.set( evt.clientX, evt.clientY );
			// console.log( evt );
		}

		async resize() {
			// console.log( 'WGLCell.resize-0' );
			this.width = this.containerSizeTarget.clientWidth;
			this.height = this.containerSizeTarget.clientHeight;
			this.aspect = this.width / this.height;
			this.mouseVectors.scrSize.set( this.aspect, 1.);
			this.vAspectAdjust.set( this.aspect, 1. );
			// this.ctxSize = new THREE.Vector2( this.width, this.height );
			this.ctxSize.set( this.width, this.height );
			this.flgCtxSizeUpdated = !0;

			// console.log( this.tstSvg );
			// await this.svgTexture.upadeteDocument();
			// document.getElementById( 'containerDebug' ).appendChild( this.tstSvg.data.image );
			// document.getElementById( 'containerDebug' ).appendChild( this.tstSvg.svg );
			// console.log( this.tstSvg.data.image );
			// console.log( 'WGLCell.resize-1' );
			await this.updateSvgSnapshot();

			// console.log( 'WGLCell.resize-2' );
			//	updates cube texture and material
			// console.log( this.textures[ 'cubeHigh' ] );
			// this.textures[ 'cubeHigh' ]._needsFlipEnvMap = !1;
			// this.textures[ 'cubeHigh' ].flipY = !0;
			this.textures[ 'cubeHigh' ].image[ 5 ] = this.svgTexture.data.image;
			this.textures[ 'cubeHigh' ].needsUpdate = !0;
			this.materials[ 'main' ].needsUpdate = !0;


			// this.materials[ 'main' ].needsUpdate = !0;
			// console.log( this.materials[ 'main' ] );

			// console.log( document.getElementById('tst123').clientHeight );
			// console.log( this.containerSizeTarget.clientWidth, this.containerSizeTarget.clientHeight );
			super.resize();
		}

		render() {
			super.render();
			const mv = this.mouseVectors;
			mv.vMouseNorm.set( mv.vMouse.x, this.ctxSize.y - mv.vMouse.y ).divide( this.ctxSize ).subScalar( .5 );
			// console.log( mv.vMouseNorm );
			// mv.p.copy( mv.prevp );
			mv.m.copy( mv.vMouseNorm );
			// console.log( 'before', mv.p.x );
			this.getMouseVector().multiplyScalar( this.controller.clkDelta * .1 );
			// console.log( 'after', mv.p.x );
			// mv.v.y = .0;
			const dpd = mv.v.dot( mv.prevv ) / ( mv.v.length() * mv.prevv.length() );
			// const dp = mv.v.angle( mv.prevv );
			const theta = mv.v.angle( mv.prevv );
			const dp = Math.cos( theta );
			mv.prevv.copy( mv.v );
			// console.log( Math.cos( dp ), dpd );
			// dp > 1.1 && console.log( dp );
			// this.blobVel.add( mv.v.multiplyScalar( mv.vi.lerpVectors(  mv.v, mv.prevv,  Math.cos( dp ) ) ) );
			// this.blobVel.add( mv.vi.lerpVectors(  mv.v, mv.prevv,  Math.cos( dp ) ) );
			// this.blobVel.add( mv.vi.lerpVectors(  mv.v, mv.prevv,  Math.cos( dp ) ).add( mv.vj.lerpVectors( mv.vk.subVectors( mv.prevv, mv.v ), mv.C, Math.cos( dp ) ) ) );
			// this.blobVel.add( mv.vj.lerpVectors( mv.vk.subVectors( mv.prevv, mv.v ), mv.v, Math.cos( dp ) ) );
			
			//the last tested
			// this.blobVel.add( mv.vi.lerpVectors( mv.v, dp <= 0. ? mv.vj.subVectors( mv.prevv, mv.v ).negate() : mv.vj.copy( mv.v ).multiplyScalar( .5 ), Math.abs( dp ) ).multiplyScalar( .01 ) );
			
			// this.blobVel.copy( mv.vi.lerpVectors( mv.v.negate(), dp <= 0. ? mv.vj.subVectors( mv.prevv, mv.v ).negate() : mv.vj.copy( mv.v ).multiplyScalar( .5 ), Math.abs( dp ) ) );
			// vel += mix( v, dp >= 0. ? prevv - v : v * k, abs( dp ) );
			// this.blobVel.copy( mv.v );
			// this.blobVel.lerp( mv.v, .725 );
			this.blobVel.lerp( mv.v.lerp( mv.prevv, .75 ), .1325 );
			// this.blobVel.lerp( mv.v.negate(), .15 );

			// this.blobVel.add( mv.vi.addVectors(  mv.v, mv.prevv ) ).multiplyScalar( .98 );
			// this.blobVel.add( mv.v.multiplyScalar( ( Math.cos( dp ) ) ) );
			// this.blobVel.add( mv.v.multiplyScalar( dp ) );
			mv.p.add( this.blobVel );
			mv.p.clampScalar( -.5, .5 );
			// this.setUniform( 'main', 'uMouse', this.vMouseNorm );
/*
			// DEBUG
			if ( this.dbgcnt < 10 ) {
				console.log( 'frame ', this.dbgcnt );
				console.log( 'theta ', theta );
				console.log( 'cos theta ', dp );
				console.log( 'cos theta alt ', dpd );
				console.log( 'prevv', mv.prevv.x, mv.prevv.y );
				console.log( 'v', mv.v.x, mv.v.y );
				console.log( 'vel',this.blobVel.x, this.blobVel.y );
				this.dbgcnt++;
			}
*/
			const d = mv.p.distanceTo( mv.C );
			// if (  d > .73 ) console.log( 'dist exceeded', d );

			mv.scrSize.set( 11., 2.75 );
			// mv.scrSize.set( .95, 1.5 );
			this.vBlobPos.copy( mv.p ).multiply( mv.scrSize ).multiplyScalar( 1. );
			this.setUniform( 'main', 'uMouse', this.vBlobPos );
			this.materials[ 'main' ].needsUpdate = !0;


			// console.log( this.ctxSize );
			//console.log("ctxMask.render");
			//console.log(this.clkAge);
			//	updating uniforms
			// console.log( this.materials[ 'main' ].uniforms );
			this.materials[ 'main' ].uniforms.uTime.value = this.clkAge * 1e+0;
			this.renderer.render( this.scene, this.camera );
			// console.log( this.materials[ 'main' ].uniforms.uRes );
		}
	}

	class WGLContextCubeSide extends WGLContextOrthoPlane {
		constructor( controller, parent, containerElement, ctxSize, side, props ) {
			super( controller, parent, containerElement, ctxSize, props );
			// this.containerSizeTarget = document.getElementById( this.containerSizeTargetId );
			this.side = side;
			this.dirVec = new THREE.Vector2();
			this.setProperties( props );

			const fs = 
			`
			const float TAU = 6.28318530718;
			const float PI = 3.14159265359;
			const float HALFPI = 1.5707963268;
			const float PIDIV3 = 1.0471975512;
			const float PIDIV6 = 0.5235987756;

			//uniforms
			//vec3 c0 = vec3( .92, .85, .87 );
			uniform vec3 uRes;	
			//	base color
			uniform vec3 uCol0;	
			//	ambient color
			uniform vec3 uCol1;
			// gradient length
			// values: [0.71 .. 1.55]
			uniform float uGL;	// 1.2;
			uniform vec2 uCC;

			IN vec2 vUv;
			
			void main() {
				vec2 uv = vUv;
				float uGL0 = .03;
				float uGL1 = .8;
				vec2 uvi = uCC.x == 1. ? 1. - uv : uv;
				uvi = uCC.y == 1. ? uvi.yx : uvi;
			
				float d = smoothstep( 0., cos( uvi.y * TAU ) * uGL0 + uGL0 + uGL1, uvi.x );
				d = smoothstep( d - .095, 1., d );
			
				vec3 col = mix( uCol1, uCol0, d );
				FRAGCOLOR = vec4( col, 1. );
			}
			`;
			this.setFragmentShader( fs );
			switch( this.side ){
				case 1: this.dirVec.set( 0., 0. ); break;
				case 2: this.dirVec.set( 1., 0. ); break;
				case 3: this.dirVec.set( 0., 1. ); break;
				case 4: this.dirVec.set( 1., 1. ); break;
			}

			this.addMaterial( 'main', {}, null, this.fragmentShader );
			this.createScene( 'main' );
			// console.log( this );

		}

		addMaterial( n, props, vs, fs ) {
			// console.log( 'wglctxCubeSide.addMaterial' );
			super.addMaterial( n, props, vs, fs );
			this.setUniform( n, 'uCol0', this.controller.S.blobCubeMapColBase );
			this.setUniform( n, 'uCol1', this.controller.S.blobCubeMapColAmbient );
			// console.log( this.dirVec );
			this.setUniform( n, 'uCC', this.dirVec );
			this.setUniform( n, 'uGL', this.controller.S.blobCubeMapGradientLength );
		}

		render() {
			super.render();
			//console.log("ctxCubeSide.render");
			// console.log( this.materials['main'].uniforms );
			this.renderer.render( this.scene, this.camera );
		}

	}

	class WGLContextCubeBack extends WGLContextOrthoPlane {
		constructor( controller, parent, containerElement, ctxSize, props ) {
			super( controller, parent, containerElement, ctxSize, props );
			this.containerSizeTarget = document.getElementById( this.containerSizeTargetId );
			this.setProperties( props );

			const fs = 
			`
			const float TAU = 6.28318530718;
			const float PI = 3.14159265359;
			const float HALFPI = 1.5707963268;
			
			const float SQRT2 = 1.41421356237;
			const float ISQRT2 = 0.707106781188;
			const int BLOBNUM = 8;
			
			const vec4 BLOBS[BLOBNUM] = vec4[]( 
				vec4( .5, .5, .75, .4 ), 
				vec4( .35, .63, .19, .32 ), 
				vec4( .27, .47, .42, .135 ), 
				vec4( .47, .32, .3, .155 ),
				vec4( .61, .27, .5035, .202 ), 
				vec4( .72, .27, .15, .12 ), 
				vec4( .76, .41, .05, .14 ), 
				vec4( .65, .71, .25, .19 ) 
			);
			
			const vec3 BLOBCOLS[BLOBNUM] = vec3[]( 
				vec3( .23, .25, .24 ), 
				vec3( .31, 0.37, 0.42 ), 
				vec3( .23, 0.27, .21 ), 
				vec3( .17, .16, .13 ), 
				vec3( .431, 0.323, .325 ), 
				vec3( .31, .28, .21 ), 
				vec3( .2, .21, .19 ), 
				vec3( 1., 1., 1. ) 
			);
			
			const vec3 V = vec3(-1., 1., 0. );

			//	base color
			uniform vec3 uCol0;	
			//	ambient color
			uniform vec3 uCol1;
			uniform float uTexSize;

			void main() {
				// Normalized pixel coordinates (from 0 to 1)
				vec2 uv = gl_FragCoord.xy / uTexSize;
			
				vec3 cbase = uCol0;
				// vec3 camb = vec3( 0. );
				vec3 camb = uCol1;
				vec3 col = vec3( 0. );
			
				// Bloomy lights
				vec4 b;
				float d = 0.;
				float maxstr = 0.;
				float maxd = 0.;
				float medstr = 0.;
				float medd = 0.;
				for ( int i = 0; i < BLOBNUM; i++ ) {
					d = BLOBS[ i ].z;
					medstr += d;
					maxstr = max( d, maxstr );
					d = BLOBS[ i ].w;
					medd += d;
					maxd = max( d, maxd );
				}
				medstr /= float( BLOBNUM );
				medd /= float( BLOBNUM );
				float imedstr = 1. / medstr; 
				float imedd = 1. / medd; 
				float imaxstr = 1. / maxstr; 
				float imaxd = 1. / maxd; 
			
				vec3 ci;
				for ( int i = 0; i < BLOBNUM; i++ ) {
					b = BLOBS[ i ];       
					ci = BLOBCOLS[ i ];
					d = distance( uv, b.xy );// * ISQRT2;
					d = smoothstep( .0, b.w, d );
					col += mix( mix( cbase, ci, .75 ), camb, d ) * b.z * imedstr;
				}
				col = clamp( col, 0., 1. );
			
				FRAGCOLOR = vec4( col, 1. );
			}
			`;
			this.setFragmentShader( fs );			

			this.addMaterial( 'main', {}, null, this.fragmentShader );
			this.createScene( 'main' );

		}

		addMaterial( n, props, vs, fs ) {
			// console.log( 'wglctxCubeBack.addMaterial' );
			super.addMaterial( n, props, vs, fs );
			this.setUniform( n, 'uCol0', this.controller.S.blobCubeMapColBack );
			this.setUniform( n, 'uCol1', this.controller.S.blobCubeMapColAmbient );
			this.setUniform( n, 'uTexSize', this.controller.S.blobCubeMapRes );
		}

		render() {
			super.render();
			//console.log("ctxCubeSide.render");
			this.renderer.render( this.scene, this.camera );
		}

	}

	/*
	 SVG Texture
		controller	controller object
		parent		owner object
	 	svgElement	SVG document; 
	 	ctxSize		THREE.Vector2( width, height )
	Output:
	  	THREE.Texture with rendered
	*/
	//	TODO: add fill option
	class SVGTexture {
		constructor( controller, parent, svgElement, ctxSize ) {
			this.flgResizable = !1;
			//	all sizes (svg, img, canvas) are the same
			this.parent = parent;
			this.controller = controller;
			this.XMLS = this.controller.XMLS;
			this.data = void 0;
			// this.svgSize = ctxSize;
			this.ctxSize = ctxSize;
			// console.log( ctxSize );
			this.svgSize = new THREE.Vector2();
			this.imgSize = new THREE.Vector2();
			this.cnvSize = new THREE.Vector2();
			this.texSize = new THREE.Vector2();

			this.canvas = document.createElement( "canvas" );
			this.ctx = this.canvas.getContext( "2d" );
			this.img = document.createElement( "img" );
			//	if true svg(s) will be generated, otherwise svgElement will be used
			this.flgGeneratedSvg = !1;

			this.flgMultiSvg = !1;
			// console.log( svgElement );
			if ( svgElement ) {
				this.svg = svgElement.cloneNode( !0 );
			}
			else {
				//	for alternate svgs
				this.svgs = {};
				this.activeSvgId = '';
				this.flgGeneratedSvg = !0;
			}


			// console.log( this.copySvg );
			// this.svg = document.getElementById( this.svgId );
		}

		//	when you absolutely need to create svg from scratch
		createSvg() {}

		setSize() {
			// console.log( 'svgTex.setSize' );
			//	by default all sizes are equal
			this.svgSize.copy( this.ctxSize );
			this.imgSize.copy( this.ctxSize );
			this.cnvSize.copy( this.ctxSize );
			this.texSize.copy( this.ctxSize );
		}

		async upadeteDocument( svgId ) {
			// console.log( 'svgTexture.updateDocument' );
			// console.log( this.width, this.height );

			this.setSize();
			this.canvas.width = this.cnvSize.x;
			this.canvas.height = this.cnvSize.y;

			// this.svg.setAttribute( "width", this.width );
			// this.svg.setAttribute( "height", this.height );
			this.svg.setAttribute( "width", this.svgSize.x );
			this.svg.setAttribute( "height", this.svgSize.y );

			// console.log( this.svg );
			return new Promise( resolve => {
				// console.log( 'svgTexture.upadeteDocument Promise' );
				let svgData = this.XMLS.serializeToString( this.svg );
				//let img = this.img;
				this.img.setAttribute( "src", "data:image/svg+xml;base64," + window.btoa( unescape( encodeURIComponent( svgData ) ) ) );
				
				this.img.width = this.imgSize.x;
				this.img.height = this.imgSize.y;
				const that = this;
				

				this.img.onload = () => {
					
					//	testing
					//document.getElementById( that.parent.S.containerLoaderId ).appendChild( img );
					// document.getElementById( 'containerDebug' ).appendChild( that.svg );
					//document.getElementById( that.parent.S.containerLoaderId ).appendChild( that.canvas );
					//img = document.getElementById( "tstimg0" );			

					// void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);		
					// that.ctx.drawImage( that.img, 0, 0 );
					that.ctx.drawImage( that.img, 0, 0, this.imgSize.x, this.imgSize.y, 0, 0, this.texSize.x, this.texSize.y );
					// let texture = new THREE.Texture( that.canvas );
					let t = new THREE.CanvasTexture( that.canvas );
					t.needsUpdate = !0;

					that.data = t;
					// console.log( 'svgTexture.upadeteDocument Promise resolved' );

					//	testing
					// document.getElementById( "containerContent" ).appendChild( that.canvas );
					// document.getElementById( "containerContent" ).appendChild( that.img );
					resolve();
					return that;
				}
			} );
		}
	}

	class SVGTextureCurtains extends SVGTexture {
		constructor( controller, parent, svgElement, ctxSize, text ) {
			super( controller, parent, svgElement, ctxSize );

			this.flgArabicText = !1;
			this.arabicAlphabetDigits = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|[\u0200]|[\u00A0]/g;

			this.flgGeneratedSvg = !0;
			// this.flgMultiSvg = !1;
			this.maxStrLineLen = 25;
			this.fontSize = this.controller.S.maskDefaultFontSize;
			//	font size units
			this.funits = 'px';
			
			this.text = text;

			if ( !this.flgGeneratedSvg ) {
				
				let e = this.svg.getElementById( 'txt' );
				e && e.appendChild( document.createTextNode( text ) );
			}
			else {
				// console.log( 'create svg' );
				this.createSvg();
			}

			// let tststr = 'مرحبا';
			let tststr = 'مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا';
			// console.log( tststr.split( ' ' ) );
			//	testing
			// console.log( this.svg );
			// console.log( SVGU.test() );
			// console.log( SVGU.test() );

			// this.createSvg();

		}

		createSvg() {
			super.createSvg();
			const ns = "http://www.w3.org/2000/svg"
			const doc = new Document();
			// console.log( doc );
			const s = document.createElementNS( ns, "svg");
			s.setAttribute( 'xmlns', ns );
			s.setAttribute( 'style', 'background-color: #' + this.controller.S.maskBGColor.getHexString() + ";" );
			s.setAttribute( 'width', '100%' );
			s.setAttribute( 'height', '100%' );
			const t = document.createElementNS( ns, 'text' );
			t.setAttribute( 'id', 'txt' );
			t.setAttribute( 'x', '50%' );
			t.setAttribute( 'y', '50%' );
			// console.log( this );
			// console.log( this.fontSize + this.funits );
			const str = this.fontSize + this.funits;
			// t.setAttribute( 'font-size', this.fontSize + this.funits );
			t.setAttribute( 'font-size', str );
			// console.log ( t.getAttribute( 'font-size' ) );
			// t.setAttribute( 'style', 'font-family: arial,helvetica,sans-serif; fill: white; opacity: 1; dominant-baseline: middle; text-anchor: middle; text-align: center;' );
			t.setAttribute( 'style', 'font-family: arial,helvetica,sans-serif; fill: white; opacity: 1; dominant-baseline: middle; text-anchor: middle;' );
			const ts0 = document.createElementNS( ns, 'tspan' );
			ts0.setAttribute( 'id', 'r0' );
			ts0.setAttribute( 'dy', '0px' );
			ts0.appendChild( document.createTextNode( '' ) );
			const ts1 = document.createElementNS( ns, 'tspan' );
			ts1.setAttribute( 'id', 'r1' );
			ts1.setAttribute( 'x', '50%' );
			// console.log( this.fontSize );
			// console.log( str );
			// console.log( this.fontSize, this.funits );
			// console.log( this.fontSize.toString() + this.funits );
			// ts1.setAttribute( 'dy', this.fontSize + this.funits );
			ts1.setAttribute( 'dy', str );
			ts1.appendChild( document.createTextNode( '' ) );
			t.appendChild( ts0 );
			t.appendChild( ts1 );
			s.appendChild( t );
			doc.appendChild( s );

			// console.log( doc.getElementById( 'txt' )  );
			// console.log( s );
			this.svg = s;
		}

		setFontSize() {
			// const a = window.innerHeight / window.innerWidth;
			this.flgArabicText = this.arabicAlphabetDigits.test( this.text );
			const a = window.innerWidth / window.innerHeight;
			//this.fontSize = ( this.controller.S.maskSize * a ) / 18.5;

			let tmp = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
			
			this.fontSize = tmp / 15 - ( (tmp - 1240) / 15.8 );
			
			

			// console.log(window.innerWidth, window.innerHeight, this.fontSize, '------------');
			

		}

		updateText() {
			this.setFontSize();

			if ( this.flgGeneratedSvg ) {
				// console.log( this.svg );
				// console.log( this.svg.querySelector( '#' ) );
				this.svg.getElementById( 'txt' ).setAttribute( 'font-size', this.fontSize + this.funits );
				// console.log( this.text.length, this.maxStrLineLen );
				if ( this.text.length > this.maxStrLineLen && !this.flgArabicText ) {
				// if ( this.text.length > this.maxStrLineLen ) {
					const a = this.text.split( ' ' );
					let i, l;
					for ( i = l = 0; i < a.length ; i++, l++ ) {
						l += a[ i ].length;
						if ( l >= this.maxStrLineLen ) break;
					}
					// console.log( a );
					let e = this.svg.getElementById( 'r0' );
					// console.log( a.slice( 0, i ).join( ' ' ));
					// console.log( a.slice( i ).join( ' ' ));
					// const space = this.flgArabicText ? '\u061c' : ' ';
					// const space = ' ';
					e.childNodes[ 0 ].nodeValue = a.slice( 0, i ).join( ' ' );
					e.setAttribute( 'dy', ( -this.fontSize * .5 ) + this.funits );
					e = this.svg.getElementById( 'r1' );
					e.childNodes[ 0 ].nodeValue = a.slice( i ).join( ' ' );
					e.setAttribute( 'dy', this.fontSize + this.funits );

				}
				else {
					const e = this.svg.getElementById( 'r0' );
					e.childNodes[ 0 ].nodeValue = this.text;
					e.setAttribute( 'dy', '0' + this.funits );
					this.svg.getElementById( 'r1' ).childNodes[ 0 ].nodeValue = '';
				}
				//console.log( this.svg );
			}
			else {
				this.svg.getElementById( 'txt' ).childNodes[ 0 ].nodeValue = this.text;
			}
		}

		async upadeteDocument( text ) {
			text && ( this.text = text );
			// console.log( this.svg );
			// console.log( this.svg.getElementById('txt') );
			this.updateText();
			await super.upadeteDocument();
		}
	}

	class SVGTextureCubeFront extends SVGTexture {
		constructor( controller, parent, svgElement, ctxSize ) {
			super( controller, parent, svgElement, ctxSize );
			// document.getElementById( this.controller.S.blobSvgCubeId ).cloneNode( !0 );
			const e = document.getElementById( this.controller.S.containerFooterId ).cloneNode( !0 );
			this.cnvSize.copy( this.ctxSize );
			this.texSize.copy( this.cnvSize );
/*
			this.innerSize = document.getElementById( this.controller.S.containerFooterId ).getBoundingClientRect();
			console.log( this.innerSize );
			let iw, ih, ir;
			iw = this.innerSize.width;
			ih = this.innerSize.height;
			if ( iw > ih ) {
				ir = this.width / iw;
			}
			else {
				ir = this.height / iw;
			}
			iw *= ir;
			ih *= ir;
*/

			let sheet = document.getElementById( 'globalCss' ).sheet;
			// console.log( sheet.cssRules.length );
			let styleStr = '';
			for( let i = 0, l = sheet.cssRules.length; i < l; i++ ) {
				styleStr += sheet.cssRules[i].cssText;
			}
			let s = document.createElement('style');
			styleStr += ' .footer .section-content {transform: rotateY(180deg);}';
			// styleStr += ' body { background-color: safnk}';
			// styleStr += 'svg { background-size: 100% auto; }';
			// styleStr += ' * { color: red; stroke-color: red; }';
			s.innerHTML = styleStr;
			// document.body.appendChild(sheet);

			// console.log( styleStr );
/*
			console.log( iw, ih );
			console.log( this.width, this.height );
			let ox, oy;
			ox = ( this.width - iw ) *.5;
			oy = ( this.height - ih ) *.5;
*/
			let b = document.createElement( 'body' );
			let h = document.createElement( 'head' );
			let d = document.createElement( 'div' );
			//	letterbox div in foreign object
			this.ltbDiv = d;

			// this.setSize();

			// d.style.left = ox+ "px";
			// d.style.top = oy + "px";
			d.style.verticalAlign = "middle";
			// b.style.backgroundColor = "#e3d2ce";
			b.style.backgroundColor = "#" + this.controller.S.blobCubeMapColBase.getHexString();
			d.style.position = "fixed";
			// d.style.width = iw + 'px';
			// d.style.width = '100%';
			// d.style.width = '703px';
			// d.style.height = ih + 'px';
			// div { top: 50%; transform: translateY(-50%) }
			// d.style.transform = "translateY(-0%)";
			// d.style.position = "absolute";
			// d.style.float = "left";
			// this.innerSize = document.getElementById( 'containerFooter' ).getBoundingClientRect();

			// e.style.width = iw + 'px';
			// e.style.width = '703px';
			// e.style.width = '100vw';
			e.style.width = '100vw';
			// e.style.height = ih + 'px';
			// b.style.width = iw + 'px';
			// b.style.height = ih + 'px';
			// b.style.width = "100vw";
			// b.style.height = "100vh";
			b.style.width = "100vw";
			b.style.height = "100vh";
			// b.style.backgroundColor = this.controller.S.blobCubeMapColBase.getStyle();

			h.appendChild( s );
			d.appendChild( e );
			b.appendChild( d );
			// console.log( this.svg );
			let f = this.svg.getElementById( 'svgCubeFrontFO' );
			//	does not work; getter only 
			// f.width = iw;
			// f.height = ih;
			// f.style.width = this.innerSize.width;
			// f.style.height = this.innerSize.height;
			// f.style.width = iw;
			// f.style.height = ih;
			f.appendChild( h );
			f.appendChild( b );
			// this.svg.getElementById( 'focontainer' ).style.width = this.innerSize.width;
			// this.svg.getElementById( 'focontainer' ).style.height = this.innerSize.height;

			// console.log( this.svg ); 

		}

		setSize() {
			super.setSize();
			// console.log( 'svgTexCubeFront.setSize' );

			let bb = document.getElementById( this.controller.S.containerFooterId ).getBoundingClientRect();
			// console.log( bb );

			let s = Math.max( bb.width, bb.height );

			this.svgSize.set( s, s );
			this.imgSize.set( s, s );

			let ox, oy;
			ox = ( s - bb.width ) *.5;
			oy = ( s - bb.height ) *.5;
			// console.log( ox, oy, s );

			this.ltbDiv.style.left = ox + "px";
			this.ltbDiv.style.top = oy + "px";
		}

		async upadeteDocument() {
			// this.width = 1024;
			await super.upadeteDocument();
		}
	}

	class WGLTextureManager {
		conatructor( controller, parent ) {
			// textures accessed by name
			this.namedTextures = {};
			// textures accessed by checksum
			this.cachedTextures = {};
		}
	}

	/*
		Controller class for WGL contexts

	*/
	class WGLController {

		constructor( settings, shaders, shaderChunks ) {
			// console.log( this.constructor.name );
			this.XMLS = new XMLSerializer();
			// this.svgTexture = null;
			this.S = settings;
			this.S = new Settings( settings );
			let S = this.S;
			this.settings = S;
			this.WGLContexts = {};
			this.flgAllStopped = !0;
			this.flgNoWGL = !1;

			//	TODO: finish /test this
			//determine WGL context type
			let gl = document.createElement('canvas').getContext('webgl2');
			if ( !gl ) {
				this.WGLType = WGL1;
				// console.log( typeof WebGL2RenderingContext );
				if ( typeof WebGL2RenderingContext !== 'undefined' ) {
					// console.warn('Your browser appears to support WebGL2 but it might be disabled. Try updating your OS and/or video card drivers');
				}
				else {
					gl = document.createElement('canvas').getContext('webgl');
					if ( !gl ) {
						//	TODO:	handle no WGL
						// console.error('your browser has no WebGL2 support at all'); 
						this.WGLType = NOWGL;
						this.flgNoWGL = !0;
					}
					else {
						this.WGLType = WGL1;
					}
				}
			}
			else {
				// console.log('webgl2 works!');
				this.WGLType = WGL2;
			}
			this.WGLType = WGL1;


			// this.texLoader = new THREE.TextureLoader();
			this.textures = {};
			this.textureCache = {};
			this.shaders = shaders;
			this.shaderChunks = shaderChunks;
			// console.log( this.shaders );

			this.clock = new THREE.Clock();

/*
			this.video = document.getElementById( S.videoId );
			//this.video.playBackSpeed = .2;
			this.video.play();
			//console.log( this.video.playBackwards );
			//this.video.pause();
			this.t	extures[ 'diffuse0' ] = new THREE.VideoTexture( video );
			//this.textures[ 'diffuse1' ] = new THREE.Texture( document.getElementById( "tstimg0" ) );
			this.textures[ 'diffuse1' ] = new THREE.TextureLoader().load( "textures/difTst0.jpg" );
*/
			//	uniforms for diffuse texture
			//this.uniforms0 = this.materials[ 'planeMask' ].uniforms;

			//	creating textures from img 
			this.createTextureFromImgElementId( "noiseMask", this.S.texNoiseMaskId );
			this.createTextureFromImgElementId( "noiseMask2", 'texNoise2' );
			this.createTextureFromImgElementId( 'noiseGeneral', this.S.texNoiseGeneralId );
			this.createTextureFromImgElementId( 'tst0', 'texCube' );

			window.addEventListener( 'resize', () => { this.resize() }, !1 );

		}	//constructor

		createTextureFromImgElementId( texName, tagId ) {
			let t = new THREE.Texture();
			t.image = document.getElementById( tagId );
			// console.log( t.image );
			// console.log( t );
			t.wrapS = t.wrapT = THREE.RepeatWrapping;
			t.version = 1;
			t.format = THREE.RGBFormat;
			this.textures[ texName ] = t;
		}

		// TODO: write separate texture manager and move appropriate methods there
		getNamedTexture() {

		}

		createTextureFromImgElement( e ) {

		}

		createTextureFromVideoElement( e ) {
			
		}

		//	accepts img or video as attribute
		addTextureFromElement( e ) {
			const ntype = e && e.nodeName ? e.nodeName : null;
			switch ( ntype ) {
				case 'IMG':
					break;

				case 'VIDEO':
					break;

				default:
					// console.error( this.constructor.name );
			}
		}

		//	only pauses, for resume call start()
		pause() {
			this.flgPaused = !1;
			this.video.pause();
			return "intro paused";
		}

		async resize() {
			// console.log( 'WGLCtrl.resize' );
			// console.log( document.getElementById( this.S.containerMaskId ).getBoundingClientRect() );
			this.checkAllStopped();
			if ( !this.flgAllStopped ) {
				for ( let i in this.WGLContexts ) {
					// console.log( 'WGLCtrl.context', i, this.WGLContexts[ i ].flgActive );
					if ( this.WGLContexts[ i ].flgActive ) {
						await this.WGLContexts[ i ].resize();
					}
				}
			}
		}

		render() {
			//console.log( 'ctrl.render' );
			this.checkAllStopped();
			this.flgAllStopped; //&& console.log( 'all contexts inactive' );

			if ( !this.flgAllStopped ) {
				this.animFrameReqId = requestAnimationFrame( () => this.render() );
				// console.log( this.animFrameReqId );
				this.clkDelta = this.clock.getDelta();
				// console.log(this.clkDelta);
				for ( let i in this.WGLContexts ) {
					if ( this.WGLContexts[ i ].flgActive ) {
						this.WGLContexts[ i ].render();
					}
				}
			} 
			else {
				// console.log( "cancelling animationFrame" );
				this.clock.stop();
				cancelAnimationFrame( this.animFrameReqId );
			}
		}

		checkAllStopped() {
			// console.log( "running WGLController.checkAllStopped" );
			// console.log( "checkAllStopped", "this.flgAllStopped", this.flgAllStopped );
			this.flgAllStopped = !0;
			for ( let i in this.WGLContexts ) {
				if ( this.WGLContexts[ i ].flgActive ) {
					// console.log( "ctx", i, " active" );
					this.flgAllStopped = !1;
					break;
				} 
				//this.flgAllStopped = !this.WGLContexts[ i ].flgActive );
			}
			// this.clkDelta = 0;
			this.flgAllStopped; //&& console.log( "All contexts stopped" );
		}

		async checkRenderStatus() {
			// console.log( "running WGLController.checkRenderStatus" );
			// console.log( 'WGLCtrl.flgAllStopped', this.flgAllStopped );
			if ( this.flgAllStopped ) {
				!this.clock.running && this.clock.start();
				// console.log( "resuming WGLController.render" );
				this.flgAllStopped = !1;
			}
			if ( !this.flgAllStopped ) {
				await this.resize();
				this.render();
			}
		}

		hideLayer( e ) { e.classList.add( this.S.cssClassHidden ); }

		unhideLayer( e ) { e.classList.remove( this.S.cssClassHidden ); }

		playCell() {
			this.WGLContexts["cell"].flgActive = !0;
			this.checkRenderStatus();
		}

		pauseCell(){
			this.WGLContexts["cell"].flgActive = !1;
		}

		prepareCell(){
			return new Promise( async resolve => {
				// console.log( 'preparing cell anim' );
				this.WGLContexts["cell"] = new WGLContextCell( this, this, document.getElementById( this.S.containerCellId ), void 0 );
				// this.WGLContexts["cell"].resize();
				await this.WGLContexts["cell"].postConstructor();
				resolve();
			} );
		}

		async transitTo( text, imgurl ) {
			// console.log( 'TransitTo:', text, imgurl );
			// this.flgAllStopped = !1;
			let c = this.WGLContexts["mask"];
			c.text = text;
			// console.log( c.text );
			// await c.updateSvgSnapshot( text );
			c.flgPlayDirFwd = !1;
			c.flgTransition = !0;
			c.flgActive = !0;
			c.clkAge = 0;
			// console.log( c );
			// this.checkAllStopped();
			this.unhideLayer( c.container );
			await this.checkRenderStatus();
		}

		finishTransit(){
			// console.log( 'finishing Transit' );
			let c = this.WGLContexts["mask"];
			if ( c.flgActive ) {
				c.flgPlaybackAfter = !0;
			}
			else {
				c.flgPlayDirFwd = !0;
				c.flgActive = !0;
				this.checkRenderStatus();
			}
		}

		async playIntro() {
			// console.log("intro");
			// await this.prepareCell();
			//	pause animation before reading 
			//	.unpauseAnimatins() to play animations again
			document.getElementById( "svgIntro" ).pauseAnimations();
			this.hideLayer( document.getElementById( this.S.containerCurtainsId ) );

			let t = document.getElementById( "svgIntro" ).getElementById( "varCurAnimText" ).getAttributeNS( null, "value" );
			this.WGLContexts[ "mask" ] = new WGLContextMask( this, this, document.getElementById( this.S.containerMaskId ), void 0, t );
			// this.WGLContexts[ "mask" ] = new WGLContextMask( this, this, document.getElementById( this.S.containerMaskId ).cloneNode( !0 ), void 0, t );
			// document.getElementById( this.S.containerMaskId ).remove();
			this.WGLContexts[ "mask" ].flgActive = !0;

			// console.log('intro: start render');
			await this.checkRenderStatus();

			//	hide intro svg
			this.hideLayer( document.getElementById( this.S.containerLoaderId ) );
		}

	};

	function onBtnPauseCell( event ) {
		WGLCtrl.pauseCell();
	}

	function onBtnPlayCell( event ) {
		WGLCtrl.playCell();
	}

	function onBtnTrans0( event ) {
		WGLCtrl.transitTo( "Home", 'imgUrlHome' );
		window.setTimeout( () => { WGLCtrl.finishTransit(); }, 200 + Math.round( Math.random() * 1e2 ) );
	}

	function onBtnTrans1( event ) {
		// console.log('tst');
		// console.log( event.target.id );
		let tststr = 'مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا مرحبا';
		tststr = 'أصل امسيل و العلاج الخلوي'+'أصل امسيل و العلاج الخلوي';
		// tststr = "asdfhg fashdth ghafdh hjafj hafgd";
		// WGLCtrl.transitTo( "About", "imgUrlAbout" );
		WGLCtrl.transitTo( tststr, "imgUrlAbout" );
		window.setTimeout( () => { WGLCtrl.finishTransit(); }, 1200 + Math.round( Math.random() * 1e2 ) );
	}

	function onBtnTrans2( event ) {
		// console.log('TRANS2 clicked');
		// console.log( "onBtnTrans2: ", 'WGLContexts["mask"].flgActive=', WGLCtrl.WGLContexts["mask"].flgActive );
		// console.log( "onBtnTrans2: ", 'WGLCtrl.flgAllStopped=', WGLCtrl.flgAllStopped );
		WGLCtrl.transitTo( "Hail Satan!))", "imgUrlSatan" );
		window.setTimeout( () => { WGLCtrl.finishTransit(); }, 200 + Math.round( Math.random() * 1e2 ) );
	}

	function md5tst(){
		//NORMAL words
		var value = 'test';
		var result = MD5(value);
		// console.log('hash -  normal words: ' + result);
/*
		var value = 'test0';
		var result = MD5(value);
		console.log('hash -  normal words: ' + result);
		var value = 'test1';
		var result = MD5(value);
		console.log('hash -  normal words: ' + result);
		var value = 'test2';
		var result = MD5(value);
		console.log('hash -  normal words: ' + result);
*/
		//NON ENGLISH words
		value = 'מבחן'

		//unescape() can be deprecated for the new browser versions
		result = MD5(unescape(encodeURIComponent(value)));

		//document.body.innerHTML += '<br><br>hash - non english words: ' + result;
		// console.log('hash - non english words: ' + result);
	}

	async function test(){
		document.getElementById( "btnPauseCell" ).addEventListener( "click", onBtnPauseCell );
		document.getElementById( "btnPlayCell" ).addEventListener( "click", onBtnPlayCell );
		document.getElementById( "btnTrans0" ).addEventListener( "click", onBtnTrans0 );
		document.getElementById( "btnTrans1" ).addEventListener( "click", onBtnTrans1 );
		document.getElementById( "btnTrans2" ).addEventListener( "click", onBtnTrans2 );

		//	PlayIntro
		// window.setTimeout( () => { WGLCtrl.playIntro() }, 1000 + Math.round( Math.random() * 1e3 ) );
		window.WGLCtrl.playIntro();
	
	}

window.addEventListener( 'load', () => {
	md5tst();	//FOR TESTING
	window.WGLCtrl = new WGLController( DEFAULTSETTINGS, SHADERS, SHADER_CHUNKS );
	// window.WGLCtrl.WGLType == WGLNONE;
	//test();		//FOR TESTING
} );

} )( window, document );
