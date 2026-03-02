import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { footerCheck } from '../../defaultLayout/footer';
import { loginHeaderCheck } from '../../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

const newsElements: ElementConfig[] = [
    { selector: 'a[data-category="all"]', name: 'All News' },
    { selector: 'a[data-category="General"]', name: 'General News' },
    { selector: 'a[data-category="Urgent"]', name: 'Urgent News' },
    { selector: 'a[data-category="Event"]', name: 'Event News' },

    { selector: '.news-item:nth-child(1) h2.news-title', name: 'first news title' },
    { selector: '.news-item:nth-child(1) .news-meta .news-category', name: 'first news category' },
    { selector: '.news-item:nth-child(1) .news-meta .news-date', name: 'first news date' },

    { selector: 'div.pagination a:nth-child(1)', name: 'Page 1' },
    { selector: 'div.pagination a:nth-child(2)', name: 'Page 2' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('News Page', 'News Page', {
        name: config.name,
        found,
        text,
        url,
    });
}

async function checkNewsPage(page: any, checklistManager: ChecklistManager) {

    const newsItems = await page.$$('.news-item');

    if (newsItems.length === 0) {
        checkElement(page, checklistManager, { selector: 'div.no-news', name: 'no news' });
        return true;
    } else {
        for (const element of newsElements) {
            await checkElement(page, checklistManager, element);
        }
    }
    return true;
}

export async function newsPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkNewsPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'News Page');
    await footerCheck(page, checklistManager, 'News Page');
}