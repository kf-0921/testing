import { navigateToHistoryPage } from "./history_page";
import { ChecklistManager } from "../../utils/checklist";

export async function openHistoryCombinePopup(page: any, checklistManager: ChecklistManager): Promise<boolean> {
    await navigateToHistoryPage(page, checklistManager);
    await page.waitForSelector('span.css-1qotdj5 input.css-j8yymo', { timeout: 3000 }).catch(() => null);

    const checkboxes = await page.$$('span.css-1qotdj5 input.css-j8yymo');

    if (checkboxes.length === 0) {
        console.log('No combine checkbox found');
        return false; 
    }

    const toClickCount = Math.min(3, checkboxes.length);
    console.log(`Found ${checkboxes.length} combine checkboxes, will click ${toClickCount}`);

    for (let i = 0; i < toClickCount; i++) {
        await checkboxes[i].click();            
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        await page.waitForSelector('button.css-1uuido1', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('History Page', 'Selector not found: button.css-1uuido1');
        return false;
    }
    await page.click('button.css-1uuido1');

    const combineArea = await page.$('div.css-1n5khr6 div[style*="position: relative"]');
    if (combineArea) {
        console.log('Combine area found');
        checklistManager.logDirectMessage('History Page', `Selector found: ${combineArea}`);
        checklistManager.logDirectMessage('History Page', 'Successfully opened history combine popup');
        return true;
    } else {
        checklistManager.logDirectMessage('History Page', `Selector not found: ${combineArea}`);
        checklistManager.logDirectMessage('History Page', 'Failed to open history combine popup');
        return false;
    }
}