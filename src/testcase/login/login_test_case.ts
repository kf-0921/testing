import { ChecklistManager } from '../../utils/checklist';
import directToHomePage from '../../actions/direct_home_page/home_page';
import {
  openLoginPopup,
  checkLoginPopupElements,
  fillUsernamePassword,
  submitLoginForm,
  verifyLoginSuccess,
} from '../../actions/login';

export type LoginTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// TC-LOGIN-001: 驗證點擊「登入」可開啟登入彈窗，三種登入方式可見
export async function TC_LOGIN_001(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await checkLoginPopupElements(page, checklistManager);
}


// TC-LOGIN-002: 驗證使用正確帳號密碼可成功登入並進入 dashboard
export async function TC_LOGIN_002(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await fillUsernamePassword(page, checklistManager, { username: 'RPA-Tester_1', password: 'sq$w2QuEmu*R#LbKDlCZ2JvP' });
  await submitLoginForm(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager);
}

// // TC-LOGIN-003: 驗證錯誤密碼時顯示錯誤訊息且不允許登入
// export async function TC_LOGIN_003(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   await fillUsernamePassword(page, checklistManager, { username: 'RPA-Tester_1', password: 'WrongPassword' });
//   await submitLoginForm(page, checklistManager);
//   // Optional: add a step to check error message on page and record to checklist
// }

// // TC-LOGIN-004: 驗證欄位為空時顯示驗證訊息且不允許登入
// export async function TC_LOGIN_004(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   await fillUsernamePassword(page, checklistManager, { username: '', password: '' });
//   await submitLoginForm(page, checklistManager);
//   // Optional: check validation message
// }

// // TC-LOGIN-006 / 007 / 008 / 009: keep calling full loginStep until you add Google/LocoBike steps
// export async function TC_LOGIN_006(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   // TODO: add clickGoogleLogin + verify redirect or cancel flow
// }

// export async function TC_LOGIN_007(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   // TODO: click Google → cancel → check still on popup
// }

// export async function TC_LOGIN_008(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   // TODO: LocoBike login flow
// }

// export async function TC_LOGIN_009(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   // TODO: LocoBike unlinked flow
// }

// TC-LOGIN-010: 驗證登入後重新整理頁面，登入狀態仍維持
export async function TC_LOGIN_010(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager); // still on my-account / nav visible
}

// // TC-LOGIN-011: 驗證可成功登出並回到首頁、清除 session
// export async function TC_LOGIN_011(page: any, checklistManager: ChecklistManager) {
//   await directToHomePage(page, checklistManager);
//   await openLoginPopup(page, checklistManager);
//   await fillUsernamePassword(page, checklistManager, {});
//   await submitLoginForm(page, checklistManager);
//   await verifyLoginSuccess(page, checklistManager);
//   // TODO: add logoutStep (click profile → logout) then check URL / login button visible
// }

export const LOGIN_TEST_CASE_REGISTRY: Record<string, LoginTestCaseFn> = {
  'TC-LOGIN-001': TC_LOGIN_001,
  'TC-LOGIN-002': TC_LOGIN_002,
  // 'TC-LOGIN-003': TC_LOGIN_003,
  // 'TC-LOGIN-004': TC_LOGIN_004,
  // 'TC-LOGIN-005': TC_LOGIN_005,
  // 'TC-LOGIN-006': TC_LOGIN_006,
  // 'TC-LOGIN-007': TC_LOGIN_007,
  // 'TC-LOGIN-008': TC_LOGIN_008,
  // 'TC-LOGIN-009': TC_LOGIN_009,
  'TC-LOGIN-010': TC_LOGIN_010,
  // 'TC-LOGIN-011': TC_LOGIN_011,
};