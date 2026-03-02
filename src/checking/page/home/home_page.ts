import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { loginHeaderCheck } from '../../defaultLayout/login_header';
import { footerCheck } from '../../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-HOME-001: page loads with welcome image, title, and main content
const home001Elements: ElementConfig[] = [
    { selector: 'rs-layer#slider-9-slide-26-layer-8 img', name: 'welcome image' },
    { selector: 'rs-layer#slider-9-slide-26-layer-13', name: 'title' },
    { selector: 'textarea#background-info', name: 'text area' },
];

// TC-HOME-002: main home page controls (private, agent master, digital assets, file upload, submit)
const home002Elements: ElementConfig[] = [
    { selector: 'label[for="enable-history"]', name: 'private button' },
    { selector: 'label[for="agent-manager-mode"]', name: 'agent master' },
    { selector: 'label[for="digital-assets-mode"]', name: 'digital assets' },
    { selector: 'label[for="file-input"]', name: 'file upload' },
    { selector: 'button[data-bs-toggle="tooltip"]', name: 'submit button' },
    { selector: 'div.disclaimer', name: 'disclaimer' },
    { selector: 'div.disclaimer a', name: 'T&C' },
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

export async function homePageCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, home001Elements);

}

export async function homePageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, home002Elements);

}

export async function homePageCheck(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, home001Elements);
    await checkElements(page, checklistManager, home002Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}