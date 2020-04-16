const puppeteer = require('puppeteer');
const config = require('./config.json');

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    )
}


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://app.directly.com/dashboard/index');

    // login
    await page.type('#j_username', config.login.email)
    await page.type('#j_password', config.login.password)
    await page.click('div.control-group button');
    await page.waitForNavigation();

    // ==  click yes/no

    // contient yes/endorse button ? 

    var Found = false;

    while (true) {
        try {
            await page.waitForSelector('div.VotingButtons')
            console.log('found');

            await page.waitFor(between(4000, 10000));
          //  await delay(1000);
            await page.click('button.VotingButton.VotingButton--upvote.btn-white');
          //  await delay(2000);
            console.log('vote clicked');

            await page.waitFor(2000);
            console.log('to next task ');
            
            var element = await page.$('a.task-skip-submit.js-next-question');
            await element.click();
            

            await page.screenshot({ path: 'example.png' });
            Found = true;

        } catch {
            Found = false;
            var element = await page.$('a.task-skip-submit.js-next-question');
            await element.click();
            console.log('not found');
        }
    }

    await browser.close();
})();


