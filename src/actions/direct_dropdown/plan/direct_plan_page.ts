import { directPlanPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateToPlanPage(page: any, selector: string, linkName: string) {
    await directPlanPage(page);

    await page.waitForSelector(selector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(selector)
    ]);
    
    console.log('click completed!');
    console.log('current page:', page.url());
}

export async function directPofficesBasicOrder(page: any) {
    await navigateToPlanPage(
        page, 
        'div[data-id="65157c4"] a.elementor-button',
        'Poffices Basic Order'
    );
}

export async function directPofficesRegularOrder(page: any) {
    await navigateToPlanPage(
        page,
        'div[data-id="05f1227"] a.elementor-button',
        'Poffices Regular Order'
    );
}

export async function directPofficesProfessionalOrder(page: any) {
    await navigateToPlanPage(
        page,
        'div[data-id="2235d12"] a.elementor-button',
        'Poffices Professional Order'
    );
}

export async function directPofficesEnterpriseOrder(page: any) {
    await navigateToPlanPage(
        page,
        'div[data-id="5a7948d"] a.elementor-button',
        'Poffices Enterprise Order'
    );
}
