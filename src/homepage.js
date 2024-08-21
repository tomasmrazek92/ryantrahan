$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('primary', '0.51, 0, 0.08, 1');

  gsap.defaults({ ease: 'primary' });

  // Tags
  function createScrollTrigger(tag) {
    return {
      trigger: tag,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      markers: true,
    };
  }

  function animateTag(tag) {
    const yDistance = $(window).width() > 991 ? gsap.utils.random(10, 20) : gsap.utils.random(3, 5);
    let tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(tag),
    });

    tl.from(tag, {
      rotate: 0,
      y: `${yDistance}vh`,
      ease: 'power1.in',
    });
  }

  $('[data-tag]').each(function () {
    animateTag($(this));
  });

  // Visuals
  $('[data-visual]').each(function () {
    let visual = $(this);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: visual,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    });

    tl.from(visual, { rotate: 0, ease: 'power1.in' });
  });

  // HP Video
  $('.hp_video').each(function () {
    let video = $(this);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: video,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      },
    });

    tl.fromTo(
      video,
      { width: '100%', borderRadius: '4rem' },
      { width: '100vw', borderRadius: '0rem' }
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

  // HP Grid
  $('.hp_brands-card-box').each(function () {
    let cards = $(this).find('.hp_brands-card');
    let logos = $(this).find('.hp_brands_logo');
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: '20% bottom',
      },
    });

    tl.from(cards, { opacity: 0, scale: 0.9, stagger: 0.2 });
    tl.from(logos, { y: '2rem', opacity: 0, stagger: 0.2 }, '<0.3');
  });

  // HP Candy
  $('.section_hp-candy').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this).find('.hp_candy_photo-wrap'),
        start: 'top bottom',
        end: 'top center',
        scrub: 1,
      },
    });

    $(this)
      .find('.hp_candy_visual')
      .each(function () {
        tl.from(
          $(this),
          {
            rotate: 0,
            y: `${gsap.utils.random(10, 40)}vh`,
            ease: 'power1.in',
          },
          '<'
        );
      });
  });

  $('.hp_candy-bottom-shape-wrap').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'bottom bottom',
      },
    });

    tl.from($(this).find('.hp_candy-bottom_visual img'), { yPercent: 100, stagger: 0.2 });
  });
});
