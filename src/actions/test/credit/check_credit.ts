import { ChecklistManager } from "../../../utils/checklist";
import { getUrlIfLink, getTextIfExists } from "../../../utils/selectorContent";



export async function checkCredit(page: any, checklistManager: ChecklistManager) {
    const creditElementFound = await checklistManager.checkElement(page, 'nav-quota-number');
    const creditElementUrl = await getUrlIfLink(page, 'nav-quota-number', creditElementFound);
    const creditElementText = await getTextIfExists(page, 'nav-quota-number', creditElementFound);
    checklistManager.addItemToFile('credit', {
        name: 'credit element',
        found: creditElementFound,
        text: creditElementText,
        url: creditElementUrl
    });
    return creditElementText;
}