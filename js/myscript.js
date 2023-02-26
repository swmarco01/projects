$(document).ready(function(){
    $("#button_login_personale").click(function(){
        $(".fullscreen-container1").fadeIn();
        $(".opacitycontainer").fadeIn("slow");
        $(".login-container").fadeIn("slow");
        $(".rd-navbar-toggle").removeClass("active");
        $(".rd-navbar-nav-wrap").removeClass("active");
        $("body").css("position", "fixed");
        $("body").css("overflow-y", "scroll");
        $("body").css("transition", "0.5s");
        $("body").css("width", "100%");
    });
    $(".glyphicon-remove-button").click(function(){
        $("body").css("position", "initial");
        $("body").css("overflow-y", "initial");
        $("body").css("width", "initial");
        $(".fullscreen-container1").fadeOut("slow");
        $(".opacitycontainer").fadeOut();
        $(".login-container").fadeOut("slow");
    });
});


$(document).ready(function(){
    $("#insert-button").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".insert-function-container").fadeIn();
        $(".webapp-overlayer").find(".oil-function-container").css("display", "none");
        $(".webapp-overlayer").find(".remove-function-container").css("display", "none");
        $(".webapp-overlayer").find(".revision-function-container").css("display", "none");
        $(".webapp-overlayer").find(".wheel-function-container").css("display", "none");
        $(".webapp-overlayer").find(".filter-function-container").css("display", "none");
    });
});
$(document).ready(function(){
    $("#remove-button").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".remove-function-container").fadeIn();
        $(".webapp-overlayer").find(".filter-function-container").css("display", "none");
        $(".webapp-overlayer").find(".insert-function-container").css("display", "none");
        $(".webapp-overlayer").find(".oil-function-container").css("display", "none");
        $(".webapp-overlayer").find(".wheel-function-container").css("display", "none");
        $(".webapp-overlayer").find(".revision-function-container").css("display", "none");
    });
});
$(document).ready(function(){
    $("#oilbutton").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".oil-function-container").fadeIn();
        $(".webapp-overlayer").find(".filter-function-container").css("display", "none");
        $(".webapp-overlayer").find(".remove-function-container").css("display", "none");
        $(".webapp-overlayer").find(".insert-function-container").css("display", "none");
        $(".webapp-overlayer").find(".wheel-function-container").css("display", "none");
        $(".webapp-overlayer").find(".revision-function-container").css("display", "none");
    });
});
$(document).ready(function(){
    $("#filterbutton").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".filter-function-container").fadeIn();
        $(".webapp-overlayer").find(".remove-function-container").css("display", "none");
        $(".webapp-overlayer").find(".insert-function-container").css("display", "none");
        $(".webapp-overlayer").find(".revision-function-container").css("display", "none");
        $(".webapp-overlayer").find(".oil-function-container").css("display", "none");
        $(".webapp-overlayer").find(".wheel-function-container").css("display", "none");
    });
});
$(document).ready(function(){
    $("#revisionbutton").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".revision-function-container").fadeIn();
        $(".webapp-overlayer").find(".filter-function-container").css("display", "none");
        $(".webapp-overlayer").find(".wheel-function-container").css("display", "none");
        $(".webapp-overlayer").find(".remove-function-container").css("display", "none");
        $(".webapp-overlayer").find(".insert-function-container").css("display", "none");
        $(".webapp-overlayer").find(".oil-function-container").css("display", "none");
    });
});
$(document).ready(function(){
    $("#wheelbutton").click(function(){
        $(".webapp-overlayer").find(".fullscreen-container1").fadeIn();
        $(".webapp-overlayer").find(".opacitycontainer").fadeIn("slow");
        $(".webapp-overlayer").find(".wheel-function-container").fadeIn();
        $(".webapp-overlayer").find(".filter-function-container").css("display", "none");
        $(".webapp-overlayer").find(".remove-function-container").css("display", "none");
        $(".webapp-overlayer").find(".insert-function-container").css("display", "none");
        $(".webapp-overlayer").find(".oil-function-container").css("display", "none");
        $(".webapp-overlayer").find(".revision-function-container").css("display", "none");
    });
});
