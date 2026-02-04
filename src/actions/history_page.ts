import directToHomePage from "./home_page";

// Helper function to navigate to history page
export async function navigateToHistoryPage(page: any) {
    await directToHomePage(page);
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
}