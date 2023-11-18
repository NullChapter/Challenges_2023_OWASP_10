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
        alert("IP is incorrect. Please try again.");
    }
});

document.addEventListener('contextmenu', function(e) {
e.preventDefault();
});