import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { loginHeaderCheck } from '../defaultLayout/login_header';
import { footerCheck } from '../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}

const headerElements: ElementConfig[] = [
    { selector: 'div.css-1f11l0v h1.css-j95cc2', name: 'title' },
    { selector: 'div.css-1f11l0v h2.css-2sdb', name: 'description' },
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
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 h6.css-ezdrjy', name: 'extracted segments' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-9szet5', name: 'reload button' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-xz9haa', name: 'close button' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },
    { selector: 'div.css-8atqhb div.css-79elbk h6.css-1ur3k42', name: 'file upload' },

    { selector: 'button[data-bs-toggle="tooltip"]', name: 'submit button' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('home page', 'home page', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkHomePage(page: any, checklistManager: ChecklistManager) {
    for (const element of headerElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function homePageCheck(page: any, checklistManager: ChecklistManager) {
    await checkHomePage(page, checklistManager);
    await loginHeaderCheck(page, checklistManager, 'home page');
    await footerCheck(page, checklistManager, 'home page');
}