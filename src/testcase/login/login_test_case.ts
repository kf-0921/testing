import { ChecklistManager } from '../../utils/checklist';
import directToHomePage from '../../actions/direct_home_page/home_page';
import {
  openLoginPopup,
  checkLoginPopupElements,
  fillUsernamePassword,
  submitLoginForm,
  verifyLoginSuccess,
  submitLoginFormInFailedCase,
  checkLocoBikeLogin,
  logoutStep,
  checkForgotPassword,
  checkRegister,
} from '../../actions/login';

export type LoginTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

/**
 * TC-LOGIN-001
 * Check login elements: login popup + 3 login methods
 */
export async function TC_LOGIN_001(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await checkLoginPopupElements(page, checklistManager);
}

/**
 * TC-LOGIN-002
 * Check LocoBike login elements in registration popup
 */
export async function TC_LOGIN_002(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await checkLocoBikeLogin(page, checklistManager);
}

/**
 * TC-LOGIN-003
 * Fail case: invalid account (username does not exist)
 */
export async function TC_LOGIN_003(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);

  await fillUsernamePassword(page, checklistManager, {
    username: 'RPA-Tester', // invalid username
    password: 'WrongPassword',
  });

  await submitLoginFormInFailedCase(page, checklistManager);

  const errorMessage = await page.waitForSelector('div.sso-message.sso-error', { timeout: 1000 });
  const errorMessageText = await errorMessage.evaluate((el: any) => el.textContent);

  checklistManager.addItemToFile('login', {
    name: 'error message',
    found: !!errorMessage,
    text: errorMessageText,
    url: '',
  });

  if (errorMessageText.includes('User does not exist')) {
    checklistManager.logDirectMessage('login', 'invalid username case correct!');
  } else {
    checklistManager.logDirectMessage('login', 'invalid username case incorrect!');
  }
}

/**
 * TC-LOGIN-004
 * Fail case: wrong password
 */
export async function TC_LOGIN_004(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);

  await fillUsernamePassword(page, checklistManager, {
    username: 'RPA-Tester_1', // valid account
    password: 'WrongPassword',
  });

  await submitLoginFormInFailedCase(page, checklistManager);

  const errorMessage = await page.waitForSelector('div.sso-message.sso-error', { timeout: 1000 });
  const errorMessageText = await errorMessage.evaluate((el: any) => el.textContent);

  checklistManager.addItemToFile('login', {
    name: 'error message',
    found: !!errorMessage,
    text: errorMessageText,
    url: '',
  });

  if (errorMessageText.includes('Invalid password')) {
    checklistManager.logDirectMessage('login', 'invalid password case correct!');
  } else {
    checklistManager.logDirectMessage('login', 'invalid password case incorrect!');
  }
}

/**
 * TC-LOGIN-005
 * Check forgot password elements
 */
export async function TC_LOGIN_005(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await checkForgotPassword(page, checklistManager);
}

/**
 * TC-LOGIN-006
 * Check register elements
 */
export async function TC_LOGIN_006(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);
  await checkRegister(page, checklistManager);
}

/**
 * TC-LOGIN-007
 * Login by email + password (happy path)
 * 假設 email 用同一個欄位 (#sso-username)
 */
export async function TC_LOGIN_007(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openLoginPopup(page, checklistManager);

  await fillUsernamePassword(page, checklistManager, {
    username: 'RPA-Tester_1',
    password: 'sq$w2QuEmu*R#LbKDlCZ2JvP',
  });

  await submitLoginForm(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager);
}

/**
 * TC-LOGIN-008
 * Logout after successful login
 */
export async function TC_LOGIN_008(page: any, checklistManager: ChecklistManager) {
  // Step 1: login successfully 
  await directToHomePage(page, checklistManager);
  // await openLoginPopup(page, checklistManager);

  // await fillUsernamePassword(page, checklistManager, {
  //   username: 'RPA-Tester_1',                          // or email
  //   password: 'sq$w2QuEmu*R#LbKDlCZ2JvP',              // valid password
  // });
  // await submitLoginForm(page, checklistManager);
  // await verifyLoginSuccess(page, checklistManager);

  // Step 2: logout
  await logoutStep(page, checklistManager);
}

/**
 * Registry: which test cases you want to run
 */
export const LOGIN_TEST_CASE_REGISTRY: Record<string, LoginTestCaseFn> = {
  'TC-LOGIN-001': TC_LOGIN_001,
  'TC-LOGIN-002': TC_LOGIN_002,
  'TC-LOGIN-003': TC_LOGIN_003,
  'TC-LOGIN-004': TC_LOGIN_004,
  'TC-LOGIN-005': TC_LOGIN_005,
  'TC-LOGIN-006': TC_LOGIN_006,
  'TC-LOGIN-007': TC_LOGIN_007,
  'TC-LOGIN-008': TC_LOGIN_008,
};