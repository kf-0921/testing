import { ChecklistManager } from "../../../utils/checklist";
import { directAllInOneServerPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateToAllInOneServerProductPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string) {
    await directAllInOneServerPage(page, checklistManager);

    await page.waitForSelector(selector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);
    page.click(selector)
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('click completed!');
    console.log('current page:', page.url());

    //validate if redirected to the correct page
    const validateElementCheck = await page.$(validateElement);
    if (validateElementCheck) {
        checklistManager.logDirectMessage('direct product page', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct product page', `confirm redirect to ${linkName} page success!`);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('direct product page', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct product page', `redirect to ${linkName} page failed!`);
        throw new Error(`redirect to ${linkName} page failed!`);
    }
}

export async function directServerB1Order(page: any, checklistManager: ChecklistManager) {
    await navigateToAllInOneServerProductPage(
        page, 
        checklistManager,
        'div[data-id="abe534c"] a.elementor-size-sm',
        'Server B1 Order',
        'td.product-name a[href*="b1"]'
    );
}

export async function directServerB2Order(page: any, checklistManager: ChecklistManager) {
    await navigateToAllInOneServerProductPage(
        page,
        checklistManager,
        'div[data-id="00bc2ab"] a.elementor-size-sm',
        'Server B2 Order',
        'td.product-name a[href*="b2"]'
    );
}

export async function directServerB3Order(page: any, checklistManager: ChecklistManager) {
    await navigateToAllInOneServerProductPage(
        page,
        checklistManager,
        'div[data-id="f84615e"] a.elementor-size-sm',
        'Server B3 Order',
        'td.product-name a[href*="b3"]'
    );
}

export async function directServerMaintenanceServiceTerms(page: any, checklistManager: ChecklistManager) {
    await navigateToAllInOneServerProductPage(
        page,
        checklistManager,
        'div.infobox-content a[href*="maintenance"]',
        'Maintenance Service Terms',
        'div[data-id="b622036"]'
    );
}



export async function testDirectProductPage(page: any, checklistManager: ChecklistManager) {
    await directServerB1Order(page, checklistManager);
    await directServerB2Order(page, checklistManager);
    await directServerB3Order(page, checklistManager);
    await directServerMaintenanceServiceTerms(page, checklistManager);
}