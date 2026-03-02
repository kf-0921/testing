import { getPageLanguageInfo } from "../../checking/language/page_language";
import { ChecklistManager } from "../../utils/checklist";
import directToHomePage from "../direct_home_page/home_page";

// Helper function to navigate to history page
export async function navigateToHistoryPage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
    try {
        await page.waitForSelector('a.history-link', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('History Page', 'Selector not found: a.history-link');
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`History link element is visible!`);
    console.log(`click History link...`);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('a.history-link')
    ]);
    console.log('click History link completed!');
    console.log('current page is history page:', page.url());
    await checkHistoryPage(page, checklistManager);
    //check page language
    await getPageLanguageInfo(page, checklistManager);
}


async function checkHistoryPage(page: any, checklistManager: ChecklistManager) {
    const selector = 'div.css-lluksu div.desktopTable';
    const historyPageCheck = await page.$(selector);
    if (historyPageCheck) {
        // Log selector found first
        checklistManager.logDirectMessage('History Page', `Selector found: ${selector}`);
        // Then log successful navigation
        checklistManager.logDirectMessage('History Page', 'Successfully navigated to History Page');
    } else {
        // Log selector not found first
        checklistManager.logDirectMessage('History Page', `Selector not found: ${selector}`);
        // Then log failed navigation
        checklistManager.logDirectMessage('History Page', 'Failed to navigate to History Page');
    }
}

export async function testHistoryPage(page: any, checklistManager: ChecklistManager) {
    await navigateToHistoryPage(page, checklistManager);
}