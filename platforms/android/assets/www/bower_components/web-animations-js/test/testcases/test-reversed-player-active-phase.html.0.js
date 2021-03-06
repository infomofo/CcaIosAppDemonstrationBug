
timing_test(function() {
    var player = target.animate([{left: '0px'}, {left: '100px'}], {duration: 2, fill: 'forwards'});

    at(1, function() {
        assert_styles(target, {left: '50px'});
        player.currentTime = 3;
        player.playbackRate = -1;
        assert_styles(target, {left: '100px'});
    }, 'AnimationPlayer reversing');

    at(2, function() {}, 'Tick');

    at(3, function() {
        assert_styles(target, {left: '50px'});
    }, 'Reversed player entering its active phase should take effect');
});
