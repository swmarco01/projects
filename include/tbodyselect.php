<?php
                        $i=0;
                        $query_camion = $mysqli->query("SELECT camion.nome , camion.targa  FROM camion, trasportatore WHERE camion.id_trasportatore=trasportatore.ID ");
                        $query_rimorchio = $mysqli->query("SELECT rimorchio.nome, rimorchio.targa FROM rimorchio, trasportatore WHERE rimorchio.id_trasportatore=trasportatore.ID ");
                        if($query_camion->num_rows > 0){
                            while($row_camion=$query_camion->fetch_assoc() )
                            echo "<tr>
                                    <td><span class='glyphicon glyphicon-plus-sign plus-glyph'></span></td>
                                    <td>Camion</td>
                                    <td>".$row_camion['nome']."</td>
                                    <td>".$row_camion['targa']."</td>
                                    </tr>
                            ";
                        }

                        if($query_rimorchio->num_rows > 0){
                            while($row_rimorchio=$query_rimorchio->fetch_assoc() )
                            echo "<tr>
                                    <td><span class='glyphicon glyphicon-plus-sign plus-glyph'></span></td>
                                    <td>Rimorchio</td>
                                    <td>".$row_rimorchio['nome']."</td>
                                    <td>".$row_rimorchio['targa']."</td>
                                    </tr>
                            ";
                        }
                        
?>