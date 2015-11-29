$(document).ready(function(){
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function(){
            window.location.hash = hash;
        });
    });
});

function toggleSlider(name) {
    if ($("#hiddenPanel").is(":visible")) {
        if ($(name).is(":visible")) {
            $(name).animate(
                {
                    opacity: "0"
                },
                600,
                function(){
                    $("#hiddenPanel").slideUp(
                        function() {
                            $(name).hide();
                            $(name+"Button").removeClass("selected");
                        }
                    );
                }
            );
        } else {
            $("#panelButtons .selected").removeClass("selected");
            $("#hiddenPanel").slideUp(600, function(){
                $("#hiddenPanel").children().hide();
                $(name+"Button").addClass("selected");
                $(name).show();
                $("#hiddenPanel").slideDown(600, function(){
                    $(name).animate(
                        {
                            opacity: "1"
                        },
                        600
                    );
                });
            });
        }
    }
    else {
        $(name+"Button").addClass("selected");
        $(name).show();
        $("#hiddenPanel").slideDown(600, function(){
            $(name).animate(
                {
                    opacity: "1"
                },
                600
            );
        });
    }
}