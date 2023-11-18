# OWASP Top 10 CTF Challenge - Cross-Site Scripting (XSS) (Easy)
A reflected XSS challenge involving JS injection via URL.
The challenge consists of a birthday screen generation website.
The key here is to cause a window.alert by injecting JS into the URL.
This will send a request to the server, which will send the flag.
HINT: A bit of trolling should do.

## Flag Format
Flag will be sent as a window alert. It can be configured within the .env file.
Format: FLAG{flag_name}

# Set-up

## Manually

1. Run command `npm i`.
2. Create a .env file with the following configuration:
```
PORT=3000
COOKIE_KEY=SECRET
FLAG=NULL{C3rul3anSuns3t}
```
3. Start the server using `node index.js` or `nodemon index.js`