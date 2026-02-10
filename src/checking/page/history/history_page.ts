import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { loginHeaderCheck } from '../../defaultLayout/login_header';
import { footerCheck } from '../../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

const headerElements: ElementConfig[] = [
    { selector: 'h1.css-j95cc2', name: 'title' },
    { selector: 'div.css-lluksu h2.css-2sdbyo', name: 'promote message' },
    { selector: 'div.css-1lsiufc', name: 'remind message' },
    { selector: 'button.css-fd640w', name: 'filter' },
    { selector: 'button.css-18is857', name: 'combine' },
    { selector: 'div.desktopTable', name: 'digital assets' },
    { selector: 'div.custom-table-header', name: 'file upload' },
    { selector: 'div.desktopTable input[class="PrivateSwitchBase-input css-j8yymo"]', name: 'check box' },
    { selector: 'div.desktopTable a.css-em3tr2', name: 'view document' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('history page', 'history page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkHistoryPage(page: any, checklistManager: ChecklistManager) {
    for (const element of headerElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function historyPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkHistoryPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'history page');
    await footerCheck(page, checklistManager, 'history page');
}