var memoryBackI = document.getElementById('memoryBackI');
var setPage = document.getElementById('setPage');

memoryBackI.onclick = function () {
    initialize();
    let setPageUpKeyframe = new KeyframeEffect(
        setPage,
        [
            { top: '0' },
            { top: '-100%' }
        ],
        { duration: 800, fill: 'forwards', easing: 'ease' }
    );
    let setPageUpAnimation = new Animation(setPageUpKeyframe, document.timeline);
    setPageUpAnimation.play()
}