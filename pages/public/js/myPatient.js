$(() => {
    $('#two').click(() => {
        $('.newGroup').css('visibility', 'visible');
        $('#one').attr('class', '');
        $('#two').attr('class', 'current');
        // width: 200%; transform: translate3d(-375px, 0px, 0px); transition: transform 0.5s linear 0s;
        let $ui = $('.ui-tab-content');
        $ui.css('transform', 'translate3d(-375px, 0px, 0px)');
        $ui.css('transition', 'transform 0.5s linear 0s');
    });
    $('#one').click(() => {
        $('.newGroup').css('visibility', 'hidden');
        $('#two').attr('class', '');
        $('#one').attr('class', 'current');
        // width: 200%; transform: translate3d(0px, 0px, 0px); transition: transform 0.5s linear 0s;
        let $ui = $('.ui-tab-content');
        $ui.css('transform', 'translate3d(0px, 0px, 0px)');
        $ui.css('transition', 'transform 0.5s linear 0s');
    })
})
