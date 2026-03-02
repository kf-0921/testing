import { ChecklistManager } from '../../utils/checklist';
import { serverRegularCheck } from '../../actions/test/checkout/server_b1_check_out';
import { planRegularCheckOut } from '../../actions/test/checkout/plan_regular_check_out';

export type CheckoutTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-CHECKOUT-001: Server B1 checkout (apply coupon, fill form, place order, confirm) ----------
export async function TC_CHECKOUT_001(page: any, checklistManager: ChecklistManager) {
  await serverRegularCheck(page, checklistManager);
}

// ---------- TC-CHECKOUT-002: Plan Regular checkout (apply coupon, fill form, place order, confirm) ----------
export async function TC_CHECKOUT_002(page: any, checklistManager: ChecklistManager) {
  await planRegularCheckOut(page, checklistManager);
}

export const CHECKOUT_TEST_CASE_REGISTRY: Record<string, CheckoutTestCaseFn> = {
  'TC-CHECKOUT-001': TC_CHECKOUT_001,
  'TC-CHECKOUT-002': TC_CHECKOUT_002,
};