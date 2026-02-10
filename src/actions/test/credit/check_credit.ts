import { ChecklistManager } from "../../../utils/checklist";
import { getUrlIfLink, getTextIfExists } from "../../../utils/selectorContent";
import directToHomePage from "../../../actions/home_page";



export async function checkCredit(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page);
    await page.waitForSelector('div.nav-user-dropdown', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('click User dropdown...');

    page.click('div.nav-user-dropdown');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const creditElementFound = await checklistManager.checkElement(page, 'span.nav-quota-number');
    const creditElementText = await getTextIfExists(page, 'span.nav-quota-number', creditElementFound);
   
    return creditElementText;
}

export async function creditCount(startCredit: string, endCredit: string, checklistManager: ChecklistManager) {
    console.log('startCredit:', startCredit);
    console.log('endCredit:', endCredit);

    // Remove commas and convert to number
    const startCreditNum = parseInt(startCredit?.replace(/,/g, '') || '0', 10);
    const endCreditNum = parseInt(endCredit?.replace(/,/g, '') || '0', 10);
    const creditCount = startCreditNum - endCreditNum;

    console.log(`Credit count: ${creditCount}`);

    checklistManager.addItemToFile('credit usage', {
        name: 'start credit',
        found: true,
        text: startCredit || '0',
        url: ''
    });

    checklistManager.addItemToFile('credit usage', {
        name: 'end credit',
        found: true,
        text: endCredit || '0',
        url: ''
    });

    checklistManager.addItemToFile('credit usage', {
        name: 'used credit',
        found: true,
        text: creditCount.toString(),
        url: ''
    });

   


    return creditCount;
}