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

    { selector: 'label[for="account_first_name"]', name: 'First Name' },
    { selector: 'input[name="account_first_name"]', name: 'First Name input' },
    { selector: 'label[for="account_last_name"]', name: 'Last Name' },
    { selector: 'input[name="account_last_name"]', name: 'Last Name input' },
    { selector: 'label[for="account_display_name"]', name: 'Display Name' },
    { selector: 'input[name="account_display_name"]', name: 'Display Name input' },
    { selector: 'div.elementor.elementor-3916 p:nth-child(4) span em', name: 'Description' },
    { selector: 'label[for="account_email"]', name: 'Email' },
    { selector: 'input[name="account_email"]', name: 'Email input' },

    { selector: 'fieldset legend', name: 'Password' },
    { selector: 'label[for="password_current"]', name: 'Current Password' },
    { selector: 'input[name="password_current"]', name: 'Current Password input' },
    { selector: 'fieldset p:nth-child(2) span span', name: 'New Password' },
    { selector: 'label[for="password_1"]', name: 'New Password' },
    { selector: 'input[name="password_1"]', name: 'New Password input' },
    { selector: 'fieldset p:nth-child(2) span span', name: 'Confirm New Password' },
    { selector: 'label[for="password_2"]', name: 'Confirm New Password' },
    { selector: 'input[name="password_2"]', name: 'Confirm New Password input' },
    { selector: 'fieldset p:nth-child(3) span span', name: 'Confirm New Password' },

    { selector: 'div.avatar-user label', name: 'Avatar' },
    { selector: 'div.avatar-user p.avatar img', name: 'Avatar image' },
    { selector: 'div.avatar-user input', name: 'Avatar upload' },

    { selector: 'p button', name: 'Save changes button' },
    ];


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Account Page', 'Account Details Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkAccountDetailsPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function accountDetailsPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkAccountDetailsPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Account Page');
    await footerCheck(page, checklistManager, 'Account Page');
}