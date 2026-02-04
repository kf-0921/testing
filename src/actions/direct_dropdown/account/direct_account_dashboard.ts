import { directAccountPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateInAccountPage(page: any, selector: string, linkName: string) {
    await directAccountPage(page);

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

export async function directAccountDashboard(page: any) {
    await navigateInAccountPage(
        page,
        'li.woocommerce-MyAccount-navigation-link--dashboard',
        'Account dashboard'
    );
}

export async function directAccountOrders(page: any) {
    await navigateInAccountPage(
        page,
        'li.woocommerce-MyAccount-navigation-link--orders',
        'Account orders'
    );
}

export async function directAccountMySubscription(page: any) {
    await navigateInAccountPage(
        page,
        'li.woocommerce-MyAccount-navigation-link--subscriptions',
        'Account my subscription'
    );
}

export async function directAccountAddress(page: any) {
    await navigateInAccountPage(
        page,
        'li.woocommerce-MyAccount-navigation-link--edit-address',
        'Account address'
    );
}

export async function directAccountAccountDetails(page: any) {
    await navigateInAccountPage(
        page,
        'li.woocommerce-MyAccount-navigation-link--edit-account',
        'Account account details'
    );
}

export async function directAccountAddressEdit(page: any) {
    // First navigate to account address page
    await directAccountAddress(page);

    // Then click the address edit element
    const addressEditSelector = 'div.woocommerce-Address';
    await page.waitForSelector(addressEditSelector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Address edit element is visible!');
    console.log('click Address edit element...');

    await page.click(addressEditSelector);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Address edit element clicked!');
    console.log('current page:', page.url());
}
