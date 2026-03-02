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
    
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2)', name: 'Welcome message' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2) a', name: 'logout link' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(3)', name: 'description' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(3) a:nth-child(1)', name: 'recent orders link' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(3) a:nth-child(2)', name: 'billing address link' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(3) a:nth-child(3)', name: 'edit account link' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(4)', name: 'total credit' },
    { selector: 'div.woocommerce-MyAccount-content h2', name: 'title' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(7)', name: 'Subscription details' },
];


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Account Page', 'Account Dashboard Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkAccountDashboardPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function accountDashboardPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkAccountDashboardPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Account Page');
    await footerCheck(page, checklistManager, 'Account Page');
}