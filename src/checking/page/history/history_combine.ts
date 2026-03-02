import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { openHistoryCombinePopup } from "../../../actions/direct_history_page/open_history_combine";


interface ElementConfig {
    selector: string;
    name: string;
}
// TC-HISTORY-COMBINE-001: title, cancel button, combine button (check if combine popup opens)
const combine001Elements: ElementConfig[] = [
    { selector: 'div.css-1n5khr6  h5.css-sdcula', name: 'title' },
    { selector: 'div.css-1n5khr6  button.css-qo8ufo', name: 'cancel button' },
    { selector: 'div.css-1n5khr6  button.css-4xvl5f', name: 'combine button' },
]

// TC-HISTORY-COMBINE-002: list drop down, remove button
const combine002Elements: ElementConfig[] = [
    { selector: 'div.css-1n5khr6  div.css-1xw9sjb', name: 'list drop down' },
    { selector: 'div.css-1n5khr6  button.css-1e20c7o', name: 'remove button' },
];

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('History Page', 'History Combine', {
        name: config.name,
        found,
        text,
        url
    });
}

async function checkHistoryCombineTC001(page: any, checklistManager: ChecklistManager) {
    for (const element of combine001Elements) {
        await checkElement(page, checklistManager, element);
    }

}
async function checkHistoryCombineTC002(page: any, checklistManager: ChecklistManager) {
    for (const element of combine002Elements) {
        await checkElement(page, checklistManager, element);
    }
}
export async function historyCombineCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkHistoryCombineTC001(page, checklistManager);
}
export async function historyCombineCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkHistoryCombineTC002(page, checklistManager);
}
export async function historyCombineCheck(page: any, checklistManager: ChecklistManager) {
    await openHistoryCombinePopup(page, checklistManager);
    await historyCombineCheckTC001(page, checklistManager);
    await historyCombineCheckTC002(page, checklistManager);
}