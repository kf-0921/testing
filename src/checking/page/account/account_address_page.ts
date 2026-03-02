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

    { selector: 'div.woocommerce-MyAccount-content p', name: 'description' },
    { selector: 'div.woocommerce-MyAccount-content div h2', name: 'title' },
    { selector: 'div.woocommerce-MyAccount-content div a', name: 'edit link' },
    { selector: 'div.woocommerce-MyAccount-content div address', name: 'address' },
    ];


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Account Page', 'Account Address Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkAccountAddressPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function accountAddressPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkAccountAddressPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Account Page');
    await footerCheck(page, checklistManager, 'Account Page');
}