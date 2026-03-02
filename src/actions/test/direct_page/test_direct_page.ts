import { testDigitalAssetsPage } from "../../direct_digital_assets/digital_assets_page";
import { testDirectAccountDashboard } from "../../direct_dropdown/account/direct_account_dashboard";
import { testDirectProductPage } from "../../direct_dropdown/all_in_one_server_product_page/direct_product_page";
import { testDirectBlogPage } from "../../direct_dropdown/blog/direct_blog_page";
import { testDirectDropdown } from "../../direct_dropdown/direct_dropdown";
import { testDirectNewsPage } from "../../direct_dropdown/news/direct_news_page";
import { testDirectPlanPage } from "../../direct_dropdown/plan/direct_plan_page";
import { testDirectFooter } from "../../direct_footer/direct_footer";
import { testHistoryPage } from "../../direct_history_page/history_page";
import { testHomePage } from "../../direct_home_page/home_page";
import { ChecklistManager } from "../../../utils/checklist";


export async function testDirectPage(page: any, checklistManager: ChecklistManager) {
  // basic page
  await testHomePage(page, checklistManager);
  await testDigitalAssetsPage(page, checklistManager);
  await testHistoryPage(page, checklistManager);

  // dropdown
  await testDirectDropdown(page, checklistManager);

  // footer
  await testDirectFooter(page, checklistManager);

  // dropdown related page
  await testDirectProductPage(page, checklistManager);
  await testDirectBlogPage(page, checklistManager);
  await testDirectPlanPage(page, checklistManager);
  await testDirectNewsPage(page, checklistManager);
  await testDirectAccountDashboard(page, checklistManager);

}