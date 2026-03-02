import { ChecklistManager } from "../../../utils/checklist";

export async function openNews(page: any, checklistManager: ChecklistManager): Promise<boolean> {
    try {
        await page.waitForSelector('.news-item', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('open news', 'Selector not found: .news-item');
        return false;
    }
    const newsItems = await page.$$('.news-item');
    if (newsItems.length === 0) {
        checklistManager.logDirectMessage('open news', 'No news items found');
        return false;
    } else {
        try {
            await page.waitForSelector('.news-item:nth-child(1)', { timeout: 1000 });
        } catch {
            checklistManager.logDirectMessage('open news', 'Selector not found: .news-item:nth-child(1)');
            return false;
        }
        await page.click('.news-item:nth-child(1)');
        return true;
    }

}

