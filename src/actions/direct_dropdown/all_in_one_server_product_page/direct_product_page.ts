import { ChecklistManager } from "../../../utils/checklist";
import { directAllInOneServerPage } from "../direct_dropdown";
import { getPageLanguageInfo } from "../../../checking/language/page_language";

// Helper function to navigate to account page and click a navigation link
async function navigateToAllInOneServerProductPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string) {
    await directAllInOneServerPage(page, checklistManager);

    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('All-in-One Server Page', `Selector not found: ${selector}`);
        return;
    }
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
        checklistManager.logDirectMessage('All-in-One Server Page', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('All-in-One Server Page', `confirm redirect to ${linkName} page success!`);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('All-in-One Server Page', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('All-in-One Server Page', `redirect to ${linkName} page failed!`);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
        return;
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