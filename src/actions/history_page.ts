import { ChecklistManager } from "../utils/checklist";
import directToHomePage from "./home_page";

// Helper function to navigate to history page
export async function navigateToHistoryPage(page: any, checklistManager: ChecklistManager) {
    await directToHomePage(page, checklistManager);
    await page.waitForSelector('a.history-link', { timeout: 10000 });
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
}


async function checkHistoryPage(page: any, checklistManager: ChecklistManager) {
    const selector = 'div.css-lluksu div.desktopTable';
    const historyPageCheck = await page.$(selector);
    if (historyPageCheck) {
        // Log selector found first
        checklistManager.logDirectMessage('history page', `Selector found: ${selector}`);
        // Then log successful navigation
        checklistManager.logDirectMessage('history page', 'Successfully navigated to history page');
    } else {
        // Log selector not found first
        checklistManager.logDirectMessage('history page', `Selector not found: ${selector}`);
        // Then log failed navigation
        checklistManager.logDirectMessage('history page', 'Failed to navigate to history page');
    }
}

export async function testHistoryPage(page: any, checklistManager: ChecklistManager) {
    await navigateToHistoryPage(page, checklistManager);
}