import { directBlogPage } from "../direct_dropdown";
import { ChecklistManager } from "../../../utils/checklist";
import { getPageLanguageInfo } from "../../../checking/language/page_language";

// Helper function to navigate to account page and click a navigation link
async function navigateToBlogPage(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string | null = null) {
    await directBlogPage(page, checklistManager);
    try {
        await page.waitForSelector('.readmore-wrap a.elth-bt-default', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('direct blog page', 'Selector not found: .readmore-wrap a.elth-bt-default');
        return;
    }

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('.readmore-wrap a.elth-bt-default')
    ]);
    await new Promise(resolve => setTimeout(resolve, 1000));


    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('direct blog page', `Selector not found: ${selector}`);
        return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(selector)
    ]);

    console.log('click completed!');
    console.log('current page:', page.url());

    if (validateElement === 'cart') {
        await validateInCart(page, checklistManager, linkName);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
    } else if (validateElement) {
        const validateElementCheck = await page.$(validateElement);
        if (validateElementCheck) {
            checklistManager.logDirectMessage('direct blog page', `Selector found: ${validateElementCheck}`);
            checklistManager.logDirectMessage('direct blog page', `confirm redirect to ${linkName} page success!`);
            //check page language
            await getPageLanguageInfo(page, checklistManager);
            return validateElementCheck;
        } else {
            checklistManager.logDirectMessage('direct blog page', `Selector not found: ${validateElementCheck}`);
            checklistManager.logDirectMessage('direct blog page', `redirect to ${linkName} page failed!`);
        }
    } else {
        await validateDirectedPage(page, checklistManager, linkName);
        //check page language
        await getPageLanguageInfo(page, checklistManager);
    }
}

async function validateDirectedPage(page: any, checklistManager: ChecklistManager, linkName: string) {
    try {
        await page.waitForSelector('.title-page h2 span', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('direct blog page', 'Selector not found: .title-page h2 span');
        return;
    }
    const categoryText = await page.$eval('.title-page h2 span', (el: any) =>
        el.textContent?.trim()
    );
    if (categoryText === linkName) {
        console.log('null');
        checklistManager.logDirectMessage('direct blog page', `Selector found: ${categoryText}`);
        checklistManager.logDirectMessage('direct blog page', `confirm redirect to ${linkName} page success!`);
        return categoryText;
    } else {
        checklistManager.logDirectMessage('direct blog page', `Selector not found: ${categoryText}`);
        checklistManager.logDirectMessage('direct blog page', `redirect to ${linkName} page failed!`);
    }
}

async function validateInCart(page: any, checklistManager: ChecklistManager, linkName: string) {
    console.log('validateInCart');
    console.log('url:', page.url());
    try {
        await page.waitForSelector('tr.cart_item .product-name', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('direct blog page', 'Selector not found: tr.cart_item .product-name');
        return;
    }
    const productName = await page.$eval('tr.cart_item .product-name',
        (el: any) => el.textContent?.replace(/×.*$/, '').trim().split(/\s+/)[0]
    );
    console.log('productName:', productName);
    if (productName === linkName) {
        checklistManager.logDirectMessage('direct blog page', `Selector found: ${productName}`);
        checklistManager.logDirectMessage('direct blog page', `confirm product name is ${productName} in cart!`);
        return productName;
    } else {
        checklistManager.logDirectMessage('direct blog page', `Selector not found: ${productName}`);
        checklistManager.logDirectMessage('direct blog page', `redirect to ${linkName} page failed!`);
    }
}

//Categories
export async function directAgentsBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-94 a',
        'Agents'
    );
}

export async function directEventBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-235 a',
        'Event'
    );
}

export async function directLaunchingBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-92 a',
        'Launching'
    );
}

export async function directPofficesBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-93 a',
        'Poffices'
    );
}

export async function directPublicityBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-237 a',
        'Publicity'
    );
}

export async function directVideoBlog(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'li.cat-item-233 a',
        'Video'
    );
}

//New Products
export async function directServerB3Order(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'ul.product_list_widget li a[href*=b3]',
        'Server B3 Order',
        'td.product-name a[href*="b3"]'
    );
}

export async function directServerB2Order(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'ul.product_list_widget li a[href*=b2]',
        'Server B2 Order',
        'td.product-name a[href*="b2"]'
    );
}

export async function directServerB1Order(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'ul.product_list_widget li a[href*=b1]',
        'Server B1 Order',
        'td.product-name a[href*="b1"]'
    );
}

export async function directPofficesEnterpriseOrder(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'ul.product_list_widget li a[href*=enterprise]',
        'Enterprise',
        'cart'
    );
}

export async function directPofficesProfessionalOrder(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'ul.product_list_widget li a[href*=professional]',
        'Professional',
        'cart'
    );
}

//Tags
export async function directActivitiesIdeas(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-232',
        'Activities Ideas'
    );
}

export async function directAdvertisementSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-177',
        'Advertisement Survey'
    );
}

export async function directAgreement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-195',
        'Agreement'
    );
}

export async function directAnnouncement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-184',
        'Announcement'
    );
}

export async function directAppreciationLetter(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-199',
        'Appreciation Letter'
    );
}

export async function directBusinessModelEvaluation(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-223',
        'Business Model Evaluation'
    );
}

export async function directCollaborationAgreement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-198',
        'Collaboration Agreement'
    );
}

export async function directCompanyLetter(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-181',
        'Company Letter'
    );
}

export async function directCompanyPolicy(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-183',
        'Company Policy'
    );
}

export async function directCrisisManagementPlan(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-217',
        'Crisis Management Plan'
    );
}

export async function directEmploymentContract(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-186',
        'Employment Contract'
    );
}

export async function directEvent(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-236',
        'Event'
    );
}

export async function directEventSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-176',
        'Event Survey'
    );
}

export async function directExhibitionSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-179',
        'Exhibition Survey'
    );
}

export async function directFAQ(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-174',
        'FAQ'
    );
}

export async function directGatheringIdeas(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-228',
        'Gathering Ideas'
    );
}

export async function directInvestmentAnnualReview(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-175',
        'Investment Annual Review'
    );
}

export async function directInvestmentExecutionPlan(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-172',
        'Investment Execution Plan'
    );
}

export async function directInvestmentMarketSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-169',
        'Investment Market Survey'
    );
}

export async function directInvestmentPortfolioProposal(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-171',
        'Investment Portfolio Proposal'
    );
}

export async function directInvestmentProjectReview(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-170',
        'Investment Project Review'
    );
}

export async function directLaunching(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-90',
        'Launching'
    );
}

export async function directLicensingAgreement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-197',
        'licensing Agreement'
    );
}

export async function directMarketEvaluation(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-224',
        'Market Evaluation'
    );
}

export async function directMarketingSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-178',
        'Marketing Survey'
    );
}

export async function directNonDisclosureAgreement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-194',
        'Non-Disclosure Agreement'
    );
}

export async function directPatentClaim(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-196',
        'Patent Claim'
    );
}

export async function directPoffices(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-91',
        'Poffices'
    );
}

export async function directProcurementGuidelines(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-192',
        'Procurement Guidelines'
    );
}

export async function directPublicity(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-238',
        'Publicity'
    );
}

export async function directRecruitmentWrittenTest(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-185',
        'Recruitment Written Test'
    );
}

export async function directResourcesManagement(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-222',
        'Resources Management'
    );
}

export async function directRiskManagementPlan(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-218',
        'Risk Management Plan'
    );
}

export async function directSalesEvaluation(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-225',
        'Sales Evaluation'
    );
}

export async function directSalesSurvey(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-180',
        'Sales Survey'
    );
}

export async function directSpeechIntroduction(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-189',
        'Speech Introduction'
    );
}

export async function directSpeechNote(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-190',
        'Speech Note'
    );
}

export async function directSpeechScript(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-191',
        'Speech Script'
    );
}

export async function directSpeechTopicIdeationInPofficesAi(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-187',
        'Speech Topic Ideation in Poffices.ai'
    );
}

export async function directSpeechTopicReview(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-188',
        'Speech Topic Review'
    );
}

export async function directSupplyChainEvaluation(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-227',
        'Supply Chain Evaluation'
    );
}

export async function directSustainabilityPlan(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-221',
        'Sustainability Plan'
    );
}

export async function directTechEvaluation(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-226',
        'Tech Evaluation'
    );
}

export async function directTutorials(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-173',
        'Tutorials'
    );
}

export async function directWorkflowGuidelines(page: any, checklistManager: ChecklistManager) {
    await navigateToBlogPage(
        page,
        checklistManager,
        'a.tag-link-193',
        'Workflow Guidelines'
    );
}





export async function testDirectBlogPage(page: any, checklistManager: ChecklistManager) {
    await directAgentsBlog(page, checklistManager);
    await directEventBlog(page, checklistManager);
    await directLaunchingBlog(page, checklistManager);
    await directPofficesBlog(page, checklistManager);
    await directPublicityBlog(page, checklistManager);
    await directVideoBlog(page, checklistManager);
    await directServerB3Order(page, checklistManager);
    await directServerB2Order(page, checklistManager);
    await directServerB1Order(page, checklistManager);
    await directPofficesEnterpriseOrder(page, checklistManager);
    await directPofficesProfessionalOrder(page, checklistManager);
    await directActivitiesIdeas(page, checklistManager);
    await directAdvertisementSurvey(page, checklistManager);
    await directAgreement(page, checklistManager);
    await directAnnouncement(page, checklistManager);
    await directAppreciationLetter(page, checklistManager);
    await directBusinessModelEvaluation(page, checklistManager);
    await directCollaborationAgreement(page, checklistManager);
    await directCompanyLetter(page, checklistManager);
    await directCompanyPolicy(page, checklistManager);
    await directCrisisManagementPlan(page, checklistManager);
    await directEmploymentContract(page, checklistManager);
    await directEvent(page, checklistManager);
    await directEventSurvey(page, checklistManager);
    await directExhibitionSurvey(page, checklistManager);
    await directFAQ(page, checklistManager);
    await directGatheringIdeas(page, checklistManager);
    await directInvestmentAnnualReview(page, checklistManager);
    await directInvestmentExecutionPlan(page, checklistManager);
    await directInvestmentMarketSurvey(page, checklistManager);
    await directInvestmentPortfolioProposal(page, checklistManager);
    await directInvestmentProjectReview(page, checklistManager);
    await directLaunching(page, checklistManager);
    await directLicensingAgreement(page, checklistManager);
    await directMarketEvaluation(page, checklistManager);
    await directMarketingSurvey(page, checklistManager);
    await directNonDisclosureAgreement(page, checklistManager);
    await directPatentClaim(page, checklistManager);
    await directPoffices(page, checklistManager);
    await directProcurementGuidelines(page, checklistManager);
    await directPublicity(page, checklistManager);
    await directRecruitmentWrittenTest(page, checklistManager);
    await directResourcesManagement(page, checklistManager);
    await directRiskManagementPlan(page, checklistManager);
    await directSalesEvaluation(page, checklistManager);
    await directSalesSurvey(page, checklistManager);
    await directSpeechIntroduction(page, checklistManager);
    await directSpeechNote(page, checklistManager);
    await directSpeechScript(page, checklistManager);
    await directSpeechTopicIdeationInPofficesAi(page, checklistManager);
    await directSpeechTopicReview(page, checklistManager);
    await directSupplyChainEvaluation(page, checklistManager);
    await directSustainabilityPlan(page, checklistManager);
    await directTechEvaluation(page, checklistManager);
    await directTutorials(page, checklistManager);
    await directWorkflowGuidelines(page, checklistManager);
}