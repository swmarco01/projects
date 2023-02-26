<?php
  session_start();
  if(isset($_POST['login'])){
    include 'include/connessione.php';

    $email = $_POST['emailPHP'];
    //$password = $_POST['passwordPHP'];
    $hashed_password = (md5($_POST['passwordPHP']));

    $query = $mysqli->query("SELECT * FROM trasportatore WHERE email = '$email' AND passwd = '$hashed_password' ");
    $row = $query->fetch_array(MYSQLI_ASSOC);
    if($row['passwd'] == $hashed_password && $row['email'] == $email ){
      
      $_SESSION['loggedIN'] = 1;
      $_SESSION['ragione_sociale'] = $row['ragione_sociale'];
      $_SESSION['userID'] = $row['ID'];
      $_SESSION['webapp'] = $row['webapp'];
      exit("success");
    }else
      exit("failed");
  }
?>
      
      <?php
        //header
        include 'include/header.php';
        //accesso
        include 'include/accesso.php';
        //main
        include 'include/main.php';
        //firebase
        //include 'include/firebasesdk.php';
        //footer
        include 'include/footer.php';
      ?>