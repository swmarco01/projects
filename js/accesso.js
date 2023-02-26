$(document).ready(function(){
      $("#loginbutton1").on('click', function(){
      var email = $("#form-email").val();
      var password = $("#form-password").val();
      
      if(email == "" || password==""){
        $("#form-email").css("border-color" , "red");
        $("#successalert").css("display" , "none");
        $("#form-password").css("border-color" , "red");
        $("#wrongalert").css("display" , "block");
      }else{
        $("#wrongalert").css("display" , "none");
        $("#form-email").css("border-color" , "#ced4da");
        $("#form-password").css("border-color" , "#ced4da");

        $.ajax(
          {
            url: 'index.php',
            method: 'POST',
            data: {
              login : 1,
              emailPHP : email,
              passwordPHP : password
            },
            success: function(response){
              if(response == "success"){
                $("#accesso-successalert").fadeIn();
                $("#accesso-wrongalert").fadeOut();
                $("#form-email").css("border-color" , "#ced4da");
                $("#form-password").css("border-color" , "#ced4da");
                setTimeout(() => {  window.location.href = 'index.php'; }, 1000);

              }else{
                $("#accesso-successalert").fadeOut();
                $("#accesso-wrongalert").fadeIn();
                $("#form-password").css("border-color" , "red");
                $("#form-email").css("border-color" , "red");
              }
            },
            dataType: 'text'
          }
        );
      }
    });
  });