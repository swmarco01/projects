<?php
    session_start();
    if(isset($_POST['aggiungifiltro'])){
        include 'connessione.php';

        $id_veicolo = $_POST['filter_IDveicoloPHP'];
        $filtertype = $_POST['filtertypePHP'];
        $data_cambio = "".$_POST['filter_datePHP']."";

        //Filtro gasolio

        if($filtertype == "gasolio"){
            $query_inserimento_filtro = $mysqli->query("UPDATE filtri SET data_filtro_gasolio = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_filtro){
                exit("success");
            }
            else
                exit("failed");
            }
        

        //Filtro olio

        if($filtertype == "olio"){
            $query_inserimento_filtro = $mysqli->query("UPDATE filtri SET data_filtro_olio = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_filtro){
                exit("success");
            }
            else
                exit("failed");
            }
        

        //Filtro aria

        if($filtertype == "aria"){
            $query_inserimento_filtro = $mysqli->query("UPDATE filtri SET data_filtro_aria = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_filtro){
                exit("success");
            }
            else
                exit("failed");
        }

        //Filtro essiccatore

        if($filtertype == "essiccatore"){
            $query_inserimento_filtro = $mysqli->query("UPDATE filtri SET data_filtro_essiccatore = '$data_cambio' WHERE id_camion = '$id_veicolo'");
            if($query_inserimento_filtro){
                exit("success");
            }
            else
                exit("failed");
        }
        
    }
            
?>