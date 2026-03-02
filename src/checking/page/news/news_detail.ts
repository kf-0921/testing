import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';


interface ElementConfig {
    selector: string;
    name: string;
}

const newsElements: ElementConfig[] = [
    { selector: 'div.credit-popup button.credit-popup-close', name: 'Close button' },
    { selector: 'div.credit-popup span.announcement-category', name: 'News category' },
    { selector: 'div.credit-popup span.meta-separator', name: 'Meta separator' },
    { selector: 'div.credit-popup span.announcement-date', name: 'News date' },
    { selector: 'div.credit-popup h2', name: 'News title' },
    { selector: 'div.credit-popup div.announcement-text', name: 'News Content' },
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

async function checkNewsDetail(page: any, checklistManager: ChecklistManager) {
    for (const element of newsElements) {
        await checkElement(page, checklistManager, element);
    }
    return true;
}

export async function newsDetailCheck(page: any, checklistManager: ChecklistManager) {
    await checkNewsDetail(page, checklistManager);

}