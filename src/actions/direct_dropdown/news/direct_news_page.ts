import { directNewsPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateToNewsPage(page: any, selector: string, linkName: string) {
    await directNewsPage(page);

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

export async function directAllNews(page: any) {
    await navigateToNewsPage(
        page, 
        'a[data-category="all"]',
        'All News'
    );
}

export async function directGeneralNews(page: any) {
    await navigateToNewsPage(
        page,
        'a[data-category="General"]',
        'General News'
    );
}

export async function directUrgentNews(page: any) {
    await navigateToNewsPage(
        page,
        'a[data-category="Urgent"]',
        'Urgent News'
    );
}

export async function directEventNews(page: any) {
    await navigateToNewsPage(
        page,
        'a[data-category="Event"]',
        'Event News'
    );
}
