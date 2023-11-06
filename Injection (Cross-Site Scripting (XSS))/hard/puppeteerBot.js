const puppeteer = require('puppeteer')
const dotenv = require('dotenv')
dotenv.config()

const usernameCookie = process.env.BOT_USERNAME
const passwordCookie = process.env.BOT_PASSWORD
const domain = `http://localhost:${process.env.PORT}`;

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setCookie({name: "username", value: usernameCookie, domain: domain})
    await page.setCookie({name: "password", value: passwordCookie, domain: domain})
    await page.goto(`${domain}/issues`)
    const xssPage = await browser.newPage()

    setInterval(async () => {
        await page.goto(`${domain}/issues`)
        const links = await page.$$('a')
        for (let link of links) {
            await xssPage.goto(await page.evaluate(link => link.href, link))
            await xssPage.close()
            await page.setCookie({name: "username", value: usernameCookie, domain: domain})
            await page.setCookie({name: "password", value: passwordCookie, domain: domain})
        }
    }, 60_000)
})()
