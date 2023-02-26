<?php
    session_start();
    if(isset($_POST['aggiuntaveicolo'])){
        include 'connessione.php';

        $tipoveicolo = $_POST['tipoveicoloPHP'];
        $nomeveicolo = $_POST['nomeveicoloPHP'];
        $targaveicolo = $_POST['targaveicoloPHP'];
        $idtrasportatore = $_SESSION['userID'];

        if($tipoveicolo == "Camion"){
            $query_inserimento_veicolo = $mysqli->query("INSERT INTO camion (id_trasportatore, nome , targa) VALUES ('$idtrasportatore', '$nomeveicolo', '$targaveicolo')");
            if($query_inserimento_veicolo){
                $mysqli->query("INSERT INTO filtri (id_camion) SELECT MAX(ID) FROM camion");
                $mysqli->query("UPDATE filtri SET data_filtro_gasolio = '0000-00-00', data_filtro_olio = '0000-00-00', data_filtro_aria='0000-00-00', data_filtro_essiccatore='0000-00-00'  WHERE id_camion = (SELECT MAX(ID) FROM camion)");
                $mysqli->query("INSERT INTO oli (id_camion) SELECT MAX(ID) FROM camion");
                $mysqli->query("UPDATE oli SET data_olio_cambio = '0000-00-00', data_olio_motore = '0000-00-00', data_olio_differenziale='0000-00-00' WHERE id_camion = (SELECT MAX(ID) FROM camion)");
                $mysqli->query("INSERT INTO revisione (id_camion) SELECT MAX(ID) FROM camion");
                $mysqli->query("UPDATE revisione SET data_effettuata = '0000-00-00' WHERE id_camion = (SELECT MAX(ID) FROM camion)");
                $mysqli->query("INSERT INTO ruote_camion (id_camion) SELECT MAX(ID) FROM camion");
                $mysqli->query("UPDATE ruote_camion SET data_ruota_ant_sx = '0000-00-00', data_ruota_ant_dx = '0000-00-00', data_ruota_post_sx = '0000-00-00', data_ruota_post_dx = '0000-00-00' WHERE id_camion = (SELECT MAX(ID) FROM camion)");
                exit("success");
            }
            else
                exit("failed");
        }else if($tipoveicolo == "Rimorchio"){
            $query_inserimento_veicolo = $mysqli->query("INSERT INTO rimorchio (id_trasportatore, nome , targa) VALUES ('$idtrasportatore', '$nomeveicolo', '$targaveicolo')");
            if($query_inserimento_veicolo){
                $mysqli->query("INSERT INTO revisione (id_rimorchio) SELECT MAX(ID) FROM rimorchio");
                $mysqli->query("UPDATE revisione SET data_effettuata = '0000-00-00' WHERE id_rimorchio = (SELECT MAX(ID) FROM rimorchio)");
                $mysqli->query("INSERT INTO ruote_rimorchio (id_rimorchio) SELECT MAX(ID) FROM rimorchio");
                $mysqli->query("UPDATE ruote_rimorchio SET data_ruota_1_sx = '0000-00-00', data_ruota_1_dx = '0000-00-00',data_ruota_2_sx = '0000-00-00', data_ruota_2_dx = '0000-00-00',data_ruota_3_sx = '0000-00-00', data_ruota_3_dx = '0000-00-00',data_ruota_4_sx = '0000-00-00', data_ruota_4_dx = '0000-00-00' WHERE id_rimorchio = (SELECT MAX(ID) FROM rimorchio)");
                exit("success");
            }else
                exit("failed");
        }
    }
?>