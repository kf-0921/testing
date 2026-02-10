import directToHomePage from "./home_page";
import { ChecklistManager } from "../utils/checklist";

// Helper function to navigate to digital assets page
export async function navigateToDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
    await page.waitForSelector('a.digital-assets-link', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Digital assets link element is visible!`);
    console.log(`click Digital assets link...`);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('a.digital-assets-link')
    ]);
    console.log('click Digital assets link completed!');
    console.log('current page is digital assets page:', page.url());
    await checkDigitalAssetsPage(page, checklistManager);
}

async function checkDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    const selector = 'div[data-elementor-id="52947"] div.filter-section';
    const digitalAssetsPageCheck = await page.$(selector);
    if (digitalAssetsPageCheck) {
        checklistManager.logDirectMessage('digital assets page', `Selector found: ${selector}`);
        checklistManager.logDirectMessage('digital assets page', 'Successfully navigated to digital assets page');
    } else {
        checklistManager.logDirectMessage('digital assets page', `Selector not found: ${selector}`);
        checklistManager.logDirectMessage('digital assets page', 'Failed to navigate to digital assets page');
    }
}

export async function testDigitalAssetsPage(page: any, checklistManager: ChecklistManager) {
    await navigateToDigitalAssetsPage(page, checklistManager);
}