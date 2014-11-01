
"use strict";

// Sets up a 'to' animation which acts on a new element and tests for the
// expected value at the specified offset.
function testComposite(property, initialValue, composite, keyframeValue, offset, expectedValue,
    message) {
  var target = document.createElement('div');
  document.getElementById('targets').appendChild(target);
  if (initialValue !== undefined && initialValue !== null) {
    target.style[_WebAnimationsTestingUtilities._prefixProperty(property)] = initialValue;
  }
  var keyframes = {};
  keyframes[property] = keyframeValue;
  keyframes.composite = composite;
  timing_test(function() {
    document.timeline.play(new Animation(target, keyframes, {duration: 1, fill: 'forwards'}));
    at(offset, function() {
      var styles = {};
      styles[property] = expectedValue;
      assert_styles(target, styles);
    });
  }, message);
}

// Test replace composition.
testComposite('color', null, 'replace', 'red', 1.0, 'rgb(255, 0, 0)',
    'Replace-composite a color type property');
testComposite('left', null, 'replace', '42px', 1.0, '42px',
    'Replace-composite a percent length type property with a number');
testComposite('left', null, 'replace', '42%', 1.0, '42px',
    'Replace-composite a percent length type property with a percentage');
testComposite('marginTop', null, 'replace', '42px', 1.0, '42px',
    'Replace-composite a length type property');
testComposite('clip', null, 'replace', 'rect(1px, 2px, 3px, 4px)', 1.0, 'rect(1px 2px 3px 4px)',
    'Replace-composite a rectangle type property');
testComposite('fontWeight', null, 'replace', 'bold', 1.0, 'bold',
    'Replace-composite a font weight type property with a number');
testComposite('fontWeight', null, 'replace', 800, 1.0, 800,
    'Replace-composite a font weight type property with a keyword');
testComposite('opacity', null, 'replace', 0.42, 1.0, 0.42,
    'Replace-composite a number type property');
testComposite('zIndex', null, 'replace', 42, 1.0, 42,
    'Replace-composite an integer type property');
testComposite('textShadow', null, 'replace', '1px 2px red', 1.0, 'rgb(255, 0, 0) 1px 2px 0px',
    'Replace-composite a shadow type property');
testComposite('transform', null, 'replace', 'scale(42)', 1.0, 'matrix(42, 0, 0, 42, 0, 0)',
    'Replace-composite a transform type property');
testComposite('visibility', null, 'replace', 'hidden', 1.0, 'hidden',
    'Replace-composite a visibility type property');

// Test add composition.
testComposite('color', null, 'add', 'red', 1.0, 'rgb(255, 0, 0)',
    'Add-composite a color type property');
testComposite('left', null, 'add', '42px', 1.0, '42px',
    'Add-composite a percent length type property with a number');
testComposite('left', null, 'add', '42%', 1.0, '42px',
    'Add-composite a percent length type property with a percentage');
testComposite('marginTop', null, 'add', '42px', 1.0, '42px',
    'Add-composite a length type property');
testComposite('clip', null, 'add', 'rect(1px, 2px, 3px, 4px)', 1.0, 'rect(1px 2px 3px 4px)',
    'Add-composite a rectangle type property');
testComposite('fontWeight', null, 'add', 'bold', 1.0, 900,
    'Add-composite a font weight type property with a number');
testComposite('fontWeight', null, 'add', 800, 1.0, 900,
    'Add-composite a font weight type property with a keyword');
testComposite('opacity', null, 'add', -0.42, 1.0, 0.58,
    'Add-composite a number type property');
testComposite('zIndex', null, 'add', 42, 1.0, 42,
    'Add-composite an integer type property');
testComposite('textShadow', null, 'add', '1px 2px red', 1.0, 'rgb(255, 0, 0) 1px 2px 0px',
    'Add-composite a shadow type property');
testComposite('transform', null, 'add', 'scale(42)', 1.0, 'matrix(42, 0, 0, 42, 0, 0)',
    'Add-composite a transform type property');
testComposite('visibility', null, 'add', 'hidden', 1.0, 'hidden',
    'Add-composite a visibility type property');

// Test add composition with neutral value onto default value.
testComposite('color', null, null, null, 0.0, 'rgb(0, 0, 0)',
    'Add-composite the neutral value onto a color type property with default value');
testComposite('left', null, null, null, 0.0, '0px',
    'Add-composite the neutral value onto a percent length type property with default value');
testComposite('marginTop',null, null, null, 0.0, '0%',
    'Add-composite the neutral value onto a length type property with default value');
testComposite('clip',null, null, null, 0.0, 'auto',
    'Add-composite the neutral value onto a rectangle type property with default value');
testComposite('fontWeight',null, null, null, 0.0, 'normal',
    'Add-composite the neutral value onto a font weight type property with default value');
testComposite('opacity',null, null, null, 0.0, 1.0,
    'Add-composite the neutral value onto a number type property with default value');
testComposite('zIndex',null, null, null, 0.0, 'auto',
    'Add-composite the neutral value onto an integer type property with default value');
testComposite('textShadow',null, null, null, 0.0, 'none',
    'Add-composite the neutral value onto a shadow type property with default value');
testComposite('transform',null, null, null, 0.0, 'none',
    'Add-composite the neutral value onto a transform type property with default value');
testComposite('visibility',null, null, null, 0.0, 'visible',
    'Add-composite the neutral value onto a visibility type property with default value');

// Test add composition with neutral value.
testComposite('color', 'blue', null, null, 0.0, 'rgb(0, 0, 255)',
    'Add-composite the neutral value onto a color type property');
testComposite('left', '42px', null, null, 0.0, '42px',
    'Add-composite the neutral value onto a percent length type property with a number');
testComposite('left', '42%', null, null, 0.0, '42px',
    'Add-composite the neutral value onto a percent length type property with a percentage');
testComposite('marginTop', '42px', null, null, 0.0, '42px',
    'Add-composite the neutral value onto a length type property');
testComposite('clip', 'rect(1px 2px 3px 4px)', null, null, 0.0, 'rect(1px 2px 3px 4px)',
    'Add-composite the neutral value onto a rectangle type property');
testComposite('fontWeight', 300, null, null, 0.0, 300,
    'Add-composite the neutral value onto a font weight type property with a number');
testComposite('fontWeight', 'bold', null, null, 0.0, 'bold',
    'Add-composite the neutral value onto a font weight type property with a keyword');
testComposite('opacity', 0.42, null, null, 0.0, 0.42,
    'Add-composite the neutral value onto a number type property');
testComposite('zIndex', 42, null, null, 0.0, 42,
    'Add-composite the neutral value onto an integer type property');
testComposite('textShadow', '1px 2px red', null, null, 0.0, 'rgb(255, 0, 0) 1px 2px 0px',
    'Add-composite the neutral value onto a shadow type property');
testComposite('transform', 'scale(42)', null, null, 0.0, 'matrix(42, 0, 0, 42, 0, 0)',
    'Add-composite the neutral value onto a transform type property (scale)');
testComposite('transform', 'rotate(0deg)', null, null, 0.0, 'matrix(1, 0, 0, 1, 0, 0)',
    'Add-composite the neutral value onto a transform type property (rotate)');
testComposite('visibility', 'hidden', null, null, 0.0, 'hidden',
    'Add-composite the neutral value onto a visibility type property');

