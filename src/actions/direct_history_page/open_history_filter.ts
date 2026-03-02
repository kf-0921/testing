import { navigateToHistoryPage } from "./history_page";
import { ChecklistManager } from "../../utils/checklist";

export async function openHistoryFilterPopup(page: any, checklistManager: ChecklistManager) {
    await navigateToHistoryPage(page, checklistManager);
    try {
        await page.waitForSelector('button.css-fd640w', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('History Page', 'Selector not found: button.css-fd640w');
        return;
    }
    await page.click('button.css-fd640w');
    await new Promise(resolve => setTimeout(resolve, 500));

    const filterArea = await page.$('div.css-1xdhyk6[style*="position: absolute"]');
    if (filterArea) {
        console.log('Filter area found');
        checklistManager.logDirectMessage('History Page', `Selector found: ${filterArea}`);
        checklistManager.logDirectMessage('History Page', 'Successfully opened history filter popup');
    } else {
        checklistManager.logDirectMessage('History Page', `Selector not found: ${filterArea}`);
        checklistManager.logDirectMessage('History Page', 'Failed to open history filter popup');
    }
}