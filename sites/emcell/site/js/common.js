
  

  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js');
  }
    

  var isMobile = {
          
          Android: function() {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function() {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function() {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function() {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function() {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function() {
              return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
          }
          
   };
   
   
   

   
  if( isMobile.any() ) {
    $("body").addClass("mobile");
  }
  
  var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  if (isSafari) { 
    document.getElementsByTagName('body')[0].classList.add('safari');
  };

 
 var mobile = isMobile.any() ? true : false;


 var headMenuAlwaysHide, headAlwaysBlack;
 var mlbDarkMarker = false, firstStartMarker = true;
 
  
  $(window).bind('load', function() {
    $("body").addClass("baseLoaded");   

    //yt_player = new YT.Player('ytPlayer0'); // documentary film youtube

    setTimeout(function(){
      if( (mobile && windowWidth <= minimalWidthMainMenuAlwaysVisible) || headMenuAlwaysHide ) {
        document.getElementsByTagName('body')[0].classList.add('headMenuHide');
      }

      if( headAlwaysBlack ) {
        $('.mainmenu-logo-booking').addClass('mlb-dark');
      }

    }, 2400);

    if(mobile) {
      document.getElementById('mhMenu0').style.cssText = 'display:none';
    }
    
     

  });






////// Main menu


  var minimalWidthMainMenuAlwaysVisible = 900;


  class mainMenu {
    constructor(el) {
      this.opened = false;
      this.animationCurrentTime = false;
      this.mainMenuBtn = document.getElementById('mainMenuBtn');
      this.init();
    }

    init() {

      
      var s = Snap( document.getElementById('mainmenuSVG') );
      var s2 = Snap( document.getElementById('mainmenuSVG2') );
      var s3 = Snap( document.getElementById('mainmenuSVG3') );
        this.pathEl = s.select( 'path' );
        this.pathEl2 = s2.select( 'path' );
        this.pathEl3 = s3.select( 'path' );
        this.paths = { 
          reset : this.pathEl.attr( 'd' ),
          open : 'M1280,450c0,0-197.4,0-640,0S0,450,0,450V0h1280V450z',
          reset2 : this.pathEl2.attr( 'd' ),
          open2 : 'M1280,1277.7c0,0-197.4,0-640,0s-640,0-640,0V0h1280V1277.7z',
          reset3 : this.pathEl3.attr( 'd' ),
          open3 : 'M1280,1277.7c0,0-197.4,0-640,0s-640,0-640,0V0h1280V1277.7z'
        };
      

      this.mainMenuBtn.addEventListener('click', () => {

        if(!this.animationCurrentTime) {
          if(this.opened) {
            this.closeMenu();
          }
          else {
            this.openMenu();
          }
        }

      });
    }

    openMenu() {
      const that = this;
      this.opened = true;
      this.animationCurrentTime = true;
      $("body").addClass("opened-menu");

      if( windowWidth > 900 ) {
        
        this.pathEl.stop().animate( { 'path' : that.paths.reset }, 350, mina.easeout, function() {
          that.pathEl.stop().animate( { 'path' : that.paths.open }, 800, mina.easeinout );
        } );

      }
      else if( windowWidth > 600 ) {
        
        this.pathEl2.stop().animate( { 'path' : that.paths.reset2 }, 350, mina.easeout, function() {
          that.pathEl2.stop().animate( { 'path' : that.paths.open2 }, 800, mina.easeinout );
        } );
      }
      else {
        this.pathEl3.stop().animate( { 'path' : that.paths.reset3 }, 350, mina.easeout, function() {
          that.pathEl3.stop().animate( { 'path' : that.paths.open3 }, 800, mina.easeinout );
        } );
      }


      document.querySelectorAll('ul.mo-navigation-menu, ul.mo-contacts, ul.mo-social').forEach((el) => {
        el.style.cssText = '';
      });


      
      var tl = anime.timeline({
        easing: 'easeOutBack'
      });

      if(windowWidth > 570) {
        tl.add({
          targets: 'ul.mo-navigation-menu li',
          duration: 1300,
          delay: function(el, i, l) {
            return 700 + ( (l - i) * 50);
          },
          opacity: [0, 1],
          rotate: ['4deg', 0],
          translateY: ['-100px', 0]
        });

        tl.add({
          targets: 'ul.mo-contacts li',
          duration: 1300,
          delay: function(el, i, l) {
            return 800 + ( (l - i) * 50);
          },
          opacity: [0, 1],
          rotate: ['4deg', 0],
          translateY: ['-100px', 0]
        }, 0);

        tl.add({
          targets: 'ul.mo-social li',
          duration: 1300,
          delay: function(el, i, l) {
            return 900 + ( (l - i) * 50);
          },
          opacity: [0, 1],
          rotate: ['4deg', 0],
          translateY: ['-100px', 0]
        }, 0);
      }
      else {
        tl.add({
          targets: 'ul.mo-navigation-menu li, ul.mo-contacts li, ul.mo-social li',
          duration: 1300,
          delay: function(el, i, l) {
            return 400 + ( (l - i) * 50);
          },
          opacity: [0, 1],
          rotate: ['4deg', 0],
          translateY: ['-100px', 0]
        });
      }
    

      /*
      var tl = gsap.timeline();

      tl.from('ul.mo-navigation-menu li', {
        duration: 1.3,
        delay: 0.7,
        opacity: 0,
        y: '-100px',
        rotation: 4,
        ease: 'back.out(1.7)',
        stagger: -0.05
      });

      tl.from('ul.mo-contacts li', {
        duration: 1.3,
        delay: 0.9,
        opacity: 0,
        y: '-100px',
        rotation: 4,
        ease: 'back.out(1.7)',
        stagger: -0.05
      }, 0);

      tl.from('ul.mo-social li', {
        duration: 1.1,
        delay: 1.2,
        opacity: 0,
        y: '-100px',
        rotation: 4,
        ease: 'back.out(1.7)',
        stagger: -0.05
      }, 0);

      */



      $(".mainmenu-overlay").css({'pointer-events': 'auto', 'opacity': '1'});

      
      setTimeout(function(){
        $(".mainmenu-overlay").addClass('mainmenu-overlay-animation');
      }, 20);
      
      setTimeout(function(){
        $(".mainmenu-overlay").addClass('mainmenu-overlay-animation-ended');
      }, 200);
      

      setTimeout(function(){
        $('.mainmenu-logo-booking').addClass('mlb-dark');  
        mlbDarkMarker = true;  
      }, 400);

      setTimeout(function(){
        that.animationCurrentTime = false; 
      }, 2100);

    }

    closeMenu() {
      const that = this;
      this.animationCurrentTime = true;

      if( windowWidth > 900 ) {
        this.pathEl.stop().animate( { 'path' : that.paths.open }, 350, mina.easeout, function() {
          that.pathEl.stop().animate( { 'path' : that.paths.reset }, 800, mina.easeinout );
        } );
      }
      else if( windowWidth > 600 ) {
        this.pathEl2.stop().animate( { 'path' : that.paths.open2 }, 350, mina.easeout, function() {
          that.pathEl2.stop().animate( { 'path' : that.paths.reset2 }, 800, mina.easeinout );
        } );
      }
      else {
        this.pathEl3.stop().animate( { 'path' : that.paths.open3 }, 350, mina.easeout, function() {
          that.pathEl3.stop().animate( { 'path' : that.paths.reset3 }, 800, mina.easeinout );
        } );
      }


      var tl = anime.timeline({
        easing: 'easeOutBack'
      });

      tl.add({
        targets: 'ul.mo-navigation-menu li',
        duration: 800,
        delay: function(el, i, l) {
          return 100 + ( (i) * 12);
        },
        opacity: [1, 0],
        translateY: [0, '-100px']
      });

      tl.add({
        targets: 'ul.mo-contacts li',
        duration:800,
        delay: function(el, i, l) {
          return 100 + ( (i) * 12);
        },
        opacity: [1, 0],
        translateY: [0, '-100px']
      }, 0);

      tl.add({
        targets: 'ul.mo-social li',
        duration: 800,
        delay: function(el, i, l) {
          return 100 + ( (i) * 12);
        },
        opacity: [1, 0],
        translateY: [0, '-100px']
      }, 0);
    


      /*
      anime({
        targets: 'ul.mo-navigation-menu, ul.mo-contacts, ul.mo-social',
        duration: 800,
        delay: 200,
        opacity: [1, 0],
        translateY: [0, '-100px'],
        easing: 'easeOutBack'
      });


      */


      /*  

      var tl = gsap.timeline();

      tl.to('ul.mo-navigation-menu, ul.mo-contacts, ul.mo-social', {
        duration: 0.8,
        delay: 0.2,
        opacity: 0,
        y: '-100px',
      });

      */

      
      $("body").addClass('mainmenu-overlay-close');
      $(".mainmenu-overlay").removeClass('mainmenu-overlay-animation');
      $(".mainmenu-overlay").removeClass('mainmenu-overlay-animation-ended');

      setTimeout(function(){
        $(".mainmenu-overlay").css({'pointer-events': 'none', 'opacity': '0'});
        $("body").removeClass('mainmenu-overlay-close');
        $("body").removeClass("opened-menu");
        that.opened = false;

        if(windowWidth > minimalWidthMainMenuAlwaysVisible) {
          let headMainMenuTopPos = (windowHeight/2) - (mmHeadUlHeight/2);
          if( scrollPos < headMainMenuTopPos-30 && !bookingObj.opened && !headMenuAlwaysHide) {
            document.getElementsByTagName('body')[0].classList.remove('headMenuHide');
          }
        }
      }, 1900);

      setTimeout(function(){
        that.animationCurrentTime = false; 
      }, 2300);

      if(headBlockHeight > scrollPos + 64 && !bookingObj.opened && !headAlwaysBlack) {
        setTimeout(function(){
            $('.mainmenu-logo-booking').removeClass('mlb-dark'); // white scheme of mainmenu icon, phone, logo, languages
            mlbDarkMarker = false;
        }, 400);
      }
    }

  }


  var mainMenuObj = new mainMenu();




////// Main menu








////// Booking overlay


  class booking {
    constructor(el) {
      this.opened = false;
      this.animationCurrentTime = false;
      //this.bookingBtn = document.querySelectorAll('.booking-btn');
      this.bookingBtn = document.querySelectorAll('#bookingBtn');
      this.bookingCloseBtn = document.getElementById('bookingClose');
      this.init();
    }

    init() {

      var s2 = Snap( document.getElementById('bookingSVG2') );
      var s3 = Snap( document.getElementById('bookingSVG3') );
        this.pathEl2 = s2.select( 'path' );
        this.pathEl3 = s3.select( 'path' );
        this.paths = { 
          reset2 : this.pathEl2.attr( 'd' ),
          open2 : 'M1280,800c0,0-137,1-640,1S0,800,0,800V0h1280V800z',
          reset3 : this.pathEl3.attr( 'd' ),
          open3 : 'M1280,1277.7c0,0-197.4,0-640,0s-640,0-640,0V0h1280V1277.7z'
        };

      this.bookingBtn.forEach((el) => {

        el.addEventListener('click', () => {

          if(!this.animationCurrentTime) {
              this.openBooking();
              this.processForm();
          }
        });

      });



      this.bookingCloseBtn.addEventListener('click', () => {

        if(!this.animationCurrentTime) {
            this.closeBooking();
        }
      });

      this.additionalHolders();


    }

    openBooking() {
      const that = this;
      this.opened = true;
      this.animationCurrentTime = true;
      $("body").addClass("opened-booking");

      if( windowWidth > 600 ) {
        this.pathEl2.stop().animate( { 'path' : that.paths.reset2 }, 50, mina.easeout, function() {
          that.pathEl2.stop().animate( { 'path' : that.paths.open2 }, 1350, mina.easeinout );
        } );
      }
      else {
        this.pathEl3.stop().animate( { 'path' : that.paths.reset3 }, 350, mina.easeout, function() {
          that.pathEl3.stop().animate( { 'path' : that.paths.open3 }, 800, mina.easeinout );
        } );
      }
      



      document.querySelectorAll('.form-field input:not([type="checkbox"]):not([type="hidden"]), .form-field textarea, .form-field select:not([name="selectedcountry"])').forEach((el) => {
        el.value = '';
      }); // clean all inputs form elements

      document.querySelector('.form-field input[type="checkbox"]').checked = false; // clean checkbox

      document.querySelectorAll('.form-field:not(.ff-countries)').forEach((el) => {
        el.classList.remove('ff-filed')
        el.classList.remove('error-field')
      });

      document.querySelector('.file-field label.defaultFileLabels').style.cssText = "display: block";
      document.querySelector('.file-field span.defaultFileLabels').style.cssText = "display: block";
      document.querySelector('.file-field label.fileAddedLabel').style.cssText = "display: none";

      $("#sendingForm").css({'opacity': '0', 'pointer-events': 'none'});
      $("#successForm").css({'opacity': '0', 'pointer-events': 'none'});


      if( $('body').hasClass('opened-menu') ) {
        mainMenuObj.closeMenu();
      }

      $('body').css({'overflow': 'hidden'});
      

      $(".booking-overlay").css({'pointer-events': 'auto', 'opacity': '1'});
      $(".booking-overlay").scrollTop( 0 );

      setTimeout(function(){
        $(".booking-overlay").addClass('booking-overlay-animation');
        document.getElementsByTagName('body')[0].classList.add('headMenuHide');
      }, 20);
      
      setTimeout(function(){
        $(".booking-overlay").addClass('booking-overlay-animation-ended');
      }, 200);

      setTimeout(function(){
        document.getElementsByClassName('mainmenu-logo-booking')[0].classList.add('mlb-dark'); 
        mlbDarkMarker = true;   
      }, 400);

      setTimeout(function(){
        that.animationCurrentTime = false; 
      }, 2100);

    }

    closeBooking() {
      const that = this;
      this.animationCurrentTime = true;

      if( windowWidth > 600 ) {
        this.pathEl2.stop().animate( { 'path' : that.paths.open2 }, 350, mina.easeout, function() {
          that.pathEl2.stop().animate( { 'path' : that.paths.reset2 }, 800, mina.easeinout );
        } );
      }
      else {
        this.pathEl3.stop().animate( { 'path' : that.paths.open3 }, 350, mina.easeout, function() {
          that.pathEl3.stop().animate( { 'path' : that.paths.reset3 }, 800, mina.easeinout );
        } );
      }
      
      $("body").addClass('booking-overlay-close');
      $(".booking-overlay").removeClass('booking-overlay-animation');
      $(".booking-overlay").removeClass('booking-overlay-animation-ended');

      setTimeout(function(){
        $(".booking-overlay").css({'pointer-events': 'none', 'opacity': '0'});
        $("#successForm").css({'pointer-events': 'none', 'opacity': '0'});
        $("#sendingForm").css({'pointer-events': 'none', 'opacity': '0'});

        
        
        $("body").removeClass('booking-overlay-close');
        $("body").removeClass("opened-booking");
        that.opened = false;

        if(windowWidth > minimalWidthMainMenuAlwaysVisible && !headMenuAlwaysHide) {
          let headMainMenuTopPos = (windowHeight/2) - (mmHeadUlHeight/2);
          if( scrollPos < headMainMenuTopPos-30 ) {
            document.getElementsByTagName('body')[0].classList.remove('headMenuHide');
          }
        }

        $('body').css({'overflow': ''});

      }, 1900);

      setTimeout(function(){
        that.animationCurrentTime = false; 
      }, 2300);

      if(headBlockHeight > scrollPos + 64 && !headAlwaysBlack) {
        setTimeout(function(){
            document.getElementsByClassName('mainmenu-logo-booking')[0].classList.remove('mlb-dark'); // white scheme of mainmenu icon, phone, logo, languages
            mlbDarkMarker = false;
        }, 400);
      }
    }


    processForm() {

      $("#sub_files").on('change', function(e){

        e.stopPropagation();
        e.preventDefault();

        // fetch FileList object
        var files = e.target.files || e.dataTransfer.files;
            
        var filesSize = 0;

        for(var i=0; i<files.length; i++) {
          filesSize += files[i].size;
        }

        filesSize = Math.ceil( (filesSize / 1048576) * 100) / 100;

        $('.defaultFileLabels').css({'display': 'none'});
        $('.fileAddedLabel').css({'display': 'block'});

        let filesNumber = $('.fileAddedLabel').data('fileno');
        let filesSizeText = $('.fileAddedLabel').data('filessize');
        let filesMore = $('.fileAddedLabel').data('morethanallowed');

        let msg = filesSize<=30 ? filesNumber + files.length + '; ' + filesSizeText + filesSize + ' MB' : filesMore + '<span style="color:red">' + filesSize + ' MB</span>';
        
        if(filesSize <= 30) {
          e.target.closest('.form-field').classList.remove('error-field');
        }
        else {
          e.target.closest('.form-field').classList.add('error-field');
        }

        $('.fileAddedLabel').html(msg);



      });

    }


    additionalHolders() {

      let formBtn = document.getElementById('formBtn');
      let arrow1 = formBtn.querySelector('.formNtnArrow');
      let arrow2 = formBtn.querySelector('.formNtnArrow2');
      let svgBtnArrow = document.getElementById('formBtnCircle');

      formBtn.addEventListener('mouseenter', () => {
        let a1 = anime({
          targets: arrow1,
          translateX: 100,
          scale: 0.3,
          easing: 'easeInQuart',
          duration: 400
        });

        let a2 = anime({
          targets: arrow2,
          translateX: 88,
          scale: [0.3, 1],
          easing: 'easeOutBack',
          duration: 600,
          delay: 170
        });

      });


      let attach =  anime({
        targets: '.form-field #attachIcon  path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        autoplay: false,
        loop: false
      });

      attach.seek(1500);
      

      document.querySelector('.form-field.file-field').addEventListener('mouseenter', () => {
        attach.restart();
      });

      document.querySelector('.form-field.file-field').addEventListener('mouseout', () => {
        attach.seek(1500);
        //attach.stop();
      });

      formBtn.addEventListener('mouseleave', () => {
        arrow1.style.cssText = "";
        arrow2.style.cssText = "";
      });


      let inputElements = document.querySelectorAll('.form-field input:not([type="checkbox"]):not([type="file"]), .form-field textarea');
      inputElements.forEach((el) => {
        
        el.addEventListener('focus', () => {
          el.closest('.form-field').classList.add('ff-filed');
        });

        el.addEventListener('blur', () => {
          if(el.value.length == 0) 
          el.closest('.form-field').classList.remove('ff-filed');
        });

      });


      let selectElements = document.querySelectorAll('.form-field select');
      selectElements.forEach((el) => {
        
        el.addEventListener('click', () => {
          el.closest('.form-field').classList.add('ff-filed');
        });

        el.addEventListener('change', () => {
          if(el.value.length == 0) 
          el.closest('.form-field').classList.remove('ff-filed');
        });

      });


    }


  }


  var bookingObj = new booking();




////// Booking overlay







////// Magnetic buttons

class magneticBtn {
  constructor(el, movement) {
    this.el = el;
    this.movement = movement;

    this.el.querySelector('.btnCatcher').addEventListener('mouseleave', () => {
      gsap.to( this.el.getElementsByClassName('btnBase') , {
        duration: 1, 
        x: 0, 
        y: 0,
        ease: Elastic.easeOut.config(1, 0.4)
      } );
    });


    this.el.querySelector('.btnCatcher').addEventListener('mousemove', (e) => {
      this.parallaxMove(e);
    });
  }

  parallaxMove(e) {
    var el = e.currentTarget;
    var parentEl = e.currentTarget.closest('.magnetic-container');
    var btnBaseEl = parentEl.querySelector('.btnBase');

    var relX = e.offsetX - el.offsetLeft;
    var relY = e.offsetY - el.offsetTop;

    var distX = (el.offsetWidth - btnBaseEl.offsetWidth) / 2;
    var coefX = ( 2 * (e.offsetX / el.offsetWidth) ) - 1;
    var moveX = distX * coefX * this.movement;

    var distY = (el.offsetHeight - btnBaseEl.offsetHeight) / 2;
    var coefY = ( 2 * (e.offsetY / el.offsetHeight) ) - 1;
    var moveY = distY * coefY * this.movement;



    gsap.to( btnBaseEl, { 
      duration: 0.3,
      x: moveX,
      y: moveY,
      ease: Power2.easeOut
    });

  }
}



if(!mobile) {
  var magneticCloseBtns = {};
  var counter = 0;

  document.querySelectorAll('.overlay-close-btn').forEach( (el) => {  
    magneticCloseBtns[counter] = new magneticBtn(el, 1);
    counter++;
  });

  var magneticMenu = new magneticBtn(document.getElementById("mainMenuBtn"), 1);
  var magneticCloseBtn = new magneticBtn(document.getElementById("bookingClose"), 1);
  var formBtn = new magneticBtn(document.getElementById("formBtn"), 1);

}


////// end of Magnetic buttons









// Magic Navigation

var magicContent = document.getElementById('siteContent'); // Element Updated with Ajax
var timeOfOpeningLoader = 1000; // Time opening of animation of Loader Layout (div) in ms.
var ajaxCallBackFile = '/index.php?ajaxRequest=true&url=';

var magicNavigationStatus = 0; // 0 - all data loaded, N - number of loading content
var defaultTitle = document.getElementsByTagName('title')[0].innerHTML;



function magicLinksAddEventListening(parentEl) { // magic links handler
var magicLinks = parentEl.getElementsByClassName('magic-link');
var i=0;
while(i < magicLinks.length){
  var link = magicLinks[i];
  
  link.addEventListener('click', function(e){
    e.preventDefault();
    var clickedLink = e.currentTarget;
    var title = clickedLink.dataset.title;
    var url = clickedLink.getAttribute('href');
    stateData = {
          path: url,
          scrollTop: 0,
          title: title
    };
    history.pushState(stateData, title, url);
    updateContentByUrl(url, title);
  });
  i++;
}
}


function popstateHandler(){ // traveling by history Back and Forward
window.addEventListener('popstate', function(e){
  var url = document.location.pathname;
  var title = e.state != null ? e.state.title : defaultTitle;
  updateContentByUrl(url, title);
});
}


function updateContentByUrl(url, title){
  document.getElementsByTagName('title')[0].innerHTML = title; // update title tag

  let urltmp = removeLangPrefixFromUrl(url);
  if(urltmp == '') { // welcome message animation start for main page
    welcomeMassage('start'); 
    
  }
  else {
    loaderText.innerHTML = title;
  }

  if( $("body").hasClass("documentaryVideo") ) {
    closeDocOverlay();
  }

  ajaxUpdMagicContent(url, title);

}

function sleep(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}


async function ajaxUpdMagicContent(url, title){

  

  if( magicNavigationStatus == 0 && title !== '' ){ 
    loderAnimation('open'); 
    if(removeLangPrefixFromUrl(url) == '') {
      title = homeName;
    }
    

    WGLCtrl.transitTo( title, "imgUrlAbout" );
  }
  magicNavigationStatus++;


  if( url.charAt( 0 ) === '/' ) {
    var URLwithoutFirstSlash = url.slice( 1 );
  }

  /*
  if(removeLangPrefixFromUrl(url) == '') { 
    document.getElementsByTagName('body')[0].classList.add('mainpage');
  }
  else {
    document.getElementsByTagName('body')[0].classList.remove('mainpage');
  }
  */


  if( designSchemes[ url ] ) {
    headMenuAlwaysHide = designSchemes[ url ]['headMenuAlwaysHide'] ? true : false;
    headAlwaysBlack = designSchemes[ url ]['headAlwaysBlack'] ? true : false;
  }
  else {
    if(windowWidth > 900) {
      headMenuAlwaysHide = false;
    }
    else {
      headMenuAlwaysHide = true;
    }
    
    headAlwaysBlack = false;
  }


  let response = await fetch(ajaxCallBackFile + URLwithoutFirstSlash);


  if( response.ok ) {
    
    let result = await response.text();
    await sleep( timeOfOpeningLoader ); // make pause on timeOfOpeningLoader ms before update content

    
    window.scrollTo({ top: 0, behavior: 'instant' });

    await sleep( 20 );

      magicContent.innerHTML = result;
          
      magicLinksAddEventListening(magicContent); // make new links active
      highlightMagicLinks(url); // highlight active links
      
      if(document.getElementById('languages')) {
        updLanguagesLinks(url); // update languages menu
      }
      
      prlxUpdReloadedContent(); // update Magic Scroll Content

      magicNavigationStatus--;
      if( magicNavigationStatus == 0 ){ 
        
        startAfterAjaxPageUpd(); // start all functions and handlers of interface

        if( $("body").hasClass("opened-menu") ) {
          document.getElementsByClassName('mainmenu-overlay')[0].style.cssText = 'opacity: 0; pointer-events: none';
          //closeMainMenu();
          mainMenuObj.closeMenu();
        }


        if( $("body").hasClass("opened-booking") ) {
          document.getElementsByClassName('booking-overlay')[0].style.cssText = 'opacity: 0; pointer-events: none';
          bookingObj.closeBooking();
        }

        if( $("body").hasClass("headMenuHide") && !headMenuAlwaysHide ) {
          $("body").removeClass("headMenuHide");
        }

        if( $(".mainmenu-logo-booking").hasClass("mlb-dark") && !headAlwaysBlack ) {
          $(".mainmenu-logo-booking").removeClass("mlb-dark");
          mlbDarkMarker = false;
        }

        if( headAlwaysBlack ) {
          $(".mainmenu-logo-booking").addClass("mlb-dark");
        }
        
        await preloadGraphicContent(magicContent);
        loderAnimation('close'); 
        

        if( firstStartMarker ) {
          window.WGLCtrl.playIntro();
        }
        else {
          WGLCtrl.finishTransit();
        }



        if( firstStartMarker ) {
          setTimeout(() => {
            document.getElementsByTagName('body')[0].classList.add('animFirstStartOnly');
          }, 2000 );
          
          firstStartMarker = false;
        }

      
        
        
      }


  }
}


/// function make preloading img and video elements with classname .magic-preload
async function preloadGraphicContent(magicContent) {
  const preloads = [...magicContent.querySelectorAll('.magic-preload')].map((element) => {
    const image = element.tagName === 'IMG';
    const video = element.tagName === 'VIDEO';
    if ((!image && !video) || (image && element.complete) || (video && element.readyState >= 3)) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      element.addEventListener(image ? 'load' : 'canplaythrough', resolve, { once: true });
      element.addEventListener('error', resolve, { once: true });
    });
  });
  await Promise.race([Promise.all(preloads), sleep(4500)]);
}

function highlightMagicLinks(url){
var magicLinks = document.getElementsByClassName('magic-link');
var i=0;
while(i < magicLinks.length){
  var link = magicLinks[i];
  link.classList.remove('act');

  if( liEl = link.closest("ul.magic-navigation li") ) {
    liEl.classList.remove('act');
  }
  else { liEl = false; }

  if(link.getAttribute('href') == url) {
    link.classList.add('act');
    if( liEl ) {
      liEl.classList.add('act');
    }
  }
  i++;
}
}


function updLanguagesLinks(url) {
var langLinks = document.getElementById('languages').getElementsByTagName('a');
var i=0;
while(i < langLinks.length){
  var link = langLinks[i];
  var lang = link.dataset.langlink;
  var urlWithoutLang = removeLangPrefixFromUrl(url);

  link.setAttribute('href', lang + urlWithoutLang);     
  i++;
}
}


function removeLangPrefixFromUrl(url){
var yes = false;
var langLinks = document.getElementById('languages').getElementsByTagName('a');
var i=0;
while(i < langLinks.length){
  var link = langLinks[i];
  var lang = link.dataset.langlink;

  if(lang !== '/') {
    let langarr = url.split(lang);
    if(langarr.length > 1) {
      return langarr[1];
    }
  }   
  i++;
}
return url.substr(1);
}




// function loderAnimation(action){
//   var bodyElem = document.getElementsByTagName('body')[0];
//   var loaderBlock = document.getElementById('loaderLayout');
//   if(action == 'open') {

//     if( bodyElem.classList.contains('dataLoaded') ){  

//       loaderBlock.classList.add('noTransitions');
      
//       setTimeout(function(){ 
//         bodyElem.classList.remove('dataLoaded');
//         bodyElem.classList.add('dataReload');
//       }, 15);

//       setTimeout(function(){ 
//         loaderBlock.classList.remove('noTransitions'); 
//       }, 30);

//       setTimeout(function(){ 
//         bodyElem.classList.remove('dataReload'); 
//       }, 45);

//     }
    

//   }
//   else if(action == 'close') {
//     setTimeout(function(){ 
//       bodyElem.classList.add('dataLoaded'); 
//     }, 15);

//     // welcome message animation stop
//     if(wmStatus == 'continue') {
//       setTimeout(function(){ 
//         welcomeMassage('stop');
//       }, 500);
//     }
      
//   }
// }



function loderAnimation(action){
  var bodyElem = document.getElementsByTagName('body')[0];
  var loaderBlock = document.getElementById('loaderLayout');

  if(action == 'open') {

    if( bodyElem.classList.contains('dataLoaded') ){  

      loaderBlock.classList.add('noTransitions');
      
      setTimeout(function(){ 
        bodyElem.classList.remove('dataLoaded');
        bodyElem.classList.add('dataReload');
      }, 15);

      setTimeout(function(){ 
        loaderBlock.classList.remove('noTransitions'); 
      }, 30);

      setTimeout(function(){ 
        bodyElem.classList.remove('dataReload'); 
      }, 45);

    }
    

  }
  else if(action == 'close') {
    setTimeout(function(){ 
      bodyElem.classList.add('dataLoaded'); 
    }, 15);

    // welcome message animation stop
    if(wmStatus == 'continue') {
      setTimeout(function(){ 
        welcomeMassage('stop');
      }, 500);
    }
      
  }
}



function initializeMagicNav(){
  history.scrollRestoration = 'manual';
  popstateHandler();
  magicLinksAddEventListening(document);
  ajaxUpdMagicContent( window.location.pathname, '' ); // update content for starting page
}



$(window).bind('load', function() {
  initializeMagicNav();
  
});



///// Magic Navigation



 var windowHeight;
 var scrollH;
 var prlx = []; // array with parallax elements properties
 var prlx_objects = []; // array with parallax objects
 var sections = []; // array with sections properties
 var sections_objects = []; // array with sections objects
 var easeDiv = document.getElementById('siteContent');
 var commonEaseVal =  mobile ? 2 : 20; // smoothness/speed of scroll 
 var scrollPos = window.scrollY;
 var scrollPosAtThePageLoad;
 var topMenuDiv = $('.mainmenu-logo-booking');
 var bodyEl = $("body");
 var windowWidth = window.innerWidth;


 var cellsMpVideo = {};
 cellsMpVideo['img'] = {};



// RESIZING CONTROLS


  
  window.addEventListener("resize", function () {
     scrollH = easeDiv.scrollHeight;
     if(mobile) {
      document.getElementById('fakeScroll').style.cssText = 'display: none';
      document.getElementById('pageScroll').style.cssText = 'position: relative; float:left';
     }
     else {
      document.getElementById('fakeScroll').style.cssText = 'height: ' + scrollH + 'px';     
     }

      try {
          headBlockHeight = document.getElementById('headSlider').offsetHeight;
      }    
      catch(e) {

      }   
     
     windowHeight = window.innerHeight; // $(window).height()
     windowWidth = window.innerWidth;

     prlxElUpd();

     scrollPos = scrollPos + 1; // scroll trigger
     prlx_upd_animation_for_hidden_elements( scrollPos );


     if(windowWidth <= minimalWidthMainMenuAlwaysVisible && !mobile && !bookingObj.opened ) {
        document.getElementsByTagName('body')[0].classList.add('headMenuHide');
     }

     //// mp cells elements update

      var cellsMpBlock
      if (cellsMpBlock = document.getElementById('mpcells_section')) {
        var cellScrollTop = !mobile ? cellsMpBlock.getBoundingClientRect().top : cellsMpBlock.getBoundingClientRect().top + window.scrollY;

        cellsMpVideo['scrollTop'] = cellScrollTop;
        cellsMpVideo['height'] = cellsMpBlock.offsetHeight;
        cellsMpVideo['frameNumber'] = 453;
        cellsMpVideo['currentFrame'] = 0;

        //cellsMpVideo['object'] = document.getElementById('mpcells');
        cellsMpVideo['object'] = document.getElementById('mpcells_canvas');
        cellsMpVideo['context'] = cellsMpVideo['object'].getContext("2d");

        cellsMpVideo['object'].width = windowWidth;
        cellsMpVideo['object'].height = windowHeight;

        cellsMpVideo['objectMarkerToStartLoadingPics'] = !mobile ? document.querySelector('.mp-reviews').getBoundingClientRect().top : document.querySelector('.mp-reviews').getBoundingClientRect().top + window.scrollY;

        cellsMpVideo['markerStartLoadingPics'] = true;
        
        
      }


     //// mp cells elements update

  });
  
 // RESIZING CONTROLS


 


////// prlx upd elements data

function prlxElUpd() {
  prlx = [];
  prlx_objects = [];


  var sectionsTmp = document.getElementsByClassName('section-prlx');

  for(var i=0; i<sectionsTmp.length; i++) {

    var section = sectionsTmp[i];

    section.style.transform = '';

    var scrollTop = section.getBoundingClientRect().top ;
    sections.push( [scrollTop, section.offsetHeight] );
    sections_objects.push( section );

  }


  var objs = document.getElementsByClassName('prlx');
  for(var i=0; i<objs.length; i++) {

    var obj = objs[i];
    
    if( obj.dataset.translate || obj.dataset.rotate || obj.dataset.scale || obj.dataset.skew ) {
      obj.style.transform = '';
    }

    if( obj.dataset.parentborders ) { // orientation on parent borders
      let parentObj = obj.closest( obj.dataset.parentborders );

      var scrollTop = !mobile ? parentObj.getBoundingClientRect().top : parentObj.getBoundingClientRect().top + window.scrollY;
      prlx[i] = [scrollTop, parentObj.offsetHeight];
    }
    else { // orientation on own borders
      var scrollTop = !mobile ? obj.getBoundingClientRect().top : obj.getBoundingClientRect().top + window.scrollY;
      prlx[i] = [scrollTop, obj.offsetHeight];
    }


    if( obj.dataset.inset ) {
      prlx[i]['inset'] = obj.dataset.inset.split(',');
      var tmpt = getValueAndUnits( prlx[i]['inset'][0] );
      var tmpr = getValueAndUnits( prlx[i]['inset'][1] );
      var tmpb = getValueAndUnits( prlx[i]['inset'][2] );
      var tmpl = getValueAndUnits( prlx[i]['inset'][3] );

      prlx[i]['inset'] = [tmpt[0], tmpr[0], tmpb[0], tmpl[0]];
      prlx[i]['insetUnits'] = [tmpt[1], tmpr[1], tmpb[1], tmpl[1]];

    }

    if( obj.dataset.minwidth ) {
      prlx[i]['minwidth'] = obj.dataset.minwidth.match(/\d/g).join("");
    }
    else {
      prlx[i]['minwidth'] = 0;
    }


    if( obj.dataset.reverse == 'true' ) {
      prlx[i]['reverse'] = 'true';  
    }
    else {
      prlx[i]['reverse'] = 'false';
    }


    if( obj.dataset.enduptotop == 'true' ) {
      prlx[i]['enduptotop'] = 'true';  
    }
    else {
      prlx[i]['enduptotop'] = 'false';
    }


    if( obj.dataset.beginfrombottom == 'true' ) {
      prlx[i]['beginfrombottom'] = 'true';  
    }
    else {
      prlx[i]['beginfrombottom'] = 'false';
    }


    if( obj.dataset.mobile == 'false' ) {
      prlx[i]['mobile'] = 'false';  
    }
    else {
      prlx[i]['mobile'] = 'true';
    }

    if( obj.dataset.begin ) {
      prlx[i]['begin'] = getValueAndUnits( obj.dataset.begin.toString())[0];  
      prlx[i]['beginUnits'] = getValueAndUnits( obj.dataset.begin.toString())[1];
    }
    else {
      prlx[i]['begin'] = 0;
      prlx[i]['beginUnits'] = '%';
    }   

    if( obj.dataset.end ) { 
      prlx[i]['end'] = getValueAndUnits( obj.dataset.end.toString())[0];  
      prlx[i]['endUnits'] = getValueAndUnits( obj.dataset.end.toString())[1];     
    }
    else {
      prlx[i]['end'] = 100;
      prlx[i]['endUnits'] = '%';
    }    

    if( obj.dataset.translate ) {
      prlx[i]['translate'] = obj.dataset.translate.split(',');
      var tmpx = getValueAndUnits( prlx[i]['translate'][0] );
      var tmpy = getValueAndUnits( prlx[i]['translate'][1] );
      var tmpz = getValueAndUnits( prlx[i]['translate'][2] );

      prlx[i]['translate'] = [tmpx[0], tmpy[0], tmpz[0]];
      prlx[i]['translateUnits'] = [tmpx[1], tmpy[1], tmpz[1]];
      
    }

    if( obj.dataset.rotate ) {
      prlx[i]['rotate'] = obj.dataset.rotate.split(',');
    }

    if( obj.dataset.scale ) {
      prlx[i]['scale'] = obj.dataset.scale.split(',');       
    }

    if( obj.dataset.skew ) {
      prlx[i]['skew'] = obj.dataset.skew.split(',');       
    }

    if( obj.dataset.fontblur ) {
      prlx[i]['fontblur'] = obj.dataset.fontblur.split(',');       
    }

    if( obj.dataset.opacity ) {
      prlx[i]['opacity'] = obj.dataset.opacity;
      if( obj.dataset.opacitystart ) {
        prlx[i]['opacityDefault'] = obj.dataset.opacitystart;
      }
      else {
        prlx[i]['opacityDefault'] = 1;
      }

    }

    if(obj.tagName.toUpperCase() == 'VIDEO') {
      prlx[i]['video'] = true;
      prlx[i]['videoStatus'] = 'play';
    }
    else {
      prlx[i]['video'] = false;
    }

    if(obj.classList.contains('come-in')) {
      //prlx[i]['animationStatus'] = true;
      prlx[i]['comein'] = true;
    }
    else {
      //prlx[i]['animationStatus'] = false;
      prlx[i]['comein'] = false;
    }
    

    prlx_objects.push( obj );
  }

}


////// prlx upd elements data



///// scrolling controls    


window.addEventListener("scroll", function () {
scrollPos = window.scrollY;

if( mobile && !headAlwaysBlack ) {

      if( scrollPos + 64 > headBlockHeight ) {

        if( !bodyEl.hasClass('opened-menu') && !bodyEl.hasClass('booking-menu') && !mlbDarkMarker ) {
          topMenuDiv.addClass('mlb-dark');
          mlbDarkMarker = true;
        }

      }
      else {
        if( !bodyEl.hasClass('opened-menu') && !bodyEl.hasClass('booking-menu') && !headAlwaysBlack && mlbDarkMarker ) {
          topMenuDiv.removeClass('mlb-dark');
          mlbDarkMarker = false;
        }
      }
}

});



var virtualScrollTop = scrollPos;


function easeScroll() {

if( !virtualScrollTop ) virtualScrollTop = 0;
       
var dX =  (scrollPos - virtualScrollTop);
virtualScrollTop += (dX / commonEaseVal); 
//var tmp_dX =(scrollPos - dX);
var tmp_dX = Math.round(scrollPos - dX);

if(scrollPosAtThePageLoad !== false) { // on page load set scrolling position witout animation
  tmp_dX = scrollPosAtThePageLoad;
  virtualScrollTop = scrollPosAtThePageLoad;
  scrollPos = scrollPosAtThePageLoad;
  scrollPosAtThePageLoad = false;
}

if( Math.abs(dX) > 0.001 ) {      
  if(!mobile) {
    section_animation_frame ( tmp_dX );
  }
  prlx_animation_frame( tmp_dX );
}

//// black menu when over scroll head 


if( headBlockHeight < Math.abs(tmp_dX) + 40) {
  if( !mlbDarkMarker ) {
    topMenuDiv.addClass('mlb-dark');
    mlbDarkMarker = true;
  }
}
else {
  if( !mainMenuObj.opened && !bookingObj.opened && !headAlwaysBlack && mlbDarkMarker ) {
    topMenuDiv.removeClass('mlb-dark');
    mlbDarkMarker = false;
  }
}
//// black menu when over scroll head 

  requestAnimationFrame( easeScroll );
}






function section_animation_frame( scrollTop ) {
  var i = 0;
  while( i <= sections.length-1 ) {

    var a = (sections[i][0] - windowHeight  );
    var b = (sections[i][0] + sections[i][1]);

    if( scrollTop >  a  && scrollTop < b ){ // in viewport

      //sections_objects[i].style.cssText = 'transform: translate3d(0, -' + scrollTop + 'px, 0); will-change: transform;';
      sections_objects[i].style.cssText = 'transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -' + scrollTop + ', 0, 1); will-change: transform;';
    }
    else { // out of viewport
      //sections_objects[i].style.cssText = 'transform: translate3d(0, 0px, 0); will-change: transform; will-change: auto; opacity: 0; pointer-events: none';
      sections_objects[i].style.cssText = 'transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); will-change: auto; opacity: 0; pointer-events: none';
    }

    i++;
  }
}





function prlx_animation_frame( scrollTop ) {
  var i = 0;

  scrollOuterProcessing(scrollTop); // connect outer animations on scroll

  while( i <= prlx.length-1 ) {

    var a = prlx_get_elem_scrollPos_a(i);
    var b = prlx_get_elem_scrollPos_b(i);
    
    if( scrollTop >  a  && scrollTop < b ){ // in viewport

      if(!prlx[i]['animationStatus']) {   
        prlx[i]['animationStatus'] = true;
      }

      if( !prlx[i]['comein'] ) { 
        prlx_objects[i].classList.add('come-in');
        prlx[i]['comein'] = true;
        animateComeInWithJS( prlx_objects[i] );
      }
      
      prlx_animation_make0( i, scrollTop, a, b );
      
    }
    else { // out of viewport

      if( prlx[i]['animationStatus'] ) {
        
        // set element to final position of animation
        if( scrollTop >= b ) {
          prlx_animation_make0( i, b, a, b );
        }
        else if( scrollTop <= a ) {
          prlx_animation_make0( i, a, a, b );
        }

        prlx_objects[i].style.willChange = 'auto';
        prlx[i]['animationStatus'] = false;
        
      }

      if(prlx[i]['video']) {
        if(prlx[i]['videoStatus'] == 'play') {
          prlx_objects[i].pause();
          prlx[i]['videoStatus'] = 'pause';
        }
      }

    }

    i++;
  }
}


function prlx_get_elem_scrollPos_a(i) {

  var elemScrollTop = prlx[i][0];
  var elemHeight = prlx[i][1];

  if(prlx[i]['beginfrombottom'] == 'true') {
    var ElemBeginPos = elemScrollTop + elemHeight;
  }
  else {
    var ElemBeginPos = elemScrollTop;
  }

  if(prlx[i]['beginUnits'] == '%') { // %
    var a = ( ElemBeginPos - (windowHeight * (1 - ( prlx[i]['begin'] / 100))) );
  }
  else { // px
    var a = ( ElemBeginPos - (windowHeight - prlx[i]['begin']) );
  }

  return a;

}



function prlx_get_elem_scrollPos_b(i) {

  var elemScrollTop = prlx[i][0];
  var elemHeight = prlx[i][1];

  if(prlx[i]['enduptotop'] == 'true') {
    var ElemEndPos = elemScrollTop;
  }
  else {
    var ElemEndPos = elemScrollTop + elemHeight;
  }

  if(prlx[i]['endUnits'] == '%') { //%
    var b = ( ElemEndPos - (windowHeight * (1 - ( prlx[i]['end'] / 100))) );
  }
  else { //px
    var b = ( ElemEndPos - (windowHeight - prlx[i]['end'])  );
  }

  return b;
  
}


function prlx_animation_make0 (i, scrollTop, a, b) {

  // check mobile and minwidth compatibility before make animation
  if( windowWidth >= prlx[i]['minwidth'] ) {
    
    if( !mobile ) {
      prlx_animation_make( i, scrollTop, a, b );
    }
    else {
      if( prlx[i]['mobile'] == 'true' ) {
        prlx_animation_make( i, scrollTop, a, b );
      }
    }
  }

}

function prlx_animation_make (i, scrollTop, a, b) {

      var willChange = ''; 

      if(prlx[i]['reverse'] == 'false') {
        p = (scrollTop - a) / (b - a);
      }
      else {
        p = (scrollTop - b) / (a - b);
      }



      if( prlx[i]['inset'] ) {
        iT = (p * prlx[i]['inset'][0]) + prlx[i]['insetUnits'][0]; 
        iR = (p * prlx[i]['inset'][1]) + prlx[i]['insetUnits'][1]; 
        iB = (p * prlx[i]['inset'][2]) + prlx[i]['insetUnits'][2];
        iL = (p * prlx[i]['inset'][3]) + prlx[i]['insetUnits'][3]; 
        inset = 'clip-path: inset(' + iT + ' ' + iR + ' ' + iB + ' ' + iL + '); -webkit-clip-path: inset(' + iT + ' ' + iR + ' ' + iB + ' ' + iL + '); ';
        willChange = willChange.length > 5 ? willChange + ', clip-path' : 'clip-path';
      }
      else { inset = ''; }


      if( prlx[i]['translate'] ) {
        var t = p;


        tx = (t * prlx[i]['translate'][0]) + prlx[i]['translateUnits'][0]; 
        ty = (t * prlx[i]['translate'][1]) + prlx[i]['translateUnits'][1]; 
        tz = t * prlx[i]['translate'][2]; 

        t = 'translate3d(' + tx + ', ' + ty + ', ' + tz + ')'; 
        
      }
      else { t = ''; }

      if( prlx[i]['rotate'] ) {

        var rx = prlx[i]['rotate'][0]; 
        var ry = prlx[i]['rotate'][1]; 
        var rz = prlx[i]['rotate'][2]; 
        var ra = (prlx[i]['rotate'][3]) * p; // add speed to angle
        r = 'rotate3d(' + rx + ', ' + ry + ', ' + rz + ', ' +  ra + 'deg)'; 
        
      }
      else { r = ''; }
  
      if( prlx[i]['scale'] ) {
        var sx = ( (prlx[i]['scale'][0] - 1) * p ) + 1;
        var sy = ( (prlx[i]['scale'][1] - 1) * p ) + 1;
        var sz = ( (prlx[i]['scale'][2] - 1) * p ) + 1;

        s = 'scale3d('+sx+','+sy+','+sz+')';
      }
      else { s = ''; }

      if( prlx[i]['skew'] ) {

        skew = '';

        if(prlx[i]['skew'][0] > 0) {
          var sx = ( (prlx[i]['skew'][0] - 1) * p );
          skew = 'skewX('+sx+'deg)';
        }

        if(prlx[i]['skew'][1] > 0) {
          var sy = ( (prlx[i]['skew'][1] - 1) * p );
          skew = skew + ' skewY('+sy+'deg)';
        }
      }
      else { skew = ''; }




      if(prlx[i]['translate'] || prlx[i]['scale']  || prlx[i]['rotate'] || prlx[i]['skew']) {
        t = 'transform: ' + t + ' ' + s + ' ' + r + ' ' + skew + '; ';   
        willChange = willChange.length > 5 ? willChange + ', transform' : 'transform';
      }
      else {
        t = '';
      }


      if(prlx[i]['opacity']) {

        var o = prlx[i]['opacity'] - ( (prlx[i]['opacity'] - prlx[i]['opacityDefault']) * (1 - p) );
        o = 'opacity: ' + o +'; ';

        willChange = willChange.length > 5 ? willChange + ', opacity' : 'opacity';

      }
      else { 
        o = ''; 
      }


      if( prlx[i]['fontblur'] ) {
        var blur = ( (prlx[i]['fontblur'][0] - 1) * p ) + 1;
        var colour = prlx[i]['fontblur'][1];

        fb = 'text-shadow: 0 0 '+blur+'px '+colour+'; color: transparent; ';

        willChange = willChange.length > 5 ? willChange + ', text-shadow' : 'text-shadow';

      }
      else { fb = ''; }


      if( t !== '' || o !== ''  || fb !== '' || inset !== '' ) {

        willChange = willChange.length > 5 ? ' will-change: ' + willChange : '';

        prlx_objects[i].style.cssText = t + o + fb + inset + willChange;
      }


      if(prlx[i]['video']) {
        
        if(prlx[i]['videoStatus'] == 'pause') {
          prlx_objects[i].play();
          prlx[i]['videoStatus'] = 'play';
        }

      }

}




/// use this function to update position of prlx elements located over the scroll position
// используем функцию для обновления позиций элементов находяшихся в уже проскроленной области, если поменялся размер вьюпорта
function prlx_upd_animation_for_hidden_elements( scrollTop ) {
  var i = 0;
  while( i <= prlx.length-1 ) {

    prlx_upd_animation_for_hidden_elem( i, scrollTop );

    i++;
  }
}


function prlx_upd_animation_for_hidden_elem( i, scrollTop ) {
 
  var a = prlx_get_elem_scrollPos_a(i);
  var b = prlx_get_elem_scrollPos_b(i);

  
  if( scrollTop >= b ){ // Elements higher viewport (элементы которые мы проскролил уже)
      prlx_animation_make0( i, b, a, b ); // update position to final point
  }

}



// return Array: str='10px' -> [10, 'px']; str='10%' -> [10, '%']; str='10' -> [10, '%'];
function getValueAndUnits(str) {
  var tmpS = str.split('%');
  var tmpS2 = str.split('px');
  if(tmpS.length>1) {
    return [ parseFloat(tmpS[0]) , '%'];
  }
  else if(tmpS2.length>1) {
    return [ parseFloat(tmpS2[0]), 'px'];
  }
  else {
    return [str, '%'];
  }
}




function prlxStart() { // function to star prlx script
window.dispatchEvent(new Event('resize')); //$(window).trigger('resize');
scrollPosAtThePageLoad = window.scrollY;
easeScroll();
}


function prlxUpdChangedContent(){ // function when content has been changed (width or height of some elements) 
window.dispatchEvent(new Event('resize'));
}


function prlxUpdReloadedContent(){ // function when content has been updated (for example with Ajax)
scrollPosAtThePageLoad = 0;
window.scrollTo({ top: 0, behavior: "instant" });
window.dispatchEvent(new Event('resize'));
}



prlxStart();



///// scrolling controls








///// Outer scroll processing


var mhHead0, mhHead, mmHeadUlHeight;
var checkerMainMenuHide = 'visible';


$(window).bind('resize', function() {
  mhHead0 = document.getElementById('mhMenu0');
  mhHead = document.getElementById('mhMenu');
  mmHeadUlHeight = mhHead.offsetHeight; 
});


function scrollOuterProcessing(scrollTop) {

  if(mhHead0 && windowWidth > minimalWidthMainMenuAlwaysVisible) {

    let headMainMenuTopPos = (windowHeight/2) - (mmHeadUlHeight/2);


    if( scrollTop > headMainMenuTopPos-80 || headMenuAlwaysHide ) {
      if(checkerMainMenuHide == 'visible') {
        checkerMainMenuHide = 'hidden';
        let bodyEl = document.getElementsByTagName('body')[0];
        bodyEl.classList.add('headMenuHide');
      }
    }
    else {

      mhHead0.style.cssText = 'transform: translate3d(0px, -' + scrollTop + 'px, 0px); will-change: transform;';

      if(checkerMainMenuHide == 'hidden') {
        checkerMainMenuHide = 'visible';
        let bodyEl = document.getElementsByTagName('body')[0];
        if(!mainMenuObj.opened && !bookingObj.opened && !headMenuAlwaysHide) {
          bodyEl.classList.remove('headMenuHide');
        }
      }
    }


    if( scrollTop < headMainMenuTopPos-30 ) {
      mhHead0.style.cssText = 'transform: translate3d(0px, -' + scrollTop + 'px, 0px); will-change: transform;';
    }
    
  }


    //// mp cells video animation
    var a = (cellsMpVideo['scrollTop'] - windowHeight  );
    var b = (cellsMpVideo['scrollTop'] + cellsMpVideo['height']);

    
    if( scrollTop + windowHeight > cellsMpVideo['objectMarkerToStartLoadingPics'] && scrollTop < b && !mobile ) {
      
      if( cellsMpVideo['markerStartLoadingPics'] ) {
        cellsMpVideo['markerStartLoadingPics'] = false;
        var intervalCounter = 0;
        var intervalCounter2 = 201;

        // loading 1 pack of pics from 0 to 200 (beacause minimal delay in SetInterval is 4ms)
        var loadCellInterval = setInterval( () => {
          
          if( intervalCounter ==  200 ) {
            clearInterval( loadCellInterval );
          }
          
          if( !cellsMpVideo['img'][intervalCounter] ) {
            cellsMpVideo['img'][intervalCounter] = new Image();
            cellsMpVideo['img'][intervalCounter].src = '/img/stem-cell-mp-seq/' + intervalCounter.toString().padStart(5, '0') + '.jpg';
          }
          intervalCounter++;
          
        }, 2);


        // parallel loading 2 pack of pics from 201 to cellsMpVideo['frameNumber'] (beacause minimal delay in SetInterval is 4ms)
        var loadCellInterval2 = setInterval( () => {
          
          if( intervalCounter2 ==  cellsMpVideo['frameNumber'] ) {
            clearInterval( loadCellInterval2 );
          }
          
          if( !cellsMpVideo['img'][intervalCounter2] ) {
            cellsMpVideo['img'][intervalCounter2] = new Image();
            cellsMpVideo['img'][intervalCounter2].src = '/img/stem-cell-mp-seq/' + intervalCounter2.toString().padStart(5, '0') + '.jpg';
          }
          intervalCounter2++;
         
        }, 2);


      }



    }
    




    if( scrollTop > a  && scrollTop < b && !mobile ){ // in viewport
      

      let currentFrame = ( scrollTop - cellsMpVideo['scrollTop'] + windowHeight ) * ( cellsMpVideo['frameNumber']  / (cellsMpVideo['height'] + windowHeight) );

      currentFrame = Math.round(currentFrame);

      
      if(currentFrame !== cellsMpVideo['currentFrame']) {

        if( (windowWidth / windowHeight) > 1.593 ) {
          var canvasH = windowHeight;
          var canvasW = 1.5925 * windowHeight;
          var canvasL = (windowWidth - canvasW) / 2;
          var canvasT = 0;
        }
        else {
          var canvasH = windowWidth * 0.6279;
          var canvasW = windowWidth;
          var canvasL = 0;
          var canvasT = (windowHeight - canvasH) / 2;
        }

        /*
        if( !cellsMpVideo['img'][currentFrame] ) {
          cellsMpVideo['img'][currentFrame] = new Image();
          cellsMpVideo['img'][currentFrame].src = '/img/stem-cell-mp-seq/' + currentFrame.toString().padStart(5, '0') + '.jpg';
          cellsMpVideo['img'][currentFrame].onload = function() {
            cellsMpVideo['context'].drawImage( cellsMpVideo['img'][currentFrame], canvasL, canvasT, canvasW, canvasH);
          };
        }
        else {
          cellsMpVideo['context'].drawImage( cellsMpVideo['img'][currentFrame], canvasL, canvasT, canvasW, canvasH);
        }
        */

        
        if( cellsMpVideo['img'][currentFrame] ) {
          cellsMpVideo['context'].drawImage( cellsMpVideo['img'][currentFrame], canvasL, canvasT, canvasW, canvasH);
        }

        cellsMpVideo['currentFrame'] = currentFrame;
      }
      


      

      //let currentTime = ( scrollTop - cellsMpVideo['scrollTop'] + windowHeight ) * ( cellsMpVideo['timeNumber']  / (cellsMpVideo['height'] + windowHeight) );


      /*
      currentTime = Math.round(currentTime * 10) / 10;
      
      if(currentTime !== cellsMpVideo['currentTime']) {
        cellsMpVideo['object'].currentTime = currentTime;
        console.log(currentTime);
        cellsMpVideo['currentTime'] = currentTime;
      }
      */



      

    }

    //// mp cells video animation


}


///// Outer scroll processing




var welcome_msg = [
'Welcome!', 
'歡迎',
'مرحبا',
'Ласкаво просимо!',
'¡Bienvenido!',
'Bienvenue!',
'Herzlich willkommen!',
'Benvenuta!',
'Добро пожаловать!', 
'Välkommen',
'ようこそ',
'Witamy',
'ยินดีต้อนรับ',
'Tervetuloa',
'Laipni lūdzam',
'Hoşgeldiniz',
'Кαλώς ήρθατε',
'Sveiki',
'Bem-vinda',
'어서 오십시오',
'Welkom'

];


var wmIdTimer;
var wmIdArr = 0;
var loaderText = document.querySelectorAll('#loaderLayout .loader-logo')[0];
var wmStatus = 'stop';

function welcomeMassage(act) {
if(act == 'start') {
  wmStatus = 'continue';
  wmIdTimer = setInterval(welcomeMassage, 300, 'continue');
}
else if(act == 'continue') {
  let arrLen = welcome_msg.length - 1;
  //let rand = Math.floor( Math.random() * Math.floor(arrLen) );
  
  loaderText.innerHTML = welcome_msg[wmIdArr];
  wmIdArr = wmIdArr == arrLen ? 0 : wmIdArr+1;

}
else if(act == 'stop') {
  wmStatus = 'stop';
  clearInterval(wmIdTimer);
}
}

//welcomeMassage('start');








  
  /// LANGUAGES MENU
  
  if($("div.languages").length > 0){
      $("div.selector-languages").on("click", function(e){
          if($("div.languages").hasClass("opened-lang")) {
              $("div.languages").removeClass("opened-lang");
              
             
          }
          else {
              $("div.languages").addClass("opened-lang");
              
              
          }
      });
      
      $("body").click(function(e){
          if(e.target.className !== "sl-seleced" && e.target.className !== "selector-languages" && e.target.className !== "") {
              $("div.languages").removeClass("opened-lang");
              
          }
      });

      $('#languages a').click(function(e){
        e.preventDefault();
        var link = $(this).data('langlink');
        link = link.replace(/\//g, '');
        $.cookie('emcell_lang', link, {expires: 365, path: '/'});
        window.location.href=$(this).attr('href');
      });
      
  }
  
  
  /// LANGUAGES MENU     
      

//// FORM CHECK
  
 

  function checkField(field) {

          if(field.is('textarea')) {
              if( field.val() == "" ) {
                  return markFieldError(field);
              }
              else {
                  return markFieldOk(field);
              }
          }
          else if(field.is('select')) {
              if( field.val() == "" ) {
                  return markFieldError(field);
              }
              else {
                  return markFieldOk(field);
              }
          }
          else {
              if(field.attr('type') == 'email') {
                  if (/^[A-Za-z0-9\.-]+@[A-Za-z0-9\.-]+(\.\w{2,4})+$/.test(field.val())){  
                      return markFieldOk(field);
                  }
                  else {
                      return markFieldError(field);
                  }
              }
              else if(field.attr('type') == 'tel') {

                  if (field.val().length > 7){ 
                    var re = /^[0-9,/+,\s]{8,15}?/;
                    if(re.test(field.val())) {
                      return markFieldOk(field);
                    }
                    else { return markFieldError(field);
                    }
                  }
                  else {
                      return markFieldError(field);
                  }


              }
              else if(field.attr('type') == 'text') {
                  if( field.val() == "" ) {
                      return markFieldError(field);
                  }
                  else {
                      return markFieldOk(field);
                  }
              }
          }
       }




    function markFieldError(field) {
           field.parent().addClass('error-field');
           notErrors = false;
           return false;
   }
       
       
   function markFieldOk(field) {
           field.parent().removeClass('error-field');
           return true;
   }
       

//// FORM CHECK


//// FEDDBACK FORMS

   









///// Animation of Letters 


function letterAnimation( obj,  startDelayFromSec ) {
    var lettersArr = obj.text().split("");
    var string = "";
    var animStepSeconds = 0.022;
    var counter = 0;

    $.each(lettersArr, function(key, value){

      if(lettersArr[key] == " ") {
        string += "&nbsp;";
      }
      else {
        //string += "<div class='letterAnimCont'><div class='letterAnim' style='transition-delay:" + ((counter * animStepSeconds) + startDelayFromSec) + "s'>" + lettersArr[key] + "</div></div>";
        string += "<div class='letterAnim'>" + lettersArr[key] + "</div>";
      }

      counter++;
      
    });

    string = wordsSelectorAnim( string );

    obj.html( string );

}

function wordsSelectorAnim( obj_html ) {

    var wordsArr = obj_html.split('&nbsp;');
    var wordsStr = "";

    $.each(wordsArr, function(key, value){
        wordsStr += '<div class="wordAnim">' +  wordsArr[key] + '&nbsp;</div>';
    }); 

    return wordsStr;

}




///// End of Animation of Letters 



function wordsAnimation( obj,  startDelayFromSec ) {
    var lettersArr = obj.text().split(" ");
    var string = "";
    var animStepSeconds = 0.2;
    var counter = 0;

    $.each(lettersArr, function(key, value){

      //string += "<div class='wordsAnimCont'><div class='wordsAnim' style='transition-delay:" + ((counter * animStepSeconds) + startDelayFromSec) + "s'>" + lettersArr[key] + "&nbsp;</div></div>";
      string += "<div class='wordsAnimCont'><div class='wordsAnim'>" + lettersArr[key] + "&nbsp;</div></div>";
    
      counter++;
    });
    obj.html( string );
}

function wordsAnimationQuick( obj,  startDelayFromSec ) {
    var lettersArr = obj.text().split(" ");
    var string = "";
    var animStepSeconds = 0.06;
    var counter = 0;

    $.each(lettersArr, function(key, value){

      string += "<div class='wordsAnimCont'><div class='wordsAnim' style='transition-delay:" + ((counter * animStepSeconds) + startDelayFromSec) + "s'>" + lettersArr[key] + "&nbsp;</div></div>";
      //string += "<div class='wordsAnimCont'><div class='wordsAnim' >" + lettersArr[key] + "&nbsp;</div></div>";
    
      counter++;
    });
    obj.html( string );
}



  function jumpingWordsAnim( obj ) {

    var wordsArr = obj.text().split(' ');
    var wordsStr = "";

    $.each(wordsArr, function(key, value){
        wordsStr += '<div class="jump-word"><div class="jump-word-cont">' +  wordsArr[key] + '&nbsp;</div></div>';
    }); 

    obj.html( wordsStr );
  }

  $(".jumping-words").each(function(i, elem){
    jumpingWordsAnim( $(this) );
  });



  function jumpingPhrasesAnim( obj ) {

    var wordsArr = obj.html().split('<br>');
    var wordsStr = "";

    $.each(wordsArr, function(key, value){
        wordsStr += '<div class="jump-word"><div class="jump-word-cont">' +  wordsArr[key] + '&nbsp;</div></div>';
    }); 

    obj.html( wordsStr );
  }

  $(".jumping-phrases").each(function(i, elem){
    jumpingPhrasesAnim( $(this) );
  });











////// Cursor Animation


var cursorObj = document.getElementById('cursor_containter');
var cursorObjCircle = cursorObj.getElementsByClassName('cursor-circle-container')[0];
/*var cursorPicture = cursorObj.getElementsByClassName('cur-pic')[0];*/

var cursorPic;
var mpTreatmentsBlockTopOffset;

var mouse_X, mouse_Y;

document.addEventListener('mousemove', function(e){
var mouseX = e.clientX - 47;
var mouseY = e.clientY - 46;

mouse_X = mouseX;
mouse_Y = mouseY;

});


var xPosM, yPosM;
var xPosPic, yPosPic;

var overTheTreatments = false;

// ease cursor movement 
function easeCursorMove() {

      var dX=1, dY=1;

      if( !xPosM ) xPosM = 0;
      if( !yPosM ) yPosM = 0;
       
      dX =  (mouse_X - xPosM) ;
      dY =  (mouse_Y - yPosM) ;
         
      xPosM += (dX / 4); /// to make more ease effect put value more then 4
      yPosM += (dY / 4); /// to make more ease effect put value more then 4


      if( Math.abs(dX) > 1 || Math.abs(dY) > 1) {
        var tmp_dX = mouse_X - dX;
        var tmp_dY = mouse_Y - dY;
          
        cursorObj.style.cssText = 'transform: translate3d('+tmp_dX+'px, '+tmp_dY+'px, 0px); will-change: transform;';

        if(  Math.abs(dX+dY/2) < 500 ) {
          ddX = dX/7 > 25 ? 25 : dX/7 < -25 ? -25 : dX/7;
          ddY = dY/7 > 25 ? 25 : dY/7 < -25 ? -25 : dY/7;
        }
        else {
          ddX = 0;
          ddY = 0;
        }

        cursorDynamicScale = 1 + (Math.abs(dX+dY/2) * 0.002);

        cursorObjCircle.style.cssText = 'transform: skewX('+ddX+'deg) skewY('+ddY+'deg) scale3d('+cursorDynamicScale+', '+cursorDynamicScale+', 1); will-change: transform;';

      }

      if(overTheTreatments) { /// cursor picture

        var pX=1, pY=1;

        if( !xPosPic ) xPosPic = 0;
        if( !yPosPic ) yPosPic = 0;
         
        pX =  (mouse_X - xPosPic) ;
        pY =  (mouse_Y - yPosPic) ;
           
        xPosPic += (pX / 10); /// to make more ease effect put value more then 4
        yPosPic += (pY / 10); /// to make more ease effect put value more then 4


        if( Math.abs(pX) > 1 || Math.abs(pY) > 1) {

          var tmp_pX = mouse_X - pX;
          var tmp_pY = mouse_Y - pY - mpTreatmentsBlockTopOffset;

          ppX = pX/7 > 25 ? 25 : pX/7 < -25 ? -25 : pX/7;
          ppY = pY/7 > 25 ? 25 : pY/7 < -25 ? -25 : pY/7;

          pp = (ppX + ppY) / 2;

          cursorPic.style.cssText = 'transform: translate3d('+tmp_pX+'px, '+tmp_pY+'px, 0px) rotate3d(0,0,1,'+pp+'deg); will-change: transform;';

        }
      }

      requestAnimationFrame( easeCursorMove );

  }

easeCursorMove();

window.addEventListener('mousedown', (e)=>{
  cursorObj.classList.add('mouse-down');
});

window.addEventListener('mouseup', (e)=>{
  cursorObj.classList.remove('mouse-down');
});

////// Cursor Animation









///// Useful info



function updateUsfulInfo( countryAbbr ){

  $.ajax({
    type: "GET",
    url: "/visa-info-ajax.php",
    data: { lang: $('body').data('lang'), countryAbbr: countryAbbr },
    cache: false
  }).done(function( resp ) {
                
  var respData = resp.split("#|#");

  $(".visa-col.vc-head").html( respData[0] );
  $(".visa-col .vc-text").html( respData[1] );

  
  ///$(window).trigger('resize');

  //prlxUpdChangedContent();

  
  });
}



///// Useful info


function openDocOverlay(){

  let btnDocPlay = document.getElementById('documentaryPlayBtn');
  let docPicture = document.getElementById('documentaryPicture');

  let topOffset = docPicture.getBoundingClientRect().top;
  let leftOffset = docPicture.getBoundingClientRect().left;
  let width = docPicture.getBoundingClientRect().width;
  let height = docPicture.getBoundingClientRect().height;

  let commonOverlays = document.getElementById('commonOverlays');
  let documentaryOverlay = document.getElementById('documentaryOverlay');
  let documentaryBlock = documentaryOverlay.querySelector('.do-block');
  let docPictureTransform = docPicture.querySelector('.picture-holder').style.transform;


  documentaryOverlay.classList.add('overlay-is-open');
  
  commonOverlays.style.cssText = 'opacity: 1; pointer-events: all';
  documentaryOverlay.style.cssText = 'opacity: 1; pointer-events: all';
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  document.getElementsByTagName('body')[0].classList.add('documentaryVideo');



  docPicture.style.cssText = 'opacity: 0';

  documentaryBlock.querySelector('.picture-holder').style.transform = docPictureTransform;
  documentaryBlock.style.cssText = 'top:'+topOffset+'px;'; 

  let docVideoHeight = windowWidth * 0.538;
  let docVidTopDist =  ((windowHeight - docVideoHeight) / 2) - topOffset;




  anime({
    targets: documentaryBlock,
    width: '100%',
    height: docVideoHeight,
    translateY: docVidTopDist,
    easing: 'easeOutCubic',
    duration: 1000
  });

  anime({
    targets: document.getElementsByClassName('do-block-bg')[0],
    opacity: [0,1],
    easing: 'easeOutCubic',
    duration: 1000
  });


  setTimeout(() => {
    //document.querySelector('.do-youtube').style.cssText = 'display: block';


    documentaryOverlay.getElementsByClassName('do-youtube')[0].innerHTML = "<iframe class='myiframeclass com-youtube' id='yt1' width='100%' height='100%' src='https://www.youtube.com/embed/"+documentaryYT_id+"?controls=true&showinfo=0&enablejsapi=1&rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>";

    

    anime({
      targets: document.querySelector('.do-youtube'),
      opacity: [0,1],
      easing: 'easeOutCubic',
      duration: 400
    });

      //yt_player.playVideo();

  }, 1100);


}



function closeDocOverlay(){

  let btnDocPlay = document.getElementById('documentaryPlayBtn');
  let docPicture = document.getElementById('documentaryPicture');

  let topOffset = docPicture.getBoundingClientRect().top;
  let leftOffset = docPicture.getBoundingClientRect().left;
  let width = docPicture.getBoundingClientRect().width;
  let height = docPicture.getBoundingClientRect().height;

  let commonOverlays = document.getElementById('commonOverlays');
  let documentaryOverlay = document.getElementById('documentaryOverlay');
  let documentaryBlock = documentaryOverlay.querySelector('.do-block');
  let docPictureTransform = docPicture.querySelector('.picture-holder').style.transform;

  //documentaryBlock.querySelector('.picture-holder').style.transform = docPictureTransform;
  documentaryBlock.style.cssText = 'top:'+topOffset+'px;'; 

  let docVideoHeight = windowWidth * 0.538;
  let docVidTopDist =  ((windowHeight - docVideoHeight) / 2) - topOffset;



  anime({
    targets: document.querySelector('.do-youtube'),
    opacity: [1,0],
    easing: 'easeOutCubic',
    duration: 400,
    delay: 900
  });


  setTimeout(() => {
    //document.querySelector('.do-youtube').style.cssText = 'display: none';
    documentaryOverlay.getElementsByClassName('do-youtube')[0].innerHTML = "";

    documentaryOverlay.classList.add('overlay-is-close');

    //if( yt_player.getPlayerState() == '1' ) {
    //  yt_player.pauseVideo();
    //}
  }, 400);



  anime({
    targets: documentaryBlock,
    width: [documentaryOverlay.querySelector('.do-wrapper').offsetWidth, width],
    height: [docVideoHeight, height],
    translateY: [docVidTopDist, 0],
    easing: 'easeOutCubic',
    duration: 700,
    delay: 400
  });


  anime({
    targets: document.getElementsByClassName('do-block-bg')[0],
    opacity: [1,0],
    easing: 'easeOutCubic',
    duration: 700,
    delay: 400
  });

  
  setTimeout( () => {
    commonOverlays.style.cssText = 'opacity: 0; pointer-events: none';
    documentaryOverlay.style.cssText = 'opacity: 0; pointer-events: none';
    document.getElementsByTagName('body')[0].style.overflow = '';
    document.getElementsByTagName('body')[0].classList.remove('documentaryVideo');

    //document.querySelector('.do-youtube').style.opacity = '1';

    docPicture.style.cssText = 'opacity: 1';
    documentaryOverlay.classList.remove('overlay-is-open');
    documentaryOverlay.classList.remove('overlay-is-close');

  }, 1200);
  
}


/*
function resizeDocOverlay(){
  let topOffset = docPicture.getBoundingClientRect().top;
  let leftOffset = docPicture.getBoundingClientRect().left;
  let width = docPicture.getBoundingClientRect().width;
  let height = docPicture.getBoundingClientRect().height;

  let commonOverlays = document.getElementById('commonOverlays');
  let documentaryOverlay = document.getElementById('documentaryOverlay');
  let documentaryBlock = documentaryOverlay.querySelector('.do-block');
  let docPictureTransform = docPicture.querySelector('.picture-holder').style.transform;

  

  //documentaryBlock.style.top = topOffset+'px'; 

  let docVideoHeight = windowWidth * 0.5;
  let docVidTopDist =  ((windowHeight - docVideoHeight) / 2) - topOffset;

  documentaryBlock.style.translateY = docVidTopDist+'px';

  documentaryBlock.style.height = docVideoHeight+'px';


}
*/





///// Reviews overlay


/*
function openReviewsOverlay( el ){

  let commonOverlays = document.getElementById('commonOverlays');
  let overlay = document.getElementById('reviewOverlay');
  let ytid = el.dataset.ytid;
  let comBlock = overlay.getElementsByClassName('com-block')[0];

  comBlock.classList.remove('noisy');


  overlay.classList.add('overlay-is-open');
  
  commonOverlays.style.cssText = 'opacity: 1; pointer-events: all;';
  overlay.style.cssText = 'opacity: 1; pointer-events: all';

  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  document.getElementsByTagName('body')[0].classList.add('reviewVideo');


  overlay.getElementsByClassName('com-block')[0].innerHTML = "<iframe class='myiframeclass com-youtube' id='yt1' width='100%' height='100%' src='https://www.youtube.com/embed/" + ytid + "?controls=true&showinfo=0&enablejsapi=1&rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>";

  anime({
    targets: overlay.getElementsByClassName('com-block-bg')[0],
    opacity: [0,1],
    easing: 'easeOutCubic',
    duration: 500
  });

  anime({
    targets: overlay.getElementsByClassName('com-wrapper')[0],
    translateY: ['-250px', 0],
    easing: 'easeOutCubic',
    duration: 1500
  });

  setTimeout(()=>{
    comBlock.classList.add('noisy');
  }, 600);


}





function closeReviewsOverlay(){

  let commonOverlays = document.getElementById('commonOverlays');
  let overlay = document.getElementById('reviewOverlay');

  let comBlock = overlay.getElementsByClassName('com-block')[0];

  comBlock.classList.remove('noisy');

  overlay.getElementsByClassName('com-block')[0].innerHTML = "";

  anime({
    targets: overlay.getElementsByClassName('com-block-bg')[0],
    opacity: [1,0],
    easing: 'easeOutCubic',
    duration: 400
  });

  
  setTimeout( () => {
    commonOverlays.style.cssText = 'opacity: 0; pointer-events: none';
    overlay.style.cssText = 'opacity: 0; pointer-events: none';
    document.getElementsByTagName('body')[0].style.overflow = '';
    document.getElementsByTagName('body')[0].classList.remove('reviewVideo');
    comBlock.classList.add('noisy');

    overlay.classList.remove('overlay-is-open');
    overlay.classList.remove('overlay-is-close');

    

  }, 400);
  
}

*/
///// End of Reviews overlay


















function startAfterAjaxPageUpd(){



  
  

  if($("#map_canvas").length > 0) {
    initializeMap();
  }






/*
$('.booking-title').each(function(i, elem){
  letterAnimation( $(this), 0.4 );
});
*/


$('h3.bb-head').each(function(i, elem){
  wordsAnimation( $(this), 0.3 );
});


 $('.slider-main-txt .lettersAnimBlock').each(function(i, elem){
  wordsAnimation( $(this), 0.6 );
});


$('h3.lettersAnimBlock, h2.lettersAnimBlock, h1.lettersAnimBlock').each(function(i, elem){
  wordsAnimation( $(this), 0.3 );
});


 $('.review-name.lettersAnimBlock').each(function(i, elem){
  wordsAnimationQuick( $(this), 0 );
});



$('.htc-year .first').each(function(i, elem){
  letterAnimation( $(this), 0 );
});


$('.htc-year .second').each(function(i, elem){
  letterAnimation( $(this), 0 );
});


////// Open booking form


    

document.querySelectorAll('.booking-btn').forEach((el) => {
        
  el.addEventListener('click', () => {

    //document.getElementById('bookingBtn').click();

    document.getElementById('bookingBtnFakeTrigger').click(); // fake trigger for google analytics trcking

    bookingObj.openBooking();
    
  });

});


/////// open booking form




//// Documentary overlay

if( document.querySelector('div:not(.mp-documentary-video) .mp-doc-play-btn') ) {


  document.getElementById('documentaryPlayBtn').addEventListener('click', () => {
    openDocOverlay();
  });

  document.getElementById('docCloseBtn').addEventListener('click', () => {
    closeDocOverlay();
  });

  /*
  window.addEventListener("resize", () => {
    resizeDocOverlay();
  });
  */



}


//// End of Documentary overlay




//// Treatments Reviews


/*
if( document.querySelector('.mp-review') ) {


  document.querySelectorAll('.mp-review').forEach((el) => {
    el.addEventListener('click', (e) => {      
      openReviewsOverlay(e.target.closest('.mp-review'));
    });
  });


  document.getElementById('reviewsCloseBtn').addEventListener('click', () => {
    closeReviewsOverlay();
  });


}
*/


//// End of Treatments Reviews










///// contacts section



document.querySelectorAll('.write-btn').forEach((el) => {
  el.addEventListener('mouseenter', () => {

    let a1 = anime({
      targets: '.roundBtnArrow',
      translateX: 100,
      scale: 0.3,
      easing: 'easeInQuart',
      duration: 400
    });

    let a2 = anime({
      targets: '.roundBtnArrow2',
      translateX: 88,
      scaleY: [0.3, 1],
      scaleX: [2, 1],
      opacity: [0, 1],
      easing: 'easeOutBack',
      duration: 600,
      delay: 170
    });

  });

  el.addEventListener('mouseleave', () => {
    el.querySelector('.roundBtnArrow').style.cssText = "";
    el.querySelector('.roundBtnArrow2').style.cssText = "";
  });

});

  


///// contacts section



///// Buttons animations




document.querySelectorAll('.button:not(.swiper-buttons)').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    let btn = e.target;
    

    if(!btn.classList.contains('button-hover')) {

      let arrowPath1 = btn.querySelector('.btnArrow1');
      let arrowPath2 = btn.querySelector('.btnArrow2');
      let txt1 = btn.querySelector('.btn-txt-wrap div:nth-child(1)');
      let txt2 = btn.querySelector('.btn-txt-wrap div:nth-child(2)');
      
      anime({
        targets: arrowPath1,
        duration: 100,
        opacity: [1,0],
        translateX: [0,30],
        scaleX: [1,1.2],
        scaleY: [1,0.8],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true,
        delay:50
      });


      let tl = anime.timeline({
        targets: arrowPath2,
        duration: 800,
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });


      tl.add({
        scaleX: [1.4,1.4],
        scaleY: [0.5,0.5],
        opacity: [0.7,1],
        translateX: [-50,0],
        duration: 120
      })
      .add({
        scaleX: [1.4,1],
        scaleY: [0.5,1],
        duration: 150,
        easing: 'spring(1, 100, 100, 0)'
      });


      anime({
        targets: txt1,
        duration: 300,
        opacity: [1,0],
        translateY: [0,'-100%'],
        scaleY: [1,3],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });

      anime({
        targets: txt2,
        duration: 300,
        opacity: [0,1],
        scaleY: [3,1],
        translateY: [0,'-100%'],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });


    }

    btn.classList.add('button-hover');
    
  });
});


document.querySelectorAll('.button').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    let btn = e.target;
    setTimeout(() => {
      if(btn.classList.contains('button-hover')) {
        btn.classList.remove('button-hover');
      }
    }, 300);
    
  });
});



//// swiper btn to right
document.querySelectorAll('.swiper-buttons .btn-arrow').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    let btn = e.target;
    

    if(!btn.classList.contains('button-act')) {

      let arrowPath1 = btn.querySelector('.btn-arrow .btnArrow1');
      let arrowPath2 = btn.querySelector('.btn-arrow .btnArrow2');

      
      anime({
        targets: arrowPath1,
        duration: 100,
        opacity: [1,0],
        translateX: [0,30],
        scaleX: [1,1.2],
        scaleY: [1,0.8],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true,
        delay:50
      });

      let tl = anime.timeline({
        targets: arrowPath2,
        duration: 800,
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });

      tl.add({
        scaleX: [1.4,1.4],
        scaleY: [0.5,0.5],
        opacity: [0.7,1],
        translateX: [-30,0],
        duration: 120
      })
      .add({
        scaleX: [1.4,1],
        scaleY: [0.5,1],
        duration: 150,
        easing: 'spring(1, 100, 100, 0)'
      });
    }

    btn.classList.add('button-act');
    
  });

  
  el.addEventListener('mouseleave', (e) => {
    let btn = e.target;
    setTimeout(() => {
      if(btn.classList.contains('button-act')) {
        btn.classList.remove('button-act');
      }
    }, 300);
    
  });
});




//// swiper btn to left
document.querySelectorAll('.swiper-buttons .btn-arrow-left').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    let btn = e.target;
  
    if(!btn.classList.contains('button-act')) {

      let arrowPath1 = btn.querySelector('.btn-arrow-left .btnArrow1');
      let arrowPath2 = btn.querySelector('.btn-arrow-left .btnArrow2');

      
      anime({
        targets: arrowPath1,
        duration: 100,
        opacity: [1,0],
        translateX: [0,-30],
        scaleX: [1,1.2],
        scaleY: [1,0.8],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true,
        delay:50
      });

      let tl = anime.timeline({
        targets: arrowPath2,
        duration: 800,
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });

      tl.add({
        scaleX: [1.4,1.4],
        scaleY: [0.5,0.5],
        opacity: [0.7,1],
        translateX: [30,0],
        duration: 120
      })
      .add({
        scaleX: [1.4,1],
        scaleY: [0.5,1],
        duration: 150,
        easing: 'spring(1, 100, 100, 0)'
      });
    }

    btn.classList.add('button-act');
    
  });

  
  el.addEventListener('mouseleave', (e) => {
    let btn = e.target;
    setTimeout(() => {
      if(btn.classList.contains('button-act')) {
        btn.classList.remove('button-act');
      }
    }, 300);
    
  });
});







if( document.querySelector('.mp-doc-play-btn') ) {
const wavyPlayDocBtn = [
  {value: 'M 191.9 100.1 c 0 23.3 -8.6 44.6 -22.9 60.9 c -16.9 19.3 -41.7 31.4 -69.4 31.4 c -20.7 0 -39.7 -6.8 -55.1 -18.3 c -22.6 -16.8 -37.2 -43.7 -37.2 -74 c 0 -24.5 9.6 -46.8 25.7 -63.1 c 16.8 -17.8 40.7 -29 67.1 -29 c 25 0 47.6 9.2 64.2 25 C 181.2 49.2 191.9 72.7 191.9 100.1 z'},
  {value: 'M 191.9 100.1 c 0 23.3 -8.6 44.6 -22.9 60.9 c -16.9 19.3 -40 37 -69.4 31.4 c -29.6 -5.4 -39.7 -6.8 -55.1 -18.3 c -22.6 -16.8 -37.2 -43.7 -37.2 -74 c 0 -24.5 2.7 -45.1 26.7 -62.1 c 22 -17 40.7 -29 67.1 -29 c 25 0 50.9 2 63.9 25 C 177 58 191.9 72.7 191.9 100.1 z'},
  {value: 'M 191.9 100.1 c 3.1 26.9 -8.6 44.6 -22.9 60.9 c -16.9 19.3 -45 41 -69.4 31.4 c -32.6 -15.4 -39.7 -6.8 -55.1 -18.3 c -22.6 -16.8 -42.5 -41.1 -37.2 -74 c 5.7 -30.1 9.6 -46.8 25.7 -63.1 c 16.8 -17.8 40 -34 67.1 -29 c 31.9 8 47.6 9.2 64.2 25 C 181.2 49.2 187 73 191.9 100.1 z'},
  {value: 'M 191.9 100.1 c 0 23.3 -8.6 44.6 -22.9 60.9 c -16.9 19.3 -41.7 31.4 -69.4 31.4 c -20.7 0 -39.7 -6.8 -55.1 -18.3 c -22.6 -16.8 -37.2 -43.7 -37.2 -74 c 0 -24.5 9.6 -46.8 25.7 -63.1 c 16.8 -17.8 40.7 -29 67.1 -29 c 25 0 47.6 9.2 64.2 25 C 181.2 49.2 191.9 72.7 191.9 100.1 z'}
];


let wavyPlayDocBtnEl = document.querySelector('.mp-doc-play-btn');
let wavyPlayDocBtnSVG1 = wavyPlayDocBtnEl.querySelector('.play-btn-svg');
let wavyPlayDocBtnSVG2 = wavyPlayDocBtnEl.querySelector('.play-btn-svg2');


wavyPlayDocBtnEl.addEventListener('mouseenter', () => {
  if(!wavyPlayDocBtnEl.classList.contains('acvtivated')) {
    wavyPlayDocBtnSVG1.style.cssText = 'display: none';
    wavyPlayDocBtnSVG2.style.cssText = 'display: block';
    wavyPlayDocBtnEl.classList.add('acvtivated')
  }
 
});



let wavyPlayDocBtn_ = new wavyPathAnim(
  wavyPlayDocBtnEl, 
  document.getElementById('docPlayBtn'), 
  wavyPlayDocBtn
);


}


///// Buttons Animations


///// Blocks animation



document.querySelectorAll('.category-block').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    let btn = e.target;
    

    if(!btn.classList.contains('button-hover')) {

      let arrowPath1 = btn.querySelector('.btnArrow1');
      let arrowPath2 = btn.querySelector('.btnArrow2');

      
      anime({
        targets: arrowPath1,
        duration: 100,
        opacity: [1,0],
        translateX: [0,30],
        scaleX: [1,1.2],
        scaleY: [1,0.8],
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true,
        delay:50
      });


      let tl = anime.timeline({
        targets: arrowPath2,
        duration: 800,
        easing: 'easeInOutSine',
        loop: false,
        autoplay: true
      });


      tl.add({
        scaleX: [1.4,1.4],
        scaleY: [0.5,0.5],
        opacity: [0.7,1],
        translateX: [-50,0],
        duration: 120
      })
      .add({
        scaleX: [1.4,1],
        scaleY: [0.5,1],
        duration: 150,
        easing: 'spring(1, 100, 100, 0)'
      });

    }

    btn.classList.add('button-hover');
    
  });
});


document.querySelectorAll('.category-block').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    let btn = e.target;
    setTimeout(() => {
      if(btn.classList.contains('button-hover')) {
        btn.classList.remove('button-hover');
      }
    }, 300);
    
  });
});


///// Blocks animation







////// Cursor Animation



document.querySelectorAll('.cursor-pointer:not(.act)').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    document.getElementById('cursor_containter').classList.add('cursor-accent');
  });
});


document.querySelectorAll('.cursor-pointer:not(.act)').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    document.getElementById('cursor_containter').classList.remove('cursor-accent');
  });
});


document.querySelectorAll('.cursor-pointer-hi:not(.act)').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    document.getElementById('cursor_containter').classList.add('cursor-accent-hi');
  });
});


document.querySelectorAll('.cursor-pointer-hi:not(.act)').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    document.getElementById('cursor_containter').classList.remove('cursor-accent-hi');
  });
});


document.querySelectorAll('.cursor-play').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    document.getElementById('cursor_containter').classList.add('cursor-playbtn');
  });
});


document.querySelectorAll('.cursor-play').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    document.getElementById('cursor_containter').classList.remove('cursor-playbtn');
  });
});


document.querySelectorAll('.cursor-read').forEach( (el) => {
  el.addEventListener('mouseenter', (e) => {
    document.getElementById('cursor_containter').classList.add('cursor-readbtn');
  });
});


document.querySelectorAll('.cursor-read').forEach( (el) => {
  el.addEventListener('mouseleave', (e) => {
    document.getElementById('cursor_containter').classList.remove('cursor-readbtn');
  });
});



if(!mobile) {
  
  let treatmentLinksAnim = anime({
    targets: '.cursor-picture-link',
    duration: 250,
    opacity: [0.1,1],
    easing: 'easeInOutSine',
    autoplay: false
  });

  treatmentLinksAnim.seek(250);

  document.querySelectorAll('.cursor-picture-link').forEach( (el) => {

    el.addEventListener('mouseenter', (e) => {
      cursorPic = document.getElementById('cursor_picture');
      overTheTreatments = true;
      mpTreatmentsBlockTopOffset = document.querySelector('.mp-tratments').getBoundingClientRect().top;
      cursorPic.classList.add('cursor-picture-active');
      let el = e.target;
      let picEl = document.getElementById( el.dataset.id );

      document.querySelector('.cursor-picture').classList.remove('display-none');

      if(picEl) {
        picEl.style.cssText = '';
        
        anime({
          targets: picEl,
          duration: 350,
          opacity: [0,1],
          scale: [0.7,1],
          /*translateX: ['200', '0'],*/
          borderRadius: ['50%','0%'],
          easing: 'easeInOutSine',
          loop: false,
          autoplay: true
        });
      }

      document.querySelectorAll('.cursor-picture-link').forEach((elem) => {
        elem.style.opacity = 0.1;
      });

      treatmentLinksAnim.seek(0);
      treatmentLinksAnim.pause();

      el.style.opacity = 1;

    });


    
    el.addEventListener('mouseleave', (e) => {
      
      cursorPic = document.getElementById('cursor_picture');
      var el = e.target;
      var picEl = document.getElementById( el.dataset.id );

      mpTreatmentsBlockTopOffset = document.querySelector('.mp-tratments').getBoundingClientRect().top;

      /*
      document.querySelectorAll('.cursor-picture-link').forEach((el) => {
        el.style.opacity = 1;
      });
      */

    treatmentLinksAnim.restart();

    /*
      anime({
        targets: '.cursor-picture-link',
        duration: 250,
        opacity: [0.1,1],
        easing: 'easeInOutSine',
      });
      */

      if(picEl) {

        overTheTreatments = false;
        anime({
          targets: picEl,
          duration: 350,
          opacity: [1,0],
          scale: [1,0.7],
          borderRadius: ['0%','50%'],
          easing: 'easeInOutSine',
          loop: false,
          autoplay: true
        });

        

        
          setTimeout(() => {
            if( !overTheTreatments ) {
              cursorPic.classList.remove('cursor-picture-active');
              document.querySelector('.cursor-picture').classList.add('display-none');
            }

          }, 250);
      }
      
    });
  });

}



$('.arrow-left').mouseover(function(){
  $('.cursor-container').addClass('cursor-arrow-left');
});


$('.arrow-left').on('mouseleave', function(){
  $('.cursor-container').removeClass('cursor-arrow-left');
});

$('.arrow-right').mouseover(function(){
  $('.cursor-container').addClass('cursor-arrow-right');
});

$('.arrow-right').on('mouseleave', function(){
  $('.cursor-container').removeClass('cursor-arrow-right');
});


////// Cursor Animation



////// Filters catalogue



  class sectionsCatalogue {
    constructor() {

      document.querySelectorAll('.filters-catalogue li').forEach( (el) => {
        el.addEventListener('click', (e) => {
          let el = e.target.closest('li');
          this.markAllInactive();
          el.classList.add('act');

          let trgt = el.dataset.target;
          
          if(trgt == 'all') {
            this.showAll();
            prlxUpdChangedContent();
          }
          else {
            this.hideAll();
            this.showBlock(trgt);
            prlxUpdChangedContent();
          }
        });
      });
    }

    markAllInactive() {
      document.querySelectorAll('.filters-catalogue li').forEach( (el) => {
        el.classList.remove('act');
      });
    }

    showBlock(trgt) {
      let el = document.querySelectorAll('.category-category.cat-'+trgt).forEach( (el) => {
        el.classList.remove('display-none');
      });
      
    }

    hideAll() {
      document.querySelectorAll('.category-category').forEach( (el) => {
        //el.style.display = 'none';
        el.classList.add('display-none');
      });
    }

    showAll() {
      document.querySelectorAll('.category-category').forEach( (el) => {
        //el.style.display = 'block';
        el.classList.remove('display-none');
      });
      
    }
  }


  var section_cat = new sectionsCatalogue();

  


////// END of Filter catalogue




/////// Patents section 



class pictureToOverlay {
  constructor(elem) {
    //const elem = elem;
    if( document.querySelector( elem ) ) {
      document.querySelectorAll( elem ).forEach( (el) => {
        
        el.addEventListener('click', (e) => {
          let el = e.target.closest(elem);
          let pic = el.dataset.pic;
          this.openOverlay(pic);
        });
      });

      document.getElementById('reviewsCloseBtn').addEventListener('click', () => {
        this.closeOverlay();
      });

    }

  }

  openOverlay(pic) {

    let commonOverlays = document.getElementById('commonOverlays');
    let overlay = document.getElementById('reviewOverlay');
    let comBlock = overlay.getElementsByClassName('com-block')[0];

    overlay.classList.add('overlay-is-open');
    
    commonOverlays.style.cssText = 'opacity: 1; pointer-events: all;';
    overlay.style.cssText = 'opacity: 1; pointer-events: all';

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].classList.add('reviewVideo');

    comBlock.classList.remove('noisy');
    comBlock.classList.add('comBlockForPic');

    comBlock.innerHTML = "<div class='overlayPictureInline' style='background-image: url("+pic+")'></div>";

    anime({
      targets: overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [0,1],
      easing: 'easeOutCubic',
      duration: 500
    });

    anime({
      targets: overlay.getElementsByClassName('com-wrapper')[0],
      translateY: ['-250px', 0],
      easing: 'easeOutCubic',
      duration: 1500
    });

  }

  closeOverlay() {
    let commonOverlays = document.getElementById('commonOverlays');
    let overlay = document.getElementById('reviewOverlay');
    let comBlock = overlay.getElementsByClassName('com-block')[0];

    overlay.getElementsByClassName('com-block')[0].innerHTML = "";

    anime({
      targets: overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [1,0],
      easing: 'easeOutCubic',
      duration: 400
    });

    
    setTimeout( () => {
      commonOverlays.style.cssText = 'opacity: 0; pointer-events: none';
      overlay.style.cssText = 'opacity: 0; pointer-events: none';
      document.getElementsByTagName('body')[0].style.overflow = '';
      document.getElementsByTagName('body')[0].classList.remove('reviewVideo');
      comBlock.classList.add('noisy');
      comBlock.classList.remove('comBlockForPic');
      
      overlay.classList.remove('overlay-is-open');
      overlay.classList.remove('overlay-is-close');

    }, 400);
  }

}

var patentsPictures = new pictureToOverlay('.category-block-patent');



/////// End of patents section





/////// Success Stories



class ytToOverlay {
  constructor(elem) {

    if( document.querySelector( elem ) ) {
      document.querySelectorAll( elem ).forEach( (el) => {
        
        el.addEventListener('click', (e) => {
          let el = e.target.closest(elem);
          let ytid = el.dataset.ytid;
          this.openOverlay(ytid);
        });
      });

      document.getElementById('reviewsCloseBtn').addEventListener('click', () => {
        this.closeOverlay();
      });

    }

  }

  youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  openOverlay(ytid) {

    let commonOverlays = document.getElementById('commonOverlays');
    let overlay = document.getElementById('reviewOverlay');
    let comBlock = overlay.getElementsByClassName('com-block')[0];

    
    comBlock.classList.remove('noisy');
    overlay.classList.add('overlay-is-open');
    
    commonOverlays.style.cssText = 'opacity: 1; pointer-events: all;';
    overlay.style.cssText = 'opacity: 1; pointer-events: all';

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].classList.add('reviewVideo');


    overlay.getElementsByClassName('com-block')[0].innerHTML = "<iframe class='myiframeclass com-youtube' id='yt1' width='100%' height='100%' src='https://www.youtube.com/embed/" + this.youtube_parser( ytid ) + "?controls=true&showinfo=0&enablejsapi=1&rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>";

    anime({
      targets: overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [0,1],
      easing: 'easeOutCubic',
      duration: 500
    });

    anime({
      targets: overlay.getElementsByClassName('com-wrapper')[0],
      translateY: ['-250px', 0],
      easing: 'easeOutCubic',
      duration: 1500
    });

    setTimeout(()=>{
      comBlock.classList.add('noisy');
    }, 600);

  }

  closeOverlay() {
    let commonOverlays = document.getElementById('commonOverlays');
    let overlay = document.getElementById('reviewOverlay');
    let comBlock = overlay.getElementsByClassName('com-block')[0];

    comBlock.classList.remove('noisy');

    overlay.getElementsByClassName('com-block')[0].innerHTML = "";

    anime({
      targets: overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [1,0],
      easing: 'easeOutCubic',
      duration: 400
    });

    
    setTimeout( () => {
      commonOverlays.style.cssText = 'opacity: 0; pointer-events: none';
      overlay.style.cssText = 'opacity: 0; pointer-events: none';
      document.getElementsByTagName('body')[0].style.overflow = '';
      document.getElementsByTagName('body')[0].classList.remove('reviewVideo');
      comBlock.classList.add('noisy');

      overlay.classList.remove('overlay-is-open');
      overlay.classList.remove('overlay-is-close');
    }, 400);

  }

  
}

var successStoriesWatch = new ytToOverlay('.category-watch');


if( document.querySelector('.category-watch') ) {

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 15,
    /*shortSwipes: false,
    touchRatio: 0.7,*/

    breakpoints: {
      651: {
        slidesPerView: 3,
        spaceBetween: 20,
      },

      1001: {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    },

    
    navigation: {
      nextEl: '.swiper-buttons .btn-arrow',
      prevEl: '.swiper-buttons .btn-arrow-left'
    }
    
  });

/*
  swiper.on('slideChange', function() {
    var realIndex = swiper.realIndex;

    
    if (realIndex == 0) {      
      document.querySelector('.swiper-buttons .btn-arrow-left').style.opacity = '0.5';
    } else {
      document.querySelector('.swiper-buttons .btn-arrow-left').style.opacity = '1';
    }
  });
*/
  

}





///



class successStoryOverlay {
  constructor(elem) {
    
    this.commonOverlays = document.getElementById('commonOverlays');
    this.overlay = document.getElementById('successOverlay');
    this.comBlock = this.overlay.getElementsByClassName('com-wrapper')[0];

    if( document.querySelector( elem ) ) {
      document.querySelectorAll( elem ).forEach( (el) => {
        
        el.addEventListener('click', (e) => {
          let el = e.target.closest(elem);
          let id = el.dataset.id;
          
          this.ajaxLoadContent(id);
          //this.openOverlay(id);

        });
      });

      document.getElementById('successCloseBtn').addEventListener('click', () => {
        this.closeOverlay();
      });

    }

  }

  async ajaxLoadContent( id ) {
   
    //let response = await fetch( '/ajax_successStories.php?id=' + id + '&lang=' + document.getElementsByTagName('body')[0].dataset.langid );
    let response = await fetch( '/ajax_successStories.php?id=' + id + '&lang=' + document.getElementsByTagName('body')[0].dataset.langid );

    
    
    if( response.ok ) {
      let result = await response.text();
      this.comBlock.innerHTML = result;
      this.openOverlay( id );
    } 

  }

  openOverlay(id) {
    this.overlay.classList.add('overlay-is-open');
    
    this.commonOverlays.style.cssText = 'opacity: 1; pointer-events: all;';
    this.overlay.style.cssText = 'opacity: 1; pointer-events: all';

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].classList.add('reviewVideo');

    this.overlay.getElementsByClassName('pp-shader')[0].style.opacity = 0.6;
    this.overlay.getElementsByClassName('com-block-bg')[0].style.opacity = 1;

    var tl = anime.timeline();
    
    /*
    tl.add({
      targets: this.overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [0,1],
      easing: 'easeOutCubic',
      duration: 500
    });
    */

    
    tl.add({
      targets: this.overlay.getElementsByClassName('pp-pic')[0],
      scaleX: [2, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1500
    }, 0);

    tl.add({
      targets: this.overlay.getElementsByClassName('ps-head')[0],
      translateY: ['100px', 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2200
    }, 0);

    tl.add({
      targets: this.overlay.getElementsByClassName('ps-desc')[0],
      translateY: ['100px', 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2200
    }, 100);

    tl.add({
      targets: this.overlay.getElementsByClassName('ps-text')[0],
      translateY: ['100px', 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2200
    }, 200);

    

  }

  closeOverlay() {
    //this.comBlock.innerHTML = "";

    var tl = anime.timeline();
    tl.add({
      targets: this.overlay.getElementsByClassName('pp-pic')[0],
      scaleX: [1, 2],
      opacity: [1, 0],
      easing: 'easeOutCubic',
      duration: 300
    });

    tl.add({
      targets: this.overlay.getElementsByClassName('pp-shader')[0],
      opacity: [1, 0],
      easing: 'easeOutCubic',
      duration: 500
    }, 0);


    
    tl.add({
      targets: this.overlay.getElementsByClassName('com-block-bg')[0],
      opacity: [1,0],
      easing: 'easeOutCubic',
      duration: 400
    }, 0 );


    tl.add({
      targets: this.overlay.getElementsByClassName('patient-story')[0],
      opacity: [1,0],
      easing: 'easeOutCubic',
      duration: 400
    }, 0 );
    


    

    
    setTimeout( () => {
      this.commonOverlays.style.cssText = 'opacity: 0; pointer-events: none';
      this.overlay.style.cssText = 'opacity: 0; pointer-events: none';
      document.getElementsByTagName('body')[0].style.overflow = '';
      document.getElementsByTagName('body')[0].classList.remove('reviewVideo');

      this.overlay.getElementsByClassName('ps-text')[0].style.opacity = 0;
      this.overlay.getElementsByClassName('ps-desc')[0].style.opacity = 0;
      this.overlay.getElementsByClassName('ps-head')[0].style.opacity = 0;
      this.overlay.getElementsByClassName('patient-story')[0].style.opacity = 1;
     
      this.overlay.classList.remove('overlay-is-open');
      this.overlay.classList.remove('overlay-is-close');

    }, 500);
  }

}

var successStoryClass = new successStoryOverlay('.category-block-success');


///





////// why section


if( document.querySelector('.section-nowdays') ) {

  const swiper = new Swiper('.swiper1', {
    /*loop: true,*/
    speed: 1000,
    spaceBetween: 30,
    roundLengths: false,
    autoHeight: true,

    // breakpoints: {
    //   701: {
    //     autoHeight: false,
    //   }
    // },
    
    navigation: {
      nextEl: '.swiper-buttons .btn-arrow',
      prevEl: '.swiper-buttons .btn-arrow-left'
    }
    
  });


  const swiper2 = new Swiper('.swiper2', {
    /*loop: true,*/
    speed: 1000,
    spaceBetween: 30,
    roundLengths: false
  });

  swiper.controller.control = swiper2;
  swiper2.controller.control = swiper;

  //document.querySelector('.swiper-buttons .btn-arrow-left').style.opacity = '0.5';

  swiper.on('slideChange', function() {
    var realIndex = swiper.realIndex;
    if (realIndex == 0) {      
      document.querySelector('.swiper-buttons .btn-arrow-left').style.opacity = '0.5';
    } else {
      document.querySelector('.swiper-buttons .btn-arrow-left').style.opacity = '1';
    }
    //console.log(realIndex);

    if (realIndex == 4) {      
      document.querySelector('.swiper-buttons .btn-arrow-right').style.opacity = '0.5';
    } else {
      document.querySelector('.swiper-buttons .btn-arrow-right').style.opacity = '1';
    }
  });




}


////// end of why section




/////// End of Success Stories



//// Mainpage Reviews
var successStoriesWatch = new ytToOverlay('.mp-review');
//// Mainpage Reviews




var watchYTLink = new ytToOverlay('.watch-yt');





///// Useful info


if( $('#visacountries').length > 0 ) {
  var selectedCountry = $('#visacountries option:checked').val();
  updateUsfulInfo( selectedCountry );

  $('#visacountries').on('change', function(){
    updateUsfulInfo( $('#visacountries option:checked').val() );
  });
}


///// Useful info

setTimeout(function(){
  window.dispatchEvent(new Event('resize')); //$(window).trigger('resize');
}, 1220);



  if(!mobile) {
    if(document.getElementById("documentaryPlayBtn")) {
      var magneticCloseBtn = new magneticBtn(document.getElementById("documentaryPlayBtn"), 1.1);
    }

    if(document.getElementById("writeUsContactsSection")) {
      var writeUsContactsSection = new magneticBtn(document.getElementById("writeUsContactsSection"), 1.1);
    }

  }




}







//// wavy blob button

class wavyPathAnim {

  constructor(hover, svg, paths) {

    this.hover = hover;
    this.duration = 2700;
    this.svgPath = svg.querySelector('path');
    this.status = 'pause';
    this.paths = paths;
    this.existingPath = this.svgPath.getAttribute('d');


    
    this.tl = anime.timeline({
      duration: this.duration,
      easing: 'linear',
      loop: true,
      autoplay: false
    });



    this.tl.update = (anim) => {
      if(this.status == 'pause') {
          if(anim.progress < 1) {
            this.tl.pause();
          }
      }
    };


    this.tl.add({
      targets: this.svgPath,
      d: this.paths,
      rotate: '60deg'
    });
    

    this.init();

  }


  init() {

    this.mouseEnter = () => {
      this.tl.play();
      this.status = 'play';



    }
    this.mouseLeave = () => {
      this.status = 'pause';
      this.tl.reverse();
    }

    this.hover.addEventListener('mouseenter', this.mouseEnter );
    this.hover.addEventListener('mouseleave', this.mouseLeave );
  }


}


if(!mobile) {

  const wavyMainMenuCircle = [
    {value: 'M 94.5 50.4 c 0 11.7 -4.6 22.4 -12.1 30.3 c -8 8.4 -19.3 13.7 -31.9 13.7 c -11.8 0 -22.5 -4.7 -30.4 -12.2 c -8.4 -8 -13.6 -19.3 -13.6 -31.8 c 0 -11.6 4.5 -22.2 11.8 -30 c 8 -8.6 19.5 -14 32.2 -14 c 13.3 0 25.3 5.9 33.5 15.6 C 90.5 29.4 94.5 39.5 94.5 50.4 z'},
    {value: 'M 93 50 c -1.5 10.6 -4 30 -12 30 c -11.9 0.7 -16.9 14.7 -30.9 14.7 c -11.8 0 -24 -4 -30.4 -12.2 c -5.6 -12.8 -9.6 -15.8 -11.6 -31.8 c -1 -15 7 -4 11.8 -30 c 4.2 -10 16.2 -10 34.2 -9 c 17 0 24 5 31 16 C 92 34 96 39 93 50 z'},
    {value: 'M 94.5 50.4 c -1.5 10.6 -5.5 20.6 -12.1 30.3 c -7.4 10.3 -19.3 13.7 -31.4 14.3 c -11.8 0 -22 0 -30.4 -12.2 c -5.6 -12.8 -13.6 -19.3 -13.6 -31.8 c 0 -11.6 2 -22 11.8 -30 c 11.2 -9 17.7 -16.4 32.7 -15.4 c 14 1 25.3 5.9 33.3 15.3 C 92 28 96 39 94.5 50.4 z'},
    {value: 'M 94.5 50.4 c 0 11.7 -5.5 18.6 -12.1 30.3 c -8 8.4 -18.4 17.3 -31.9 13.7 c -11.5 -2.4 -20.5 -6.4 -30.4 -12.2 c -11.1 -5.2 -10.1 -19.2 -13.6 -31.8 c -3.5 -10.4 0.5 -25.4 11.8 -30 c 9.7 -5.4 19.5 -14 32.2 -14 c 13.3 0 26.5 2.6 33.5 15.6 C 89 33 94.5 39.5 94.5 50.4 z'},
    {value: 'M 94.5 50.4 c 0 11.7 -4.6 22.4 -12.1 30.3 c -8 8.4 -19.3 13.7 -31.9 13.7 c -11.8 0 -22.5 -4.7 -30.4 -12.2 c -8.4 -8 -13.6 -19.3 -13.6 -31.8 c 0 -11.6 4.5 -22.2 11.8 -30 c 8 -8.6 19.5 -14 32.2 -14 c 13.3 0 25.3 5.9 33.5 15.6 C 90.5 29.4 94.5 39.5 94.5 50.4 z'}
  ];

  let wavyMainMenuBtn = new wavyPathAnim(
    document.getElementById('mainMenuBtn'), 
    document.getElementById('mmCircleHover'), 
    wavyMainMenuCircle
  );



  const wavyCloseBtnPaths = [
    {value: 'M 122.6 64.3 c 0 14.3 -5.2 27.4 -13.9 37.5 C 98.1 114.2 82.4 122 64.9 122 c -13.9 0 -26.7 -4.9 -36.7 -13.2 c -12.8 -10.6 -21 -26.6 -21 -44.5 c 0 -15.8 6.3 -30.1 16.8 -40.3 c 10.5 -10.6 25 -17.2 41.1 -17.2 c 15.9 0 30.4 6.5 40.8 16.9 C 116.1 33.9 122.6 48.4 122.6 64.3 z'},
    {value: 'M 122.6 64.3 c 0 14.3 -5.2 27.4 -13.9 37.5 C 98.1 114.2 85 116 64.9 122 c -18.9 3 -26.7 -4.9 -36.7 -13.2 c -12.8 -10.6 -25.2 -24.8 -21 -44.5 c 6.8 -23.3 6.3 -30.1 16.6 -40.5 c 10.5 -10.6 25 -17.2 41.1 -17.2 c 15.9 0 31.1 1.4 40.8 16.9 C 115 37 122.6 48.4 122.6 64.3 z'},
    {value: 'M 122.6 64.3 c -5.6 14.7 -1.6 29.7 -13.9 37.5 C 89 107 83 111 64.9 122 c -21.9 10 -26.9 -3 -36.7 -13.2 c -12.2 -14.8 -25.2 -24.8 -21 -44.5 c 6.8 -23.3 6.3 -30.1 16.6 -40.5 c 9.2 -13.8 24.2 -22.8 41.1 -17.2 c 19.1 5.4 26.1 -2.6 40.8 16.9 C 118 38 126 46 122.6 64.3 z'},
    {value: 'M 122.6 64.3 c 0 14.3 -5.2 27.4 -13.9 37.5 C 98.1 114.2 82.4 122 64.9 122 c -13.9 0 -26.7 -4.9 -36.7 -13.2 c -12.8 -10.6 -21 -26.6 -21 -44.5 c 0 -15.8 6.3 -30.1 16.8 -40.3 c 10.5 -10.6 25 -17.2 41.1 -17.2 c 15.9 0 30.4 6.5 40.8 16.9 C 116.1 33.9 122.6 48.4 122.6 64.3 z'}
  ];

  let wavyCloseBtn = new wavyPathAnim(
    document.getElementById('bookingClose'), 
    document.getElementById('closeBtnCircleHover'), 
    wavyCloseBtnPaths
  );


  // common overlay close btn
  document.querySelectorAll('.overlay-close-btn').forEach( (el) => {
    let svg = el.querySelector('.closeBtnCircleHover');
    let closeBtnn = new wavyPathAnim( el, svg, wavyCloseBtnPaths );
  } );
  // common overlay close btn


  const wavySendFormPaths = [
    {value: 'M 75.5 8.9 c 17.1 0 32.8 6.4 44.6 17 c 13.7 12.3 22.4 30.1 22.4 50 c 0 17.1 -6.4 32.6 -16.9 44.5 c -12.3 13.8 -30.2 22.6 -50.1 22.6 c -15.8 0 -30.2 -5.4 -41.7 -14.5 C 18.4 116.1 8.5 97.2 8.5 75.9 c 0 -19.3 8.2 -36.7 21.5 -48.9 C 41.7 15.8 57.8 8.9 75.5 8.9 z'},
    {value: 'M 75.5 8.9 c 17.1 0 32.8 6.4 44.6 17 c 13.7 12.3 22.4 30.1 22.4 50 c 0 17.1 -2.5 33.1 -16.9 44.5 c -17.6 9.6 -30.2 22.6 -50.1 22.6 c -15.8 0 -35.5 2 -41.7 -14.5 C 21 98 8.5 97.2 8.5 75.9 c 0 -19.3 5.5 -39.9 21.5 -48.9 C 44 18 57.8 8.9 75.5 8.9 z'},
    {value: 'M 75.5 8.9 c 17.1 0 35.5 2.1 44.6 17 c 14.9 35.1 23.9 25.1 22.4 50 c 3.5 22.1 -6.4 32.6 -16.9 44.5 c -12.3 13.8 -29.6 26.6 -50.1 22.6 c -16.5 -4 -30.5 -6 -41.7 -14.5 C 18.4 116.1 8.5 97.2 8.5 75.9 c 0 -19.3 13.5 -31.9 21.5 -48.9 C 38 9 57.8 8.9 75.5 8.9 z'},
    {value: 'M 75 13 c 22 1 32.8 6.4 44.6 17 c 13.7 12.3 22.4 30.1 26.4 51 c 3 18 -7 32 -14 43 c -12 16 -27.1 17.5 -50.1 15.5 c -15.8 0 -30.2 -5.4 -41.7 -14.5 C 18.4 116.1 8.5 97.2 8.5 75.9 c 0 -19.3 8.2 -36.7 21.5 -48.9 C 41.7 15.8 52 12 75 13 z'},
    //{value: 'M 75.5 8.9 c 17.1 0 32.8 6.4 41.5 21.1 c 10 15 22.4 30.1 22.4 50 c 0 17.1 -6.4 32.6 -16.9 44.5 c -12.3 13.8 -23.5 4.5 -47.5 1.5 c -18 -6 -20 6 -46 -4 C 12 112 8.5 97.2 8.5 75.9 c 0 -19.3 8.2 -36.7 21.5 -48.9 C 41.7 15.8 57.8 8.9 75.5 8.9 z'},
    {value: 'M 75.5 8.9 c 17.1 0 32.8 6.4 44.6 17 c 13.7 12.3 22.4 30.1 22.4 50 c 0 17.1 -6.4 32.6 -16.9 44.5 c -12.3 13.8 -30.2 22.6 -50.1 22.6 c -15.8 0 -30.2 -5.4 -41.7 -14.5 C 18.4 116.1 8.5 97.2 8.5 75.9 c 0 -19.3 8.2 -36.7 21.5 -48.9 C 41.7 15.8 57.8 8.9 75.5 8.9 z'}
  ];

  let wavySendForm = new wavyPathAnim(
    document.getElementById('formBtn'), 
    document.getElementById('formBtnCircle'), 
    wavySendFormPaths
  );

}




//// end of wavy blob button



