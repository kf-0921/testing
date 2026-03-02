import { ChecklistManager } from '../../utils/checklist';
import {
  directAccountDashboard,
  directAccountOrders,
  directAccountMySubscription,
  directAccountAddress,
  directAccountAccountDetails,
  directAccountAddressEdit,
} from '../../actions/direct_dropdown/account/direct_account_dashboard';
import { accountDashboardPageCheck } from '../../checking/page/account/account_dashboard_page';
import { accountOrdersPageCheck } from '../../checking/page/account/account_orders_page';
import { accountSubscriptionsPageCheck } from '../../checking/page/account/account_subscriptions_page';
import { accountAddressPageCheck } from '../../checking/page/account/account_address_page';
import { accountDetailsPageCheck } from '../../checking/page/account/account_details_page';
import { accountEditAddressPageCheck } from '../../checking/page/account/account_edit_address_page';
import { directAccountPage } from '../../actions/direct_dropdown/direct_dropdown';

export type AccountTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-ACCOUNT-001: verify can go account page ----------
export async function TC_ACCOUNT_001(page: any, checklistManager: ChecklistManager) {
  await directAccountPage(page, checklistManager);
  await accountDashboardPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-002: verify account dashboard welcome message, logout link, credit, subscription are visible ----------
export async function TC_ACCOUNT_002(page: any, checklistManager: ChecklistManager) {
  await directAccountDashboard(page, checklistManager);
  await accountDashboardPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-003: verify orders page table and pagination exist and can be operated ----------
export async function TC_ACCOUNT_003(page: any, checklistManager: ChecklistManager) {
  await directAccountOrders(page, checklistManager);
  await accountOrdersPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-004: verify subscriptions page subscription table exist and can be operated ----------
export async function TC_ACCOUNT_004(page: any, checklistManager: ChecklistManager) {
  await directAccountMySubscription(page, checklistManager);
  await accountSubscriptionsPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-005: verify address page description, edit link, address block are visible ----------
export async function TC_ACCOUNT_005(page: any, checklistManager: ChecklistManager) {
  await directAccountAddress(page, checklistManager);
  await accountAddressPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-006: verify account details page name, email, password, avatar, save button are visible ----------
export async function TC_ACCOUNT_006(page: any, checklistManager: ChecklistManager) {
  await directAccountAccountDetails(page, checklistManager);
  await accountDetailsPageCheck(page, checklistManager);
}

// ---------- TC-ACCOUNT-007: verify edit address page all billing fields and save button are visible ----------
export async function TC_ACCOUNT_007(page: any, checklistManager: ChecklistManager) {
  await directAccountAddressEdit(page, checklistManager);
  await accountEditAddressPageCheck(page, checklistManager);
}

export const ACCOUNT_TEST_CASE_REGISTRY: Record<string, AccountTestCaseFn> = {
  'TC-ACCOUNT-001': TC_ACCOUNT_001,
  'TC-ACCOUNT-002': TC_ACCOUNT_002,
  'TC-ACCOUNT-003': TC_ACCOUNT_003,
  'TC-ACCOUNT-004': TC_ACCOUNT_004,
  'TC-ACCOUNT-005': TC_ACCOUNT_005,
  'TC-ACCOUNT-006': TC_ACCOUNT_006,
  'TC-ACCOUNT-007': TC_ACCOUNT_007,
};