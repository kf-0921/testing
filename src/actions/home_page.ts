import { ChecklistManager } from "../utils/checklist";

async function directToHomePage(page: any, checklistManager: ChecklistManager) {
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
    await checkHomePage(page, checklistManager);
}

async function checkHomePage(page: any, checklistManager: ChecklistManager) {
    const selector = 'rs-layer[id="slider-9-slide-26-layer-7"] div#content-container';
    const homePageCheck = await page.$(selector);

    if (homePageCheck) {
        // Log selector found first
        checklistManager.logDirectMessage('home page', `Selector found: ${selector}`);
        // Then log successful navigation
        checklistManager.logDirectMessage('home page', 'Successfully navigated to home page');
    } else {
        // Log selector not found first
        checklistManager.logDirectMessage('home page', `Selector not found: ${selector}`);
        // Then log failed navigation
        checklistManager.logDirectMessage('home page', 'Failed to navigate to home page');
    }
}

export default directToHomePage;


export async function testHomePage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
}