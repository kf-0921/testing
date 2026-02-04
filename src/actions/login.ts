import { ChecklistManager } from '../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../utils/selectorContent';

// login process
async function login(page: any, checklistManager: ChecklistManager) {
  console.log('wait for Login element...');
  
  // check login button
  const loginButtonFound = await checklistManager.checkElement(page, '#nav-login');
  const loginButtonUrl = await getUrlIfLink(page, '#nav-login', loginButtonFound);
  const loginButtonText = await getTextIfExists(page, '#nav-login', loginButtonFound);
  checklistManager.addItemToFile('login', { 
    name: 'login button', 
    found: loginButtonFound,
    text: loginButtonText,
    url: loginButtonUrl
  });
  
  await page.waitForSelector('#nav-login', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Login element is visible!');
  
  //click login button
  page.click('#nav-login');
  await new Promise(resolve => setTimeout(resolve, 2000));

  //username input
  console.log('wait for username input...');
  const usernameInputFound = await checklistManager.checkElement(page, '#sso-username');
  const usernameInputUrl = await getUrlIfLink(page, '#sso-username', usernameInputFound);
  const usernameInputText = await getTextIfExists(page, '#sso-username', usernameInputFound);
  checklistManager.addItemToFile('login', { 
    name: 'username input', 
    found: usernameInputFound,
    text: usernameInputText,
    url: usernameInputUrl
  });
  
  await page.waitForSelector('#sso-username', { timeout: 10000 });
  console.log('typing username...');
  await page.type('#sso-username', 'RPA-Tester_1', { delay: 100 });
  
  //password input
  console.log('typing password...');
  const passwordInputFound = await checklistManager.checkElement(page, '#sso-password');
  const passwordInputUrl = await getUrlIfLink(page, '#sso-password', passwordInputFound);
  const passwordInputText = await getTextIfExists(page, '#sso-password', passwordInputFound);
  checklistManager.addItemToFile('login', { 
    name: 'password input', 
    found: passwordInputFound,
    text: passwordInputText,
    url: passwordInputUrl
  });
  
  await page.type('#sso-password', 'sq$w2QuEmu*R#LbKDlCZ2JvP', { delay: 100 });
  
  //click login submit button
  const loginSubmitFound = await checklistManager.checkElement(page, '#ssoLoginForm > button.sso-submit-btn');
  const loginSubmitUrl = await getUrlIfLink(page, '#ssoLoginForm > button.sso-submit-btn', loginSubmitFound);
  const loginSubmitText = await getTextIfExists(page, '#ssoLoginForm > button.sso-submit-btn', loginSubmitFound);
  checklistManager.addItemToFile('login', { 
    name: 'login submit button', 
    found: loginSubmitFound,
    text: loginSubmitText,
    url: loginSubmitUrl
  });
  
  console.log('click login button...');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('#ssoLoginForm > button.sso-submit-btn')
  ]);
  console.log('login completed!');
}

// verify login
async function verifyLogin(page: any, checklistManager: ChecklistManager) {
  console.log('goto account page...');
  await page.goto('https://poffices.ai/my-account/', {
    waitUntil: 'networkidle0'
  });
  console.log('account page loaded!');
  console.log('wait for Navigation element...');
  
  //wait for navigation element   
  const navElementFound = await checklistManager.checkElement(page, 'nav.woocommerce-MyAccount-navigation');
  const navElementUrl = await getUrlIfLink(page, 'nav.woocommerce-MyAccount-navigation', navElementFound);
  const navElementText = await getTextIfExists(page, 'nav.woocommerce-MyAccount-navigation', navElementFound);
  checklistManager.addItemToFile('login', { 
    name: 'check login element', 
    found: navElementFound,
    text: navElementText,
    url: navElementUrl
  });
  
  await page.waitForSelector('nav.woocommerce-MyAccount-navigation', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Navigation element is visible!');
  //check login success
  console.log('Check login success!');
}

export async function loginStep(page: any, checklistManager: ChecklistManager) {
  await login(page, checklistManager);
  await verifyLogin(page, checklistManager);
}