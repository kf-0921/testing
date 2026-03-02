import { ChecklistManager } from "../../../utils/checklist";
import { directPlanPage } from "../direct_dropdown";
import { getPageLanguageInfo } from "../../../checking/language/page_language";

// Helper function to navigate to account page and click a navigation link
async function navigateToPlanPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string | null = null) {
    await directPlanPage(page, checklistManager);

    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('Plan Page', `Selector not found: ${selector}`);
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(selector)
    ]);

    console.log('click completed!');
    console.log('current page:', page.url());

    if (validateElement === 'cart') {
        await validateInCart(page, checklistManager, linkName);
    } else if (validateElement) {
        const validateElementCheck = await page.$(validateElement);
        if (validateElementCheck) {
            checklistManager.logDirectMessage('Plan Page', `Selector found: ${validateElementCheck}`);
            checklistManager.logDirectMessage('Plan Page', `confirm redirect to ${linkName} page success!`);
            return validateElementCheck;
        } else {
            checklistManager.logDirectMessage('Plan Page', `Selector not found: ${validateElementCheck}`);
            checklistManager.logDirectMessage('Plan Page', `redirect to ${linkName} page failed!`);
        }
    } 
}

async function validateInCart(page: any, checklistManager: ChecklistManager, linkName: string) {
    console.log('validateInCart');
    console.log('url:', page.url());
    try {
        await page.waitForSelector('tr.cart_item .product-name', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('Plan Page', 'Selector not found: tr.cart_item .product-name');
        return;
    }
    const productName = await page.$eval('tr.cart_item .product-name',
        (el: any) => el.textContent?.replace(/×.*$/, '').trim().split(/\s+/)[0]
    );
    console.log('productName:', productName);
    if (productName === linkName) {
        checklistManager.logDirectMessage('Plan Page', `Selector found: ${productName}`);
        checklistManager.logDirectMessage('Plan Page', `confirm product name is ${productName} in cart!`);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
        return productName;
    } else {
        checklistManager.logDirectMessage('Plan Page', `Selector not found: ${productName}`);
        checklistManager.logDirectMessage('Plan Page', `redirect to ${linkName} page failed!`);
    }
}

// export async function directPofficesBasicOrder(page: any) {
//     await navigateToPlanPage(
//         page, 
//         'div[data-id="65157c4"] a.elementor-button',
//         'Poffices Basic Order'
//     );
// }

export async function directPofficesRegularOrder(page: any, checklistManager: ChecklistManager) {
    await navigateToPlanPage(
        page,
        checklistManager,
        'div[data-id="05f1227"] a.elementor-button',
        'Poffices Regular Order',
        'td.product-name a[href*="regular"]'
    );
}

export async function directPofficesProfessionalOrder(page: any, checklistManager: ChecklistManager) {
    await navigateToPlanPage(
        page,
        checklistManager,
        'div[data-id="2235d12"] a.elementor-button',
        'Professional',
        'cart'
    );
}

export async function directPofficesEnterpriseOrder(page: any, checklistManager: ChecklistManager) {
    await navigateToPlanPage(
        page,
        checklistManager,
        'div[data-id="5a7948d"] a.elementor-button',
        'Enterprise',
        'cart'
    );
}



export async function testDirectPlanPage(page: any, checklistManager: ChecklistManager) {
    //await directPofficesBasicOrder(page);
    await directPofficesRegularOrder(page, checklistManager);
    await directPofficesProfessionalOrder(page, checklistManager);
    await directPofficesEnterpriseOrder(page, checklistManager);
}