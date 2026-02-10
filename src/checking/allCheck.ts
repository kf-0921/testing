import { homePageCheck } from "./page/home_page";
import { ChecklistManager } from "../utils/checklist";
import directToHomePage from "../actions/home_page";
import { historyPageCheck } from "./page/history/history_page";
import { navigateToHistoryPage } from "../actions/history_page";
import { historyFilterCheck } from "./page/history/history_filter";
import { historyCombineCheck } from "./page/history/history_combine";



export async function checkAllElements(page: any, checklistManager: ChecklistManager) {
    // home page
    await directToHomePage(page, checklistManager);
    await homePageCheck(page, checklistManager);

    // history page
    await navigateToHistoryPage(page, checklistManager);
    await historyPageCheck(page, checklistManager);
    await historyFilterCheck(page, checklistManager);
    await historyCombineCheck(page, checklistManager);
}