const puppeteer = require('puppeteer');
const config = require('./config.json');


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://app.directly.com/dashboard/index');

    // login
    await page.type('#j_username', config.login.email)
    await page.type('#j_password', config.login.password)
    await page.click('div.control-group button');
    await page.waitForNavigation();
    await page.screenshot({path: 'example.png'});


    await browser.close();
  })();
