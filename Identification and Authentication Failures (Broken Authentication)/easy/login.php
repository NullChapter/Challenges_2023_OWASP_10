<?php
session_start();

// Check if the user is already logged in, redirect to the appropriate page
if (isset($_SESSION['username'])) {
    if ($_SESSION['username'] === 'user1') {
        header("Location: welcome.php");
    } elseif ($_SESSION['username'] === 'admin') {
        header("Location: admin.php");
    }
    exit;
}

$valid_users = array(
    'user1' => 'nullctf',
    'user2' => 'h4cker777',
    'user3' => 'h4cker999',
    'user4' => 'h4cker000'
);


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the submitted username exists and, if it's "user2," allow access without a password
    if (isset($valid_users[$username])) {
        if ($username === 'user3') {
            // For user3, redirect to the flag page
            $_SESSION['username'] = 'user3';
            header("Location: secrets.php");
            exit;
        } elseif ($valid_users[$username] === $password) {
            // Set the session username for user1
            $_SESSION['username'] = $username;
            header("Location: welcome.php");
            exit;
        }
    } else {
        $error_message = "Invalid username or password. Please try again.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Login Page</title>
    <style>
        body {
            background-color: #000;
            color: #0F0;
            font-family: 'Courier New', monospace;
            text-align: center;
            padding: 50px;
        }
        h2 {
            color: #0F0;
        }
        p {
            margin: 10px;
        }
        label {
            color: #0F0;
        }
        input[type="text"],
        input[type="password"] {
            background-color: #000;
            color: #0F0;
            border: 1px solid #0F0;
            padding: 5px;
            border-radius: 5px;
            margin: 5px;
        }
        input[type="submit"] {
            background-color: #0F0;
            color: #000;
            border: 1px solid #0F0;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 10px;
            cursor: pointer;
        }
        input[type="submit"]:hover {
            background-color: #000;
            color: #0F0;
        }
    </style>
</head>
<body>
    <h2>Welcome to the Hacker Login</h2>
    <?php if (isset($error_message)) { ?>
        <p><?php echo $error_message; ?></p>
    <?php } ?>
    <form method="POST" action="login.php">
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required><br>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required><br>
        <input type="submit" value="Login">
    </form>
</body>
</html>

