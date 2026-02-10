import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import openFailedContent from '../../../actions/direct_digital_assets/open_failed_content';

interface ElementConfig {
    selector: string;
    name: string;
}

const contentElements: ElementConfig[] = [
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 h6.css-ezdrjy', name: 'extracted segments' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-9szet5', name: 'reload button' },
    { selector: 'div.css-8atqhb div.css-79elbk div.css-1cbf1l2 button.css-xz9haa', name: 'close button' },
    { selector: 'div.css-127h8j3', name: 'failed message' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('Digital Assets Page', 'Digital Fail Upload', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkDigitalFail(page: any, checklistManager: ChecklistManager) {
    for (const element of contentElements) {
        await checkElement(page, checklistManager, element);
    }
}

export async function digitalFailCheck(page: any, checklistManager: ChecklistManager) {
    await openFailedContent(page, checklistManager);
    await checkDigitalFail(page, checklistManager);
}