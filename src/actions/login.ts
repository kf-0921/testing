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
  await page.click('#nav-login');
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// --- Step 2: Check login popup UI elements (no typing, no submit) ---
export async function checkLoginPopupElements(page: any, checklistManager: ChecklistManager) {
  console.log('wait for username input...');
  const usernameInputFound = await checklistManager.checkElement(page, '#sso-username');
  const usernameInputText = await getTextIfExists(page, '#sso-username', usernameInputFound);
  checklistManager.addItemToFile('login', {
    name: 'username input',
    found: usernameInputFound,
    text: usernameInputText,
    url: ''
  });

  console.log('check password input...');
  const passwordInputFound = await checklistManager.checkElement(page, '#sso-password');
  const passwordInputText = await getTextIfExists(page, '#sso-password', passwordInputFound);
  checklistManager.addItemToFile('login', {
    name: 'password input',
    found: passwordInputFound,
    text: passwordInputText,
    url: ''
  });

  const loginSubmitFound = await checklistManager.checkElement(
    page,
    '#ssoLoginForm > button.sso-submit-btn'
  );
  const loginSubmitText = await getTextIfExists(
    page,
    '#ssoLoginForm > button.sso-submit-btn',
    loginSubmitFound
  );
  checklistManager.addItemToFile('login', {
    name: 'login submit button',
    found: loginSubmitFound,
    text: loginSubmitText,
    url: ''
  });

  const googleLoginFound = await checklistManager.checkElement(
    page,
    'div#loginModal form.sso-login-form button.google-login-button'
  );
  const googleLoginText = await getTextIfExists(
    page,
    'div#loginModal form.sso-login-form button.google-login-button',
    googleLoginFound
  );
  checklistManager.addItemToFile('login', {
    name: 'google login',
    found: googleLoginFound,
    text: googleLoginText,
    url: ''
  });

  const locoBikeLoginFound = await checklistManager.checkElement(
    page,
    'div#loginModal form.sso-login-form button.locobike-button'
  );
  const locoBikeLoginText = await getTextIfExists(
    page,
    'div#loginModal form.sso-login-form button.locobike-button',
    locoBikeLoginFound
  );
  checklistManager.addItemToFile('login', {
    name: 'loco bike login',
    found: locoBikeLoginFound,
    text: locoBikeLoginText,
    url: ''
  });
}

// --- Step 3: Fill username and password (optional: pass empty for empty-field test) ---
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
    page.click('#ssoLoginForm > button.sso-submit-btn')
  ]);
  console.log('login submit completed');
}

// --- Step 5: Verify login success (e.g. on my-account) ---
export async function verifyLoginSuccess(page: any, checklistManager: ChecklistManager) {
  console.log('goto account page...');
  await directAccountPage(page, checklistManager);
  const navElementFound = await checklistManager.checkElement(
    page,
    'nav.woocommerce-MyAccount-navigation'
  );
  const navElementText = await getTextIfExists(
    page,
    'nav.woocommerce-MyAccount-navigation',
    navElementFound
  );
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

// Google login flow (目前仍是簡化版，實際流程依你的環境再調整)
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

export async function checkLocoBikeLogin(page: any, checklistManager: ChecklistManager) {
  // 1) Wait for and click LocoBike login button
  try {
    await page.waitForSelector('button.locobike-button', { timeout: 3000 });
  } catch {
    checklistManager.logDirectMessage('login', 'Selector not found: button.locobike-button');
    return;
  }

  const locoBikeLoginFound = await checklistManager.checkElement(page, 'button.locobike-button');
  const locoBikeLoginText = await getTextIfExists(
    page,
    'button.locobike-button',
    locoBikeLoginFound
  );
  checklistManager.addItemToFile('login', {
    name: 'loco bike login button',
    found: locoBikeLoginFound,
    text: locoBikeLoginText,
    url: ''
  });

  await page.click('button.locobike-button');
  await new Promise(resolve => setTimeout(resolve, 1000));

  async function checkLocoElement(
    name: string,
    selector: string,
    isLink: boolean = false
  ) {
    const found = await checklistManager.checkElement(page, selector);
    const text = await getTextIfExists(page, selector, found);
    const url = isLink ? await getUrlIfLink(page, selector, found) : '';

    checklistManager.addItemToFile('login', {
      name,
      found,
      text,
      url,
    });
  }

  // 2) Check all detailed elements inside LocoBike registration form
  await checkLocoElement('loco bike registration title', 'form#ssoLocoBikeForm span:nth-child(1)');
  await checkLocoElement('important note', 'form#ssoLocoBikeForm span:nth-child(3)');
  await checkLocoElement('important note step 1', 'form#ssoLocoBikeForm li:nth-child(1)');
  await checkLocoElement('important note step 2', 'form#ssoLocoBikeForm li:nth-child(2)');

  await checkLocoElement('phone number label', 'form#ssoLocoBikeForm div:nth-child(3) label');
  await checkLocoElement('phone number input', 'form#ssoLocoBikeForm div:nth-child(3) input');

  await checkLocoElement('email label', 'form#ssoLocoBikeForm div:nth-child(4) label');
  await checkLocoElement('email input', 'form#ssoLocoBikeForm div:nth-child(4) input');

  await checkLocoElement('password label', 'form#ssoLocoBikeForm div:nth-child(5) label');
  await checkLocoElement('password input', 'form#ssoLocoBikeForm div:nth-child(5) input');

  await checkLocoElement('confirm password label', 'form#ssoLocoBikeForm div:nth-child(6) label');
  await checkLocoElement('confirm password input', 'form#ssoLocoBikeForm div:nth-child(6) input');

  await checkLocoElement('submit button', 'form#ssoLocoBikeForm button[type="submit"]');

  await checkLocoElement('terms notice', 'form#ssoLocoBikeForm div.sso-terms-notice');
  await checkLocoElement(
    'terms notice link 1',
    'form#ssoLocoBikeForm div.sso-terms-notice a:nth-child(1)',
    true,
  );
  await checkLocoElement(
    'terms notice link 2',
    'form#ssoLocoBikeForm div.sso-terms-notice a:nth-child(2)',
    true,
  );

  await checkLocoElement(
    'back to login button',
    'form#ssoLocoBikeForm button[onclick="backToLogin()"]'
  );

  // 3) Click back to login
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

export async function logoutStep(page: any, checklistManager: ChecklistManager) {
  // 1. register a one-time dialog handler to avoid race condition
  page.once('dialog', async (dialog: any) => {
    console.log('Logout confirm dialog text:', dialog.message());
    await dialog.accept(); // equivalent to click OK
  });

  // 2. click user dropdown
  await page.waitForSelector('div.nav-user-dropdown', { timeout: 3000 });
  await page.click('div.nav-user-dropdown');

  // 3. click logout button（依實際 selector 調整）
  await page.waitForSelector('a[id="navLogoutButton"]', { timeout: 3000 }).catch(() => {});
  await page.click('a[id="navLogoutButton"]');

  // 4. wait for page navigation
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 5. check login button visible
  const loginButtonFound = await checklistManager.checkElement(page, '#nav-login');
  checklistManager.addItemToFile('login', {
    name: 'after logout, login button visible',
    found: loginButtonFound,
    text: '',
    url: ''
  });
}

type ElementConfig = {
  name: string;
  selector: string;
};

async function checkLoginElement(
  page: any,
  checklistManager: ChecklistManager,
  config: ElementConfig
) {
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

export async function checkForgotPassword(page: any, checklistManager: ChecklistManager) {
  // 1) 先檢查「忘記密碼」連結
  const linkConfig: ElementConfig = {
    name: 'forgot password link',
    selector: 'a.forgot-password-link',
  };

  const linkFound = await checkLoginElement(page, checklistManager, linkConfig);
  if (!linkFound) {
    checklistManager.logDirectMessage('login', 'forgot password link not found');
    return;
  }

  // 2) 點擊連結，打開表單
  await page.click(linkConfig.selector);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 3) 用同一個 helper 檢查表單裡的幾個關鍵元素
  const elementsToCheck: ElementConfig[] = [
    { name: 'forgot password form label', selector: 'form#ssoRecoveryForm label' },
    { name: 'forgot password form input', selector: 'form#ssoRecoveryForm input' },
    { name: 'forgot password submit button', selector: 'form#ssoRecoveryForm button' },
    { name: 'forgot password back-to-login link', selector: 'form#ssoRecoveryForm a' },
  ];

  for (const config of elementsToCheck) {
    await checkLoginElement(page, checklistManager, config);
  }
}

export async function checkRegister(page: any, checklistManager: ChecklistManager) {
  // 1) 先檢查「註冊」按鈕
  const linkConfig: ElementConfig = {
    name: 'register button',
    selector: 'button[onclick="showRegisterModal()"]',
  };

  const linkFound = await checkLoginElement(page, checklistManager, linkConfig);
  if (!linkFound) {
    checklistManager.logDirectMessage('login', 'register button not found');
    return;
  }

  // 2) 點擊按鈕，打開註冊表單
  await page.click(linkConfig.selector);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 3) 檢查註冊表單元素
  const elementsToCheck: ElementConfig[] = [
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

  for (const config of elementsToCheck) {
    await checkLoginElement(page, checklistManager, config);
  }
}

// --- Full flow (current loginStep): open → fill (valid) → submit → verify ---
export async function loginStep(page: any, checklistManager: ChecklistManager) {
  await openLoginPopup(page, checklistManager);
  await fillUsernamePassword(page, checklistManager, {});
  await submitLoginForm(page, checklistManager);
  await verifyLoginSuccess(page, checklistManager);
}