import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { loginHeaderCheck } from '../defaultLayout/login_header';
import { footerCheck } from '../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

const homePageElements: ElementConfig[] = [
    { selector: 'rs-layer#slider-9-slide-26-layer-8 img', name: 'welcome image' },
    { selector: 'rs-layer#slider-9-slide-26-layer-13', name: 'title' },
    { selector: 'textarea#background-info', name: 'text area' },
    { selector: 'label[for="enable-history"]', name: 'private button' },
    { selector: 'label[for="agent-manager-mode"]', name: 'agent master' },
    { selector: 'label[for="digital-assets-mode"]', name: 'digital assets' },
    { selector: 'label[for="file-input', name: 'file upload' },
    { selector: 'button[data-bs-toggle="tooltip"]', name: 'submit button' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Home Page', 'Home Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkHomePage(page: any, checklistManager: ChecklistManager) {
    for (const element of homePageElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function homePageCheck(page: any, checklistManager: ChecklistManager) {
    await checkHomePage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'Home Page');
    await footerCheck(page, checklistManager, 'Home Page');
}