import { ChecklistManager } from '../utils/checklist';
import { LOGIN_TEST_CASE_REGISTRY } from './login/login_test_case';
import { HOME_TEST_CASE_REGISTRY } from './home_page/home_page_test_case';
import { HISTORY_TEST_CASE_REGISTRY } from './history_page/history_page_test_case';
import { DIGITAL_TEST_CASE_REGISTRY } from './digital_assets/digital_assets_test_case';
import { PLAN_TEST_CASE_REGISTRY } from './plan_page/plan_page_test_case';
import { SERVER_TEST_CASE_REGISTRY } from './all-in-one_server/all-in-one_server_test_case';
import { ENTERPRISE_TEST_CASE_REGISTRY } from './enterprise/enterprise_test_case';
import { FAQ_TEST_CASE_REGISTRY } from './faq/faq_test_case';
import { NEWS_TEST_CASE_REGISTRY } from './news/news_test_case';
import { ACCOUNT_TEST_CASE_REGISTRY } from './account/account_test_case';
import { RECEIPT_TEST_CASE_REGISTRY } from './receipt/receipt_test_case';
import { CHECKOUT_TEST_CASE_REGISTRY } from './check_out/check_out_test_case';
import { GEN_DOC_TEST_CASE_REGISTRY } from './gen_doc/gen_doc_test_case';
import { CREDIT_TEST_CASE_REGISTRY } from './credit/credit_test_case';

type TestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

const TEST_CASE_REGISTRY: Record<string, TestCaseFn> = {
  ...LOGIN_TEST_CASE_REGISTRY,
  // ...HOME_TEST_CASE_REGISTRY,
  // ...HISTORY_TEST_CASE_REGISTRY,
  // ...DIGITAL_TEST_CASE_REGISTRY,
  // ...PLAN_TEST_CASE_REGISTRY,
  // ...SERVER_TEST_CASE_REGISTRY,
  // ...ENTERPRISE_TEST_CASE_REGISTRY,
  // ...FAQ_TEST_CASE_REGISTRY,
  // ...NEWS_TEST_CASE_REGISTRY,
  // ...ACCOUNT_TEST_CASE_REGISTRY,
  // ...RECEIPT_TEST_CASE_REGISTRY,
  // ...CHECKOUT_TEST_CASE_REGISTRY,
  // ...GEN_DOC_TEST_CASE_REGISTRY,
  // ...CREDIT_TEST_CASE_REGISTRY,
};

export const TEST_CASE_IDS_ORDER: string[] = [
  // LOGIN
  'TC-LOGIN-001', 'TC-LOGIN-002', 'TC-LOGIN-003', 'TC-LOGIN-004', 'TC-LOGIN-005', 'TC-LOGIN-006', 'TC-LOGIN-007', 'TC-LOGIN-008',
  // HOME
  'TC-HOME-001', 'TC-HOME-002', 'TC-HOME-003',
  'TC-HOME-AGENT-MASTER-001', 'TC-HOME-AGENT-MASTER-002', 'TC-HOME-AGENT-MASTER-003',
  'TC-HOME-AGENT-MASTER-004', 'TC-HOME-AGENT-MASTER-005', 'TC-HOME-AGENT-MASTER-006',
  'TC-HOME-DIGITAL-ASSETS-001', 'TC-HOME-DIGITAL-ASSETS-002', 'TC-HOME-DIGITAL-ASSETS-003',
  // HISTORY
  'TC-HISTORY-001', 'TC-HISTORY-002',
  'TC-HISTORY-FILTER-001', 'TC-HISTORY-FILTER-002', 'TC-HISTORY-FILTER-003', 'TC-HISTORY-FILTER-004',
  'TC-HISTORY-COMBINE-001', 'TC-HISTORY-COMBINE-002',
  // DIGITAL
  'TC-DIGITAL-001', 'TC-DIGITAL-002', 'TC-DIGITAL-003', 'TC-DIGITAL-004',
  // PLAN
  'TC-PLAN-001', 'TC-PLAN-002', 'TC-PLAN-003', 'TC-PLAN-004', 'TC-PLAN-005',
  // SERVER
  'TC-SERVER-001', 'TC-SERVER-002', 'TC-SERVER-003', 'TC-SERVER-004', 'TC-SERVER-005',
  // ENTERPRISE
  'TC-ENTERPRISE-001', 'TC-ENTERPRISE-002', 'TC-ENTERPRISE-003',
  // FAQ
  'TC-FAQ-001',// 'TC-FAQ-002', 'TC-FAQ-003', 'TC-FAQ-004',
  // NEWS
  'TC-NEWS-001', 'TC-NEWS-002', 'TC-NEWS-003', 'TC-NEWS-004',
  // ACCOUNT
  'TC-ACCOUNT-001', 'TC-ACCOUNT-002', 'TC-ACCOUNT-003', 'TC-ACCOUNT-004',
  'TC-ACCOUNT-005', 'TC-ACCOUNT-006', 'TC-ACCOUNT-007',
  // RECEIPT
  'TC-RECEIPT-001', 'TC-RECEIPT-002',
  // CHECKOUT
  'TC-CHECKOUT-001', 'TC-CHECKOUT-002',
  // GEN DOC
  'TC-GEN-DOC-001',
  // CREDIT
  'TC-CREDIT-001',
];

export async function runTestCase(page: any, checklistManager: ChecklistManager) {
  for (const id of TEST_CASE_IDS_ORDER) {
    const fn = TEST_CASE_REGISTRY[id];
    if (!fn) continue;
    checklistManager.setCurrentSheetName(id);
    try {
      await fn(page, checklistManager);
    } finally {
      checklistManager.setCurrentSheetName(undefined);
    }
  }
}