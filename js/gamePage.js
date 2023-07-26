var setPageBtnI = document.getElementById('setPageBtnI');

setPageBtnI.onclick = function(){
    let setPageDownKeyframe = new KeyframeEffect(
        setPage,
        [
            { top: '-100%' },
            { top: '0' }
        ],
        { duration: 800, fill: 'forwards', easing: 'ease' }
    );
    let setPageDownAnimation = new Animation(setPageDownKeyframe, document.timeline);
    setPageDownAnimation.play()
}