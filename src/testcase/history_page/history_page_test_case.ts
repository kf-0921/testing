import { ChecklistManager } from '../../utils/checklist';
import { navigateToHistoryPage } from '../../actions/direct_history_page/history_page';
import { historyPageCheckTC001, historyPageCheckTC002, historyPageCheckTC003 } from '../../checking/page/history/history_page';
import { historyFilterCheck, historyFilterCheckTC001, historyFilterCheckTC002, historyFilterCheckTC003, historyFilterCheckTC004 } from '../../checking/page/history/history_filter';
import { historyCombineCheck, historyCombineCheckTC001, historyCombineCheckTC002 } from '../../checking/page/history/history_combine';
import { loginHeaderCheck } from '../../checking/defaultLayout/login_header';
import { footerCheck } from '../../checking/defaultLayout/footer';
import { openHistoryFilterPopup } from '../../actions/direct_history_page/open_history_filter';
import { openHistoryCombinePopup } from '../../actions/direct_history_page/open_history_combine';

export type HistoryTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-HISTORY-001: 驗證歷史頁可載入，標題、推廣與提醒訊息可見 ----------
export async function TC_HISTORY_001(page: any, checklistManager: ChecklistManager) {
  await navigateToHistoryPage(page, checklistManager);
  await historyPageCheckTC001(page, checklistManager);
}
// ---------- TC-HISTORY-002: 驗證篩選、合併、表格與操作元素皆存在且可用 ----------
export async function TC_HISTORY_002(page: any, checklistManager: ChecklistManager) {
  await navigateToHistoryPage(page, checklistManager);
  await historyPageCheckTC002(page, checklistManager);
}

// ---------- TC-HISTORY-003: 驗證歷史頁的 header 與 footer 正確顯示 ----------
export async function TC_HISTORY_003(page: any, checklistManager: ChecklistManager) {
  await navigateToHistoryPage(page, checklistManager);
  await historyPageCheckTC003(page, checklistManager);
}
// ---------- TC-HISTORY-FILTER-001: 驗證點擊篩選可開啟彈窗且含標題與重設按鈕 ----------
export async function TC_HISTORY_FILTER_001(page: any, checklistManager: ChecklistManager) {
  await openHistoryFilterPopup(page, checklistManager);
  await historyFilterCheckTC001(page, checklistManager);
}
export async function TC_HISTORY_FILTER_002(page: any, checklistManager: ChecklistManager) {
  await openHistoryFilterPopup(page, checklistManager);
  await historyFilterCheckTC002(page, checklistManager);
}
export async function TC_HISTORY_FILTER_003(page: any, checklistManager: ChecklistManager) {
  await openHistoryFilterPopup(page, checklistManager);
  await historyFilterCheckTC003(page, checklistManager);
}
export async function TC_HISTORY_FILTER_004(page: any, checklistManager: ChecklistManager) {
  await openHistoryFilterPopup(page, checklistManager);
  await historyFilterCheckTC004(page, checklistManager);
}
// ---------- TC-HISTORY-COMBINE-001 / 002 ----------
export async function TC_HISTORY_COMBINE_001(page: any, checklistManager: ChecklistManager) {
  await openHistoryCombinePopup(page, checklistManager);
  await historyCombineCheckTC001(page, checklistManager);
}
export async function TC_HISTORY_COMBINE_002(page: any, checklistManager: ChecklistManager) {
  await openHistoryCombinePopup(page, checklistManager);
  await historyCombineCheckTC002(page, checklistManager);
}

export const HISTORY_TEST_CASE_REGISTRY: Record<string, HistoryTestCaseFn> = {
  'TC-HISTORY-001': TC_HISTORY_001,
  'TC-HISTORY-002': TC_HISTORY_002,
  'TC-HISTORY-003': TC_HISTORY_003,
  'TC-HISTORY-FILTER-001': TC_HISTORY_FILTER_001,
  'TC-HISTORY-FILTER-002': TC_HISTORY_FILTER_002,
  'TC-HISTORY-FILTER-003': TC_HISTORY_FILTER_003,
  'TC-HISTORY-FILTER-004': TC_HISTORY_FILTER_004,
  'TC-HISTORY-COMBINE-001': TC_HISTORY_COMBINE_001,
  'TC-HISTORY-COMBINE-002': TC_HISTORY_COMBINE_002,
};