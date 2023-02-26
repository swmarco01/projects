<?php
    session_start();
    if(isset($_POST['aggiungirevisione'])){
        include 'connessione.php';

        $tipoveicolo = $_POST['tipoveicoloPHP'];
        $id_veicolo = $_POST['revisione_IDveicoloPHP'];
        $data_cambio = " ".$_POST['revision_datePHP']." ";
        

        //Revisione camion

        if($tipoveicolo == "Camion"){
            $query_inserimento_revisione = $mysqli->query("UPDATE revisione SET data_effettuata = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_revisione){
                exit("success");
            }
            else
                exit("failed");
            }
        

        //Revisione rimorchio

        if($tipoveicolo == "Rimorchio"){
            $query_inserimento_revisione = $mysqli->query("UPDATE revisione SET data_effettuata = '$data_cambio' WHERE id_rimorchio = '$id_veicolo'");
            if($query_inserimento_revisione){
                exit("success");
            }
            else
                exit("failed");
            }        
    }
            
?>