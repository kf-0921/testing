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

    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2)', name: 'Detail' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2) mark.order-number', name: 'Order Number' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2) mark.order-date', name: 'Order Date' },
    { selector: 'div.woocommerce-MyAccount-content p:nth-child(2) mark.order-status', name: 'Order Status' },
    { selector: 'div.woocommerce-MyAccount-content section.woocommerce-order-details h2', name: 'Order Details' },
    { selector: 'th.product-name', name: 'Product Name' },
    { selector: 'th.product-total', name: 'Total' },
    { selector: 'td.product-name', name: 'Product Name' },
    { selector: 'td.product-name a', name: 'Product link' },
    { selector: 'td.product-total span.amount', name: 'Product price' },
    { selector: 'tfoot tr th', name: 'Subtotal' },
    { selector: 'tfoot tr:nth-child(1) td:nth-child(2) span.amount', name: 'Subtotal amount' },
    { selector: 'tfoot tr:nth-child(2) th', name: 'Discount' },
    { selector: 'tfoot tr:nth-child(2) td:nth-child(2) span.amount', name: 'Discount amount' },
    { selector: 'tfoot tr:nth-child(3) th', name: 'Total' },
    { selector: 'tfoot tr:nth-child(3) td:nth-child(2) span.amount', name: 'Total amount' },
    { selector: 'section.woocommerce-customer-details h2', name: 'Billing address' },
    { selector: 'section.woocommerce-customer-details address', name: 'Address' },
    { selector: 'section.woocommerce-customer-details p.woocommerce-customer-details--phone', name: 'Phone' },
    { selector: 'section.woocommerce-customer-details p.woocommerce-customer-details--email', name: 'Email' },
    ];


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Receipt Page', 'Order Receipt Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkOrderReceiptPage(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function orderReceiptPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkOrderReceiptPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Receipt Page');
    await footerCheck(page, checklistManager, 'Receipt Page');
}