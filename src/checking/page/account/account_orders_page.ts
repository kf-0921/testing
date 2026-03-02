import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { footerCheck } from '../../defaultLayout/footer';
import { loginHeaderCheck } from '../../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

const contentElements: ElementConfig[] = [
    { selector: 'nav[aria-label="Account pages"] li:nth-child(1) a', name: 'Dashboard' },
    { selector: 'nav[aria-label="Account pages"] li:nth-child(2) a', name: 'Orders' },
    { selector: 'nav[aria-label="Account pages"] li:nth-child(3) a', name: 'Subscriptions' },
    { selector: 'nav[aria-label="Account pages"] li:nth-child(4) a', name: 'Address' },
    { selector: 'nav[aria-label="Account pages"] li:nth-child(5) a', name: 'Account Details' },

    { selector: 'table.account-orders-table thead th:nth-child(1)', name: 'Order' },
    { selector: 'table.account-orders-table thead th:nth-child(2)', name: 'Date' },
    { selector: 'table.account-orders-table thead th:nth-child(3)', name: 'Status' },
    { selector: 'table.account-orders-table thead th:nth-child(4)', name: 'Total' },
    { selector: 'table.account-orders-table thead th:nth-child(5)', name: 'Actions' },
    { selector: 'table.account-orders-table tbody th:nth-child(1)', name: 'Order' },
    { selector: 'table.account-orders-table tbody td:nth-child(2)', name: 'Date' },
    { selector: 'table.account-orders-table tbody td:nth-child(3)', name: 'Status' },
    { selector: 'table.account-orders-table tbody td:nth-child(4)', name: 'Total' },
    { selector: 'table.account-orders-table tbody td:nth-child(5)', name: 'Actions' },
];

async function checkNextPreviousButton(page: any, checklistManager: ChecklistManager) {
    const nextSelector = 'div.woocommerce-Pagination a.woocommerce-Button--next';
    const foundNext = await checklistManager.checkElement(page, nextSelector);
    if (foundNext) {
        const url = await getUrlIfLink(page, nextSelector, foundNext);
        const text = await getTextIfExists(page, nextSelector, foundNext);
        checklistManager.addItemToSection('Account Page', 'Account Orders Page', {
            name: 'Next',
            found: foundNext,
            text,
            url
        });
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
            page.click(nextSelector)
        ]);
    }

    const previousSelector = 'div.woocommerce-Pagination a.woocommerce-Button--previous';
    const foundPrevious = await checklistManager.checkElement(page, previousSelector);
    if (foundPrevious) {
        const url = await getUrlIfLink(page, previousSelector, foundPrevious);
        const text = await getTextIfExists(page, previousSelector, foundPrevious);
        checklistManager.addItemToSection('Account Page', 'Account Orders Page', {
            name: 'Previous',
            found: foundPrevious,
            text,
            url
        });
    }
}


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Account Page', 'Account Orders Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkAccountOrdersPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function accountOrdersPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkAccountOrdersPage(page, checklistManager);
    await checkNextPreviousButton(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Account Page');
    await footerCheck(page, checklistManager, 'Account Page');
}