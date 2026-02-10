import directToHomePage from "../../home_page";
import { genInput } from "./gen_input";
import { genUploadFile } from "./gen_upload_file";
import { genAgent } from "./gen_agent";
import { ChecklistManager } from "../../../utils/checklist";

export async function genDoc(page: any, checklistManager: ChecklistManager) {
    console.log('start generating document...');
    await directToHomePage(page, checklistManager);
    //await genAgent(page);
    //await genUploadFile(page);
    await genAgent(page);

    await genInput(page);
    return true;
}