import { applyCoupon } from "./apply_coupon";
import { fillCheckoutForm } from "./fill_detail_form";
import { confirmOrderStep } from "./confirm_order";
import { directServerB1Order } from "../../direct_dropdown/all_in_one_server_product_page/direct_product_page";
import { ChecklistManager } from '../../../utils/checklist';


export async function serverRegularCheck(page: any, checklistManager: ChecklistManager) {

    // navigate to plan page
    console.log('navigate to server b1 order page...');
    await directServerB1Order(page, checklistManager);
    console.log('server b1 order page loaded...');
    // apply coupon
    console.log('start applying coupon...');
    await applyCoupon(page, 'RPA-AIO-B1');
    console.log('coupon applied...');
    // navigate to checkout page
    console.log('navigate to checkout page...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        await page.waitForSelector('a.checkout-button', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('checkout', 'Selector not found: a.checkout-button');
        return;
    }
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('a.checkout-button')
    ]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // fill checkout form
    await fillCheckoutForm(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // click place order button
    try {
        await page.waitForSelector('button.button.alt', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('checkout', 'Selector not found: button.button.alt');
        return;
    }
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('button.button.alt')
    ]);
    // confirm order
    await confirmOrderStep(page, checklistManager);


}