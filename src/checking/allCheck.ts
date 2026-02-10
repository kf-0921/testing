import { homePageCheck } from "./page/home_page";
import { ChecklistManager } from "../utils/checklist";
import directToHomePage from "../actions/home_page";
import { historyPageCheck } from "./page/history/history_page";
import { navigateToHistoryPage } from "../actions/direct_history_page/history_page";
import { historyFilterCheck } from "./page/history/history_filter";
import { historyCombineCheck } from "./page/history/history_combine";
import { navigateToDigitalAssetsPage } from "../actions/direct_digital_assets/digital_assets_page";
import { digitalSuccessCheck } from "./page/digital_assets/digital_success";
import { digitalFailCheck } from "./page/digital_assets/digital_fail";
import { digitalAssetsPageCheck } from "./page/digital_assets/digital_assets_page";
import { planPageCheck } from "./page/plan_page";
import { directPlanPage } from "../actions/direct_dropdown/direct_dropdown";



export async function checkAllElements(page: any, checklistManager: ChecklistManager) {
    // // home page
    // await directToHomePage(page, checklistManager);
    // await homePageCheck(page, checklistManager);

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
}