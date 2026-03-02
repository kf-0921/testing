import { applyCoupon } from "./apply_coupon";
import { directPofficesRegularOrder } from "../../direct_dropdown/plan/direct_plan_page";
import { fillCheckoutForm } from "./fill_detail_form";
import { confirmOrderStep } from "./confirm_order";
import { ChecklistManager } from '../../../utils/checklist';


export async function planRegularCheckOut(page: any, checklistManager: ChecklistManager) {

    // navigate to plan page
    await directPofficesRegularOrder(page, checklistManager);
    // apply coupon
    await applyCoupon(page, 'RPA-Regular');
    // navigate to checkout page
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