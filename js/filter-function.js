$(document).ready(function(){
    var veicolo = $("#filter-select-camion").val();
    var date = new Date();
    var anno = parseInt(date.getFullYear());
    var mese= parseInt(date.getMonth()+1);
    var giorno = parseInt(date.getDate());
    var data_attuale = date.getFullYear()+'-'+mese+'-'+date.getDate();
    var parsed_data_attuale = Date.parse(data_attuale);
    

        console.log(veicolo);
        if(veicolo == "-"){
            $("#filter-choose-select").fadeOut("slow");
            $("#filter-date-input").fadeOut("slow");
            $("#invio_dati_filter_function").prop("disabled", true);
        }
        $(".option_active_filter").on('click', function(){
            $("#filter-choose-select").fadeIn("slower");
            $("#invio_dati_filter_function").prop("disabled", true);
        });
        $(".option_inactive_filter").on('click', function(){
            $("#filter-choose-select").fadeOut("slower");
            $("#filter-date-input").fadeOut("fast");
            $("#invio_dati_filter_function").prop("disabled", true);
        });
        $(".option_inactive_type_filter").on('click', function(){
            $("#filter-date-input").fadeOut("fast");
            $("#invio_dati_filter_function").prop("disabled", true);
        });
        $(".option_active_type_filter").on('click', function(){
            $("#filter-date-input").fadeIn("slower");
            $("#invio_dati_filter_function").prop("disabled", false);
        });
        
        var dateinput =  $("#filter-date-input").val();
                

        $("#invio_dati_filter_function").on('click', function(){
            var select_veicolo = $("#filter-select-camion").val();
            var select_filter = $("#filter-choose-select").val();
            console.log(select_filter);
            var select_date = $("#filter-date-input").val();
            console.log(select_date);
            var parsed_date_select = Date.parse(select_date);
            if(select_date == ""){
                $("#filter-date-input").css("border-color" , "red");
            }else if(parsed_date_select > parsed_data_attuale){
                console.log("data maggiore")
                $("#filter-date-input").css("border-color" , "red");
                $(".filter-function-container-internal").find("#filter-wrong-alert").fadeIn();
            }else if(select_date != ""){
                $("#filter-date-input").css("border-color" , "#ced4da");
                $(".filter-function-container-internal").find("#filter-wrong-alert").css("display", "none");

                $.ajax(
                    {
                        url: 'include/filter-function.php',
                        method: 'POST',
                        data: {
                        aggiungifiltro : 1,
                        filter_IDveicoloPHP : select_veicolo,
                        filtertypePHP : select_filter,
                        filter_datePHP : select_date
                        },
                        success: function(response){
                        if(response == "success"){
                            $(".filter-function-container-internal").find("#filter-success-alert").fadeIn();
                            $(".filter-function-container-internal").find("#filter-wrong-alert").fadeOut();
                            $("#filter_choose_select").css("border-color" , "#ced4da");
                            $("#filter_select_camion").css("border-color" , "#ced4da");
                            $("#filter_date_input").css("border-color" , "#ced4da");
                            setTimeout(() => {  window.location.href = 'index2.php'; }, 1000);
            
                        }else{
                            $(".filter-function-container-internal").find("#filter-success-alert").fadeOut();
                            $(".filter-function-container-internal").find("#filter-wrong-alert").fadeIn();
                            $("#filter_choose_select").css("border-color" , "red");
                            $("#filter_select_camion").css("border-color" , "red");
                            $("#filter_date_input").css("border-color" , "red");
                        }
                        },
                        dataType: 'text',
                    }
                );
            }   
        });        
});