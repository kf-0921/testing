import { ChecklistManager } from '../../utils/checklist';
import { directFAQPage } from '../../actions/direct_dropdown/direct_dropdown';
import { faqPageCheckTC001, faqPageCheckTC002, faqPageCheckTC003, faqPageCheckTC004, faqPageCheckTC005 } from '../../checking/page/faq_page';

export type FAQTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-FAQ-001: 驗證 FAQ 頁可載入，標題存在 ----------
export async function TC_FAQ_001(page: any, checklistManager: ChecklistManager) {
  await directFAQPage(page, checklistManager);
  await faqPageCheckTC001(page, checklistManager);
}
// ---------- TC-FAQ-002: 驗證「帳號與註冊」手風琴存在 ----------
export async function TC_FAQ_002(page: any, checklistManager: ChecklistManager) {
  await directFAQPage(page, checklistManager);
  await faqPageCheckTC002(page, checklistManager);
}
// ---------- TC-FAQ-003: 驗證「使用 Poffices.AI」手風琴存在 ----------
export async function TC_FAQ_003(page: any, checklistManager: ChecklistManager) {
  await directFAQPage(page, checklistManager);
  await faqPageCheckTC003(page, checklistManager);
}
// ---------- TC-FAQ-004: 驗證「其他」手風琴存在 ----------
export async function TC_FAQ_004(page: any, checklistManager: ChecklistManager) {
  await directFAQPage(page, checklistManager);
  await faqPageCheckTC004(page, checklistManager);
}
// ---------- TC-FAQ-005: verify faq page header and footer are correct
export async function TC_FAQ_005(page: any, checklistManager: ChecklistManager) {
  await directFAQPage(page, checklistManager);
  await faqPageCheckTC005(page, checklistManager);
}
export const FAQ_TEST_CASE_REGISTRY: Record<string, FAQTestCaseFn> = {
  'TC-FAQ-001': TC_FAQ_001,
  'TC-FAQ-002': TC_FAQ_002,
  'TC-FAQ-003': TC_FAQ_003,
  'TC-FAQ-004': TC_FAQ_004,
  'TC-FAQ-005': TC_FAQ_005,
};