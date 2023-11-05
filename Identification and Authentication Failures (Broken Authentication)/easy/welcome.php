<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username']) || $_SESSION['username'] !== 'user1') {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html> <!--do you know idor ?--> 
<html>
<head>
    <title>Welcome Page</title>
    <style>
        body {
            background-color: #000;
            color: #0F0;
            font-family: 'Courier New', monospace;
            text-align: center;
        }
        h2 {
            color: #0F0;
        }
        p {
            margin: 10px;
        }
        a {
            color: #0F0;
            text-decoration: none;
            border: 1px solid #0F0;
            padding: 5px 10px;
            border-radius: 5px;
        }
        a:hover {
            background-color: #0F0;
            color: #000;
        }
    </style>
</head>
<body>
    <h2>Welcome, users!</h2>
    <p>This is the welcome page for users. <strong>TRY TO GET ADMIN PAGE</strong></p>
    <a href="logout.php">Logout</a>
</body>
</html>

