import { ChecklistManager } from '../../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../../utils/selectorContent';
import { loginHeaderCheck } from '../../defaultLayout/login_header';
import { footerCheck } from '../../defaultLayout/footer';

interface ElementConfig {
    selector: string;
    name: string;
}
// TC-HOME-AGENT-001: agent master dialog (title, cancel button, apply button)
const homeAgent001Elements: ElementConfig[] = [
    { selector: 'div.agent-master-dialog h5.settings-modal-title', name: 'agent master title' },
    { selector: 'div.agent-master-dialog button#agent-master-cancel-btn', name: 'cancel button' },
    { selector: 'div.agent-master-dialog button#agent-master-apply-btn', name: 'apply button' },
];

// TC-HOME-AGENT-002: agent master dialog (enable section)
const homeAgent002Elements: ElementConfig[] = [
    { selector: 'div.agent-master-dialog span.am-enable-label', name: 'enable label' },
    { selector: 'div.agent-master-dialog span.am-enable-hint', name: 'enable hint' },
    { selector: 'div.agent-master-dialog span.slider', name: 'slider' },
];

// TC-HOME-AGENT-003: agent master dialog (search input, agent list, office section)
const homeAgent003Elements: ElementConfig[] = [
    // Office 1 - General Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="1"] div.am-office-header', name: 'header General Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="1"] span.am-office-name', name: 'General Office' },
    // Office 2 - Business Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="2"] div.am-office-header', name: 'header Business Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="2"] span.am-office-name', name: 'Business Office' },
    // Office 3 - Strategy Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="3"] div.am-office-header', name: 'header Strategy Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="3"] span.am-office-name', name: 'Strategy Office' },
    // Office 4 - Research Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="4"] div.am-office-header', name: 'header Research Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="4"] span.am-office-name', name: 'Research Office' },
    // Office 5 - Project Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="5"] div.am-office-header', name: 'header Project Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="5"] span.am-office-name', name: 'Project Office' },
    // Office 6 - Sales & Marketing Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="6"] div.am-office-header', name: 'header Sales & Marketing Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="6"] span.am-office-name', name: 'Sales & Marketing Office' },
    // Office 7 - Education and Training Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="7"] div.am-office-header', name: 'header Education and Training Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="7"] span.am-office-name', name: 'Education and Training Office' },
    // Office 8 - HR Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="8"] div.am-office-header', name: 'header HR Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="8"] span.am-office-name', name: 'HR Office' },
    // Office 9 - Financial office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="9"] div.am-office-header', name: 'header Financial office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="9"] span.am-office-name', name: 'Financial office' },
    // Office 10 - PR Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="10"] div.am-office-header', name: 'header PR Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="10"] span.am-office-name', name: 'PR Office' },
    // Office 11 - Company Secretary Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="11"] div.am-office-header', name: 'header Company Secretary Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="11"] span.am-office-name', name: 'Company Secretary Office' },
    // Office 12 - Personal Assistant Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="12"] div.am-office-header', name: 'header Personal Assistant Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="12"] span.am-office-name', name: 'Personal Assistant Office' },
    // Office 16 - Data Office
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="16"] div.am-office-header', name: 'header Data Office' },
    { selector: 'div.am-agent-list div.am-office-section[data-office-id="16"] span.am-office-name', name: 'Data Office' },
];
// TC-HOME-AGENT-004: agent master dialog (add agent section)
const homeAgent004Elements: ElementConfig[] = [
    // Structural (keep these at the top of home003Elements)
    { selector: 'div.agent-master-dialog input#agent-master-search', name: 'search input' },
    { selector: 'div.am-agent-list#agent-master-list', name: 'agent list' },
    { selector: 'div.am-agent-list div.am-office-section', name: 'office section' },

    // Every agent option by data-agent-id (add these to home003Elements or use a loop)
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="0"]', name: 'General' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="5"]', name: 'Chatbot' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="122"]', name: 'LLM Only' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="115"]', name: 'Problem Statement' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="19"]', name: 'Ideation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="116"]', name: 'Objective' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="24"]', name: 'Feasibility Analysis' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="18"]', name: 'Market Analysis' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="20"]', name: 'Competitive Analysis' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="15"]', name: 'Business Forecasting' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="114"]', name: 'Budget and Offer' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="21"]', name: 'Operation Strategy' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="23"]', name: 'R&D Strategic Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="26"]', name: 'Development Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="48"]', name: 'CRM strategy' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="47"]', name: 'ESG Strategy' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="99"]', name: 'Negotiation Strategies' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="100"]', name: 'Strategic Crisis Management' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="101"]', name: 'Risk Management plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="102"]', name: 'Sustainability Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="103"]', name: 'Resource Management Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="104"]', name: 'Business Model Evaluation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="105"]', name: 'Marketing Model Evaluation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="106"]', name: 'Sales Model Evaluation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="107"]', name: 'Technology Evaluation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="108"]', name: 'Supply Chain Evaluation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="29"]', name: 'Research Intro' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="30"]', name: 'Literature Review' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="31"]', name: 'Research Proposal' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="32"]', name: 'Research Methodology' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="33"]', name: 'Research Experiment' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="25"]', name: 'Project Proposal' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="27"]', name: 'RnD Project Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="22"]', name: 'Commercialization' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="28"]', name: 'Product Dev Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="43"]', name: 'Product Description' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="16"]', name: 'Marketing Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="17"]', name: 'Sales Strategic Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="14"]', name: 'Event Planner' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="44"]', name: 'Advertisement Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="45"]', name: 'Exhibition Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="41"]', name: 'MC Script' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="42"]', name: 'Press Release' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="46"]', name: 'EDM' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="39"]', name: 'Blog Article' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="40"]', name: 'Soc Media Post' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="34"]', name: 'Lecture Syllabus' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="36"]', name: 'Lecture Note' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="35"]', name: 'Lecture Chapter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="151"]', name: 'Lecture PPT' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="152"]', name: 'Lecture Deck' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="37"]', name: 'Lecture Q&A' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="38"]', name: 'Lecture Exam' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="49"]', name: 'Yearly Company Calendar' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="50"]', name: 'HR Strategy Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="51"]', name: 'Staff Handbook' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="52"]', name: 'Appraisal Guideline' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="53"]', name: 'Staff Feedback Guideline' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="54"]', name: 'Recruitment Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="55"]', name: 'Job description and Job post' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="56"]', name: 'Interview Question' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="57"]', name: 'Recruitment Written Test' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="58"]', name: 'Employment Contract' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="74"]', name: 'Company Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="75"]', name: 'Announcement' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="76"]', name: 'Company Policy' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="77"]', name: 'Procurement Guideline' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="78"]', name: 'Workflow Guideline' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="79"]', name: 'Non-Disclosure Agreement' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="80"]', name: 'Agreement' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="81"]', name: 'Intellectual Property Claim' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="82"]', name: 'Licensing Agreement' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="83"]', name: 'Collaboration Document (MoU or LOI)' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="89"]', name: 'Questionnaire Form' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="90"]', name: 'Performance Evaluation Form' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="91"]', name: 'Notice Writing' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="92"]', name: 'KPI Guideline' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="93"]', name: 'Terms Sheet' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="84"]', name: 'Appreciation Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="85"]', name: 'Recommendation Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="86"]', name: 'Supporting Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="87"]', name: 'Warning Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="88"]', name: 'Complaint Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="64"]', name: 'Investment Market Review' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="65"]', name: 'Investment Project Review' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="67"]', name: 'Investment Execution Plan' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="66"]', name: 'Investment Portfolio Proposal' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="68"]', name: 'Investment Annual Review' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="69"]', name: 'Event Survey' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="70"]', name: 'Marketing Survey' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="71"]', name: 'Advertisement Survey' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="72"]', name: 'Exhibition Survey' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="73"]', name: 'Sales Survey' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="59"]', name: 'Speech Topic Ideation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="60"]', name: 'Speaker Ideation' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="61"]', name: 'Speech Introduction' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="62"]', name: 'Speech Note' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="63"]', name: 'Speech Script' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="94"]', name: 'Resume or CV' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="95"]', name: 'Biography' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="96"]', name: 'Job Application Letter' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="97"]', name: 'Essay Writer' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="98"]', name: 'Self-Learning Q&A' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="109"]', name: 'Gathering Idea with family, friends, etc' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="110"]', name: 'Travel Idea' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="111"]', name: 'Skill Idea' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="112"]', name: 'Gift Idea' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="113"]', name: 'Activity Idea' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="132"]', name: 'Image link Searcher' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="133"]', name: 'Web Link Searcher' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="134"]', name: 'Company Link Searcher' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="135"]', name: 'Company Image Searcher' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="138"]', name: 'Web Search Testing' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="139"]', name: 'Web Search Session' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="140"]', name: 'Web Search AoA' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="146"]', name: 'Metadata Search' },
    { selector: 'div.agent-master-dialog div.am-agent-option[data-agent-id="148"]', name: 'Web and Image link Searcher' },
];

// TC-HOME-AGENT-005: agent master dialog (selected panel)
const homeAgent005Elements: ElementConfig[] = [
    { selector: 'div.am-selected-panel div.am-selected-header', name: 'selected header' },
    { selector: 'div.am-empty-state i.bi-inbox', name: 'imagwe' },
    { selector: 'div.am-empty-state p.am-empty-title', name: 'empty title' },
    { selector: 'div.am-empty-state div:nth-child(1) span:nth-child(2)', name: 'step 1' },
    { selector: 'div.am-empty-state div:nth-child(2) span:nth-child(2)', name: 'step 2' },
    { selector: 'div.am-empty-state div:nth-child(3) span:nth-child(2)', name: 'step 3' },
    { selector: 'span.am-remaining-hint', name: 'remaining hint' },
    { selector: 'button.btn-clear-all', name: 'clear all button' },
];

// TC-HOME-AGENT-006: agent master dialog (validation hint)
const homeAgent006Elements: ElementConfig[] = [
    { selector: 'div.am-validation-hint i.bi-exclamation-triangle', name: 'error icon' },
    { selector: 'div.am-validation-hint span', name: 'no agent selected hint' },
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

export async function homeAgentMasterCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent001Elements);
}

export async function homeAgentMasterCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent002Elements);
}

export async function homeAgentMasterCheckTC003(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent003Elements);
}

export async function homeAgentMasterCheckTC004(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent004Elements);
}

export async function homeAgentMasterCheckTC005(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent005Elements);
}

export async function homeAgentMasterCheckTC006(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, homeAgent006Elements);
}

export async function homeAgentMasterCheck(page: any, checklistManager: ChecklistManager) {
    await homeAgentMasterCheckTC001(page, checklistManager);
    await homeAgentMasterCheckTC002(page, checklistManager);
    await homeAgentMasterCheckTC003(page, checklistManager);
    await homeAgentMasterCheckTC004(page, checklistManager);
    await homeAgentMasterCheckTC005(page, checklistManager);
    await homeAgentMasterCheckTC006(page, checklistManager);
}