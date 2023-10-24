# OWASP Top 10 CTF Challenge - Cross-Site Scripting (XSS) (Easy)
Description of the easy challenge goes here.

## Flag Format
Flag format for easy challenge.

# Set-up

## Manually

1. Run command `npm i`.
2. Create a .env file with the following configuration:
```
COOKIE_KEY=secret
PORT=3000
BOT_USERNAME=hi
BOT_PASSWORD=123
FLAG=Yougotit
BOT_AUTH=1234567890
DB_URI=mongodb://localhost:27017
```
3. Start the MongoDB connection.
4. Start the server using `node index.js` or `nodemon index.js`
5. Start the bot using `node puppeteerBot.js`