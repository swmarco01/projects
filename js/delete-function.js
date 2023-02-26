$(document).ready(function(){
    var tipo_veicolo = $("#select-tipoveicolo-delete-function").val();
        console.log(tipo_veicolo);
        if(tipo_veicolo == "-"){
            $("#delete-select-camion").fadeOut("slow");
            $("#delete-select-rimorchio").fadeOut("slow");
            $("#invio_dati_delete_function").prop("disabled", true);
        }
        $("#option-value-camion").on('click', function(){
            $("#delete-select-camion").fadeIn("slower");
            $("#delete-select-rimorchio").fadeOut("fast");
            $("#invio_dati_delete_function").prop("disabled", false);
        });
        $("#option-value-rimorchio").on('click', function(){
            $("#delete-select-camion").fadeOut("fast");
            $("#delete-select-rimorchio").fadeIn("slower");
            $("#invio_dati_delete_function").prop("disabled", false);
        });
        $("#option-value-nothing").on('click', function(){
            $("#delete-select-camion").fadeOut();
            $("#delete-select-rimorchio").fadeOut();
            $("#invio_dati_delete_function").prop("disabled", true);
        });
        

        $("#invio_dati_delete_function").on('click', function(){
            var tipoveicolo = $("#select-tipoveicolo-delete-function").val();
            if(tipoveicolo == "Camion"){
                var veicolo = $("#delete-select-camion").val();
                var ok=1;
                console.log(veicolo);
            }else if(tipoveicolo == "Rimorchio"){
                var veicolo = $("#delete-select-rimorchio").val();
                var ok=1;
            }else
                var ok=0;

            $.ajax(
                {
                    url: 'include/delete-function.php',
                    method: 'POST',
                    data: {
                    rimuoviveicolo : 1,
                    tipoveicolodeletePHP : tipoveicolo,
                    id_veicoloPHP : veicolo,
                    },
                    success: function(response){
                    if(response == "success"){
                        $(".remove-function-container-internal").find("#delete-success-alert").fadeIn();
                        $(".remove-function-container-internal").find("#delete-wrong-alert").fadeOut();
                        $("#select-tipoveicolo-delete-function").css("border-color" , "#ced4da");
                        $("#delete-select-camion").css("border-color" , "#ced4da");
                        $("#delete-select-rimorchio").css("border-color" , "#ced4da");
                        setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
        
                    }else{
                        $(".remove-function-container-internal").find("#delete-success-alert").fadeOut();
                        $(".remove-function-container-internal").find("#delete-wrong-alert").fadeIn();
                        $("#select-tipoveicolo-delete-function").css("border-color" , "red");
                        $("#delete-select-camion").css("border-color" , "red");
                        $("#delete-select-rimorchio").css("border-color" , "red");
                    }
                    },
                    dataType: 'text',
                }
            );
        });        
});