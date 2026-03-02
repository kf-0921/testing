import { homePageCheck } from "./page/home/home_page";
import { ChecklistManager } from "../utils/checklist";
import directToHomePage from "../actions/direct_home_page/home_page";
import { historyPageCheck } from "./page/history/history_page";
import { navigateToHistoryPage } from "../actions/direct_history_page/history_page";
import { historyFilterCheck } from "./page/history/history_filter";
import { historyCombineCheck } from "./page/history/history_combine";
import { navigateToDigitalAssetsPage } from "../actions/direct_digital_assets/digital_assets_page";
import { digitalSuccessCheck } from "./page/digital_assets/digital_success";
import { digitalFailCheck } from "./page/digital_assets/digital_fail";
import { digitalAssetsPageCheck } from "./page/digital_assets/digital_assets_page";
import { planPageCheck } from "./page/plan_page";
import { directAccountPage, directEnterprisePage, directFAQPage, directNewsPage, directPlanPage } from "../actions/direct_dropdown/direct_dropdown";
import { directAllInOneServerPage } from "../actions/direct_dropdown/direct_dropdown";
import { allInOneServerPageCheck } from "./page/all-in-one_server_page";
import { enterprisePageCheck } from "./page/enterprise_page";
import { openNews } from "../actions/direct_dropdown/news/open_news";
import { newsDetailCheck } from "./page/news/news_detail";
import { newsPageCheck } from "./page/news/news_page";
import { directAllNews, directEventNews, directGeneralNews, directUrgentNews } from "../actions/direct_dropdown/news/direct_news_page";
import { directAccountAccountDetails, directAccountAddress, directAccountAddressEdit, directAccountDashboard, directAccountMySubscription, directAccountOrders } from "../actions/direct_dropdown/account/direct_account_dashboard";
import { accountDashboardPageCheck } from "./page/account/account_dashboard_page";
import { accountOrdersPageCheck } from "./page/account/account_orders_page";
import { accountAddressPageCheck } from "./page/account/account_address_page";
import { accountSubscriptionsPageCheck } from "./page/account/account_subscriptions_page";
import { accountDetailsPageCheck } from "./page/account/account_details_page";
import { accountEditAddressPageCheck } from "./page/account/account_edit_address_page";
import { openReceipt } from "../actions/direct_dropdown/account/open_receipt";
import { orderReceiptPageCheck } from "./page/receipt/order_receipt_page";
import { subscriptionReceiptPageCheck } from "./page/receipt/subcription_receipt_page";
import { faqPageCheck } from "./page/faq_page";

async function checkAllNewsPages(page: any, checklistManager: ChecklistManager) {
    await directNewsPage(page, checklistManager);
    await newsPageCheck(page, checklistManager);
    const all = await openNews(page, checklistManager);
    if (all){await newsDetailCheck(page, checklistManager);}
    console.log('all news page checked');

    await directGeneralNews(page, checklistManager);
    await newsPageCheck(page, checklistManager);
    const general = await openNews(page, checklistManager);
    if (general){await newsDetailCheck(page, checklistManager);}
    console.log('general news page checked');

    await directUrgentNews(page, checklistManager);
    await newsPageCheck(page, checklistManager);
    const urgent = await openNews(page, checklistManager);
    if (urgent){await newsDetailCheck(page, checklistManager);}
    console.log('urgent news page checked');

    await directEventNews(page, checklistManager);
    await newsPageCheck(page, checklistManager);
    const event = await openNews(page, checklistManager);
    if (event){await newsDetailCheck(page, checklistManager);}
    console.log('event news page checked');
}

async function checkAllAccountPages(page: any, checklistManager: ChecklistManager) {
    await directAccountDashboard(page, checklistManager);
    await accountDashboardPageCheck(page, checklistManager);
    await directAccountOrders(page, checklistManager);
    await accountOrdersPageCheck(page, checklistManager);
    await directAccountMySubscription(page, checklistManager);
    await accountSubscriptionsPageCheck(page, checklistManager);
    await directAccountAddress(page, checklistManager);
    await accountAddressPageCheck(page, checklistManager);
    await directAccountAccountDetails(page, checklistManager);
    await accountDetailsPageCheck(page, checklistManager);
    await directAccountAddressEdit(page, checklistManager);
    await accountEditAddressPageCheck(page, checklistManager);
}

async function checkAllReceiptPages(page: any, checklistManager: ChecklistManager) {
    await directAccountOrders(page, checklistManager);
    await openReceipt(page, checklistManager);
    await orderReceiptPageCheck(page, checklistManager);
    await directAccountMySubscription(page, checklistManager);
    await openReceipt(page, checklistManager);
    await subscriptionReceiptPageCheck(page, checklistManager);
}

export async function checkAllElements(page: any, checklistManager: ChecklistManager) {
    // home page
    await directToHomePage(page, checklistManager);
    await homePageCheck(page, checklistManager);

    // history page
    await navigateToHistoryPage(page, checklistManager);
    await historyPageCheck(page, checklistManager);
    await historyFilterCheck(page, checklistManager);
    await historyCombineCheck(page, checklistManager);

    // digital assets page
    await navigateToDigitalAssetsPage(page, checklistManager);
    await digitalAssetsPageCheck(page, checklistManager);
    await digitalSuccessCheck(page, checklistManager);
    await digitalFailCheck(page, checklistManager);

    // plan page
    await directPlanPage(page, checklistManager);
    await planPageCheck(page, checklistManager);

    // all-in-one server page
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheck(page, checklistManager);

    // enterprise page
    await directEnterprisePage(page, checklistManager);
    await enterprisePageCheck(page, checklistManager);

    // news page
    await checkAllNewsPages(page, checklistManager);

    // faq page
    await directFAQPage(page, checklistManager);
    await faqPageCheck(page, checklistManager);

    // account dashboard page
    await checkAllAccountPages(page, checklistManager);

    // receipt page
    await checkAllReceiptPages(page, checklistManager);
}