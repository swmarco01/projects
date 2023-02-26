$(document).ready(function(){
    $("#invio_dati_insert_function").on('click', function(){
    var tipoveicolo = $("#webapp-form-tipoveicolo").val();
    var nomeveicolo = $("#webapp-form-veicolo-name").val();
    var targaveicolo = $("#webapp-form-targa-name").val();
    
    if(targaveicolo.lenght > 7){
      $("#webapp-form-targa-name").css("border-color" , "red");
      $(".insert-function-container-internal").find(".webapp-successalert").css("display" , "none");
      $(".insert-function-container-internal").find(".webapp-wrongalert").css("display" , "block");
    }else{
      $(".insert-function-container-internal").find(".webapp-wrongalert").css("display" , "none");
      $("#webapp-form-targa-name").css("border-color" , "#ced4da");

      $.ajax(
        {
          url: 'include/insert-function.php',
          method: 'POST',
          data: {
            aggiuntaveicolo : 1,
            tipoveicoloPHP : tipoveicolo,
            nomeveicoloPHP : nomeveicolo,
            targaveicoloPHP : targaveicolo
          },
          success: function(response){
            if(response == "success"){
              $(".insert-function-container-internal").find(".webapp-successalert").fadeIn();
              $(".insert-function-container-internal").find(".webapp-wrongalert").fadeOut();
              $("#webapp-form-tipoveicolo").css("border-color" , "#ced4da");
              $("#webapp-form-veicolo-name").css("border-color" , "#ced4da");
              $("#webapp-form-targa-name").css("border-color" , "#ced4da");
              setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);

            }else{
              $(".insert-function-container-internal").find(".webapp-successalert").fadeOut();
              $(".insert-function-container-internal").find(".webapp-wrongalert").fadeIn();
              $("#webapp-form-tipoveicolo").css("border-color" , "red");
              $("#webapp-form-veicolo-name").css("border-color" , "red");
              $("#webapp-form-targa-name").css("border-color" , "red");
            }
          },
          dataType: 'text'
        }
      );
    }
  });
});