// Globals
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
      end: 'bottom top',
      scrub: 1,
    },
  });

  tl.from(visual, { rotate: 0, ease: 'power1.in' });
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
  let logos = $(this).find('[data-animation="overlay"]');
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: '20% bottom',
    },
  });

  tl.from(cards, { opacity: 0, scale: 0.9, stagger: 0.1 });
  tl.from(logos, { y: '2rem', opacity: 0, stagger: 0.1 }, '<0.3');
});

// -- Split
CustomEase.create(
  'bounce',
  'M0,0,C0,0,0.107,-0.004,0.14,-0.002,0.16,-0.001,0.543,-0.02,0.581,0.423,0.634,0.661,0.67,1.03,0.67,1.03,0.67,1.423,0.856,1.163,0.858,1.162,0.861,1.161,1,1,1,1'
);

$('[data-split="heading"]').each(function () {
  const text = SplitType.create($(this), { types: 'words' });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'bottom bottom',
    },
  });

  let words = $(this).find('.word');

  words.each(function () {
    let isHighlight = $(this).closest('.stroke-heading').length > 0;

    // els
    if (!isHighlight) {
      tl.from($(this), {
        yPercent: 40,
        opacity: 0,
        duration: 0.1,
        stagger: 0.1,
      });
    } else {
      tl.from($(this), { opacity: 0 }, '<');
      tl.fromTo($(this), { scale: 0 }, { scale: 1, duration: 0.2, ease: 'bounce' }, '<');
    }
  });
});

// Partnership Brands
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
      x: '20vw',
      rotate: '0deg',
    },
    '<0.05'
  )
    .from(
      visuals.eq(1),
      {
        x: '10vw',
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
    )
    .from(
      visuals.eq(3),
      {
        x: '-20vw',
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

// JoyRide story
$('.joyride_video-bottom-card').each(function () {
  let tl = gsap.timeline({
    scrollTrigger: { trigger: $(this), start: 'top 100%', end: 'bottom 80%', scrub: 1 },
  });

  let visual = $(this).find('.joyride_video-card_visual');
  let text = $(this).find('.joyride_vide-card-title');

  let visualIsLeft = visual.hasClass('left');

  tl.from(text, { opacity: 0 });
  tl.from(visual, { xPercent: visualIsLeft ? 30 : -30, opacity: 0, rotate: 0 }, '<');
});

// #region footer

// Footer Dragging
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
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + newRotation + 'deg)';

  // Update position and rotation attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  target.setAttribute('data-rotation', newRotation); // Store the new rotation
}

// This function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

// Footer Scroll To View
$('.section_footer').each(function () {
  let card = $(this).find('.footer_card');
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

// #endregion
