import { directBlogPage } from "../direct_dropdown";

// Helper function to navigate to account page and click a navigation link
async function navigateToAllInOneServerProductPage(page: any, selector: string, linkName: string) {
    await directBlogPage(page);
    await page.waitForSelector('div.readmore-wrap', { timeout: 10000 });
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('div.readmore-wrap')
    ]);
    await new Promise(resolve => setTimeout(resolve, 1000));


    await page.waitForSelector(selector, { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`${linkName} link element is visible!`);
    console.log(`click ${linkName} link...`);
    
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(selector)
    ]);
    
    console.log('click completed!');
    console.log('current page:', page.url());
}


//Categories
export async function directAgentsBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page, 
        'li.cat-item-94',
        'Agents Blog'
    );
}

export async function directEventBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'li.cat-item-235',
        'Event Blog'
    );
}

export async function directLaunchingBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'li.cat-item-92',
        'Launching Blog'
    );
}

export async function directPofficesBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'li.cat-item-93',
        'Poffices Blog'
    );
}

export async function directPublicityBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'li.cat-item-237',
        'Publicity Blog'
    );
}

export async function directVideoBlog(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'li.cat-item-233',
        'Video Blog'
    );
}

//New Products
export async function directServerB3Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'ul.product_list_widget li a[href*=b3]',
        'Server B3 Order'
    );
}

export async function directServerB2Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'ul.product_list_widget li a[href*=b2]',
        'Server B2 Order'
    );
}

export async function directServerB1Order(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'ul.product_list_widget li a[href*=b1]',
        'Server B1 Order'
    );
}

export async function directPofficesEnterpriseOrder(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'ul.product_list_widget li a[href*=enterprise]',
        'Poffices Enterprise Order'
    );
}

export async function directPofficesProfessionalOrder(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'ul.product_list_widget li a[href*=professional]',
        'Poffices Professional Order'
    );
}

//Tags
export async function directActivitiesIdeas(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-232',
        'Activities Ideas'
    );
}

export async function directAdvertisementSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-177',
        'Advertisement Survey'
    );
}

export async function directAgreement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-195',
        'Agreement'
    );
}

export async function directAnnouncement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-184',
        'Announcement'
    );
}

export async function directAppreciationLetter(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-199',
        'Appreciation Letter'
    );
}

export async function directBusinessModelEvaluation(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-223',
        'Business Model Evaluation'
    );
}

export async function directCollaborationAgreement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-198',
        'Collaboration Agreement'
    );
}

export async function directCompanyLetter(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-181',
        'Company Letter'
    );
}

export async function directCompanyPolicy(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-183',
        'Company Policy'
    );
}

export async function directCrisisManagementPlan(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-217',
        'Crisis Management Plan'
    );
}

export async function directEmploymentContract(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-186',
        'Employment Contract'
    );
}

export async function directEvent(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-236',
        'Event'
    );
}

export async function directEventSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-176',
        'Event Survey'
    );
}

export async function directExhibitionSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-179',
        'Exhibition Survey'
    );
}

export async function directFAQ(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-174',
        'FAQ'
    );
}

export async function directGatheringIdeas(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-228',
        'Gathering Ideas'
    );
}

export async function directInvestmentAnnualReview(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-175',
        'Investment Annual Review'
    );
}

export async function directInvestmentExecutionPlan(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-172',
        'Investment Execution Plan'
    );
}

export async function directInvestmentMarketSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-169',
        'Investment Market Survey'
    );
}

export async function directInvestmentPortfolioProposal(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-171',
        'Investment Portfolio Proposal'
    );
}

export async function directInvestmentProjectReview(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-170',
        'Investment Project Review'
    );
}

export async function directLaunching(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-90',
        'Launching'
    );
}

export async function directLicensingAgreement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-197',
        'licensing Agreement'
    );
}

export async function directMarketEvaluation(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-224',
        'Market Evaluation'
    );
}

export async function directMarketingSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-178',
        'Marketing Survey'
    );
}

export async function directNonDisclosureAgreement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-194',
        'Non-Disclosure Agreement'
    );
}

export async function directPatentClaim(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-196',
        'Patent Claim'
    );
}

export async function directPoffices(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-91',
        'Poffices'
    );
}

export async function directProcurementGuidelines(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-192',
        'Procurement Guidelines'
    );
}

export async function directPublicity(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-238',
        'Publicity'
    );
}

export async function directRecruitmentWrittenTest(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-185',
        'Recruitment Written Test'
    );
}

export async function directResourcesManagement(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-222',
        'Resources Management'
    );
}

export async function directRiskManagementPlan(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-218',
        'Risk Management Plan'
    );
}

export async function directSalesEvaluation(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-225',
        'Sales Evaluation'
    );
}

export async function directSalesSurvey(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-180',
        'Sales Survey'
    );
}

export async function directSpeechIntroduction(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-189',
        'Speech Introduction'
    );
}

export async function directSpeechNote(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-190',
        'Speech Note'
    );
}

export async function directSpeechScript(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-191',
        'Speech Script'
    );
}

export async function directSpeechTopicIdeationInPofficesAi(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-187',
        'Speech Topic Ideation in Poffices.ai'
    );
}

export async function directSpeechTopicReview(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-188',
        'Speech Topic Review'
    );
}

export async function directSupplyChainEvaluation(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-227',
        'Supply Chain Evaluation'
    );
}

export async function directSustainabilityPlan(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-221',
        'Sustainability Plan'
    );
}

export async function directTechEvaluation(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-226',
        'Tech Evaluation'
    );
}

export async function directTutorials(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-173',
        'Tutorials'
    );
}

export async function directWorkflowGuidelines(page: any) {
    await navigateToAllInOneServerProductPage(
        page,
        'a.tag-link-193',
        'Workflow Guidelines'
    );
}

