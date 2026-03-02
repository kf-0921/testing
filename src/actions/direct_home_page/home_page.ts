import { ChecklistManager } from "../../utils/checklist";
import { getPageLanguageInfo } from "../../checking/language/page_language";

async function directToHomePage(page: any, checklistManager: ChecklistManager) {
    console.log('goto poffices.ai...');
    // const url = 'https://poffices.ai/';
    const url = 'https://poffices.ai/zh-hant/';
    await page.goto(url, {
        waitUntil: 'networkidle0'
    });

    const popupCloseFound = await page.$('button.credit-popup-close');

    if (popupCloseFound) {
        try {
            await page.waitForSelector('button.credit-popup-close', { timeout: 10000 });
        } catch {
            checklistManager.logDirectMessage('home page', 'Selector not found: button.credit-popup-close');
            return;
        }
        console.log('click credit popup close button...');
        await page.click('button.credit-popup-close');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('credit popup close button clicked!');
    }

    //close tour popup
    const tourpopup = await page.$('div#gen-tour-welcome[style="display: flex;"]');
    if (tourpopup) {
        try {
            await page.waitForSelector('button#gen-tour-welcome-skip', { timeout: 5000 });
        } catch {
            checklistManager.logDirectMessage('home page', 'Selector not found: button#gen-tour-welcome-skip');
            return;
        }
        console.log('close tour popup...');
        await page.click('button#gen-tour-welcome-skip');
        console.log('tour popup close button clicked!');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
    await checkHomePage(page, checklistManager);
    //check page language
    await getPageLanguageInfo(page, checklistManager);
}

async function checkHomePage(page: any, checklistManager: ChecklistManager) {
    const selector = 'rs-layer[id="slider-9-slide-26-layer-7"] div#content-container';
    const homePageCheck = await page.$(selector);

    if (homePageCheck) {
        // Log selector found first
        checklistManager.logDirectMessage('Home Page', `Selector found: ${selector}`);
        // Then log successful navigation
        checklistManager.logDirectMessage('Home Page', 'Successfully navigated to Home Page');
    } else {
        // Log selector not found first
        checklistManager.logDirectMessage('Home Page', `Selector not found: ${selector}`);
        // Then log failed navigation
        checklistManager.logDirectMessage('Home Page', 'Failed to navigate to Home Page');
    }
}

export default directToHomePage;


export async function testHomePage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
}