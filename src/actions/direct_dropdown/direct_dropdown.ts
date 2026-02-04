import directToHomePage from "../home_page";

// Helper function to click user dropdown and navigate to a link
async function navigateViaDropdown(page: any, linkSelector: string, linkName: string) {
    await directToHomePage(page);

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
}

export const directAccountPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-account', 'Account');

export const directAllInOneServerPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-server', 'All-in-One Server');

export const directBlogPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-blog', 'Blog');

export const directEnterprisePage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-enterprise', 'Enterprise');

export const directFAQPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-faq', 'FAQ');

export const directNewsPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-news', 'News');

export const directPaymentPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-payment', 'Payment');

export const directPlanPage = (page: any) =>
    navigateViaDropdown(page, 'a#nav-dropdown-plan', 'Plan');