enterView({
    selector: '.step',
    enter: function (el) {
        $(el).addClass('element--shown');
        $(el).prev('p').removeClass('element--shown');
        animateSvg(el.id, true);
    },
    exit: function (el) {
        $(el).removeClass('element--shown');
        $(el).prev('p').addClass('element--shown');
        animateSvg(el.id, false);
    },
    // progress: function (el, progress) {
    //     el.style.opacity = progress;
    //     $(el).prev('p').css('opacity', 1 - progress);
    // },
    offset: 0.1
});

function animateSvg(step, isEntering) {
    let $step1 = $('.step1');
    let $step2 = $('rect.step2, .label.step2');
    let $step2Link = $('.links .step2');
    let $step3 = $('rect.step3, .label.step3');
    let $step3Annotations = $('.annotations.step3 *');
    let $step3Links = $('.links .step3');
    let $step4 = $('.annotations.step4 *');
    let $step4Uncertain = $('.links .uncertain');
    let $step4Links = $('.links .step4');
    let timeout; 
    let timeout2;
    switch (step) {
        case 'step-1':
            isEntering ? $step1.addClass('element--shown') : $step1.removeClass('element--shown');
            break;

        case 'step-2':
            if (isEntering) {
                $step2.addClass('element--shown');
                $step2Link.addClass('link--shown');
            } else {
                $step2.removeClass('element--shown');
                $step2Link.removeClass('link--shown');
            }
            break;

        case 'step-3':
            if (isEntering) {
                $step2Link.addClass('link--faded');
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function () {
                    $step3.addClass('element--shown');
                    $step3Links.addClass('link--shown');
                }, 500)
                timeout2 = window.setTimeout(function () {
                    $step3Annotations.addClass('element--shown');
                }, 1000)
            } else {
                $step3.removeClass('element--shown');
                $step3Annotations.removeClass('element--shown');
                $step3Links.removeClass('link--shown');
                window.clearTimeout(timeout);
                timeout = window.setTimeout(function () {
                    $step2Link.removeClass('link--faded');
                }, 500)
            }
            break;

        case 'step-4':
            if (isEntering) {
                $step4.addClass('element--shown');
                $step4Uncertain.addClass('link--blurred');
                $step4Links.removeClass('link--faded');
            } else {
                $step4.removeClass('element--shown');
                $step4Uncertain.removeClass('link--blurred');
                $step4Links.addClass('link--faded');
            }
            break;
        default:
            break;
    }

}