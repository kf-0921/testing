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

    { selector: 'form h2', name: 'title' },
    { selector: 'label[for="billing_first_name"]', name: 'First Name' },
    { selector: 'input[name="billing_first_name"]', name: 'First Name input' },
    { selector: 'label[for="billing_last_name"]', name: 'Last Name' },
    { selector: 'input[name="billing_last_name"]', name: 'Last Name input' },
    { selector: 'label[for="billing_company"]', name: 'Company Name' },
    { selector: 'input[name="billing_company"]', name: 'Company Name input' },
    { selector: 'label[for="billing_country"]', name: 'Country' },
    { selector: 'span[id="select2-billing_country-container"]', name: 'Country input' },
    { selector: 'label[for="billing_address_1"]', name: 'Street Address' },
    { selector: 'input[name="billing_address_1"]', name: 'Street Address input' },
    { selector: 'label[for="billing_address_2"]', name: 'Apartment, suite, etc.' },
    { selector: 'input[name="billing_address_2"]', name: 'Apartment, suite, etc. input' },
    { selector: 'label[for="billing_city"]', name: 'Town/District' },
    { selector: 'input[name="billing_city"]', name: 'Town/District input' },
    { selector: 'label[for="billing_state"]', name: 'State' },
    { selector: 'span[id="select2-billing_state-container"]', name: 'State input' },
    { selector: 'label[for="billing_postcode"]', name: 'Postcode/ZIP' },
    { selector: 'input[name="billing_postcode"]', name: 'Postcode/ZIP input' },
    { selector: 'label[for="billing_phone"]', name: 'Phone' },
    { selector: 'input[name="billing_phone"]', name: 'Phone input' },
    { selector: 'label[for="billing_email"]', name: 'Email' },
    { selector: 'input[name="billing_email"]', name: 'Email input' },
    { selector: 'label.checkbox ', name: 'confirm checkbox description' },
    { selector: 'input[name="update_all_subscriptions_addresses"]', name: 'confirm checkbox input' },
    { selector: 'p button.button', name: 'Save changes button' },
    ];


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Account Page', 'Account Edit Address Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkAccountEditAddressPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}


export async function accountEditAddressPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkAccountEditAddressPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Account Page');
    await footerCheck(page, checklistManager, 'Account Page');
}