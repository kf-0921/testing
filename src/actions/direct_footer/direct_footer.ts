import directToHomePage from "../home_page";

// Helper function to navigate to home page and click a footer link
async function navigateToFooterLink(page: any, linkSelector: string, linkName: string) {
    await directToHomePage(page);
    await page.waitForSelector(linkSelector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(linkSelector)
    ]);
    console.log('click completed!');
    console.log('current page:', page.url());
}

export const directFooterAboutUs = (page: any) =>
    navigateToFooterLink(page, 'div[data-id="0b1e644"] a[href="/aboutus"]', 'About us');

export const directFooterContactUs = (page: any) =>
    navigateToFooterLink(page, 'div[data-id="0b1e644"] a[href="/contact-us"]', 'Contact us');

export const directFooterPrivacyPolicy = (page: any) =>
    navigateToFooterLink(page, 'div[data-id="05bb367"] a[href="/privacypolicy"]', 'Privacy policy');

export const directFooterTermsAndConditions = (page: any) =>
    navigateToFooterLink(page, 'div[data-id="05bb367"] a[href="/terms-and-conditions"]', 'Terms and conditions');