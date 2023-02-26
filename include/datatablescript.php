<?php
    
?>
<script>
    $(document).ready(function () {

            var table = $('#webapp-table').DataTable({
                scrollY:        200,
                deferRender:    true,
                scroller:       true,
                responsive: true,
                paging: false,
                "data": testdata.data,
                "columns": [
                    {
                        "className": 'details-control',
                        "orderable": false,
                        "data": null,
                        "defaultContent": '',
                        "render": function () {
                            return '<span class="glyphicon glyphicon-plus-sign plus-glyph glyph"></span>';
                        },
                        width:"15px"
                    },
                    { "data": "tipoveicolo", "className": "tipoveicolo", },
                    { "data": "nome" },
                    { "data": "targa" }
                ],
                "order": [[1, 'asc']]
            });

            // Add event listener for opening and closing details
            $('#webapp-table tbody').on('click', 'td.details-control', function () {
                var tr = $(this).closest('tr');
                var tdi = tr.find("span.glyph");
                var row = table.row(tr);
                var tipoveicolo = tr.find(".tipoveicolo").text();

                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    tdi.first().removeClass('glyphicon-minus-sign');
                    tdi.first().removeClass('minus-glyph');
                    tdi.first().addClass('glyphicon-plus-sign');
                    tdi.first().addClass('plus-glyph');
                }
                else if(tipoveicolo == "Rimorchio") {
                    // Open this row
                    row.child(format_rimorchio(row.data())).show();
                    tr.addClass('shown');
                    tdi.first().removeClass('glyphicon-plus-sign');
                    tdi.first().removeClass('plus-glyph');
                    tdi.first().addClass('glyphicon-minus-sign');
                    tdi.first().addClass('minus-glyph');
                }else if(tipoveicolo == "Camion"){
                    row.child(format_camion(row.data())).show();
                    tr.addClass('shown');
                    tdi.first().removeClass('glyphicon-plus-sign');
                    tdi.first().removeClass('plus-glyph');
                    tdi.first().addClass('glyphicon-minus-sign');
                    tdi.first().addClass('minus-glyph');
                }
            });

            table.on("user-select", function (e, dt, type, cell, originalEvent) {
                if ($(cell.node()).hasClass("details-control")) {
                    e.preventDefault();
                }
            });
            });

            function format_camion(d){

                var data_olio_cambio_post = new Date(d.data_olio_cambio);
                data_olio_cambio_post.setMonth(data_olio_cambio_post.getMonth()+10);
                if(!isNaN(data_olio_cambio_post.getTime())){
                    data_olio_cambio_post = data_olio_cambio_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_olio_motore_post = new Date(d.data_olio_motore);
                data_olio_motore_post.setMonth(data_olio_motore_post.getMonth()+5);
                if(!isNaN(data_olio_motore_post.getTime())){
                    data_olio_motore_post = data_olio_motore_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_olio_differenziale_post = new Date(d.data_olio_differenziale);
                data_olio_differenziale_post.setMonth(data_olio_differenziale_post.getMonth()+10);
                if(!isNaN(data_olio_differenziale_post.getTime())){
                    data_olio_differenziale_post = data_olio_differenziale_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_filtro_gasolio_post = new Date(d.data_filtro_gasolio);
                data_filtro_gasolio_post.setMonth(data_filtro_gasolio_post.getMonth()+5);
                if(!isNaN(data_filtro_gasolio_post.getTime())){
                    data_filtro_gasolio_post = data_filtro_gasolio_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_filtro_olio_post = new Date(d.data_filtro_olio);
                data_filtro_olio_post.setMonth(data_filtro_olio_post.getMonth()+5);
                if(!isNaN(data_filtro_olio_post.getTime())){
                    data_filtro_olio_post = data_filtro_olio_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_filtro_aria_post = new Date(d.data_filtro_aria);
                data_filtro_aria_post.setMonth(data_filtro_aria_post.getMonth()+5);
                if(!isNaN(data_filtro_aria_post.getTime())){
                    data_filtro_aria_post = data_filtro_aria_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_filtro_essiccatore_post = new Date(d.data_filtro_essiccatore);
                data_filtro_essiccatore_post.setMonth(data_filtro_essiccatore_post.getMonth()+5);
                if(!isNaN(data_filtro_essiccatore_post.getTime())){
                    data_filtro_essiccatore_post = data_filtro_essiccatore_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_ant_sx_post = new Date(d.data_ruota_ant_sx);
                data_ruota_ant_sx_post.setMonth(data_ruota_ant_sx_post.getMonth()+20);
                if(!isNaN(data_ruota_ant_sx_post.getTime())){
                    data_ruota_ant_sx_post = data_ruota_ant_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_ant_dx_post = new Date(d.data_ruota_ant_dx);
                data_ruota_ant_dx_post.setMonth(data_ruota_ant_dx_post.getMonth()+20);
                if(!isNaN(data_ruota_ant_dx_post.getTime())){
                    data_ruota_ant_dx_post = data_ruota_ant_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_post_sx_post = new Date(d.data_ruota_post_sx);
                data_ruota_post_sx_post.setMonth(data_ruota_post_sx_post.getMonth()+20);
                if(!isNaN(data_ruota_post_sx_post.getTime())){
                    data_ruota_post_sx_post = data_ruota_post_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_post_dx_post = new Date(d.data_ruota_post_dx);
                data_ruota_post_dx_post.setMonth(data_ruota_post_dx_post.getMonth()+20);
                if(!isNaN(data_ruota_post_dx_post.getTime())){
                    data_ruota_post_dx_post = data_ruota_post_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_revisione_post = new Date(d.data_revisione);
                data_revisione_post.setMonth(data_revisione_post.getMonth()+12);
                if(!isNaN(data_revisione_post.getTime())){
                    data_revisione_post = data_revisione_post.toISOString().split(/[T ]/i, 1)[0];
                }

            // `d` is the original data object for the row
            return '<table cellpadding="0" cellspacing="0" border="0" style="padding-left:50px; width: 90%; margin: auto;">' +
                '<tr>' +
                    '<td>Formato data:</td>' +
                    '<td colspan="3">YYYY-MM-DD</td>' +
                    '<td></td>' +
                    '<td style="color: red;">YYYY-MM-DD</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio olio cambio:</td>' +
                    '<td colspan="3">' + d.data_olio_cambio + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_olio_cambio_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio olio motore:</td>' +
                    '<td colspan="3">' + d.data_olio_motore + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_olio_motore_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio olio differenziale:</td>' +
                    '<td colspan="3">' + d.data_olio_differenziale + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_olio_differenziale_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio filtro gasolio:</td>' +
                    '<td colspan="3">' + d.data_filtro_gasolio + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_filtro_gasolio_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio filtro olio:</td>' +
                    '<td colspan="3">' + d.data_filtro_olio + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_filtro_olio_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio filtro aria:</td>' +
                    '<td colspan="3">' + d.data_filtro_aria + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_filtro_aria_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio filtro essiccatore:</td>' +
                    '<td colspan="3">' + d.data_filtro_essiccatore + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_filtro_essiccatore_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota anteriore sinistra:</td>' +
                    '<td colspan="3">' + d.data_ruota_ant_sx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_ant_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota anteriore destra:</td>' +
                    '<td colspan="3">' + d.data_ruota_ant_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_ant_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota posteriore sinistra:</td>' +
                    '<td colspan="3">' + d.data_ruota_post_sx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_post_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota posteriore destra:</td>' +
                    '<td colspan="3">' + d.data_ruota_post_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_post_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultima revisione:</td>' +
                    '<td colspan="3">' + d.data_revisione + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_revisione_post +'</td>' +
                '</tr>' +
            '</table>';  
            }

            function format_rimorchio(d){

                var data_ruota_1_sx_post = new Date(d.data_ruota_1_sx);
                data_ruota_1_sx_post.setMonth(data_ruota_1_sx_post.getMonth()+10);
                if(!isNaN(data_ruota_1_sx_post.getTime())){
                    data_ruota_1_sx_post = data_ruota_1_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_1_dx_post = new Date(d.data_ruota_1_dx);
                data_ruota_1_dx_post.setMonth(data_ruota_1_dx_post.getMonth()+5);
                if(!isNaN(data_ruota_1_dx_post.getTime())){
                    data_ruota_1_dx_post = data_ruota_1_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_2_sx_post = new Date(d.data_ruota_2_sx);
                data_ruota_2_sx_post.setMonth(data_ruota_2_sx_post.getMonth()+10);
                if(!isNaN(data_ruota_2_sx_post.getTime())){
                    data_ruota_2_sx_post = data_ruota_2_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_2_dx_post = new Date(d.data_ruota_2_dx);
                data_ruota_2_dx_post.setMonth(data_ruota_2_dx_post.getMonth()+5);
                if(!isNaN(data_ruota_2_dx_post.getTime())){
                    data_ruota_2_dx_post = data_ruota_2_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_3_sx_post = new Date(d.data_ruota_3_sx);
                data_ruota_3_sx_post.setMonth(data_ruota_3_sx_post.getMonth()+5);
                if(!isNaN(data_ruota_3_sx_post.getTime())){
                    data_ruota_3_sx_post = data_ruota_3_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_3_dx_post = new Date(d.data_ruota_3_dx);
                data_ruota_3_dx_post.setMonth(data_ruota_3_dx_post.getMonth()+5);
                if(!isNaN(data_ruota_3_dx_post.getTime())){
                    data_ruota_3_dx_post = data_ruota_3_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_4_sx_post = new Date(d.data_ruota_4_sx);
                data_ruota_4_sx_post.setMonth(data_ruota_4_sx_post.getMonth()+5);
                if(!isNaN(data_ruota_4_sx_post.getTime())){
                    data_ruota_4_sx_post = data_ruota_4_sx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_ruota_4_dx_post = new Date(d.data_ruota_4_dx);
                data_ruota_4_dx_post.setMonth(data_ruota_4_dx_post.getMonth()+20);
                if(!isNaN(data_ruota_4_dx_post.getTime())){
                    data_ruota_4_dx_post = data_ruota_4_dx_post.toISOString().split(/[T ]/i, 1)[0];
                }
                var data_revisione_post = new Date(d.data_revisione);
                data_revisione_post.setMonth(data_revisione_post.getMonth()+20);
                if(!isNaN(data_revisione_post.getTime())){
                    data_revisione_post = data_revisione_post.toISOString().split(/[T ]/i, 1)[0];
                }
                

            // `d` is the original data object for the row
            return '<table cellpadding="0" cellspacing="0" border="0" style="padding-left:50px; width: 90%; margin: auto;">' +
                '<tr>' +
                    '<td>Formato data:</td>' +
                    '<td colspan="3">YYYY-MM-DD</td>' +
                    '<td></td>' +
                    '<td style="color: red;">YYYY-MM-DD</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota sinistra (1° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_1_sx +  '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_1_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota destra (1° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_1_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_1_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota sinistra (2° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_2_sx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_2_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota destra (2° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_2_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_2_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota sinistra (3° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_3_sx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_3_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota destra (3° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_3_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_3_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota sinistra (4° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_4_sx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_4_sx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultimo cambio ruota destra (4° asse):</td>' +
                    '<td colspan="3">' + d.data_ruota_4_dx + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_ruota_4_dx_post +'</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Ultima revisione:</td>' +
                    '<td colspan="3">' + d.data_revisione + '</td>' +
                    '<td></td>' +
                    '<td style="color: red;">'+ data_revisione_post +'</td>' +
                '</tr>' +
            '</table>';  
            }

            var testdata = {
                "data": [
                    <?php
                    $trasportatoreID = $_SESSION['userID'];
                    $rimorchiostring= "Rimorchio";
                    $camionstring= "Camion";
                    $i=0;
                    $query_camion = $mysqli->query("SELECT * FROM camion, oli, filtri, revisione, ruote_camion WHERE camion.id_trasportatore = '$trasportatoreID' AND camion.ID = oli.id_camion AND camion.ID = filtri.id_camion AND camion.ID = ruote_camion.id_camion AND camion.ID = revisione.id_camion");
                    $query_rimorchio = $mysqli->query("SELECT * FROM rimorchio, revisione, ruote_rimorchio WHERE rimorchio.id_trasportatore='$trasportatoreID' AND rimorchio.ID = ruote_rimorchio.id_rimorchio AND rimorchio.ID = revisione.id_rimorchio");

                    if($query_camion->num_rows > 0){
                        while($row_camion=$query_camion->fetch_assoc()){
                            echo '
                            {
                                "tipoveicolo" : "'.$camionstring.'",
                                "nome" : "'.$row_camion['nome'].'",
                                "targa": "'.$row_camion['targa'].'",
                                "data_olio_cambio": "'.$row_camion['data_olio_cambio'].'",
                                "data_olio_motore": "'.$row_camion['data_olio_motore'].'",
                                "data_olio_differenziale": "'.$row_camion['data_olio_differenziale'].'",
                                "data_filtro_gasolio": "'.$row_camion['data_filtro_gasolio'].'",
                                "data_filtro_olio": "'.$row_camion['data_filtro_olio'].'",
                                "data_filtro_aria": "'.$row_camion['data_filtro_aria'].'",
                                "data_filtro_essiccatore": "'.$row_camion['data_filtro_essiccatore'].'",
                                "data_ruota_ant_sx": "'.$row_camion['data_ruota_ant_sx'].'",
                                "data_ruota_ant_dx": "'.$row_camion['data_ruota_ant_dx'].'",
                                "data_ruota_post_dx": "'.$row_camion['data_ruota_post_dx'].'",
                                "data_ruota_post_sx": "'.$row_camion['data_ruota_post_sx'].'",
                                "data_revisione": "'.$row_camion['data_effettuata'].'"
                            },';
                        }
                    }

                    if($query_rimorchio->num_rows > 0){
                        while($row_rimorchio=$query_rimorchio->fetch_assoc()){
                            echo '
                            {
                                "tipoveicolo" : "'.$rimorchiostring.'",
                                "nome" : "'.$row_rimorchio['nome'].'",
                                "targa": "'.$row_rimorchio['targa'].'",
                                "data_ruota_1_sx": "'.$row_rimorchio['data_ruota_1_sx'].'",
                                "data_ruota_1_dx": "'.$row_rimorchio['data_ruota_1_dx'].'",
                                "data_ruota_2_sx": "'.$row_rimorchio['data_ruota_2_sx'].'",
                                "data_ruota_2_dx": "'.$row_rimorchio['data_ruota_2_dx'].'",
                                "data_ruota_3_sx": "'.$row_rimorchio['data_ruota_3_sx'].'",
                                "data_ruota_3_dx": "'.$row_rimorchio['data_ruota_3_dx'].'",
                                "data_ruota_4_sx": "'.$row_rimorchio['data_ruota_4_sx'].'",
                                "data_ruota_4_dx": "'.$row_rimorchio['data_ruota_4_dx'].'",
                                "data_revisione": "'.$row_rimorchio['data_effettuata'].'"
                            },';
                        }
                    }
                    ?>               
                ]
            };
</script>
