import { ChecklistManager } from '../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../utils/selectorContent';
import { directAccountPage } from './direct_dropdown/direct_dropdown';

// --- Step 1: Open login pop-up (click login button, popup appears) ---
export async function openLoginPopup(page: any, checklistManager: ChecklistManager) {
  console.log('wait for Login element...');
  const loginButtonFound = await checklistManager.checkElement(page, '#nav-login');
  const loginButtonUrl = await getUrlIfLink(page, '#nav-login', loginButtonFound);
  const loginButtonText = await getTextIfExists(page, '#nav-login', loginButtonFound);
  checklistManager.addItemToFile('login', {
    name: 'login button',
    found: loginButtonFound,
    text: loginButtonText,
    url: loginButtonUrl
  });
  try {
    await page.waitForSelector('#nav-login', { timeout: 10000 });
  } catch {
    console.log('Selector not found');
    return;
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  page.click('#nav-login');
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// --- Step 2: Check login popup UI elements (no typing, no submit) ---
export async function checkLoginPopupElements(page: any, checklistManager: ChecklistManager) {
  console.log('wait for username input...');
  const usernameInputFound = await checklistManager.checkElement(page, '#sso-username');
  const usernameInputText = await getTextIfExists(page, '#sso-username', usernameInputFound);
  checklistManager.addItemToFile('login', { name: 'username input', found: usernameInputFound, text: usernameInputText, url: '' });

  console.log('check password input...');
  const passwordInputFound = await checklistManager.checkElement(page, '#sso-password');
  const passwordInputText = await getTextIfExists(page, '#sso-password', passwordInputFound);
  checklistManager.addItemToFile('login', { name: 'password input', found: passwordInputFound, text: passwordInputText, url: '' });

  const loginSubmitFound = await checklistManager.checkElement(page, '#ssoLoginForm > button.sso-submit-btn');
  const loginSubmitText = await getTextIfExists(page, '#ssoLoginForm > button.sso-submit-btn', loginSubmitFound);
  checklistManager.addItemToFile('login', { name: 'login submit button', found: loginSubmitFound, text: loginSubmitText, url: '' });

  const googleLoginFound = await checklistManager.checkElement(page, 'div#loginModal form.sso-login-form button.google-login-button');
  const googleLoginText = await getTextIfExists(page, 'div#loginModal form.sso-login-form button.google-login-button', googleLoginFound);
  checklistManager.addItemToFile('login', { name: 'google login', found: googleLoginFound, text: googleLoginText, url: '' });

  const locoBikeLoginFound = await checklistManager.checkElement(page, 'div#loginModal form.sso-login-form button.locobike-button');
  const locoBikeLoginText = await getTextIfExists(page, 'div#loginModal form.sso-login-form button.locobike-button', locoBikeLoginFound);
  checklistManager.addItemToFile('login', { name: 'loco bike login', found: locoBikeLoginFound, text: locoBikeLoginText, url: '' });
}

// --- Step 3: Fill username and password (optional: pass empty for empty-field test) ---
export async function fillUsernamePassword(
  page: any,
  checklistManager: ChecklistManager,
  options: { username?: string; password?: string }
) {
  const { username = 'RPA-Tester_1', password = 'sq$w2QuEmum*R#LbKDlCZ2JvP' } = options;
  try {
    await page.waitForSelector('#sso-username', { timeout: 1000 });
  } catch {
    console.log('Selector not found');
    return;
  }
  if (username) await page.type('#sso-username', username, { delay: 100 });
  if (password) await page.type('#sso-password', password, { delay: 100 });
}

// --- Step 4: Submit login form ---
export async function submitLoginForm(page: any, checklistManager: ChecklistManager) {
  try {
    await page.waitForSelector('#ssoLoginForm > button.sso-submit-btn', { timeout: 1000 });
  } catch {
    checklistManager.logDirectMessage('submit login form', 'Selector not found: #ssoLoginForm > button.sso-submit-btn');
    return;
  }
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('#ssoLoginForm > button.sso-submit-btn')
  ]);
  console.log('login submit completed');
}

// --- Step 5: Verify login success (e.g. on my-account) ---
export async function verifyLoginSuccess(page: any, checklistManager: ChecklistManager) {
  console.log('goto account page...');
  await directAccountPage(page, checklistManager);
  const navElementFound = await checklistManager.checkElement(page, 'nav.woocommerce-MyAccount-navigation');
  const navElementText = await getTextIfExists(page, 'nav.woocommerce-MyAccount-navigation', navElementFound);
  checklistManager.addItemToFile('login', {
    name: 'check login element',
    found: navElementFound,
    text: navElementText,
    url: ''
  });
  try {
    await page.waitForSelector('nav.woocommerce-MyAccount-navigation', { timeout: 5000 });
  } catch {
    console.log('Selector not found');
    return;
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Check login success!');
}

// --- Full flow (current loginStep): open → fill (valid) → submit → verify ---
export async function loginStep(page: any, checklistManager: ChecklistManager) {
  await openLoginPopup(page, checklistManager);
  await fillUsernamePassword(page, checklistManager, {});
  await submitLoginForm(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager);
}