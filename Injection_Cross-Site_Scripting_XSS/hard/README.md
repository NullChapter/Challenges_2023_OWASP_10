# OWASP Top 10 CTF Challenge - Injection (Cross-Site Scripting (XSS)) (Hard)
A stored XSS challenge involving JS injection.
The challenge consists of a customer support website.
Users can send support tickets, which will be read by a bot.
The key is to inject a script that will read and send out the cookies of the bot.
The credentials from the cookies can be used to access the admin page, revealing the flag.
HINT: All data must be cooked.

## Flag Format
Flag will be in the admin page. It can be configured within the .env file.
Format: FLAG{flag_name}

# Set-up

## Manually

1. Run command `npm i`.
2. Create a .env file with the following configuration:
```
COOKIE_KEY=secret
PORT=3000
BOT_USERNAME=hi
BOT_PASSWORD=123
FLAG=NULL{R0ogue3lephan1}
BOT_AUTH=1234567890
DB_URI=mongodb://localhost:27017
```
3. Start the MongoDB connection.
4. Start the server using `node index.js` or `nodemon index.js`
5. Start the bot using `node puppeteerBot.js`