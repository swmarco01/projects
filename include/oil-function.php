<?php
    session_start();
    if(isset($_POST['aggiungiolio'])){
        include 'connessione.php';

        $id_veicolo = $_POST['oil_IDveicoloPHP'];
        $oiltype = $_POST['oiltypePHP'];
        $data_cambio = "".$_POST['oil_datePHP']."";

        //Olio Motore

        if($oiltype == "motore"){
            $query_inserimento_olio = $mysqli->query("UPDATE oli SET data_olio_motore = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_olio){
                exit("success");
            }
            else
                exit("failed");
            }
        

        //Olio Cambio

        if($oiltype == "cambio"){
            $query_inserimento_olio = $mysqli->query("UPDATE oli SET data_olio_cambio = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_olio){
                exit("success");
            }
            else
                exit("failed");
            }
        

        //Olio Differenziale

        if($oiltype == "differenziale"){
            $query_inserimento_olio = $mysqli->query("UPDATE oli SET data_olio_differenziale = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_olio){
                exit("success");
            }
            else
                exit("failed");
            }
        
    }
            
?>