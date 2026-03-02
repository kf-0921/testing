import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { loginHeaderCheck } from '../../defaultLayout/login_header';
import { footerCheck } from '../../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-DIGITAL-001: page loads with title, description, filter section
const digital001Elements: ElementConfig[] = [
    { selector: 'div.css-1f11l0v h1.css-j95cc2', name: 'title' },
    { selector: 'div.css-1f11l0v h2.css-2sdbyo', name: 'description' },
    { selector: 'div.css-1f11l0v input.css-19yaakh', name: 'search input' },
    { selector: 'div.css-1f11l0v label.css-sk2vgi', name: 'status' },
    { selector: 'div.css-1f11l0v div.css-1xw9sjb', name: 'current status' },
    { selector: 'div.css-1j73i39 li:nth-child(1)', name: 'all status' },
    { selector: 'div.css-1j73i39 li:nth-child(2)', name: 'success' },
    { selector: 'div.css-1j73i39 li:nth-child(3)', name: 'processing' },
    { selector: 'div.css-1j73i39 li:nth-child(4)', name: 'pending' },
    { selector: 'div.css-1j73i39 li:nth-child(5)', name: 'failed' },
    { selector: 'div.css-kbpp77 label.css-94rmli[for="«r3»"]', name: 'from' },
    { selector: 'div.css-kbpp77 label.css-94rmli[for="«r6»"]', name: 'to' },
];

// TC-DIGITAL-002: uploaded file list
const digital002Elements: ElementConfig[] = [
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk button.css-4uqbz6', name: 'download button' },
    { selector: 'div.css-8atqhb div.css-79elbk button.css-2ght9s', name: 'delete button' },
    { selector: 'div.css-8atqhb div.css-79elbk button.css-15ksupa', name: 'expand' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(1)', name: '-' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(2)', name: 'number of pages' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(3)', name: 'number of blocks' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(4)', name: 'number of chars' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(5)', name: 'status' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-gh5r9s div:nth-child(6)', name: 'times used' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);
    checklistManager.addItemToSection('Digital Assets Page', 'Digital Assets Page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkElements(page: any, checklistManager: ChecklistManager, elements: ElementConfig[]) {
    for (const config of elements) {
        await checkElement(page, checklistManager, config);
    }
}

const sectionName = 'Digital Assets Page';

export async function digitalAssetsPageCheckTC001(page: any, checklistManager: ChecklistManager) {
    try {
        await page.waitForSelector('div.css-lg7qn5', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('digital assets page check TC001', 'Selector not found: div.css-lg7qn5');
        return;
    }
    await page.click('div.css-lg7qn5');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await checkElements(page, checklistManager, digital001Elements);
}

export async function digitalAssetsPageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, digital002Elements);
}

export async function digitalAssetsPageCheckTC003(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}

export async function digitalAssetsPageCheck(page: any, checklistManager: ChecklistManager) {
    //clear all filters
    try {
        await page.waitForSelector('div.css-lg7qn5', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('digital assets page check', 'Selector not found: div.css-lg7qn5');
        return;
    }
    await page.click('div.css-lg7qn5');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await checkElements(page, checklistManager, digital001Elements);
    await checkElements(page, checklistManager, digital002Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}