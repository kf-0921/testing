import { ChecklistManager } from '../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../utils/selectorContent';

interface LinkConfig {
  selector: string;
  name: string;
  category: string;
}

const footerLinks: LinkConfig[] = [
  { selector: 'div[data-id="4cc4cee"] div.elementor-widget-container div a[href="/"]', name: 'footer home link', category: 'footer' },
  { selector: 'div[data-id="16b0ba3"] a[href="https://hkrnd.com"]', name: 'company link', category: 'footer' },
  { selector: 'div[data-id="16b0ba3"] a[href="https://maps.app.goo.gl/NFJuRtPadmcddJQc6"]', name: 'address link', category: 'footer' },
  { selector: 'div[data-id="16b0ba3"] a[href="mailto:Info@hkrnd.com"]', name: 'email link', category: 'footer' },
  { selector: 'div[data-id="0b1e644"] a[href="/aboutus"]', name: 'about us link', category: 'footer' },
  { selector: 'div[data-id="0b1e644"] a[href="/contact-us"]', name: 'contact us link', category: 'footer' },
  { selector: 'div[data-id="05bb367"] a[href="/privacypolicy"]', name: 'privacy policy link', category: 'footer' },
  { selector: 'div[data-id="05bb367"] a[href="/terms-and-conditions"]', name: 'terms and conditions link', category: 'footer' },
];

async function checkLink(page: any, checklistManager: ChecklistManager, config: LinkConfig) {
  const found = await checklistManager.checkElement(page, config.selector);
  const url = await getUrlIfLink(page, config.selector, found);
  const text = await getTextIfExists(page, config.selector, found);
  
  checklistManager.addItemToFile(config.category, {
    name: config.name,
    found,
    text,
    url
  });
}

async function checkFooter(page: any, checklistManager: ChecklistManager) {
  for (const link of footerLinks) {
    await checkLink(page, checklistManager, link);
  }
}

export async function footerCheck(page: any, checklistManager: ChecklistManager) {
  await checkFooter(page, checklistManager);
}