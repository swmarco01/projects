<?php
    session_start();
    if(isset($_POST['aggiungiruota'])){
        include 'connessione.php';

        $tipoveicolo = $_POST['tipoveicoloPHP'];
        $id_veicolo = $_POST['wheel_IDveicoloPHP'];        
        $tipo_ruota_camion = $_POST['wheel_type_camionPHP'];
        $tipo_ruota_rimorchio = $_POST['wheel_type_rimorchioPHP'];
        $data_cambio = " ".$_POST['wheel_datePHP']." ";
        

        //Ruota camion

        if($tipoveicolo == "Camion"){
            if($tipo_ruota_camion == "data_ruota_ant_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_camion SET data_ruota_ant_sx = '$data_cambio' WHERE id_camion = '$id_veicolo'");
                    if($query_inserimento_ruota){
                        exit("success");
                    }
                    else
                        exit("failed");
            }
            }
            if($tipo_ruota_camion == "data_ruota_post_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_camion SET data_ruota_post_sx = '$data_cambio' WHERE id_camion = '$id_veicolo'");
                    if($query_inserimento_ruota){
                        exit("success");
                    }
                    else
                        exit("failed");
            }
            if($tipo_ruota_camion == "data_ruota_ant_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_camion SET data_ruota_ant_dx = '$data_cambio' WHERE id_camion = '$id_veicolo'");
                    if($query_inserimento_ruota){
                        exit("success");
                    }
                    else
                        exit("failed");
            }
            if($tipo_ruota_camion == "data_ruota_post_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_camion SET data_ruota_post_dx = '$data_cambio' WHERE id_camion = '$id_veicolo'");
                    if($query_inserimento_ruota){
                        exit("success");
                    }
                    else
                        exit("failed");
            }
        

        //Ruota rimorchio

        if($tipoveicolo == "Rimorchio"){
            if($tipo_ruota_rimorchio == "data_ruota_1_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_1_sx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            }
            if($tipo_ruota_rimorchio == "data_ruota_1_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_1_dx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_2_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_2_sx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_2_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_2_dx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_3_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_3_sx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_3_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_3_dx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_4_sx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_4_sx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }
            if($tipo_ruota_rimorchio == "data_ruota_4_dx"){
                $query_inserimento_ruota = $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_4_dx = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
                if($query_inserimento_ruota){
                    exit("success");
                }
                else
                    exit("failed");
            }  
    }
            
?>