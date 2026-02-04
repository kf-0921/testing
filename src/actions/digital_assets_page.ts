import directToHomePage from "./home_page";

// Helper function to navigate to digital assets page
export async function navigateToDigitalAssetsPage(page: any) {
    await directToHomePage(page);
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
}