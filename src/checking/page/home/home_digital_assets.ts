import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';


interface ElementConfig {
    selector: string;
    name: string;
}
// TC-HOME-DIGITAL-001: digital assets dialog (title, cancel button, apply button)
const homeDigital001Elements: ElementConfig[] = [
    { selector: 'div#settings-digital-assets h5.settings-modal-title', name: 'digital assets title' },
    { selector: 'button#digital-assets-cancel-btn', name: 'cancel button' },
    { selector: 'button#digital-assets-ok-btn', name: 'apply button' },
];

// TC-HOME-DIGITAL-002: digital assets dialog (enable section)
const homeDigital002Elements: ElementConfig[] = [
    { selector: 'div#settings-digital-assets span.da-enable-label', name: 'enable label' },
    { selector: 'div#settings-digital-assets span.da-enable-hint', name: 'enable hint' },
    { selector: 'div#settings-digital-assets span.slider', name: 'slider' },
];

// TC-HOME-DIGITAL-003: digital assets dialog (search input, agent list, office section)
const homeDigital003Elements: ElementConfig[] = [
    { selector: 'div.da-section-header', name: 'Date Range' },
    { selector: 'div.da-presets button:nth-child(1)', name: '1 Month' },
    { selector: 'div.da-presets button:nth-child(2)', name: '3 Months' },
    { selector: 'div.da-presets button:nth-child(3)', name: '6 Months' },
    { selector: 'div.da-presets button:nth-child(4)', name: '1 Year' },
    { selector: 'div.da-presets button:nth-child(5)', name: 'Custom' },
    { selector: 'div.da-date-inputs label[for="digital-assets-start-date"]', name: 'From' },
    { selector: 'input#digital-assets-start-date', name: 'start date input' },
    { selector: 'span.da-date-separator i', name: '->' },
    { selector: 'div.da-date-inputs label[for="digital-assets-end-date"]', name: 'end date input' },
    { selector: 'input#digital-assets-end-date', name: 'end date input' },
];




async function checkElements(page: any, checklistManager: ChecklistManager, elements: ElementConfig[]) {
    for (const config of elements) {
        const found = await checklistManager.checkElement(page, config.selector);
        const url = await getUrlIfLink(page, config.selector, found);
        const text = await getTextIfExists(page, config.selector, found);
        checklistManager.addItemToSection(sectionName, 'Home Page', {
            name: config.name,
            found,
            text,
            url
        });
    }
}

const sectionName = 'Home Page';

export async function homeDigitalAssetsCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeDigital001Elements);
}

export async function homeDigitalAssetsCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeDigital002Elements);
}

export async function homeDigitalAssetsCheckTC003(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeDigital003Elements);
}

export async function homeDigitalAssetsCheck(page: any, checklistManager: ChecklistManager) {
    await homeDigitalAssetsCheckTC001(page, checklistManager);
    await homeDigitalAssetsCheckTC002(page, checklistManager);
    await homeDigitalAssetsCheckTC003(page, checklistManager);
}