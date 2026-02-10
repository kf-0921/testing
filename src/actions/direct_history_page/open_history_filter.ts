import { navigateToHistoryPage } from "../history_page";

export async function openHistoryFilterPopup(page: any) {
   await navigateToHistoryPage(page);
    await page.waitForSelector('button.css-fd640w', { timeout: 10000 });
    await page.click('button.css-fd640w');
    await page.waitForSelector('div.css-1xdhyk6', { timeout: 5000 });
    await new Promise(resolve => setTimeout(resolve, 500));
}


