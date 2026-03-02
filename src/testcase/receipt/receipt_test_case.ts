import { ChecklistManager } from '../../utils/checklist';
import {
  directAccountOrders,
  directAccountMySubscription,
} from '../../actions/direct_dropdown/account/direct_account_dashboard';
import { openReceipt } from '../../actions/direct_dropdown/account/open_receipt';
import { orderReceiptPageCheck } from '../../checking/page/receipt/order_receipt_page';
import { subscriptionReceiptPageCheck } from '../../checking/page/receipt/subcription_receipt_page';

export type ReceiptTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-RECEIPT-001: verify clicking view on order list opens order receipt page ----------
export async function TC_RECEIPT_001(page: any, checklistManager: ChecklistManager) {
  await directAccountOrders(page, checklistManager);
  await openReceipt(page, checklistManager);
  await orderReceiptPageCheck(page, checklistManager);
}

// ---------- TC-RECEIPT-002: verify clicking view on subscription list opens subscription receipt page ----------
export async function TC_RECEIPT_002(page: any, checklistManager: ChecklistManager) {
  await directAccountMySubscription(page, checklistManager);
  await openReceipt(page, checklistManager);
  await subscriptionReceiptPageCheck(page, checklistManager);
}


export const RECEIPT_TEST_CASE_REGISTRY: Record<string, ReceiptTestCaseFn> = {
  'TC-RECEIPT-001': TC_RECEIPT_001,
  'TC-RECEIPT-002': TC_RECEIPT_002,
};