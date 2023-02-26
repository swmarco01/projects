$(document).ready(function(){
    var tipo_veicolo_revision = $("#revision-tipoveicolo").val();
    var veicolo = $("#revision-select-camion").val();
    var date = new Date();
    var anno = parseInt(date.getFullYear());
    var mese= parseInt(date.getMonth()+1);
    var giorno = parseInt(date.getDate());
    var data_attuale = date.getFullYear()+'-'+mese+'-'+date.getDate();
    var parsed_data_attuale = Date.parse(data_attuale);
    

        if(tipo_veicolo_revision == "-"){
            $("#revision-select-camion").fadeOut("slow");
            $("#revision-select-rimorchio").fadeOut("slow");
            $("#revision-date-input").fadeOut("slow");
            $("#invio_dati_revision_function").prop("disabled", true);
        }
        $(".unselected_type_revision").on('click', function(){
            $("#revision-select-camion").fadeOut("slower");
            $("#revision-select-rimorchio").fadeOut("slower");
            $("#revision-date-input").fadeOut("slower");    
            $("#invio_dati_revision_function").prop("disabled", true);
        });
        $(".selected_type_camion_revision").on('click', function(){
            $("#revision-select-camion").fadeIn("slower");
            $("#revision-select-rimorchio").css("display", "none");
            $("#revision-date-input").fadeOut("slower");
            $("#invio_dati_revision_function").prop("disabled", true);
        });
        $(".selected_type_rimorchio_revision").on('click', function(){
            $("#revision-select-camion").css("display", "none");
            $("#revision-select-rimorchio").fadeIn("slower");
            $("#revision-date-input").fadeOut("slower");
            $("#invio_dati_revision_function").prop("disabled", true);
        });
        $(".option_inactive_camion_revision").on('click', function(){
            $("#revision-date-input").fadeOut("slower");
            $("#invio_dati_revision_function").prop("disabled", true);
        });
        $(".option_active_camion_revision").on('click', function(){
            $("#revision-date-input").fadeIn("slower");
            $("#invio_dati_revision_function").prop("disabled", false);
        });
        $(".option_inactive_rimorchio_revision").on('click', function(){
            $("#revision-date-input").fadeOut("slower");
            $("#invio_dati_revision_function").prop("disabled", true);
        });
        $(".option_active_rimorchio_revision").on('click', function(){
            $("#revision-date-input").fadeIn("slower");
            $("#invio_dati_revision_function").prop("disabled", false);
        });

        var dateinput =  $("#revision-date-input").val();
                

        $("#invio_dati_revision_function").on('click', function(){
            var select_camion = $("#revision-select-camion").val();
            var select_rimorchio = $("#revision-select-rimorchio").val();
            tipo_veicolo_revision = $("#revision-tipoveicolo").val();
            var select_date = $("#revision-date-input").val();
            var parsed_date_select = Date.parse(select_date);
            console.log(parsed_date_select);
            console.log(select_date);
            console.log(tipo_veicolo_revision);
            if(select_date == ""){
                $("#revision-date-input").css("border-color" , "red");
            }else if(parsed_date_select > parsed_data_attuale){
                console.log("data maggiore")
                $("#revision-date-input").css("border-color" , "red");
            }else if(select_date != ""){
                $("#revision-date-input").css("border-color" , "#ced4da");

            
            if(tipo_veicolo_revision == "Camion"){
                console.log("CAMION INVIATO");   

                $.ajax(
                    {
                        url: 'include/revision-function.php',
                        method: 'POST',
                        data: {
                        aggiungirevisione : 1,
                        tipoveicoloPHP : tipo_veicolo_revision,
                        revisione_IDveicoloPHP : select_camion,
                        revision_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".revision-function-container-internal").find("#revision-success-alert").fadeIn();
                            $(".revision-function-container-internal").find("#revision-wrong-alert").fadeOut();
                            $("#revision-tipoveicolo").css("border-color" , "#ced4da");
                            $("#revision-select-camion").css("border-color" , "#ced4da");
                            $("#revision-date-input").css("border-color" , "#ced4da");
                            setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".revision-function-container-internal").find("#revision-success-alert").fadeOut();
                            $(".revision-function-container-internal").find("#revision-wrong-alert").fadeIn();
                            $("#revision-tipoveicolo").css("border-color" , "red");
                            $("#revision-select-camion").css("border-color" , "red");
                            $("#revision-date-input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );

            }else if(tipo_veicolo_revision == "Rimorchio"){
                console.log("RIMORCHIO INVIATO");

                $.ajax(
                    {
                        url: 'include/revision-function.php',
                        method: 'POST',
                        data: {
                        aggiungirevisione : 1,
                        tipoveicoloPHP : tipo_veicolo_revision,
                        revisione_IDveicoloPHP : select_rimorchio,
                        revision_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".revision-function-container-internal").find("#revision-success-alert").fadeIn();
                            $(".revision-function-container-internal").find("#revision-wrong-alert").fadeOut();
                            $("#revision-tipoveicolo").css("border-color" , "#ced4da");
                            $("#revision-select-rimorchio").css("border-color" , "#ced4da");
                            $("#revision-date-input").css("border-color" , "#ced4da");
                            setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".revision-function-container-internal").find("#revision-success-alert").fadeOut();
                            $(".revision-function-container-internal").find("#revision-wrong-alert").fadeIn();
                            $("#revision-tipoveicolo").css("border-color" , "red");
                            $("#revision-select-rimorchio").css("border-color" , "red");
                            $("#revision-date-input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );
            }  
        } 
        });    
});