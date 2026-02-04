import { directAllInOneServerPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateToAllInOneServerProductPage(page: any, selector: string, linkName: string) {
    await directAllInOneServerPage(page);

    await page.waitForSelector(selector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);
    page.click(selector)
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('click completed!');
    console.log('current page:', page.url());
}

export async function directServerB1Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page, 
        'div[data-id="abe534c"] a.elementor-size-sm',
        'Server B1 Order'
    );
}

export async function directServerB2Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'div[data-id="00bc2ab"] a.elementor-size-sm',
        'Server B2 Order'
    );
}

export async function directServerB3Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'div[data-id="f84615e"] a.elementor-size-sm',
        'Server B3 Order'
    );
}

export async function directServerMaintenanceServiceTerms(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'div.infobox-content a[href*="maintenance"]',
        'Maintenance Service Terms'
    );
}
