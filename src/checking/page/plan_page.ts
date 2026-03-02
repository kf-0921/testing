import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { footerCheck } from '../defaultLayout/footer';
import { loginHeaderCheck } from '../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-PLAN-001 verify basic plan elements are visible
const plan001Elements: ElementConfig[] = [
    { selector: 'div[data-id="90e3c93"] div.elementor-price-table__header', name: 'Basic Header' },
    { selector: 'div[data-id="90e3c93"] span.elementor-price-table__integer-part', name: 'Basic Price' },
    { selector: 'div[data-id="90e3c93"] span.elementor-price-table__period', name: 'Basic Price Description' },
    { selector: 'div[data-id="90e3c93"] li.elementor-repeater-item-436faf2', name: 'Basic Credits' },
    { selector: 'div[data-id="90e3c93"] li.elementor-repeater-item-76ed5a1', name: 'Basic PDF' },
    { selector: 'div[data-id="90e3c93"] li.elementor-repeater-item-172ad62', name: 'Basic DOCX' },
    { selector: 'div[data-id="90e3c93"] li.elementor-repeater-item-2ef0511', name: 'Basic PPTX' },
    { selector: 'div[data-id="90e3c93"] li.elementor-repeater-item-d92f08a', name: 'Basic User' },
    { selector: 'div[data-id="90e3c93"] a.elementor-price-table__button', name: 'Basic Register Now' },
];

// TC-PLAN-002 verify regular plan elements are visible
const plan002Elements: ElementConfig[] = [
    { selector: 'div[data-id="05f1227"] div.elementor-price-table__header', name: 'Regular Header' },
    { selector: 'div[data-id="05f1227"] span.elementor-price-table__integer-part', name: 'Regular Price' },
    { selector: 'div[data-id="05f1227"] span.elementor-price-table__period', name: 'Regular Price Description' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-76ed5a1', name: 'Regular Credits' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-7084e0b', name: 'Regular PDF' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-ed552dc', name: 'Regular DOCX' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-b097505', name: 'Regular PPTX' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-eaefe36', name: 'Regular per credit' },
    { selector: 'div[data-id="05f1227"] li.elementor-repeater-item-2b38867', name: 'Regular User' },
    { selector: 'div[data-id="05f1227"] a.elementor-price-table__button', name: 'Regular Buy Now' },
];

// TC-PLAN-003 verify professional plan elements are visible
const plan003Elements: ElementConfig[] = [
    { selector: 'div[data-id="2235d12"] div.elementor-price-table__header', name: 'Professional Header' },
    { selector: 'div[data-id="2235d12"] span.elementor-price-table__integer-part', name: 'Professional Price' },
    { selector: 'div[data-id="2235d12"] span.elementor-price-table__period', name: 'Professional Price Description' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-76ed5a1', name: 'Professional Credits per month' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-ab94c8d', name: 'Professional Total credits' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-d400bb3', name: 'Professional PDF' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-ed552dc', name: 'Professional DOCX' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-01c8a0c', name: 'Professional PPTX' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-3a09243', name: 'Professional per credit' },
    { selector: 'div[data-id="2235d12"] li.elementor-repeater-item-9d5af87', name: 'Professional User' },
    { selector: 'div[data-id="2235d12"] a.elementor-price-table__button', name: 'Professional Buy Now' },
];

// TC-PLAN-004 verify enterprise plan elements are visible
const plan004Elements: ElementConfig[] = [
    { selector: 'div[data-id="5a7948d"] div.elementor-price-table__header', name: 'Enterprise Header' },
    { selector: 'div[data-id="5a7948d"] span.elementor-price-table__integer-part', name: 'Enterprise Price' },
    { selector: 'div[data-id="5a7948d"] span.elementor-price-table__period', name: 'Enterprise Price Description' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-76ed5a1', name: 'Enterprise Credits per month' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-3ab46c9', name: 'Enterprise Total credits' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-1bab1bd', name: 'Enterprise PDF' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-ed552dc', name: 'Enterprise DOCX' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-dd0742c', name: 'Enterprise PPTX' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-436faf2', name: 'Enterprise per credit' },
    { selector: 'div[data-id="5a7948d"] li.elementor-repeater-item-ff06709', name: 'Enterprise User' },
    { selector: 'div[data-id="5a7948d"] li:nth-child(8)', name: 'Enterprise Share User' },
    { selector: 'div[data-id="5a7948d"] a.elementor-price-table__button', name: 'Enterprise Buy Now' },
];

// TC-PLAN-005 verify remark elements are visible
const plan005Elements: ElementConfig[] = [
    { selector: 'div[data-id="bd567ac"] strong:nth-child(1)', name: 'Remark' },
    { selector: 'div[data-id="bd567ac"] strong:nth-child(3)', name: 'Credit Usage' },
    { selector: 'div[data-id="bd567ac"] strong:nth-child(5)', name: 'Download Charges' },
    { selector: 'div[data-id="bd567ac"] strong:nth-child(7)', name: 'Credit Validity' },
    { selector: 'div[data-id="bd567ac"] strong:nth-child(9)', name: 'Auto-Renewal' },
    { selector: 'div[data-id="bd567ac"] strong:nth-child(11)', name: 'Monthly Credit Reset' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Plan Page', 'Plan Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkPlanPage(page: any, checklistManager: ChecklistManager) {
    for (const element of plan001Elements) {
        await checkElement(page, checklistManager, element);
    }
    for (const element of plan002Elements) {
        await checkElement(page, checklistManager, element);
    }
    for (const element of plan003Elements) {
        await checkElement(page, checklistManager, element);
    }
    for (const element of plan004Elements) {
        await checkElement(page, checklistManager, element);
    }
    for (const element of plan005Elements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function plan001Check(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
}

export async function plan002Check(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
}

export async function plan003Check(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
}
export async function plan004Check(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
}
export async function plan005Check(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
}

export async function plan006Check(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, 'Plan Page');
    await footerCheck(page, checklistManager, 'Plan Page');
}
export async function planPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkPlanPage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Plan Page');
    await footerCheck(page, checklistManager, 'Plan Page');
}