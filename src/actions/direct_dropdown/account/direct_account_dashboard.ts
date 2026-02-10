import { directAccountPage } from "../direct_dropdown";
import { ChecklistManager } from "../../../utils/checklist";

// Helper function to navigate to account page and click a navigation link
async function navigateInAccountPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string) {
    await directAccountPage(page, checklistManager);

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

    //validate if redirected to the correct page
    const validateElementCheck = await page.$(validateElement);
    if (validateElementCheck) {
        checklistManager.logDirectMessage('direct account dashboard', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct account dashboard', `confirm redirect to ${linkName} page success!`);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('direct account dashboard', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct account dashboard', `redirect to ${linkName} page failed!`);
    }
}

export async function directAccountDashboard(page: any, checklistManager: ChecklistManager) {
    await navigateInAccountPage(
        page,
        checklistManager,
        'li.woocommerce-MyAccount-navigation-link--dashboard',
        'Account dashboard',
        'li.woocommerce-MyAccount-navigation-link--dashboard.is-active'
    );
}

export async function directAccountOrders(page: any, checklistManager: ChecklistManager) {
    await navigateInAccountPage(
        page,
        checklistManager,
        'li.woocommerce-MyAccount-navigation-link--orders',
        'Account orders',
        'li.woocommerce-MyAccount-navigation-link--orders.is-active'
    );
}

export async function directAccountMySubscription(page: any, checklistManager: ChecklistManager) {
    await navigateInAccountPage(
        page,
        checklistManager,
        'li.woocommerce-MyAccount-navigation-link--subscriptions',
        'Account my subscription',
        'li.woocommerce-MyAccount-navigation-link--subscriptions.is-active'
    );
}

export async function directAccountAddress(page: any, checklistManager: ChecklistManager) {
    await navigateInAccountPage(
        page,
        checklistManager,
        'li.woocommerce-MyAccount-navigation-link--edit-address',
        'Account address',
        'li.woocommerce-MyAccount-navigation-link--edit-address.is-active'
    );
}

export async function directAccountAccountDetails(page: any, checklistManager: ChecklistManager) {
    await navigateInAccountPage(
        page,
        checklistManager,
        'li.woocommerce-MyAccount-navigation-link--edit-account',
        'Account account details',
        'li.woocommerce-MyAccount-navigation-link--edit-account.is-active'
    );
}


export async function directAccountAddressEdit(page: any, checklistManager: ChecklistManager) {
    // First navigate to account address page
    await directAccountAddress(page, checklistManager);

    // Then click the address edit element
    const addressEditSelector = 'div.woocommerce-Address a';
    await page.waitForSelector(addressEditSelector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Address edit element is visible!');
    console.log('click Address edit element...');

    await page.click(addressEditSelector);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Address edit element clicked!');
    console.log('current page:', page.url());

    //validate if redirected to the correct page
    const validateElementCheck = await page.$('input[id="update_all_subscriptions_addresses"]');
    if (validateElementCheck) {
        checklistManager.logDirectMessage('direct account address edit', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct account address edit', `confirm redirect to Account address edit page success!`);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('direct account address edit', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct account address edit', `redirect to Account address edit page failed!`);
    }
}


export async function testDirectAccountDashboard(page: any, checklistManager: ChecklistManager) {
    await directAccountDashboard(page, checklistManager);
    await directAccountOrders(page, checklistManager);
    await directAccountMySubscription(page, checklistManager);
    await directAccountAddress(page, checklistManager);
    await directAccountAccountDetails(page, checklistManager);
    await directAccountAddressEdit(page, checklistManager);
}