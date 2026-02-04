async function directToHomePage(page: any) {
    console.log('goto poffices.ai...');
    await page.goto('https://poffices.ai/', {
        waitUntil: 'networkidle0'
    });

    const popupCloseFound = await page.$('button.credit-popup-close');

    if (popupCloseFound) {
        console.log('click credit popup close button...');
        await page.click('button.credit-popup-close');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('credit popup close button clicked!');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
}

export default directToHomePage;
