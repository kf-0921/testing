import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { loginHeaderCheck } from '../../defaultLayout/login_header';
import { footerCheck } from '../../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-HISTORY-001: page loads with title, promote message, remind message
const history001Elements: ElementConfig[] = [
    { selector: 'h1.css-j95cc2', name: 'title' },
    { selector: 'div.css-lluksu h2.css-2sdbyo', name: 'promote message' },
    { selector: 'div.css-1lsiufc', name: 'remind message' },
];

// TC-HISTORY-002: filter, combine, table and actions
const history002Elements: ElementConfig[] = [
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
    checklistManager.addItemToSection('History Page', 'History Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkElements(page: any, checklistManager: ChecklistManager, elements: ElementConfig[]) {
    for (const config of elements) {
        await checkElement(page, checklistManager, config);
    }
}

const sectionName = 'History Page';

export async function historyPageCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, history001Elements);
}

export async function historyPageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, history002Elements);
}

export async function historyPageCheckTC003(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}
export async function historyPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, history001Elements);
    await checkElements(page, checklistManager, history002Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}