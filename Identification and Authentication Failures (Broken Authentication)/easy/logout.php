<?php
session_start();

// Destroy the session and redirect to the login page
session_destroy();
header("Location: login.php");
exit;
?>
