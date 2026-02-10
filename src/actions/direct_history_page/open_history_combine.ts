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

    await page.waitForSelector('button.css-1uuido1', { timeout: 10000 });
    await page.click('button.css-1uuido1');

    return true; 
}