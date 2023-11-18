<!DOCTYPE html>
<html>
<head>
    <title>Security Logging and Monitoring Failures Logs</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        h1{
    text-align: center;
    margin-top: 100px ;
}

ol{
    text-align: center;
    line-height: 50px;
}


table {
    margin: 0 auto; /* Center the table */
    border-collapse: collapse;
    width: 80%; /* Adjust the width as needed */
    align-content: center;
}

 th, td {
    border: 1px solid black;
    text-align: left;
}

th, td {
    padding: 8px;
}

table, th, td {
    border: none; /* Remove table borders */
}

.center-button{
    text-align: center;

}
.form-container input,
.form-container button {
    margin: 0 auto;
    display: block;
}
</style>
</head>
<body>
    <h1>Security Logging and Monitoring Failures Challenge</h1>
    <table>
        <tr>
            <th>Status</th>
            <th>IP Address</th>
            <th>User</th>
            <th>Date/Time</th>
            <th>Endpoint</th>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>16.54.21.88</td>
            <td>azkab</td>
            <td>2023-10-18T09:21:17</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>24.56.23.11</td>
            <td>voldemort</td>
            <td>2023-10-18T10:19:22</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>18.34.10.38</td>
            <td>hary</td>
            <td>2023-10-18T11:11:44</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>95.18.43.20</td>
            <td>eric</td>
            <td>2023-10-18T11:55:51</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>57.34.22.10</td>
            <td>Ron</td>
            <td>2023-10-18T13:08:59</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>200 OK</td>
            <td>24.55.11.14</td>
            <td>Albus</td>
            <td>2023-10-21T16:08:15</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>401 Unauthorised</td>
            <td>50.96.12.14</td>
            <td>admin</td>
            <td>2023-10-21T21:08:15</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>401 Unauthorised</td>
            <td>50.96.12.14</td>
            <td>administrator</td>
            <td>2023-10-21T21:08:20</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>401 Unauthorised</td>
            <td>50.96.12.14</td>
            <td>anonymous</td>
            <td>2023-10-21T21:08:25</td>
            <td>/login</td>
        </tr>
        <tr>
            <td>401 Unauthorised</td>
            <td>50.96.12.14</td>
            <td>root</td>
            <td>2023-10-21T21:08:30</td>
            <td>/login</td>
        </tr>
    </table>

    <h1>Find Attack Performed?</h1>
    <div class="center-button">
        <input type="text" id="keyInput" placeholder="Attack Performed?">
        <button id="checkButton">Find Attack</button>
    </div>
    <script>
        document.getElementById('checkButton').addEventListener('click', function() {
            // Get the value entered by the user
            var userKey = document.getElementById('keyInput').value;

            // Define the correct key
            var correctKey = "Brute Force";

            // Check if the entered key matches the correct key
            if (userKey === correctKey) {
                // If the keys match, display an alert with the message
                alert("NULL{L@K&E#}");
            } else {
                // If the keys do not match, display an error message
                alert("Answer is incorrect. Please try again.");
            }
        });

        document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        });

    </script>
</body>
</html>
