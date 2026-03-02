import { ChecklistManager } from '../../utils/checklist';
import { navigateToDigitalAssetsPage } from '../../actions/direct_digital_assets/digital_assets_page';
import {
  digitalAssetsPageCheckTC001,
  digitalAssetsPageCheckTC002,
  digitalAssetsPageCheckTC003,
} from '../../checking/page/digital_assets/digital_assets_page';
import { digitalSuccessCheck } from '../../checking/page/digital_assets/digital_success';
import { digitalFailCheck } from '../../checking/page/digital_assets/digital_fail';

export type DigitalTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// TC-DIGITAL-001: page loads with title, description, filter section
export async function TC_DIGITAL_001(page: any, checklistManager: ChecklistManager) {
  await navigateToDigitalAssetsPage(page, checklistManager);
  await digitalAssetsPageCheckTC001(page, checklistManager);
}

// TC-DIGITAL-002: uploaded file list
export async function TC_DIGITAL_002(page: any, checklistManager: ChecklistManager) {
  await navigateToDigitalAssetsPage(page, checklistManager);
  await digitalAssetsPageCheckTC002(page, checklistManager);
}

// ---------- TC-DIGITAL-003: verify successful upload item can expand and display segments and content ----------
export async function TC_DIGITAL_003(page: any, checklistManager: ChecklistManager) {
  await navigateToDigitalAssetsPage(page, checklistManager);
  await digitalSuccessCheck(page, checklistManager);
}

// TC-DIGITAL-004: failed upload item can expand and display failed message
export async function TC_DIGITAL_004(page: any, checklistManager: ChecklistManager) {
  await navigateToDigitalAssetsPage(page, checklistManager);
  await digitalFailCheck(page, checklistManager);
}

// ---------- TC-DIGITAL-003: 驗證數位資產頁的 header 與 footer 正確顯示 ----------
export async function TC_DIGITAL_005(page: any, checklistManager: ChecklistManager) {
  await navigateToDigitalAssetsPage(page, checklistManager);
  await digitalAssetsPageCheckTC003(page, checklistManager);
}
export const DIGITAL_TEST_CASE_REGISTRY: Record<string, DigitalTestCaseFn> = {
  'TC-DIGITAL-001': TC_DIGITAL_001,
  'TC-DIGITAL-002': TC_DIGITAL_002,
  'TC-DIGITAL-003': TC_DIGITAL_003,
  'TC-DIGITAL-004': TC_DIGITAL_004,
  'TC-DIGITAL-005': TC_DIGITAL_005,
};