import { ChecklistManager } from '../../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../../utils/selectorContent';
import { footerCheck } from '../defaultLayout/footer';
import { loginHeaderCheck } from '../defaultLayout/login_header';

interface ElementConfig {
    selector: string;
    name: string;
}

// TC-FAQ-001: page loads with title
const faq001Elements: ElementConfig[] = [
    { selector: 'div[data-id="2ed5bdb"] h2', name: 'title' },
]
// TC-FAQ-002: account & registration section
const faq002Elements: ElementConfig[] = [
    { selector: 'div[data-id="c6888f5"] h3', name: 'Account & Registration:' },
    { selector: 'div[data-id="3039e41"] .eael-adv-accordion', name: 'Account & Registration section' },
    { selector: 'div#how-to-register span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-to-register span.eael-accordion-tab-title', name: 'How to Register?' },
    { selector: 'div#how-to-register svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-to-register"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="how-to-register"] p:nth-child(2)', name: 'description' },
    { selector: 'div[aria-labelledby="how-to-register"] p:nth-child(2) a', name: 'link' },
    { selector: 'div[aria-labelledby="how-to-register"] p:nth-child(3)', name: 'description' },
    { selector: 'div#how-to-login span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-to-login span.eael-accordion-tab-title', name: 'How to Login?' },
    { selector: 'div#how-to-login svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-to-login"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="how-to-login"] p:nth-child(1) a', name: 'link' },
    { selector: 'div#how-do-i-reset-my-password span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-do-i-reset-my-password span.eael-accordion-tab-title', name: 'How do I reset my password?' },
    { selector: 'div#how-do-i-reset-my-password svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-do-i-reset-my-password"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="how-do-i-reset-my-password"] p:nth-child(2)', name: 'description' },
    { selector: 'div[aria-labelledby="how-do-i-reset-my-password"] p:nth-child(2) a', name: 'link' },
    { selector: 'div#can-i-change-my-usernameemail-address-after-registration span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#can-i-change-my-usernameemail-address-after-registration span.eael-accordion-tab-title', name: 'Can I change my username/email...?' },
    { selector: 'div#can-i-change-my-usernameemail-address-after-registration svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="can-i-change-my-usernameemail-address-after-registration"] p:nth-child(1)', name: 'description' },
    { selector: 'div#is-there-a-free-trial-available span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#is-there-a-free-trial-available span.eael-accordion-tab-title', name: 'Is there a free trial available?' },
    { selector: 'div#is-there-a-free-trial-available svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="is-there-a-free-trial-available"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="is-there-a-free-trial-available"] p:nth-child(1) a', name: 'link' },
    { selector: 'div#what-are-the-different-account-typessubscription-plans span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#what-are-the-different-account-typessubscription-plans span.eael-accordion-tab-title', name: 'What are the different account types...?' },
    { selector: 'div#what-are-the-different-account-typessubscription-plans svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="what-are-the-different-account-typessubscription-plans"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="what-are-the-different-account-typessubscription-plans"] p:nth-child(1) a', name: 'link' },
]

// TC-FAQ-003: using Poffices.AI section
const faq003Elements: ElementConfig[] = [
    { selector: 'div[data-id="443a35f"] h3', name: 'Using Poffices.AI:' },
    { selector: 'div[data-id="2a0400e"] .eael-adv-accordion', name: 'Using Poffices.AI section' },
    { selector: 'div#how-to-use-pofficesai span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-to-use-pofficesai span.eael-accordion-tab-title', name: 'How to use Poffices.AI?' },
    { selector: 'div#how-to-use-pofficesai svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-to-use-pofficesai"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="how-to-use-pofficesai"] p:nth-child(1) a', name: 'link' },
    { selector: 'div#what-are-credits-and-how-do-they-work span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#what-are-credits-and-how-do-they-work span.eael-accordion-tab-title', name: 'What are credits and how do they work?' },
    { selector: 'div#what-are-credits-and-how-do-they-work svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="what-are-credits-and-how-do-they-work"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="what-are-credits-and-how-do-they-work"] p:nth-child(1) a', name: 'link' },
    { selector: 'div#how-do-i-choose-the-right-ai-agent-for-my-task span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-do-i-choose-the-right-ai-agent-for-my-task span.eael-accordion-tab-title', name: 'How do I choose the right AI agent...?' },
    { selector: 'div#how-do-i-choose-the-right-ai-agent-for-my-task svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-do-i-choose-the-right-ai-agent-for-my-task"] p:nth-child(1)', name: 'description' },
    { selector: 'div#what-output-formats-are-supported span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#what-output-formats-are-supported span.eael-accordion-tab-title', name: 'What output formats are supported?' },
    { selector: 'div#what-output-formats-are-supported svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="what-output-formats-are-supported"] p:nth-child(1)', name: 'description' },
    { selector: 'div#how-do-i-download-my-generated-files span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-do-i-download-my-generated-files span.eael-accordion-tab-title', name: 'How do I download my generated files?' },
    { selector: 'div#how-do-i-download-my-generated-files svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-do-i-download-my-generated-files"] ul', name: 'description' },
    { selector: 'div#can-i-edit-the-output-generated-by-the-ai-agents span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#can-i-edit-the-output-generated-by-the-ai-agents span.eael-accordion-tab-title', name: 'Can I edit the output...?' },
    { selector: 'div#can-i-edit-the-output-generated-by-the-ai-agents svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="can-i-edit-the-output-generated-by-the-ai-agents"] p:nth-child(1)', name: 'description' },
    { selector: 'div#can-i-use-the-generated-content-commercially span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#can-i-use-the-generated-content-commercially span.eael-accordion-tab-title', name: 'Can I use the generated content commercially?' },
    { selector: 'div#can-i-use-the-generated-content-commercially svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="can-i-use-the-generated-content-commercially"] p:nth-child(1)', name: 'description' },
    { selector: 'div[aria-labelledby="can-i-use-the-generated-content-commercially"] p:nth-child(1) a', name: 'link' },
    { selector: 'div#what-languages-are-supported span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#what-languages-are-supported span.eael-accordion-tab-title', name: 'What languages are supported?' },
    { selector: 'div#what-languages-are-supported svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="what-languages-are-supported"] p:nth-child(1)', name: 'description' },
]
// TC-FAQ-004: others section
const faq004Elements: ElementConfig[] = [
    { selector: 'div[data-id="36cb02e"] h3', name: 'Others:' },
    { selector: 'div[data-id="118f873"] .eael-adv-accordion', name: 'Others section' },
    { selector: 'div#is-pofficesai-mobile-friendly span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#is-pofficesai-mobile-friendly span.eael-accordion-tab-title', name: 'Is Poffices.AI mobile-friendly?' },
    { selector: 'div#is-pofficesai-mobile-friendly svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="is-pofficesai-mobile-friendly"] p:nth-child(1)', name: 'description' },
    { selector: 'div#how-can-i-view-my-billing-history span.eael-advanced-accordion-icon-closed', name: '+' },
    { selector: 'div#how-can-i-view-my-billing-history span.eael-accordion-tab-title', name: 'How can I view my billing history?' },
    { selector: 'div#how-can-i-view-my-billing-history svg.e-fas-angle-right', name: '>' },
    { selector: 'div[aria-labelledby="how-can-i-view-my-billing-history"] p:nth-child(1)', name: 'description' },
]


async function checkElement(page: any, checklistManager: ChecklistManager, config: ElementConfig) {
    const found = await checklistManager.checkElement(page, config.selector);
    const url = await getUrlIfLink(page, config.selector, found);
    const text = await getTextIfExists(page, config.selector, found);
    checklistManager.addItemToSection('FAQ Page', 'FAQ Page', {
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

const sectionName = 'FAQ Page';

export async function faqPageCheckTC001(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, faq001Elements);
}

export async function faqPageCheckTC002(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, faq002Elements);
}

export async function faqPageCheckTC003(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, faq003Elements);
}

export async function faqPageCheckTC004(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, faq004Elements);
}

export async function faqPageCheckTC005(page: any, checklistManager: ChecklistManager) {
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}

export async function faqPageCheck(page: any, checklistManager: ChecklistManager) {
    await checkElements(page, checklistManager, faq001Elements);
    await checkElements(page, checklistManager, faq002Elements);
    await checkElements(page, checklistManager, faq003Elements);
    await checkElements(page, checklistManager, faq004Elements);
    await loginHeaderCheck(page, checklistManager, sectionName);
    await footerCheck(page, checklistManager, sectionName);
}