import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import openSuccessContent from '../../../actions/direct_digital_assets/open_success_content';

interface ElementConfig {
    selector: string;
    name: string;
}

const contentElements: ElementConfig[] = [
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 h6.css-ezdrjy', name: 'extracted segments' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-9szet5', name: 'reload button' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-xz9haa', name: 'close button' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) div.MuiStack-root.css-1nqs3h7 div:nth-child(1) .MuiChip-label', name: 'block 1 - page chip' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) div.MuiStack-root.css-1nqs3h7 div:nth-child(2) .MuiChip-label', name: 'block 1 - block chip' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) div.MuiStack-root.css-1nqs3h7 div:nth-child(3) .MuiChip-label', name: 'block 1 - text type chip' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) div.MuiStack-root.css-1nqs3h7 div:nth-child(4) .MuiChip-label', name: 'block 1 - H0 chip' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) p.css-13zbake', name: 'block 1 - content text' },
    { selector: 'div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv:nth-child(1) button.css-1vjyhwy', name: 'block 1 - expand button' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Digital Assets Page', 'Digital Success Upload', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkTotalSegments(page: any, checklistManager: ChecklistManager) {
    const blocks = await page.$$('div.css-1qm1lh div.MuiPaper-root.css-1a9mdtv');
    const totalSegments = blocks.length;

    checklistManager.addItemToSection('Digital Assets Page', 'Digital Success Upload', {
        name: 'total segments',
        found: true,
        text: `Total ${totalSegments} segments`,
        url: ''
    });
}

async function checkDigitalSuccess(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
    await checkTotalSegments(page, checklistManager);
}

export async function digitalSuccessCheck(page: any, checklistManager: ChecklistManager) {
    await openSuccessContent(page, checklistManager);
    await checkDigitalSuccess(page, checklistManager);
}