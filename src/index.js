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

// Footer Parallax
$('.button.is-footer')
  .add('.footer_socila-link')
  .each(function () {
    let tag = $(this);
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer-wrap-inner',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: 1,
        markers: true,
      },
    });

    tl.from(tag, { rotate: 0, y: `${gsap.utils.random(2, 5)}rem`, ease: 'power1.in' });
  });
