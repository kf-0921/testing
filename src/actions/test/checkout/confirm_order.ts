import { directAccountOrders } from "../../direct_dropdown/account/direct_account_dashboard";
import { ChecklistManager } from '../../../utils/checklist';

// confirm order
async function confirmOrder(page: any): Promise<string | null> {
    console.log('checking for order number...');
    const orderNumberElement = await page.$('li.woocommerce-order-overview__order strong');
    if (orderNumberElement) {
        const orderNumber = await page.evaluate((el: Element) => el.textContent, orderNumberElement);
        console.log(`Order found! Order number: ${orderNumber}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return orderNumber?.trim() || null;
    } else {
        console.log('Order number not found');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return null;
    }
}

async function checkOrder(page: any, orderNumber: string | null): Promise<string | null> {
    if (!orderNumber) {
        console.log('Order number is not available, cannot check order');
        return null;
    }
    await directAccountOrders(page);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Checking order for order number: ${orderNumber}`);
    
    // Check if order exists on current page
    let orderExists = await page.$(`th[data-title="Order"] a[aria-label="View order number ${orderNumber}"]`);
    
    // If not found, try navigating through pages
    while (!orderExists) {
        const nextButton = await page.$('a.woocommerce-Button--next');
        if (nextButton) {
            try {
                await Promise.all([
                    page.waitForNavigation({ waitUntil: 'networkidle0' }),
                    page.click('a.woocommerce-Button--next')
                ]);
                await new Promise(resolve => setTimeout(resolve, 2000));
                // Check again on new page
                orderExists = await page.$(`th[data-title="Order"] a[aria-label="View order number ${orderNumber}"]`);
            } catch (error) {
                console.error('Error navigating to next page:', error);
                return null;
            }
        } else {
            console.log('No more pages to check');
            return null;
        }
    }
    
    // Order found, click to view it
    if (orderExists) {
        try {
            await Promise.all([
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
                page.click(`td[data-title="Actions"] a[aria-label="View order number ${orderNumber}"]`)
            ]);
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Get order status from order detail page
            const orderStatusElement = await page.$('mark.order-status');
            if (orderStatusElement) {
                const orderStatus = await page.evaluate((el: Element) => el.textContent, orderStatusElement);
                console.log(`Order status: ${orderStatus}`);
                return orderStatus?.trim() || null;
            } else {
                console.log('Order status not found');
                return null;
            }
        } catch (error) {
            console.error('Error clicking order link:', error);
            return null;
        }
    }
    
    return null;
}

export async function confirmOrderStep(page: any, checklistManager: ChecklistManager) {
    const orderNumber = await confirmOrder(page);
    const orderStatus = await checkOrder(page, orderNumber);
    
    // if order number is found, log to Excel and TXT
    if (orderNumber) {
        const statusText = orderStatus ? `, status: ${orderStatus}` : '';
        checklistManager.logDirectMessage('order confirm', `Order: ${orderNumber} , Order Status: ${statusText}`);
    }
}