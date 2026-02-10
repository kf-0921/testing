import { ChecklistManager } from "../../utils/checklist";
import directToHomePage from "../home_page";

// Helper function to navigate to home page and click a footer link
async function navigateToFooterLink(page: any, checklistManager: ChecklistManager, linkSelector: string, linkName: string, validateElement: string) {
    await directToHomePage(page, checklistManager);
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

    //validate if redirected to the correct page
    const validateElementCheck = await page.$(validateElement);
    if (validateElementCheck) {
        checklistManager.logDirectMessage('direct footer', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct footer', `confirm redirect to ${linkName} page success!`);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('direct footer', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('direct footer', `redirect to ${linkName} page failed!`);
        throw new Error(`redirect to ${linkName} page failed!`);
    }
}

export const directFooterAboutUs = (page: any, checklistManager: ChecklistManager) =>
    navigateToFooterLink(page, checklistManager, 'div[data-id="0b1e644"] a[href="/aboutus"]', 'About us', 'div[data-id="2a2da9b"]');

export const directFooterContactUs = (page: any, checklistManager: ChecklistManager) =>
    navigateToFooterLink(page, checklistManager, 'div[data-id="0b1e644"] a[href="/contact-us"]', 'Contact us', 'div[data-id="444f8b6"]');

export const directFooterPrivacyPolicy = (page: any, checklistManager: ChecklistManager) =>
    navigateToFooterLink(page, checklistManager, 'div[data-id="05bb367"] a[href="/privacypolicy"]', 'Privacy policy', 'div[data-elementor-id="6754"]');

export const directFooterTermsAndConditions = (page: any, checklistManager: ChecklistManager) =>
    navigateToFooterLink(page, checklistManager, 'div[data-id="05bb367"] a[href="/terms-and-conditions"]', 'Terms and conditions', 'div[data-id="1313847"]');


export async function testDirectFooter(page: any, checklistManager: ChecklistManager) {
    await directFooterAboutUs(page, checklistManager);
    await directFooterContactUs(page, checklistManager);
    await directFooterPrivacyPolicy(page, checklistManager);
    await directFooterTermsAndConditions(page, checklistManager);
}