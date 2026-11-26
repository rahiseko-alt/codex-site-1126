
//// come-in animations with JS

function animateComeInWithJS(el) {

    function contain(el, classNm) {
      return el.classList.contains(classNm) ? true : false;
    }


  
    /// ul.treatments-col1
    
    if(windowWidth > 1000) {

        if( contain(el, 'treatments-col1') ) {
            var tl = anime.timeline();

            tl.add({
                targets: el.querySelectorAll('li'),
                translateY: ['50px', 0],
                opacity: [0, 1],
                rotate: ['-5deg', 0],
                duration: 700,
                delay: anime.stagger(50, {start: 300}),
                easing: 'easeOutQuart'
            });
            
        
            
            tl.add({
                targets: 'ul.treatments-col2 li',
                translateY: ['50px', 0],
                opacity: [0, 1],
                rotate: ['-5deg', 0],
                duration: 700,
                delay: anime.stagger(50, {start: 700}),
                easing: 'easeOutQuart'
            }, 0);

        }
            
        
    }
    else {
        if( contain(el, 'treatments-col1') ) {
        anime({
            targets: '.treatments-col1 li, .treatments-col2 li',
            translateY: ['200px', 0],
            opacity: [0, 1],
            rotate: ['-5deg', 0],
            duration: 1400,
            delay: anime.stagger(50, {start: 300}),
            easing: 'easeOutQuart'
        });
        }
    }
    
  
  
    // mp treatments list

    if( contain(el, 'h-tratments') ) {
      anime({
        targets: el.querySelectorAll('b'),
        translateY: ['200px', 0],
        opacity: [0, 1],
        rotate: ['-5deg', 0],
        duration: 1700,
        easing: 'easeOutQuart'
      });
    }


    // headers with separate words
    if( contain(el, 'lettersAnimBlock') ) {
        
        anime({
          targets: el.querySelectorAll('.wordsAnim'),
          translateY: ['200px', 0],
          opacity: [0, 1],
          rotate: ['10deg', 0],
          duration: 1000,
          scaleY: [5, 1],
          easing: 'easeOutQuart',
          delay: anime.stagger(80, {start: 0})
        });
    }
    

    if( contain(el, 'text-animation') ) {
        
        anime({
          targets: el,
          translateY: ['200px', 0],
          opacity: [0, 1],
          duration: 1500,
          scaleY: [1.3, 1],
          delay: 0,
          easing: 'easeOutQuart'
        });
    }


    if( contain(el, 'button') ) {

        let tl = anime.timeline();
        
        tl.add({
          targets: el.querySelectorAll('.btn-top-line, .btn-bottom-line'),
          opacity: [0, 1],
          duration: 2000,
          scaleX: [0, 1],
          delay: 200,
          easing: 'easeOutQuart'
        });

        tl.add({
            targets: el.querySelectorAll('.btn-txt'),
            opacity: [0, 1],
            duration: 1000,
            translateX: ['-150px', 0],
            delay: 200,
            easing: 'easeOutQuart'
          }, 0);

          tl.add({
            targets: el.querySelectorAll('.btn-arrow'),
            opacity: [0, 1],
            duration: 1000,
            translateX: ['-100px', 0],
            translateY: ['-50%', '-50%'],
            delay: 400,
            easing: 'easeOutQuart'
          }, 0);

          tl.add({
            targets: el.querySelectorAll('.btn-arrow-left'),
            opacity: [0, 1],
            duration: 1000,
            translateX: ['-100px', 0],
            translateY: ['-50%', '-50%'],
            delay: 400,
            easing: 'easeOutQuart'
          }, 0);

    }


        
    if( contain(el, 'picture-wrapper0') && !contain(el, 'picture-wrapper0-swiper') ) {
        
        anime({
          targets: el,
          translateY: ['25px', 0],
          duration: 2500,
          scaleY: [1.8, 1],
          easing: 'easeOutQuart'
        });
    }


    if( contain(el, 'swiper-container') ) {
      
      var tl = anime.timeline({
        targets: el.querySelectorAll('.picture-wrapper0')
      });

      
      tl.add({
        translateX: ['45px', 0],
        duration: 300,
        opacity: [0, 1],
        easing: 'easeOutQuart',
        delay: anime.stagger(180, {start: 0})
      });

    /*
      tl.add({
        translateY: ['25px', 0],
        duration: 2000,
        scaleY: [2, 1],
        easing: 'easeOutQuart',
        delay: anime.stagger(280, {start: 0})
      },0);
      */
  }




    if( contain(el, 'treatments-list') ) {
      
      let tl = anime.timeline();

      tl.add({
        targets: el.querySelectorAll('li'),
        translateY: ['90px', 0],
        rotate: ['5deg', 0],
        opacity: [0, 1],
        duration: 1400,
        easing: 'easeOutQuart',
        delay: anime.stagger(80, {start: 700})
      });

      /*
      tl.add({
        targets: el.querySelectorAll('i'),
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 1300,
        easing: 'easeOutQuart',
        delay: anime.stagger(80, {start: 0})
      }, 1000);
      */
  }


  if( contain(el, 'filters-catalogue-wrap') ) {
      
    let tl = anime.timeline();

    tl.add({
      targets: el.querySelectorAll('li'),
      translateY: ['50px', 0],
      opacity: [0, 1],
      rotate: ['5deg', 0],
      duration: 700,
      delay: anime.stagger(80, {start: 100}),
      easing: 'easeOutQuart'
    });

    tl.add({
      targets: el.querySelectorAll('.filters-underline'),
      opacity: [0, 1],
      duration: 2000,
      scaleX: [0, 1],
      delay: 500,
      easing: 'easeOutQuart'
    }, 0);

  }


  if( contain(el, 'category-current') ) {

    let tl = anime.timeline();
    
    tl.add({
      targets: el.querySelectorAll('.btn-top-line, .btn-bottom-line'),
      opacity: [0, 1],
      duration: 1000,
      scaleX: [0, 1],
      delay: anime.stagger(120, {start: 200}),
      easing: 'easeOutQuart'
    });

    tl.add({
        targets: el.querySelectorAll('.btn-txt'),
        opacity: [0, 1],
        duration: 1000,
        translateX: ['-150px', 0],
        delay: anime.stagger(220, {start: 200}),
        easing: 'easeOutQuart'
    }, 0);

    tl.add({
        targets: el.querySelectorAll('.btn-arrow'),
        opacity: [0, 1],
        duration: 1000,
        translateX: ['-100px', 0],
        translateY: ['-50%', '-50%'],
        delay: anime.stagger(220, {start: 400}),
        easing: 'easeOutQuart'
    }, 0);

    

    tl.add({
      targets: el.querySelectorAll('.cb-text'),
      opacity: [0, 1],
      translateX: ['-30px', 0],
      duration: 1000,
      delay: anime.stagger(220, {start: 800}),
      easing: 'easeOutQuart'
    }, 0);

  }



  // press centre animations
  if( contain(el, 'press-header')  ) {
      
      let pressTL = anime.timeline();

      pressTL.add({
        targets: el.querySelectorAll('.wordsAnim'),
        translateY: ['200px', 0],
        opacity: [0, 1],
        rotate: ['10deg', 0],
        duration: 1000,
        scaleY: [5, 1],
        easing: 'easeOutQuart',
        delay: anime.stagger(80, {start: 300})
      });

      pressTL.add({
        targets: el.querySelectorAll('.press-head-under'),
        translateY: ['200px', 0],
        opacity: [0, 1],
        duration: 1900,
        easing: 'easeOutQuart',
        delay: 0
      }, 300)


      pressTL.add({
        targets: '.press-list li',
        translateY: ['90px', 0],
        rotate: ['5deg', 0],
        opacity: [0, 1],
        duration: 1400,
        easing: 'easeOutQuart',
        delay: anime.stagger(80, {start: 500})
      },300);


  }





  // end of press centre animations


  // why choose us

      
  if( contain(el, 'htc-block')  ) {

    var tl = anime.timeline();

    tl.add({
      targets: el.querySelectorAll('.first .letterAnim'),
      translateY: [0, '-100%'],
      easing: 'easeOutQuart',
      duration: 1000,
      delay: anime.stagger(100, {start: 300})
    });

    tl.add({
      targets: el.querySelectorAll('.second .letterAnim'),
      translateY: [0, '-100%'],
      easing: 'easeOutQuart',
      duration: 1000,
      delay: anime.stagger(100, {start: 420})
    }, 0);

    tl.add({
      targets: el.querySelectorAll('.htc-text'),
      translateY: ['150px', '0'],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 150
    }, 0);

    tl.add({
      targets: el.querySelectorAll('.htc-line'),
      scaleX: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 150
    }, 0);
  }


  if( contain(el, 'ct-line')  ) {
      
    let tl = anime.timeline();

    tl.add({
      targets: el,
      duration: 1700,
      scaleX: [0, 1],
      easing: 'easeOutQuart',
      delay: 180
    });
  }


  if( contain(el, 'trc-wrap')  ) {
      
    let tl = anime.timeline();

    tl.add({
      targets: el.querySelectorAll('.trc-lft'),
      translateY: ['150px', '0'],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 250
    });

    tl.add({
      targets: el.querySelectorAll('.trc-rgt'),
      translateY: ['150px', '0'],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 500
    }, 0);

    tl.add({
      targets: el.querySelectorAll('.trc-center'),
      translateY: ['150px', '0'],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 250
    }, 0);

  }
  
  

  // why choose us    

  
  //// patents

  if( contain(el, 'patents-header-text')  ) {
      
    let tl = anime.timeline();

    tl.add({
      targets: el,
      translateY: ['30px', '0'],
      opacity: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 750
    });

    tl.add({
      targets: '.cell-alone-patents',
      translateY: ['-120px', '0'],
      translateX: ['180px', '0'],
      scaleX: [0, 1],
      scaleY: [0, 1],
      easing: 'easeOutQuart',
      duration: 1700,
      delay: 350
    }, 0);

    tl.add({
      targets: '.cell-alone-patents2',
      translateY: ['200px', '0'],
      translateX: ['-100px', '0'],
      scaleX: [0, 1],
      scaleY: [0, 1],
      easing: 'easeOutQuart',
      duration: 1400,
      delay: 350
    }, 0);

    


  }

  //// end of patents




//// press

if( contain(el, 'press-header')  ) {
      
  let tl = anime.timeline();

  tl.add({
    targets: el,
    translateY: ['30px', '0'],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 1700,
    delay: 750
  });

  tl.add({
    targets: '.cell-alone-press',
    translateY: ['-120px', '0'],
    translateX: ['180px', '0'],
    scaleX: [0, 1],
    scaleY: [0, 1],
    easing: 'easeOutQuart',
    duration: 1700,
    delay: 350
  }, 0);

  tl.add({
    targets: '.cell-alone-press2',
    translateY: ['200px', '0'],
    translateX: ['-100px', '0'],
    scaleX: [0, 1],
    scaleY: [0, 1],
    easing: 'easeOutQuart',
    duration: 1400,
    delay: 350
  }, 0);

  


}

//// end of press




//// treatments cell

if( contain(el, 'treatments-section')  ) {

      
  let tl = anime.timeline();


  tl.add({
    targets: '.cell-alone-treatments',
    translateY: ['-120px', '0'],
    translateX: ['180px', '0'],
    scaleX: [0, 1],
    scaleY: [0, 1],
    easing: 'easeOutQuart',
    duration: 1700,
    delay: 350
  }, 0);

  tl.add({
    targets: '.cell-alone-treatments2',
    translateY: ['200px', '0'],
    translateX: ['-100px', '0'],
    scaleX: [0, 1],
    scaleY: [0, 1],
    easing: 'easeOutQuart',
    duration: 1400,
    delay: 350
  }, 0);

  


}

//// end treatments cell







  
  
  }
  
  
  ///// END of come-in animations wit JS