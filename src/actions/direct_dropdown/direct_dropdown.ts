import directToHomePage from "../home_page";
import { ChecklistManager } from "../../utils/checklist";

// Helper function to click user dropdown and navigate to a link
async function navigateViaDropdown(page: any, checklistManager: ChecklistManager, linkSelector: string, linkName: string, validateElement: string) {
    await directToHomePage(page, checklistManager);

    await page.waitForSelector('div.nav-user-dropdown', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('click User dropdown...');

    page.click('div.nav-user-dropdown');
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`click ${linkName} link...`);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(linkSelector)
    ]);
    console.log('click completed!');

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('current page:', page.url());

    const validateElementCheck = await page.$(validateElement);
    if (validateElementCheck) {
        checklistManager.logDirectMessage(`${linkName}`, `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage(`${linkName}`, `confirm redirect to ${linkName} page success!`);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage(`${linkName}`, `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage(`${linkName}`, `redirect to ${linkName} page failed!`);
    }
}

export const directAccountPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-account', 'Account', 'li.woocommerce-MyAccount-navigation-link--dashboard.is-active');

export const directAllInOneServerPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-server', 'All-in-One Server', 'div[data-id="58594e8"] h2.elementor-heading-title');

export const directBlogPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-blog', 'Blog', 'div[data-id="8848ff3"] div.elth-dropdown-box');

export const directEnterprisePage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-enterprise', 'Enterprise', 'div.elementor-element-15058ed div.css-1rd7swq');

export const directFAQPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-faq', 'FAQ', 'div[data-elementor-id="13337"] div[data-id="15d6ea0"]  div[data-id="2ed5bdb"]');

export const directNewsPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-news', 'News', 'div[data-id="1432875"] div.news-categories');

export const directPaymentPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-payment', 'Payment', 'li.woocommerce-MyAccount-navigation-link--orders.is-active');

export const directPlanPage = (page: any, checklistManager: ChecklistManager) =>
    navigateViaDropdown(page, checklistManager, 'a#nav-dropdown-plan', 'Plan Page', 'div[data-elementor-id="7223"] div[data-id="c20f368"] div[data-id="a145af9"]');


export async function testDirectDropdown(page: any, checklistManager: ChecklistManager) {
    await directAccountPage(page, checklistManager);
    await directAllInOneServerPage(page, checklistManager);
    await directBlogPage(page, checklistManager);
    await directEnterprisePage(page, checklistManager);
    await directFAQPage(page, checklistManager);
    await directNewsPage(page, checklistManager);
    await directPaymentPage(page, checklistManager);
    await directPlanPage(page, checklistManager);
}