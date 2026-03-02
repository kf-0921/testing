import { directNewsPage } from "../direct_dropdown";
import { ChecklistManager } from "../../../utils/checklist";
import { getPageLanguageInfo } from "../../../checking/language/page_language";

// Helper function to navigate to account page and click a navigation link
async function navigateToNewsPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string) {
    await directNewsPage(page, checklistManager);

    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('News Page', `Selector not found: ${selector}`);
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

    const validateElementCheck = await page.$(validateElement);
    if (validateElementCheck) {
        checklistManager.logDirectMessage('News Page', `Selector found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('News Page', `confirm redirect to ${linkName} page success!`);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
        return validateElementCheck;
    } else {
        checklistManager.logDirectMessage('News Page', `Selector not found: ${validateElementCheck}`);
        checklistManager.logDirectMessage('News Page', `redirect to ${linkName} page failed!`);
    }
}

export async function directAllNews(page: any, checklistManager: ChecklistManager) {
    await navigateToNewsPage(
        page,
        checklistManager,
        'a[data-category="all"]',
        'All News',
        'a[class="category-link active"][data-category="all"]'
    );
}

export async function directGeneralNews(page: any, checklistManager: ChecklistManager) {
    await navigateToNewsPage(
        page,
        checklistManager,
        'a[data-category="General"]',
        'General News',
        'a[class="category-link active"][data-category="General"]'
    );
}

export async function directUrgentNews(page: any, checklistManager: ChecklistManager) {
    await navigateToNewsPage(
        page,
        checklistManager,
        'a[data-category="Urgent"]',
        'Urgent News',
        'a[class="category-link active"][data-category="Urgent"]'
    );
}

export async function directEventNews(page: any, checklistManager: ChecklistManager) {
    await navigateToNewsPage(
        page,
        checklistManager,
        'a[data-category="Event"]',
        'Event News',
        'a[class="category-link active"][data-category="Event"]'
    );
}




export async function testDirectNewsPage(page: any, checklistManager: ChecklistManager) {
    await directAllNews(page, checklistManager);
    await directGeneralNews(page, checklistManager);
    await directUrgentNews(page, checklistManager);
    await directEventNews(page, checklistManager);
}