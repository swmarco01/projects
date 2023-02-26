<?php
    session_start();
    unset($_SESSION['loggedIN']);
    session_destroy();
?>
<script>
    window.location.href = '../index.php';
</script>