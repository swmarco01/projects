$(document).ready(function(){
    var veicolo = $("#oil-select-camion").val();
    var date = new Date();
    var anno = parseInt(date.getFullYear());
    var mese= parseInt(date.getMonth()+1);
    var giorno = parseInt(date.getDate());
    var data_attuale = date.getFullYear()+'-'+mese+'-'+date.getDate();
    var parsed_data_attuale = Date.parse(data_attuale);
    

        console.log(veicolo);
        if(veicolo == "-"){
            $("#oil-choose-select").fadeOut("slow");
            $("#oil-date-input").fadeOut("slow");
            $("#invio_dati_oil_function").prop("disabled", true);
        }
        $(".option_active_oil").on('click', function(){
            $("#oil-choose-select").fadeIn("slower");
            $("#invio_dati_oil_function").prop("disabled", true);
        });
        $(".option_inactive_oil").on('click', function(){
            $("#oil-choose-select").fadeOut("slower");
            $("#oil-date-input").fadeOut("fast");
            $("#invio_dati_oil_function").prop("disabled", true);
        });
        $(".option_inactive_type_oil").on('click', function(){
            $("#oil-date-input").fadeOut("fast");
            $("#invio_dati_oil_function").prop("disabled", true);
        });
        $(".option_active_type_oil").on('click', function(){
            $("#oil-date-input").fadeIn("slower");
            $("#invio_dati_oil_function").prop("disabled", false);
        });
        
        var dateinput =  $("#oil-date-input").val();
                

        $("#invio_dati_oil_function").on('click', function(){
            var select_veicolo = $("#oil-select-camion").val();
            var select_oil = $("#oil-choose-select").val();
            console.log(select_oil);
            var select_date = $("#oil-date-input").val();
            console.log(select_date);
            var parsed_date_select = Date.parse(select_date);
            if(select_date == ""){
                $("#oil-date-input").css("border-color" , "red");
            }else if(parsed_date_select > parsed_data_attuale){
                console.log("data maggiore")
                $("#oil-date-input").css("border-color" , "red");
            }else if(select_date != ""){
                $("#oil-date-input").css("border-color" , "#ced4da");

                $.ajax(
                    {
                        url: 'include/oil-function.php',
                        method: 'POST',
                        data: {
                        aggiungiolio : 1,
                        oil_IDveicoloPHP : select_veicolo,
                        oiltypePHP : select_oil,
                        oil_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".oil-function-container-internal").find("#oil-success-alert").fadeIn();
                            $(".oil-function-container-internal").find("#oil-wrong-alert").fadeOut();
                            $("#oil_choose_select").css("border-color" , "#ced4da");
                            $("#oil_select_camion").css("border-color" , "#ced4da");
                            $("#oil_date_input").css("border-color" , "#ced4da");
                            setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".oil-function-container-internal").find("#oil-success-alert").fadeOut();
                            $(".oil-function-container-internal").find("#oil-wrong-alert").fadeIn();
                            $("#oil_choose_select").css("border-color" , "red");
                            $("#oil_select_camion").css("border-color" , "red");
                            $("#oil_date_input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );
            }   
        });        
});