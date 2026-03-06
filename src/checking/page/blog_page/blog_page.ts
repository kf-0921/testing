import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { footerCheck } from '../../defaultLayout/footer';
import { loginHeaderCheck } from '../../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-ENTERPRISE-001: page loads with title, description, invite button
const enterprise001Elements: ElementConfig[] = [
    { selector: 'div.css-1orv6po h4.css-3qt8ng', name: 'title' },
    { selector: 'div.MuiBox-root.css-lhftxy div p', name: 'description' },
    { selector: 'div.css-1orv6po button.css-8xvkjr', name: 'invite button' },
];

// TC-ENTERPRISE-002: plan, members, role, team table
const enterprise002Elements: ElementConfig[] = [
    { selector: 'div.css-1rd7swq div:nth-child(1) div p.css-1piy2p3', name: 'Plan' },
    { selector: 'div.css-1rd7swq div:nth-child(1) div h4.css-h8b2ep', name: 'Enterprise' },
    { selector: 'div.css-1rd7swq div:nth-child(1) div p.css-hae1kh', name: 'Shared credit' },
    { selector: 'div.css-1rd7swq div:nth-child(2) div p.css-1piy2p3', name: 'Members' },
    { selector: 'div.css-1rd7swq div:nth-child(2) div h4.css-h8b2ep', name: 'Total members' },
    { selector: 'div.css-1rd7swq div:nth-child(2) div p.css-hae1kh', name: 'Used / Available' },
    { selector: 'div.css-1rd7swq div:nth-child(3) div p.css-1piy2p3', name: 'Your Role' },
    { selector: 'div.css-1rd7swq div:nth-child(3) div h4.css-h8b2ep', name: 'Owner' },
    { selector: 'div.css-1rd7swq div:nth-child(3) div p.css-hae1kh', name: 'Permission' },
    { selector: '#root > div > div > div > div.MuiBox-root.css-0 > h6', name: 'Team Members' },
    { selector: 'div.css-1yqxio0 th:nth-child(1)', name: 'No.' },
    { selector: 'div.css-1yqxio0 td:nth-child(1)', name: '1' },
    { selector: 'div.css-1yqxio0 th:nth-child(2)', name: 'Username' },
    { selector: 'div.css-1yqxio0 td:nth-child(2)', name: 'Username' },
    { selector: 'div.css-1yqxio0 th:nth-child(3)', name: 'Email' },
    { selector: 'div.css-1yqxio0 td:nth-child(3)', name: 'Email' },
    { selector: 'div.css-1yqxio0 th:nth-child(4)', name: 'Role' },
    { selector: 'div.css-1yqxio0 td:nth-child(4)', name: 'Owner' },
    { selector: 'div.css-1yqxio0 th:nth-child(5)', name: 'Joined Date' },
    { selector: 'div.css-1yqxio0 td:nth-child(5)', name: '-' },
    { selector: 'div.css-1yqxio0 th:nth-child(6)', name: 'Action' },
    { selector: 'div.css-1yqxio0 td:nth-child(6)', name: '-' },
    { selector: 'p.css-18necsl', name: 'Reminder' },

];

// TC-ENTERPRISE-003: shared credits and team usage
const enterprise003Elements: ElementConfig[] = [
    { selector: 'div.css-rdmug0 div.css-1md5m70 svg.css-1a7kktd', name: 'Icon' },
    { selector: 'div.css-rdmug0 div.css-1md5m70 div:nth-child(1) div p.css-1vy575x', name: 'Shared Credits:' },
    { selector: 'div.css-4b7q8f div div div:nth-child(1) div div h6', name: 'Credit count' },
    { selector: 'div.css-4b7q8f div div div:nth-child(1) div div p', name: 'Expiration date' },
    { selector: 'div.css-4b7q8f div div div:nth-child(2) div p.css-1vy575x', name: 'Remaining credit' },
    { selector: 'div.css-4b7q8f div div div:nth-child(2) div div h6', name: 'Credit count' },
    { selector: 'div.css-4b7q8f div div div:nth-child(2) div div p', name: 'Remaining percentage' },
    { selector: 'div.css-h5fkc8 > div.css-0 h6', name: 'Team Usage' },
    { selector: 'div.css-h5fkc8 > div.css-0 div th:nth-child(1)', name: 'Username' },
    { selector: 'div.css-h5fkc8 > div.css-0 div td:nth-child(1)', name: 'Username' },
    { selector: 'div.css-h5fkc8 > div.css-0 div th:nth-child(2)', name: 'Usage' },
    { selector: 'div.css-h5fkc8 > div.css-0 div td:nth-child(2)', name: 'Usage' },
    { selector: 'div.css-h5fkc8 > div.css-0 div th:nth-child(3)', name: 'Generated Documents' },
    { selector: 'div.css-h5fkc8 > div.css-0 div td:nth-child(3)', name: 'Generated Documents' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);
    checklistManager.addItemToSection('Enterprise Page', 'Enterprise Page', {
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

const sectionName = 'Enterprise Page';

export async function enterprisePageCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, enterprise001Elements);
}

export async function enterprisePageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, enterprise002Elements);
}

export async function enterprisePageCheckTC003(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, enterprise003Elements);
}

export async function enterprisePageCheckTC004(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}
export async function enterprisePageCheck(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, enterprise001Elements);
    await checkElements(page, checklistManager, enterprise002Elements);
    await checkElements(page, checklistManager, enterprise003Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}