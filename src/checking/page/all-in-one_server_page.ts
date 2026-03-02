// ---------- 1. Keep imports and ElementConfig as-is ----------
import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { footerCheck } from '../defaultLayout/footer';
import { loginHeaderCheck } from '../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

// ---------- 2. Split contentElements into four groups ----------
// TC-SERVER-001 Title and Video
const server001Elements: ElementConfig[] = [
    { selector: 'div[data-id="58594e8"] h2.elementor-heading-title', name: 'title' },
    { selector: 'video.elementor-video', name: 'video' },
];

// TC-SERVER-002 Poffices All-in-one Server with GenAI Agent and LLM
const server002Elements: ElementConfig[] = [
    { selector: 'div[data-id="fae290a"] h2.elementor-heading-title', name: 'Poffices All-in-one Server with GenAI Agent and LLM' },
    { selector: 'div[data-id="984a780"] h4.title', name: '100% On-Device Security' },
    { selector: 'div[data-id="984a780"] p', name: '100% On-Device Security description' },
    { selector: 'div[data-id="45192a6"] h4.title', name: 'Built-in LLM' },
    { selector: 'div[data-id="45192a6"] p', name: 'Built-in LLM description' },
    { selector: 'div[data-id="5c6806f"] h4.title', name: 'Powered by Poffices.AI Agents' },
    { selector: 'div[data-id="5c6806f"] p', name: 'Powered by Poffices.AI Agents description' },
    { selector: 'div[data-id="15b40b4"] h4.title', name: 'Multi-User Access' },
    { selector: 'div[data-id="15b40b4"] p', name: 'Multi-User Access description' },
]

// TC-SERVER-003 All-in-one AI Server details
const server003Elements: ElementConfig[] = [
    { selector: 'div[data-id="90921f9"] h2.elementor-heading-title', name: 'All-in-one AI Server' },
    { selector: 'div[data-id="0ae0a55"] img.wp-image-31614', name: 'Poffices B1 image' },
    { selector: 'div[data-id="f15163d"] h2.elementor-heading-title', name: 'Poffices B1' },
    { selector: 'div[data-id="f15163d"] p', name: 'B1 Users' },
    { selector: 'div[data-id="f15163d"] strong', name: 'B1 Price' },
    { selector: 'div[data-id="3ae837b"] img.wp-image-31616', name: 'B1 Setting' },
    { selector: 'div[data-id="abe534c"] a.elementor-button', name: 'B1 Order' },
    { selector: 'div[data-id="eec0a3d"] img.wp-image-31618', name: 'Poffices B2 image' },
    { selector: 'div[data-id="b87d53f"] h2.elementor-heading-title', name: 'Poffices B2' },
    { selector: 'div[data-id="b87d53f"] p', name: 'B2 Users' },
    { selector: 'div[data-id="b87d53f"] strong', name: 'B2 Price' },
    { selector: 'div[data-id="e3a5616"] img.wp-image-31620', name: 'B2 Setting' },
    { selector: 'div[data-id="00bc2ab"] a.elementor-button', name: 'B2 Order' },
    { selector: 'div[data-id="76f20bf"] img.wp-image-31622', name: 'Poffices B3 image' },
    { selector: 'div[data-id="9262b4d"] h2.elementor-heading-title', name: 'Poffices B3' },
    { selector: 'div[data-id="9262b4d"] p', name: 'B3 Users' },
    { selector: 'div[data-id="9262b4d"] strong', name: 'B3 Price' },
    { selector: 'div[data-id="9d2f2cf"] img.wp-image-31624', name: 'B3 Setting' },
    { selector: 'div[data-id="f84615e"] a.elementor-button', name: 'B3 Order' },
    { selector: 'div[data-id="5418b4b"] h2', name: 'Note' },
];

// TC-SERVER-004 Feature Comparison Table
const server004Elements: ElementConfig[] = [
    { selector: 'div[data-table_id="dcabd55"] th:nth-child(1)', name: 'Feature' },
    { selector: 'div[data-table_id="dcabd55"] th:nth-child(2)', name: 'Market Solution' },
    { selector: 'div[data-table_id="dcabd55"] th:nth-child(3)', name: 'Poffice AI Server' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(1) td:nth-child(1) div.td-content', name: 'Local Data Processing' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(1) td:nth-child(2) div.td-content', name: 'Cloud-based' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(1) td:nth-child(3) div.td-content', name: 'Fully offline' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(2) td:nth-child(1) div.td-content', name: 'Integrated File and DB Search' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(2) td:nth-child(2) div.td-content', name: 'Generic' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(2) td:nth-child(3) div.td-content', name: 'Tailored outputs' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(3) td:nth-child(1) div.td-content', name: 'Built-in Poffices.AI Agents' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(3) td:nth-child(2) div.td-content', name: 'Not supported' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(3) td:nth-child(3) div.td-content', name: 'Supported' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(4) td:nth-child(1) div.td-content', name: 'Extendable to Web Search' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(4) td:nth-child(2) div.td-content', name: 'Yes' },
    { selector: 'div[data-table_id="dcabd55"] tr:nth-child(4) td:nth-child(3) div.td-content', name: 'Yes' },
];

// TC-SERVER-005 Maintenance Service Terms
const server005Elements: ElementConfig[] = [
    { selector: 'div[data-id="c272a62"] h4', name: 'Maintenance Service Terms' },
    { selector: 'div[data-id="c272a62"] p:nth-child(1)', name: 'Maintenance Service Terms Content' },
    { selector: 'div[data-id="c272a62"] p:nth-child(2)', name: 'Maintenance Service Terms Connect 2' },
    { selector: 'div[data-id="c272a62"] p:nth-child(2) a', name: 'Maintenance Service Terms Link' },
];

// ---------- 3. Keep checkElement and add a generic runner ----------
async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);
    checklistManager.addItemToSection('All-in-One Server Page', 'All-in-One Server Page', {
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

const sectionName = 'All-in-One Server Page';

// ---------- 4. Export four TC-specific checks ----------
export async function allInOneServerPageCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server001Elements);
}

export async function allInOneServerPageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server002Elements);
}

export async function allInOneServerPageCheckTC003(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server003Elements);
}

export async function allInOneServerPageCheckTC004(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server004Elements);
}

export async function allInOneServerPageCheckTC005(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server005Elements);
}
export async function allInOneServerPageCheckTC006(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}
// ---------- 5. Full-page check (for allCheck.ts) ----------
export async function allInOneServerPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, server001Elements);
    await checkElements(page, checklistManager, server002Elements);
    await checkElements(page, checklistManager, server003Elements);
    await checkElements(page, checklistManager, server004Elements);
    await checkElements(page, checklistManager, server005Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}