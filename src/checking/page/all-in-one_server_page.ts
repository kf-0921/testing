import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { directAccountPage } from '../../actions/direct_dropdown/direct_dropdown';

type ElementConfig = {
  name: string;
  selector: string;
};

// 共用：在 login 區裡檢查一個元素並寫入 checklist
async function checkLoginElement(
  page: any,
  checklistManager: ChecklistManager,
  config: ElementConfig,
): Promise<boolean> {
  const found = await checklistManager.checkElement(page, config.selector);
  const url = await getUrlIfLink(page, config.selector, found);
  const text = await getTextIfExists(page, config.selector, found);

  checklistManager.addItemToFile('login', {
    name: config.name,
    found,
    text,
    url,
  });

  return found;
}

// --- Step 1: Open login pop-up ---
export async function openLoginPopup(page: any, checklistManager: ChecklistManager) {
  console.log('wait for Login element...');

  await checkLoginElement(page, checklistManager, {
    name: 'login button',
    selector: '#nav-login',
  });

  try {
    await page.waitForSelector('#nav-login', { timeout: 10000 });
  } catch {
    console.log('Selector not found');
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.click('#nav-login');
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// --- Step 2: Check login popup UI elements (no typing, no submit) ---
export async function checkLoginPopupElements(page: any, checklistManager: ChecklistManager) {
  console.log('wait for username input...');

  const elements: ElementConfig[] = [
    { name: 'username input', selector: '#sso-username' },
    { name: 'password input', selector: '#sso-password' },
    { name: 'login submit button', selector: '#ssoLoginForm > button.sso-submit-btn' },
    { name: 'google login', selector: 'div#loginModal form.sso-login-form button.google-login-button' },
    { name: 'loco bike login', selector: 'div#loginModal form.sso-login-form button.locobike-button' },
  ];

  for (const cfg of elements) {
    await checkLoginElement(page, checklistManager, cfg);
  }
}

// --- Step 3: Fill username and password ---
export async function fillUsernamePassword(
  page: any,
  checklistManager: ChecklistManager,
  options: { username?: string; password?: string }
) {
  const { username = 'RPA-Tester_1', password = 'sq$w2QuEmu*R#LbKDlCZ2JvP' } = options;
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
    checklistManager.logDirectMessage(
      'submit login form',
      'Selector not found: #ssoLoginForm > button.sso-submit-btn'
    );
    return;
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('#ssoLoginForm > button.sso-submit-btn'),
  ]);
  console.log('login submit completed');
}

// --- Step 5: Verify login success ---
export async function verifyLoginSuccess(page: any, checklistManager: ChecklistManager) {
  console.log('goto account page...');
  await directAccountPage(page, checklistManager);

  await checkLoginElement(page, checklistManager, {
    name: 'check login element',
    selector: 'nav.woocommerce-MyAccount-navigation',
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

// Submit used in fail cases (no waitForNavigation)
export async function submitLoginFormInFailedCase(page: any, checklistManager: ChecklistManager) {
  try {
    await page.waitForSelector('#ssoLoginForm > button.sso-submit-btn', { timeout: 1000 });
  } catch {
    checklistManager.logDirectMessage(
      'submit login form',
      'Selector not found: #ssoLoginForm > button.sso-submit-btn'
    );
    return;
  }

  await page.click('#ssoLoginForm > button.sso-submit-btn');
  console.log('login submit completed (failed case)');
}

// Google login flow（保留原邏輯，未額外用 helper）
export async function fillGoogleLogin(page: any, checklistManager: ChecklistManager) {
  try {
    await page.waitForSelector('iframe[allow="identity-credentials-get"]', { timeout: 10000 });
  } catch {
    checklistManager.logDirectMessage(
      'login',
      'Selector not found: iframe[allow="identity-credentials-get"]'
    );
    return;
  }
  await page.click('iframe[allow="identity-credentials-get"]');
  await new Promise(resolve => setTimeout(resolve, 1000));

  const MAX_RETRY = 5;

  for (let attempt = 0; attempt < MAX_RETRY; attempt++) {
    await page.type('input[type="email"]', '56360036a@gmail.com', { delay: 100 });
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const tryAgainHandle = await page.$('a[aria-label="Try again"]');
    if (!tryAgainHandle) {
      console.log('No "Try again" button found, stop retry loop.');
      break;
    }

    console.log(`"Try again" button found, retry attempt #${attempt + 1}...`);
    const box = await tryAgainHandle.boundingBox();
    if (box) {
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y, { steps: 10 });
      await new Promise(r => setTimeout(r, 300));
      await page.mouse.click(x, y);
    } else {
      await tryAgainHandle.click();
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  await page.type('input[type="password"]', '123456', { delay: 100 });
  await new Promise(resolve => setTimeout(resolve, 100000));
}

// LocoBike registration/login UI checking
export async function checkLocoBikeLogin(page: any, checklistManager: ChecklistManager) {
  try {
    await page.waitForSelector('button.locobike-button', { timeout: 3000 });
  } catch {
    checklistManager.logDirectMessage('login', 'Selector not found: button.locobike-button');
    return;
  }

  await checkLoginElement(page, checklistManager, {
    name: 'loco bike login button',
    selector: 'button.locobike-button',
  });

  await page.click('button.locobike-button');
  await new Promise(resolve => setTimeout(resolve, 1000));

  const elements: ElementConfig[] = [
    { name: 'loco bike registration title', selector: 'form#ssoLocoBikeForm span:nth-child(1)' },
    { name: 'important note', selector: 'form#ssoLocoBikeForm span:nth-child(3)' },
    { name: 'important note step 1', selector: 'form#ssoLocoBikeForm li:nth-child(1)' },
    { name: 'important note step 2', selector: 'form#ssoLocoBikeForm li:nth-child(2)' },
    { name: 'phone number label', selector: 'form#ssoLocoBikeForm div:nth-child(3) label' },
    { name: 'phone number input', selector: 'form#ssoLocoBikeForm div:nth-child(3) input' },
    { name: 'email label', selector: 'form#ssoLocoBikeForm div:nth-child(4) label' },
    { name: 'email input', selector: 'form#ssoLocoBikeForm div:nth-child(4) input' },
    { name: 'password label', selector: 'form#ssoLocoBikeForm div:nth-child(5) label' },
    { name: 'password input', selector: 'form#ssoLocoBikeForm div:nth-child(5) input' },
    { name: 'confirm password label', selector: 'form#ssoLocoBikeForm div:nth-child(6) label' },
    { name: 'confirm password input', selector: 'form#ssoLocoBikeForm div:nth-child(6) input' },
    { name: 'submit button', selector: 'form#ssoLocoBikeForm button[type="submit"]' },
    { name: 'terms notice', selector: 'form#ssoLocoBikeForm div.sso-terms-notice' },
    { name: 'terms notice link 1', selector: 'form#ssoLocoBikeForm div.sso-terms-notice a:nth-child(1)' },
    { name: 'terms notice link 2', selector: 'form#ssoLocoBikeForm div.sso-terms-notice a:nth-child(2)' },
    { name: 'back to login button', selector: 'form#ssoLocoBikeForm button[onclick="backToLogin()"]' },
  ];

  for (const cfg of elements) {
    await checkLoginElement(page, checklistManager, cfg);
  }

  try {
    await page.click('form#ssoLocoBikeForm button[onclick="backToLogin()"]');
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch {
    checklistManager.logDirectMessage(
      'login',
      'Failed to click back to login button in LocoBike form'
    );
  }
}

// Logout flow with confirm dialog
export async function logoutStep(page: any, checklistManager: ChecklistManager) {
  page.once('dialog', async (dialog: any) => {
    console.log('Logout confirm dialog text:', dialog.message());
    await dialog.accept();
  });

  await page.waitForSelector('div.nav-user-dropdown', { timeout: 3000 });
  await page.click('div.nav-user-dropdown');

  await page.waitForSelector('a[id="navLogoutButton"]', { timeout: 3000 }).catch(() => {});
  await page.click('a[id="navLogoutButton"]');

  await new Promise(resolve => setTimeout(resolve, 2000));

  await checkLoginElement(page, checklistManager, {
    name: 'after logout, login button visible',
    selector: '#nav-login',
  });
}

// Forgot password flow
export async function checkForgotPassword(page: any, checklistManager: ChecklistManager) {
  const linkConfig: ElementConfig = {
    name: 'forgot password link',
    selector: 'a.forgot-password-link',
  };

  const linkFound = await checkLoginElement(page, checklistManager, linkConfig);
  if (!linkFound) {
    checklistManager.logDirectMessage('login', 'forgot password link not found');
    return;
  }

  await page.click(linkConfig.selector);
  await new Promise(resolve => setTimeout(resolve, 1000));

  const elements: ElementConfig[] = [
    { name: 'forgot password form label', selector: 'form#ssoRecoveryForm label' },
    { name: 'forgot password form input', selector: 'form#ssoRecoveryForm input' },
    { name: 'forgot password submit button', selector: 'form#ssoRecoveryForm button' },
    { name: 'forgot password back-to-login link', selector: 'form#ssoRecoveryForm a' },
  ];

  for (const cfg of elements) {
    await checkLoginElement(page, checklistManager, cfg);
  }
}

// Register form checking
export async function checkRegister(page: any, checklistManager: ChecklistManager) {
  const linkConfig: ElementConfig = {
    name: 'register button',
    selector: 'button[onclick="showRegisterModal()"]',
  };

  const linkFound = await checkLoginElement(page, checklistManager, linkConfig);
  if (!linkFound) {
    checklistManager.logDirectMessage('login', 'register button not found');
    return;
  }

  await page.click(linkConfig.selector);
  await new Promise(resolve => setTimeout(resolve, 1000));

  const elements: ElementConfig[] = [
    { name: 'user name label', selector: 'form#ssoRegisterForm div:nth-child(3) label' },
    { name: 'user name input', selector: 'form#ssoRegisterForm div:nth-child(3) input' },
    { name: 'email label', selector: 'form#ssoRegisterForm div:nth-child(4) label' },
    { name: 'email input', selector: 'form#ssoRegisterForm div:nth-child(4) input' },
    { name: 'password label', selector: 'form#ssoRegisterForm div:nth-child(5) label' },
    { name: 'password input', selector: 'form#ssoRegisterForm div:nth-child(5) input' },
    { name: 'confirm password label', selector: 'form#ssoRegisterForm div:nth-child(6) label' },
    { name: 'confirm password input', selector: 'form#ssoRegisterForm div:nth-child(6) input' },
    { name: 'register submit button', selector: 'form#ssoRegisterForm button.sso-submit-btn' },
    { name: 'google register button', selector: 'form#ssoRegisterForm button.google-login-button' },
    { name: 'terms notice', selector: 'form#ssoRegisterForm div.sso-terms-notice' },
    {
      name: 'terms notice link 1',
      selector: 'form#ssoRegisterForm div.sso-terms-notice a:nth-child(1)'
    },
    {
      name: 'terms notice link 2',
      selector: 'form#ssoRegisterForm div.sso-terms-notice a:nth-child(2)'
    },
    { name: 'back to login button', selector: 'form#ssoRegisterForm button.auth-switch-btn' },
  ];

  for (const cfg of elements) {
    await checkLoginElement(page, checklistManager, cfg);
  }
}

// --- Full flow: open → fill (valid) → submit → verify ---
export async function loginStep(page: any, checklistManager: ChecklistManager) {
  await openLoginPopup(page, checklistManager);
  await fillUsernamePassword(page, checklistManager, {});
  await submitLoginForm(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager);
}