// #region Animations

// Globals
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create('primary', '0.51, 0, 0.08, 1');

gsap.defaults({ ease: 'primary' });

function initIndex() {
  function createScrollTrigger(tag) {
    return {
      trigger: tag,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    };
  }

  function animateTag(tag) {
    const yDistance = $(window).width() > 991 ? gsap.utils.random(10, 20) : gsap.utils.random(3, 5);
    let tl = gsap.timeline({
      scrollTrigger: createScrollTrigger(tag),
    });

    tl.to(tag, {
      rotate: 0,
      y: `-${yDistance}vh`,
      ease: 'power1.in',
    });
  }

  function hasStroke(target) {
    return target.closest('.stroke-heading');
  }

  function animateHeading(item) {
    const text = SplitType.create($(item), { types: 'words' });

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(item),
        start: 'bottom bottom',
      },
    });

    let words = $(item).find('.word');

    function hasStroke(element) {
      return element && element.closest('.stroke-heading') !== null;
    }

    // Convert the `words` (NodeList or jQuery collection) to an array if it's not already
    const wordElements = gsap.utils.toArray(words);

    // Separate elements into two groups
    const elementsWithStroke = wordElements.filter((el) => hasStroke(el));
    const elementsWithoutStroke = wordElements.filter((el) => !hasStroke(el));

    // Apply the 'elastic.out' ease to elements without stroke
    tl.fromTo(
      elementsWithoutStroke,
      {
        opacity: 0,
        rotate: 0,
        yPercent: 100,
      },
      {
        duration: 0.75,
        opacity: 1,
        rotate: 0,
        scale: 1,
        yPercent: 0,
        ease: 'power4.inOut',
        stagger: {
          amount: 0.25,
        },
      }
    );

    // Apply the 'power4.inOut' ease to elements with stroke
    tl.fromTo(
      elementsWithStroke,
      {
        opacity: 0,
        rotate: 0,
        yPercent: 100,
      },
      {
        duration: 1,
        opacity: 1,
        rotate: (index, target) => gsap.utils.random(-3, 3, 1), // dynamic rotate
        scale: 1,
        yPercent: 0,
        ease: 'elastic.out(1, 0.7)',
        stagger: {
          each: 0.25,
        },
      },
      '<50%'
    );
  }

  ScrollTrigger.matchMedia({
    // all
    all: function () {
      $('[data-split-all="heading"]').each(function () {
        animateHeading($(this));
      });
    },
    // large
    '(min-width: 992px)': function () {
      // Tags
      $('[data-tag]').each(function () {
        animateTag($(this));
      });

      // Visuals
      $('[data-visual]').each(function () {
        let visual = $(this);
        let isLeft = $(this).attr('data-visual') === 'left';

        let rotation = isLeft ? gsap.utils.random(5, 10) : gsap.utils.random(-5, -10);

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: visual,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });

        tl.from(visual, { rotate: rotation, ease: 'none' });
      });

      // Parallax
      $('[data-reveal="parallax"]').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top bottom',
            end: 'top center',
            scrub: 1,
          },
        });

        $(this)
          .find('[data-reveal="item"]')
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

      // Stagger
      $('[data-animation="stagger"]').each(function () {
        let cards = $(this).find('[data-animation="item"]');
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: '20% bottom',
          },
        });

        tl.from(cards, { opacity: 0, scale: 0.9, stagger: 0.1 });
      });

      // Split
      CustomEase.create(
        'bounce',
        'M0,0,C0,0,0.107,-0.004,0.14,-0.002,0.16,-0.001,0.543,-0.02,0.581,0.423,0.634,0.661,0.67,1.03,0.67,1.03,0.67,1.423,0.856,1.163,0.858,1.162,0.861,1.161,1,1,1,1'
      );

      // Heading
      $('[data-split="heading"]').each(function () {
        animateHeading($(this));
      });

      // JoyRide story
      $('.joyride_video-bottom-card').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: { trigger: $(this), start: '30% 100%' },
        });

        let visual = $(this).find('.joyride_video-card_visual');
        let text = $(this).find('.joyride_vide-card-title');

        let visualIsLeft = visual.hasClass('left');

        tl.from(text, { opacity: 0 });
        tl.from(visual, { xPercent: visualIsLeft ? 30 : -30, opacity: 0, rotate: 0 }, '<');
      });

      // JoyRide Head
      $('.joyride_hero_wrap').each(function () {
        let visuals = $(this).find('.joyride_hero-visual_img');

        let tl = gsap.timeline({
          scrollTrigger: { trigger: $(this), start: 'top bottom', end: 'top center', scrub: 1 },
        });

        tl.from(visuals.eq(0), { xPercent: 200, yPercent: 50, rotate: '10deg' });
        tl.from(visuals.eq(1), { yPercent: 100 }, '<');
        tl.from(visuals.eq(2), { xPercent: -200, yPercent: 50, rotate: '10deg' }, '<');
      });

      // JoyRide CTA
      $('.parntership_joyride-visual-wrap').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: { trigger: $(this), start: '40% bottom', end: 'top center' },
        });

        let visuals = $(this)
          .find('.partnership_joyride_visual._3')
          .add('.partnership_joyride_visual._2');

        let tag = $(this).find('.partnership_joyride-text-wrap');

        tl.from(visuals, {
          xPercent: 80,
          scale: 0.5,
        });
        tl.from(
          tag,
          {
            xPercent: 200,
            scale: 0.5,
          },
          '<'
        );
      });

      $('.partnership_brands-wrap').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top 70%',
            end: 'bottom top',
          },
          defaults: {
            ease: 'power4.out',
          },
        });

        let visuals = $(this).find('.partnership_brands_visual');

        // Heading
        tl.fromTo(
          [$(this).find('h2')],
          { opacity: 0, yPercent: 100 },
          {
            keyframes: {
              '15%': {
                opacity: 1,
              },
            },
            yPercent: 0,
            duration: 0.5,
          },
          '<'
        );

        // Pictures
        tl.from(
          visuals.eq(0),
          {
            x: '20vw',
            rotate: '0deg',
            duration: 1.25,
          },
          '<0.5'
        )
          .from(
            visuals.eq(1),
            {
              x: '10vw',
              rotate: '0deg',
              duration: 1.25,
            },
            '<'
          )
          .from(
            visuals.eq(2),
            {
              x: '-10vw',
              rotate: '0deg',
              duration: 1.25,
            },
            '<'
          )
          .from(
            visuals.eq(3),
            {
              x: '-20vw',
              rotate: '0deg',
              duration: 1.25,
            },
            '<'
          );

        tl.from(visuals, { opacity: 0 }, '<');
      });
    },

    // medium
    '(min-width: 480px) and (max-width: 991px)': function () {
      $('.partnership_brands-wrap').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top 80%',
            end: 'bottom top',
            scrub: 1,
          },
        });

        let visuals = $(this).find('.partnership_brands_visual');

        // Heading
        tl.fromTo(
          [$(this).find('h2')],
          { opacity: 0, yPercent: 100 },
          {
            keyframes: {
              '15%': {
                opacity: 1,
                yPercent: 0,
              },
            },
            duration: 0.5,
          },
          '<'
        );

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
              x: '10vw',
              rotate: '0deg',
            },
            '<'
          )
          .from(
            visuals.eq(3),
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
    },

    // small
    '(max-width: 479px)': function () {
      let tl0 = gsap.timeline({
        scrollTrigger: {
          trigger: $('.partnership_brands-wrap'),
          start: 'top 80%',
          end: 'center bottom',
          scrub: 1,
        },
      });

      // Heading
      tl0.fromTo(
        $('.partnership_brands-wrap').find('h2'),
        { opacity: 0, yPercent: 100 },
        {
          keyframes: {
            '15%': {
              opacity: 1,
              yPercent: 0,
            },
          },
          duration: 0.5,
        },
        '<'
      );

      $('.partnership_brands_visual').each(function () {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top bottom',
            end: 'bottom 80%',
            scrub: 1,
          },
        });

        // Pictures
        tl.from(
          $(this),
          {
            yPercent: 30,
            rotate: '0deg',
            opacity: 0,
          },
          '<0.05'
        );
      });
    },
  });

  // #region footer

  // Footer Dragging
  ScrollTrigger.matchMedia({
    // large
    '(min-width: 992px)': function () {
      interact('[data-draggable]').draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.footer-wrap',
            endOnly: true,
          }),
        ],
        listeners: {
          move: dragMoveListener,
        },
      });

      function dragMoveListener(event) {
        var { target } = event;
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // Retrieve the current rotation or initialize it to 0
        var currentRotation = parseFloat(target.getAttribute('data-rotation')) || 0;

        // Calculate additional rotation based on X-axis movement
        var maxRotation = 15; // Maximum rotation in degrees
        var additionalRotation = event.dx / 10; // Adjust divisor to control sensitivity

        // Calculate the new rotation and clamp it to the range [-maxRotation, maxRotation]
        var newRotation = currentRotation + additionalRotation;
        newRotation = Math.max(-maxRotation, Math.min(maxRotation, newRotation));

        // Apply translation and rotation
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px) rotate(' + newRotation + 'deg)';

        // Update position and rotation attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        target.setAttribute('data-rotation', newRotation); // Store the new rotation
      }

      // This function is used later in the resizing and gesture demos
      window.dragMoveListener = dragMoveListener;

      // Footer Scroll To View
      $('.section_footer').each(function () {
        let card = $(this).find('.footer_card-wrap');
        let buttons = $(this).find('.footer-wrap_button-block');
        let socials = $(this).find('.footer_socila-link');

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top 80%',
            end: 'bottom bottom',
            scrub: 1,
          },
        });

        // Animation for position and rotation
        tl.from(card.eq(0), { y: '20vh', rotate: '20deg' })
          .from(card.eq(1), { y: '20vh', x: '-20vw', rotate: '15deg' }, '<')
          .from(buttons.eq(0), { y: '20vh', rotate: '20deg' }, '<')
          .from(buttons.eq(1), { y: '20vh', rotate: '-20deg' }, '<')
          .from(buttons.eq(2), { y: '20vh', rotate: '-60deg' }, '<')
          .from(socials.eq(0), { y: '20vh', x: '20vw' }, '<')
          .from(socials.eq(1), { y: '20vh' }, '<');

        tl.fromTo(
          [card, buttons, socials],
          { opacity: 0 },
          {
            keyframes: {
              '35%': {
                opacity: 1,
              },
            },
            duration: 0.5,
          },
          '<'
        );
      });
    },
  });

  // #endregion
}

$(document).ready(function () {
  initIndex();
  ignoreCurrentPageLink();
});
// #endregion Animations

// #region pageTransition
function resetWebflow(data) {
  let dom = $(new DOMParser().parseFromString(data.next.html, 'text/html')).find('html');
  // reset webflow interactions
  $('html').attr('data-wf-page', dom.attr('data-wf-page'));
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require('ix2').init();
  // reset w--current class
  $('.w--current').removeClass('w--current');
  $('a').each(function () {
    if ($(this).attr('href') === window.location.pathname) {
      $(this).addClass('w--current');
    }
  });
  // Reset scripts
  dom.find('[data-barba-script]').each(function () {
    let codeString = $(this).text();

    // Remove "DOMContentLoaded" event listener if present
    if (codeString.includes('DOMContentLoaded')) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
        ''
      );
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, '');
    }

    // Check if the script has a src attribute
    let src = $(this).attr('src');

    // Remove existing scripts with the same src or text content
    if (src) {
      // Remove scripts with the same src
      $('script[src]')
        .filter(function () {
          return $(this).attr('src') === src;
        })
        .remove();
    } else {
      // Remove inline scripts with the same content
      $('script:not([src])')
        .filter(function () {
          return $(this).text().trim() === codeString.trim();
        })
        .remove();
    }

    // Append the new script
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (src) {
      script.src = src;
    } else {
      script.text = codeString;
    }

    document.body.appendChild(script);
  });

  ScrollTrigger.refresh();
}
function ignoreCurrentPageLink(next) {
  if (!next) next = document;
  let links = next.querySelectorAll('a');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href') === window.location.pathname) {
        e.preventDefault();
      }
    });
  });
}
function transitionPages(data) {
  let currPreloader = $(data.current.container).find('.preloader');
  let nextPreloader = $(data.next.container).find('.preloader');
  let tl = gsap.timeline({ defaults: { duration: 1, ease: 'power2.out' } });

  // Set Next
  tl.set(data.next.container, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    scale: 0.8,
    height: '100svh',
    x: '100vw',
    rotate: '-6deg',
    borderRadius: '2.4rem',
  });
  tl.to($(data.current.container).children().not(currPreloader), { opacity: 0, duration: 0.5 });
  tl.to(currPreloader, { opacity: 1, display: 'flex', duration: 0.5 }, '<');
  // Set containers to be fixed
  tl.set(data.current.container, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100svh',
    borderRadius: '2.4rem',
  });

  tl.to(data.current.container, { scale: 0.8, rotate: '3deg', duration: 0.5, delay: 0.3 })
    .to(data.current.container, { x: '-100vw', rotate: '-3deg', duration: 0.5 })
    .to(data.next.container, { x: '0', rotate: '0', duration: 0.5 }, '<')
    .to(nextPreloader, { opacity: 1, display: 'flex', duration: 0.5 }, '<')
    .to(data.next.container, { scale: 1, borderRadius: '0rem', duration: 0.5 });

  return tl; // Make sure to return the timeline
}
function killAllTriggers() {
  return new Promise((resolve) => {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach((trigger) => {
      trigger.kill();
      trigger.destroy();
    });
    resolve();
  });
}
function cleanAllProps(data) {
  return new Promise((resolve) => {
    // Clear properties on both current and next containers
    let elements = $(data.current.container)
      .children()
      .add($(data.next.container).children())
      .not('.placeholder, .page-wrapper');

    // how to exlucde ".placehoder" and ".page-wrapper" what the elements

    // Clear all GSAP properties
    gsap.set(elements, { clearProps: 'all' });

    // Ensure all elements clear properties (if additional global clean-up is necessary)
    $('*').each(function () {
      gsap.set(this, { clearProps: 'all' });
    });

    resolve(); // Resolve when done clearing properties
  });
}
function reInitAnimations(data) {
  // Re-initialize animations
  initIndex();
  resetWebflow(data);
}

// Barba.js initialization
barba.init({
  transitions: [
    {
      name: 'gsap-transition',
      async enter(data) {
        // Transition animations between pages, like fading in the new container
        await transitionPages(data);
      },
      async afterEnter(data) {
        await killAllTriggers();
        await cleanAllProps(data);
      },
      after(data) {
        reInitAnimations(data);
      },
    },
  ],
});

// #endregion
