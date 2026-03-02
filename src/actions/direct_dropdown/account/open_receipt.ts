import { ChecklistManager } from "../../../utils/checklist";

export async function openReceipt(page: any, checklistManager: ChecklistManager) {
    try {
        await page.waitForSelector('td:nth-child(5) a', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('open receipt', 'Selector not found: td:nth-child(5) a');
        return;
    }
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('td:nth-child(5) a')
    ]);
    await new Promise(resolve => setTimeout(resolve, 3000));
}

