$(document).ready(function(){   //executed after the page has loaded

    console.log('vivo');

});

$('#menu > ul.nav li a').click(function(e) {
    var $this = $(this);
    $this.parent().siblings().removeClass('active').end().addClass('active');
    e.preventDefault();
});