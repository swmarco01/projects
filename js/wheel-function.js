$(document).ready(function(){
    var tipo_veicolo_wheel = $("#wheel-tipoveicolo").val();
    var veicolo = $("#wheel-select-camion").val();
    var date = new Date();
    var anno = parseInt(date.getFullYear());
    var mese= parseInt(date.getMonth()+1);
    var giorno = parseInt(date.getDate());
    var data_attuale = date.getFullYear()+'-'+mese+'-'+date.getDate();
    var parsed_data_attuale = Date.parse(data_attuale);
    

        if(tipo_veicolo_wheel == "-"){
            $("#wheel-select-camion").fadeOut("slow");
            $("#wheel-select-rimorchio").fadeOut("slow");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#wheel-date-input").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        }
        $(".unselected_type_wheel").on('click', function(){
            $("#wheel-select-camion").fadeOut("slow");
            $("#wheel-select-rimorchio").fadeOut("slow");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#wheel-date-input").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".selected_type_camion_wheel").on('click', function(){
            $("#wheel-select-camion").fadeIn("slower");
            $("#wheel-select-rimorchio").css("display", "none");
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".selected_type_rimorchio_wheel").on('click', function(){
            $("#wheel-select-camion").css("display", "none");
            $("#wheel-select-rimorchio").fadeIn("slower");
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".option_inactive_camion_wheel").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".option_active_camion_wheel").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeIn("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".option_inactive_rimorchio_wheel").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".option_active_rimorchio_wheel").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#wheel-rimorchio").fadeIn("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });

        $(".unselected_wheel_camion").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".selected_wheel_camion").on('click', function(){
            $("#wheel-date-input").fadeIn("slower");
            $("#wheel-rimorchio").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", false);
        });
        $(".unselected_wheel_rimorchio").on('click', function(){
            $("#wheel-date-input").fadeOut("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", true);
        });
        $(".selected_wheel_rimorchio").on('click', function(){
            $("#wheel-date-input").fadeIn("slower");
            $("#wheel-camion").fadeOut("slow");
            $("#invio_dati_wheel_function").prop("disabled", false);
        });

        var dateinput =  $("#wheel-date-input").val();
                

        $("#invio_dati_wheel_function").on('click', function(){
            var select_camion = $("#wheel-select-camion").val();
            var select_rimorchio = $("#wheel-select-rimorchio").val();
            var wheel_type_camion = $("#wheel-camion").val();
            var wheel_type_rimorchio = $("#wheel-rimorchio").val();
            tipo_veicolo_wheel = $("#wheel-tipoveicolo").val();
            var select_date = $("#wheel-date-input").val();
            var parsed_date_select = Date.parse(select_date);
            console.log(parsed_date_select);
            console.log(select_date);
            console.log(tipo_veicolo_wheel);
            if(select_date == ""){
                $("#wheel-date-input").css("border-color" , "red");
            }else if(parsed_date_select > parsed_data_attuale){
                console.log("data maggiore")
                $("#wheel-date-input").css("border-color" , "red");
            }else if(select_date != ""){
                $("#wheel-date-input").css("border-color" , "#ced4da");

            
            if(tipo_veicolo_wheel == "Camion"){
                console.log("CAMION INVIATO");   

                $.ajax(
                    {
                        url: 'include/wheel-function.php',
                        method: 'POST',
                        data: {
                        aggiungiruota : 1,
                        tipoveicoloPHP : tipo_veicolo_wheel,
                        wheel_IDveicoloPHP : select_camion,
                        wheel_type_camionPHP : wheel_type_camion,
                        wheel_type_rimorchioPHP : wheel_type_rimorchio,
                        wheel_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".wheel-function-container-internal").find("#wheel-success-alert").fadeIn();
                            $(".wheel-function-container-internal").find("#wheel-wrong-alert").fadeOut();
                            $("#wheel-tipoveicolo").css("border-color" , "#ced4da");
                            $("#wheel-select-camion").css("border-color" , "#ced4da");
                            $("#wheel-camion").css("border-color" , "#ced4da");
                            $("#wheel-date-input").css("border-color" , "#ced4da");
                            //setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".wheel-function-container-internal").find("#wheel-success-alert").fadeOut();
                            $(".wheel-function-container-internal").find("#wheel-wrong-alert").fadeIn();
                            $("#wheel-tipoveicolo").css("border-color" , "red");
                            $("#wheel-select-camion").css("border-color" , "red");
                            $("#wheel-camion").css("border-color" , "red");
                            $("#wheel-date-input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );

            }else if(tipo_veicolo_wheel == "Rimorchio"){
                console.log("RIMORCHIO INVIATO");

                $.ajax(
                    {
                        url: 'include/wheel-function.php',
                        method: 'POST',
                        data: {
                        aggiungiruota : 1,
                        tipoveicoloPHP : tipo_veicolo_wheel,
                        wheele_IDveicoloPHP : select_rimorchio,
                        wheel_type_camionPHP : wheel_type_camion,
                        wheel_type_rimorchioPHP : wheel_type_rimorchio,
                        wheel_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".wheel-function-container-internal").find("#wheel-success-alert").fadeIn();
                            $(".wheel-function-container-internal").find("#wheel-wrong-alert").fadeOut();
                            $("#wheel-tipoveicolo").css("border-color" , "#ced4da");
                            $("#wheel-select-rimorchio").css("border-color" , "#ced4da");
                            $("#wheel-rimorchio").css("border-color" , "#ced4da");
                            $("#wheel-date-input").css("border-color" , "#ced4da");
                            setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".wheel-function-container-internal").find("#wheel-success-alert").fadeOut();
                            $(".wheel-function-container-internal").find("#wheel-wrong-alert").fadeIn();
                            $("#wheel-tipoveicolo").css("border-color" , "red");
                            $("#wheel-select-rimorchio").css("border-color" , "red");
                            $("#wheel-rimorchio").css("border-color" , "red");
                            $("#wheel-date-input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );
            }  
        } 
        });    
});