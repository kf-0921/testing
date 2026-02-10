import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';

interface ElementConfig {
  selector: string;
  name: string;
}

const headerElements: ElementConfig[] = [
  { selector: 'a.home-link', name: 'home link' },
  { selector: 'a.history-link', name: 'history link' },
  { selector: 'a.digital-assets-link', name: 'digital assets link' },
  { selector: 'div.language-switcher', name: 'language switcher' },
  { selector: 'div.language-dropdown', name: 'language dropdown' },
  { selector: 'div.language-options a[href*="https://poffices.ai/zh-hant/"]', name: 'traditional chinese language link' },
  { selector: 'div.language-options a[href="#"]', name: 'english language link' },
];

const dropdownElements: ElementConfig[] = [
  //{ selector: 'div.nav-user-dropdown', name: 'user dropdown' },
  { selector: 'span.nav-user-name-1', name: 'user name' },
 // { selector: 'div#navDropdownMenu', name: 'dropdown menu' },
  { selector: 'span.nav-user-name', name: 'user name in dropdown' },
  { selector: 'a.nav-quota-item', name: 'quota item' },
  { selector: 'a#nav-dropdown-server', name: 'server link' },
  { selector: 'a#nav-dropdown-blog', name: 'blog link' },
  { selector: 'a#nav-dropdown-plan', name: 'plan link' },
  { selector: 'a#nav-dropdown-enterprise', name: 'enterprise link' },
  { selector: 'a#nav-dropdown-news', name: 'news link' },
  { selector: 'a#nav-dropdown-faq', name: 'faq link' },
  { selector: 'a#nav-dropdown-account', name: 'account link' },
  { selector: 'a#nav-dropdown-payment', name: 'payment link' },
  { selector: 'a#navLogoutButton', name: 'logout button' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig, fileName: string) {
  const found = await checklistManager.checkElement(page, config.selector);
  const url = await getUrlIfLink(page, config.selector, found);
  const text = await getTextIfExists(page, config.selector, found);
  
  checklistManager.addItemToSection(fileName, 'header', {
    name: config.name,
    found,
    text,
    url
  });
}

async function checkHeader(page: any, checklistManager: ChecklistManager, fileName: string) {
  for (const element of headerElements) {
    await checkElement(page, checklistManager, element, fileName);
  }
}

async function checkUserDropdown(page: any, checklistManager: ChecklistManager, fileName: string) {
  // Check user dropdown and user name before opening dropdown
  await checkElement(page, checklistManager, dropdownElements[0], fileName); // user dropdown
  await checkElement(page, checklistManager, dropdownElements[1], fileName); // user name

  // Get username from avatar alt text
  let username = '';
  try {
    const avatarFound = await checklistManager.checkElement(page, 'div.nav-user-avatar-trigger img');
    if (avatarFound) {
      const altText = await page.$eval(
        'div.nav-user-avatar-trigger img',
        (el: any) => el.getAttribute('alt')
      );
      username = altText.replace("'s avatar", '');
    }
  } catch (error) {
    console.warn('Could not get avatar alt text:', error);
  }

  // Click dropdown to open menu
  await page.click('div.nav-user-dropdown');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check avatar with extracted username
  const avatarFound = await checklistManager.checkElement(page, 'div.nav-user-avatar-trigger img');
  const avatarUrl = await getUrlIfLink(page, 'div.nav-user-avatar-trigger img', avatarFound);
  checklistManager.addItemToSection(fileName, 'header', {
    name: 'user name from avatar',
    found: avatarFound,
    text: username,
    url: avatarUrl
  });

  // Check remaining dropdown elements (skip first 2 as they're already checked)
  for (const element of dropdownElements.slice(2)) {
    await checkElement(page, checklistManager, element, fileName);
  }
}

export async function loginHeaderCheck(page: any, checklistManager: ChecklistManager, fileName: string = 'login header') {
  await checkHeader(page, checklistManager, fileName);
  await checkUserDropdown(page, checklistManager, fileName);
}