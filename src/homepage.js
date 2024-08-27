/* eslint-disable prefer-destructuring */
$(document).ready(function () {
  // #region Nav

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  let isMoved = false;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $('.nav_wrapper'),
      start: () => 'bottom bottom',
      end: 'bottom top',
      onEnter: debounce(() => {
        if (!isMoved) {
          isMoved = true;
          gsap.to('.hp_navbar', { yPercent: -100 });
        }
      }, 200), // Adjust the debounce delay as needed
      onLeaveBack: debounce(() => {
        if (isMoved) {
          isMoved = false;
          gsap.to('.hp_navbar', { yPercent: 0 });
        }
      }, 200), // Adjust the debounce delay as needed
    },
  });

  // #endregion

  // #region Animations
  // HP Video Title
  $('.hp_hero-heading-wrap.is-last').each(function () {
    let headings = $(this).find('.hp_hero-heading_wrap-inner').add('.hp_video-title-wrap');

    console.log(headings);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'bottom bottom',
        end: 'center center',
        scrub: 1,
      },
    });

    headings.each(function () {
      tl.from($(this), {
        opacity: 0,
      });
    });
  });

  // HP Video
  $('.hp_video').each(function () {
    let video = $(this).find('.hp_video-inner');
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: 'top top',
        end: '20% top',
        scrub: 1,
      },
    });

    tl.fromTo(
      video,
      { width: '100%', height: '50%', borderRadius: '4rem' },
      { width: '100vw', height: '100vh', borderRadius: '0rem', ease: 'linear' }
    );
  });

  // HP Brands
  $('.hp_brands-box').each(function () {
    let textTags = $(this).find('.hp_brands-text-wrap');
    let plusSymbol = $(this).find('.hp_brands-plus');
    let eqSymbol = $(this).find('.hp_brands-sol');
    let visuals = $(this).find('.hp_brands_visual');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'center bottom',
      },
    });

    tl.from(textTags.eq(0), { rotate: 0, y: '2rem', opacity: 0, duration: 0.7 });
    tl.from(plusSymbol, { opacity: 0 }, '-=0.3');
    tl.from(textTags.eq(1), { rotate: 0, y: '2rem', opacity: 0 }, '-=0.1');
    tl.from(eqSymbol, { opacity: 0 }, '-=0.3');
    tl.from(visuals.eq(0), { rotate: 0, opacity: 0 }, '-=0.2');
    tl.from(textTags.eq(2), { rotate: 0, y: '2rem', opacity: 0 }, '-=0.3');
    tl.from(visuals.eq(1), { opacity: 0 }, '<');
  });

  // HP Candy
  $('.section_hp-candy').each(function () {
    let heading = $(this).find('h2');
    let visualsWrap = $(this).find('.hp_candy_photo-wrap');

    let button = $(this).find('.hp_candy-bottom-btn');

    heading.each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'bottom bottom',
          end: 'bottom 80%',
          scrub: 1,
        },
      });
      tl.from($(this), { y: '4rem', opacity: 0 });
    });

    visualsWrap.each(function () {
      let visuals = $(this).find('.hp_candy_visual');
      // Partnership Brands
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: '20% bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      // Pictures
      tl.from(
        visuals.eq(0),
        {
          x: '10vw',
          rotate: '0deg',
        },
        '<0.05'
      )
        .from(
          visuals.eq(1),
          {
            x: '-10vw',
            rotate: '0deg',
          },
          '<'
        )
        .from(
          visuals.eq(2),
          {
            x: '-10vw',
            rotate: '0deg',
          },
          '<'
        );

      // Opacity
      tl.fromTo(
        [visuals],
        { opacity: 0 },
        {
          keyframes: {
            '30%': {
              opacity: 1,
            },
          },
          duration: 0.5,
        },
        '<'
      );
    });

    button.each(function () {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: 'center bottom',
          end: 'bottom bottom',
          markers: true,
          scrub: 1,
        },
      });
      tl.from($(this), { opacity: 0 });
    });
  });

  // HP Candy Bags
  $('.hp_candy-bottom-shape-wrap').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'bottom bottom',
      },
    });

    tl.from($(this).find('.hp_candy-bottom_visual img'), { yPercent: 100, stagger: 0.2 });
  });

  // #endregion
});
