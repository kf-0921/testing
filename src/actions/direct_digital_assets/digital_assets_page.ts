import directToHomePage from "../direct_home_page/home_page";
import { ChecklistManager } from "../../utils/checklist";
import { getPageLanguageInfo } from "../../checking/language/page_language";

// Helper function to navigate to digital assets page
export async function navigateToDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
    try {
        await page.waitForSelector('a.digital-assets-link', { timeout: 5000 });
    } catch {
        checklistManager.logDirectMessage('Digital Assets Page', 'Selector not found: a.digital-assets-link');
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Digital assets link element is visible!`);
    console.log(`click Digital assets link...`);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('a.digital-assets-link')
    ]);
    console.log('click Digital assets link completed!');
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        await page.waitForSelector('button.css-9d2fh9', { timeout: 5000 });
    } catch {
        checklistManager.logDirectMessage('Digital Assets Page', 'Selector not found: button.css-9d2fh9');
        return;
    }
    await page.click('button.css-9d2fh9');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('current page is digital assets page:', page.url());
    //check digital assets page
    await checkDigitalAssetsPage(page, checklistManager);
    //check page language
    await getPageLanguageInfo(page, checklistManager);
}

async function checkDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    const selector = 'div[data-elementor-id="52947"] div.filter-section';
    const digitalAssetsPageCheck = await page.$(selector);
    if (digitalAssetsPageCheck) {
        checklistManager.logDirectMessage('Digital Assets Page', `Selector found: ${selector}`);
        checklistManager.logDirectMessage('Digital Assets Page', 'Successfully navigated to Digital Assets Page');
    } else {
        checklistManager.logDirectMessage('Digital Assets Page', `Selector not found: ${selector}`);
        checklistManager.logDirectMessage('Digital Assets Page', 'Failed to navigate to Digital Assets Page');
    }
}

export async function testDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    await navigateToDigitalAssetsPage(page, checklistManager);
}