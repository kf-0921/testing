import { ChecklistManager } from "../../../utils/checklist";
import { getTextIfExists } from "../../../utils/selectorContent";
import { openHistoryFilterPopup } from "../../../actions/direct_history_page/open_history_filter";


interface ElementConfig {
    selector: string;
    name: string;
}


const staticElements: ElementConfig[] = [
    // Filter title + Reset button
    { selector: 'div.css-1xdhyk6 h2.css-2sdbyo', name: 'filter title' },
    { selector: 'div.css-1xdhyk6 button.css-j0qll3', name: 'reset button' },

    // Office name
    { selector: 'div.css-1xdhyk6 p.css-1y04kt4:nth-of-type(1)', name: 'office name' },
    // Agent Name
    { selector: 'div.css-1xdhyk6 p.css-1y04kt4:nth-of-type(2)', name: 'agent name' },
    // Period
    { selector: 'div.css-1xdhyk6 p.css-1y04kt4:nth-of-type(3)', name: 'period' },

    { selector: 'div.MuiPopper-root.css-1xdhyk6 div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.date-range.css-13jedc0 div:nth-child(1) > p', name: 'period from' },
    { selector: '#filter-period-start', name: 'period from input' },
    { selector: 'div.MuiPopper-root.css-1xdhyk6 div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-row.date-range.css-13jedc0 div:nth-child(2) > p', name: 'period to' },
    { selector: '#filter-period-end', name: 'period to input' }
];

// Specific Office options configuration (using checkbox value)
const officeOptionsByValue: { value: string; name: string }[] = [
    { value: '1', name: 'General Office filter' },
    { value: '2', name: 'Business Office filter' },
    { value: '3', name: 'Strategy Office filter' },
    { value: '4', name: 'Research Office filter' },
    { value: '5', name: 'Project Office filter' },
    { value: '6', name: 'Sales & Marketing Office filter' },
    { value: '7', name: 'Education and Training Office filter' },
    { value: '8', name: 'HR Office filter' },
    { value: '9', name: 'Financial office filter' },
    { value: '10', name: 'PR Office filter' },
    { value: '11', name: 'Company Secretary Office filter' },
    { value: '12', name: 'Personal Assistant Office filter' },
    { value: '16', name: 'Data Office filter' },
];

const agentTypeOptionsByValue: { value: string; name: string }[] = [
    { value: 'general', name: '1st General' },
    { value: 'follow-up-query', name: 'Follow Up Query' },
    { value: 'agent-finder', name: 'Agent Finder' },
    { value: 'agent-manager', name: 'Agent Master Selector' },
    { value: 'agent-manager-package', name: 'Integration' },
    { value: 'chatbot', name: 'Chatbot' },
    { value: 'hk-g', name: '2nd General' },

    { value: 'eventplanner', name: 'Event Planner' },
    { value: 'business-forecasting', name: 'Business Forecasting' },
    { value: 'marketingplan', name: 'Marketing Plan' },
    { value: 'salesstrategicplan', name: 'Sales Strategic Plan' },
    { value: 'marketanalyzer', name: 'Market Analysis' },
    { value: 'ideation', name: 'Ideation' },
    { value: 'companalysis', name: 'Competitive Analysis' },
    { value: 'operationstrategy', name: 'Operation Strategy' },
    { value: 'commercialization', name: 'Commercialization' },
    { value: 'rndstrategy', name: 'R&D Strategic Plan' },
    { value: 'projfeasibility', name: 'Feasibility Analysis' },
    { value: 'projproposal', name: 'Project Proposal' },
    { value: 'developmentplan', name: 'Development Plan' },
    { value: 'rndprojplan', name: 'RnD Project Plan' },
    { value: 'proddeveplan', name: 'Product Dev Plan' },
    { value: 'researchintro', name: 'Research Intro' },
    { value: 'litereview', name: 'Literature Review' },
    { value: 'researchproposal', name: 'Research Proposal' },
    { value: 'researchmethodology', name: 'Research Methodology' },
    { value: 'researchexperiment', name: 'Research Experiment' },

    { value: 'lecturesyllabus', name: 'Lecture Syllabus' },
    { value: 'lecturechapter', name: 'Lecture Chapter' },
    { value: 'lecturenote', name: 'Lecture Note' },
    { value: 'lectureqna', name: 'Lecture Q&A' },
    { value: 'lectureexam', name: 'Lecture Exam' },
    { value: 'blogarticle', name: 'Blog Article' },
    { value: 'socmediapost', name: 'Soc Media Post' },
    { value: 'script', name: 'Script' },
    { value: 'pressrelease', name: 'Press Release' },
    { value: 'proddescription', name: 'Product Description' },
    { value: 'advertplan', name: 'Advertisement Plan' },
    { value: 'exhibitionplan', name: 'Exhibition Plan' },
    { value: 'edm', name: 'EDM' },
    { value: 'esgstrategy', name: 'ESG Strategy' },
    { value: 'crmstrategy', name: 'CRM strategy' },
    { value: 'comcalendar', name: 'Yearly Company Calendar' },

    { value: 'hrplan', name: 'HR Strategy Plan' },
    { value: 'staffhandbook', name: 'Staff Handbook' },
    { value: 'appraisalguide', name: 'Appraisal Guideline' },
    { value: 'feedbackguide', name: 'Staff Feedback Guideline' },
    { value: 'recruitmentplan', name: 'Recruitment Plan' },
    { value: 'jobpost', name: 'Job description and Job post' },
    { value: 'interviewquestion', name: 'Interview Question' },
    { value: 'recruittest', name: 'Recruitment Written Test' },
    { value: 'employcontract', name: 'Employment Contract' },

    { value: 'speechtopic', name: 'Speech Topic Ideation' },
    { value: 'speechreview', name: 'Speech Topic Review' },
    { value: 'speechintro', name: 'Speech Introduction' },
    { value: 'speechnote', name: 'Speech Note' },
    { value: 'speechscript', name: 'Speech Script' },

    { value: 'investmentsurvey', name: 'Investment Market Survey' },
    { value: 'investmentreview', name: 'Investment Project Review' },
    { value: 'investmentportfolio', name: 'Investment Portfolio Proposal' },
    { value: 'investmentplan', name: 'Investment Execution Plan' },
    { value: 'investmentannualreview', name: 'Investment Annual Review' },

    { value: 'eventsurvey', name: 'Event Survey' },
    { value: 'marketingsurvey', name: 'Marketing Survey' },
    { value: 'advertisementsurvey', name: 'Advertisement Survey' },
    { value: 'exhibitionsurvey', name: 'Exhibition Survey' },
    { value: 'salessurvey', name: 'Sales Survey' },

    { value: 'companyletter', name: 'Company Letter' },
    { value: 'announcement', name: 'Announcement' },
    { value: 'companypolicy', name: 'Company Policy' },
    { value: 'procurementguide', name: 'Procurement Guideline' },
    { value: 'workflowguide', name: 'Workflow Guideline' },
    { value: 'nda', name: 'Non-Disclosure Agreement' },
    { value: 'agreement', name: 'Agreement' },
    { value: 'ipclaim', name: 'Intellectual Property Claim' },
    { value: 'licensing', name: 'Licensing Agreement' },
    { value: 'collaboration', name: 'Collaboration Document MoU or LOI' },

    { value: 'appreciationletter', name: 'Appreciation Letter' },
    { value: 'recommendationletter', name: 'Recommendation Letter' },
    { value: 'supportingletter', name: 'Supporting Letter' },
    { value: 'warningletter', name: 'Warning Letter' },
    { value: 'complaintletter', name: 'Complaint Letter' },

    { value: 'questionnaire', name: 'Questionnaire Form' },
    { value: 'performanceevaluation', name: 'Performance Evaluation Form' },
    { value: 'notice', name: 'Notice Writing' },
    { value: 'kpiguideline', name: 'KPI Guideline' },
    { value: 'termssheet', name: 'Terms Sheet' },

    { value: 'resume', name: 'Resume or CV' },
    { value: 'biography', name: 'Biography' },
    { value: 'letter', name: 'Job Application Letter' },
    { value: 'essay', name: 'Essay Writer' },
    { value: 'selflearning', name: 'Self-Learning Q&A' },

    { value: 'negotiation', name: 'Negotiation Strategies' },
    { value: 'crisismanagement', name: 'Strategic Crisis Management' },
    { value: 'riskmanagement', name: 'Risk Management plan' },
    { value: 'sustainability', name: 'Sustainability Plan' },
    { value: 'resourcemanagement', name: 'Resource Management Plan' },

    { value: 'bizevaluation', name: 'Business Model Evaluation' },
    { value: 'marketevaluation', name: 'Marketing Model Evaluation' },
    { value: 'salesevaluation', name: 'Sales Model Evaluation' },
    { value: 'techevaluation', name: 'Technology Evaluation' },
    { value: 'supplychainevaluation', name: 'Supply Chain Evaluation' },

    { value: 'gatheringidea', name: 'Gathering Idea with family, friends, etc' },
    { value: 'travelidea', name: 'Travel Idea' },
    { value: 'skillidea', name: 'Skill Idea' },
    { value: 'giftidea', name: 'Gift Idea' },
    { value: 'activityidea', name: 'Activity Idea' },

    { value: 'Companysearcher', name: 'Company Link Searcher' },
    { value: 'CompanyImageSearcher', name: 'Company Image Searcher' },
    { value: 'web-search-testing', name: 'Web Search Testing' },
    { value: 'web-search-session', name: 'Web Search Session' },
    { value: 'llm-agent', name: 'LLM Only' },
    { value: 'imagelink', name: 'Image link Searcher' },
    { value: 'weblinksearcher', name: 'Web Link Searcher' },
    { value: 'web-search-aoa', name: 'Web Search AoA' },
    { value: 'metadata-search', name: 'Metadata Search' },
    { value: 'Web-Image-linker', name: 'Web and Image link Searcher' },

    { value: 'budget', name: 'Budget and Offer' },
    { value: 'problemstatement', name: 'Problem Statement' },
    { value: 'objective', name: 'Objective' },

    { value: 'lectureppt', name: 'Lecture PPT' },
    { value: 'lecture-deck', name: 'Lecture Deck' },
];


// 檢查 Office 選項（使用 checkbox value）
async function checkOfficeOptionByValue(page: any, checklistManager: ChecklistManager, value: string, displayName: string) {
    const selector = `div.css-1xdhyk6 input[type="checkbox"][value="${value}"]`;
    const found = await checklistManager.checkElement(page, selector);

    let text = '';
    if (found) {
        try {
            // 獲取同一個 label 中的文字
            text = await page.$eval(
                `div.css-1xdhyk6 input[type="checkbox"][value="${value}"]`,
                (el: any) => {
                    const label = el.closest('label.MuiFormControlLabel-root');
                    const textEl = label?.querySelector('p.MuiTypography-root');
                    return textEl ? textEl.textContent?.trim() : '';
                }
            );
        } catch (error) {
            console.warn(`Error getting text for ${displayName}:`, error);
        }
    }

    checklistManager.addItemToSection('History Page', 'History Filter', {
        name: displayName,
        found,
        text: text ? `${text} (value: ${value})` : displayName,
        url: ''
    });
}

async function checkAgentTypeOptionByValue(page: any, checklistManager: ChecklistManager, value: string, displayName: string) {
    const selector = `div.css-1xdhyk6 input[type="checkbox"][value="${value}"]`;
    const found = await checklistManager.checkElement(page, selector);

    let text = '';
    if (found) {
        try {
            // 獲取同一個 label 中的文字
            text = await page.$eval(
                `div.css-1xdhyk6 input[type="checkbox"][value="${value}"]`,
                (el: any) => {
                    const label = el.closest('label.MuiFormControlLabel-root');
                    const textEl = label?.querySelector('p.MuiTypography-root');
                    return textEl ? textEl.textContent?.trim() : '';
                }
            );
        } catch (error) {
            console.warn(`Error getting text for ${displayName}:`, error);
        }
    }

    checklistManager.addItemToSection('History Page', 'History Filter', {
        name: displayName,
        found,
        text: text ? `${text} (value: ${value})` : displayName,
        url: ''
    });
}

async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const text = await getTextIfExists(page, config.selector, found);

    checklistManager.addItemToSection('History Page', 'History Filter', {
        name: config.name,
        found,
        text,
        url: ''
    });
}

async function checkHistoryFilter(page: any, checklistManager: ChecklistManager) {
    for (const element of staticElements) {
        await checkElement(page, checklistManager, element);
    }
    for (const office of officeOptionsByValue) {
        await checkOfficeOptionByValue(page, checklistManager, office.value, office.name);
    }
    for (const agentType of agentTypeOptionsByValue) {
        await checkAgentTypeOptionByValue(page, checklistManager, agentType.value, agentType.name);
    }
}

export async function historyFilterCheck(page: any, checklistManager: ChecklistManager) {
    await openHistoryFilterPopup(page, checklistManager);
    await checkHistoryFilter(page, checklistManager);
}