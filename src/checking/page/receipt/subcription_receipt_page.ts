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

    { selector: 'div.elementor.elementor-3916 > div > div > div > div > div > div > div > h2', name: 'Subscription totals' },
    { selector: 'table.shop_table.order_details thead th:nth-child(1)', name: 'Product' },
    { selector: 'table.shop_table.order_details thead th:nth-child(2)', name: 'Total' },
    { selector: 'table.shop_table.order_details tbody td:nth-child(1)', name: 'Product name' },
    { selector: 'table.shop_table.order_details tbody td:nth-child(1) a', name: 'Product link' },
    { selector: 'table.shop_table.order_details tbody td:nth-child(2)', name: 'Product price' },
    { selector: 'table.shop_table.order_details tfoot tr:nth-child(1) th', name: 'Subtotal' },
    { selector: 'table.shop_table.order_details tfoot tr:nth-child(1) td', name: 'Subtotal amount' },
    { selector: 'table.shop_table.order_details tfoot tr:nth-child(2) th', name: 'Total' },
    { selector: 'table.shop_table.order_details tfoot tr:nth-child(2) td', name: 'Total amount' },
    { selector: 'div.elementor.elementor-3916 > div > div > div > div > div > div > div > header > h2', name: 'Related orders' },
    { selector: 'table.my_account_orders thead tr th:nth-child(1)', name: 'Order' },
    { selector: 'table.my_account_orders thead tr th:nth-child(2)', name: 'Date' },
    { selector: 'table.my_account_orders thead tr th:nth-child(3)', name: 'Status' },
    { selector: 'table.my_account_orders thead tr th:nth-child(4)', name: 'Total' },
    { selector: 'table.my_account_orders thead tr th:nth-child(5)', name: 'Actions' },
    { selector: 'table.my_account_orders tbody tr td:nth-child(1)', name: 'Order' },
    { selector: 'table.my_account_orders tbody tr td:nth-child(2)', name: 'Date' },
    { selector: 'table.my_account_orders tbody tr td:nth-child(3)', name: 'Status' },
    { selector: 'table.my_account_orders tbody tr td:nth-child(4)', name: 'EmTotalail' },
    { selector: 'table.my_account_orders tbody tr td:nth-child(5) a', name: 'View link' },
    { selector: 'div.elementor.elementor-3916 > div > div > div > div > div > div > div > section > h2', name: 'Billing address' },
    { selector: 'section address', name: 'Address' },
    { selector: 'section address p.woocommerce-customer-details--phone', name: 'Phone' },
    { selector: 'section address p.woocommerce-customer-details--email', name: 'Email' },
];


async function checkSubscriptionTableRows(page: any, checklistManager: ChecklistManager) {
    const tableSelector = 'table.shop_table.subscription_details tbody';
    const rowSelector = `${tableSelector} tr`;
    const rows = await page.$$(rowSelector);
    for (let i = 0; i < rows.length; i++) {
        const n = i + 1;
        const labelSelector = `${tableSelector} tr:nth-child(${n}) td:nth-child(1)`;
        const valueSelector = `${tableSelector} tr:nth-child(${n}) td:nth-child(2)`;
        const labelFound = await checklistManager.checkElement(page, labelSelector);
        const valueFound = await checklistManager.checkElement(page, valueSelector);
        const labelText = await getTextIfExists(page, labelSelector, labelFound);
        const valueText = await getTextIfExists(page, valueSelector, valueFound);
        const valueUrl = await getUrlIfLink(page, valueSelector, valueFound);
        checklistManager.addItemToSection('Receipt Page', 'Subscription Receipt Page', {
            name: labelText || `Row ${n} label`,
            found: labelFound,
            text: labelText,
            url: ''
        });
        checklistManager.addItemToSection('Receipt Page', 'Subscription Receipt Page', {
            name: (labelText ? labelText + ' (value)' : `Row ${n} value`),
            found: valueFound,
            text: valueText,
            url: valueUrl
        });
    }
}

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Receipt Page', 'Subscription Receipt Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkSubscriptionReceiptPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function subscriptionReceiptPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkSubscriptionReceiptPage(page, checklistManager);
    await checkSubscriptionTableRows(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Receipt Page');
    await footerCheck(page, checklistManager, 'Receipt Page');
}