import { ChecklistManager } from '../../utils/checklist';
import { directAllInOneServerPage } from '../../actions/direct_dropdown/direct_dropdown';
import {
    allInOneServerPageCheckTC001,
    allInOneServerPageCheckTC002,
    allInOneServerPageCheckTC003,
    allInOneServerPageCheckTC004,
    allInOneServerPageCheckTC005,
    allInOneServerPageCheckTC006,
} from '../../checking/page/all-in-one_server_page';

export type ServerTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// TC-SERVER-001 verify all-in-one server page loads with title and video
export async function TC_SERVER_001(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC001(page, checklistManager);
}

// TC-SERVER-002 Poffices All-in-one Server with GenAI Agent and LLM
export async function TC_SERVER_002(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC002(page, checklistManager);
}

// TC-SERVER-003 All-in-one AI Server details
export async function TC_SERVER_003(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC003(page, checklistManager);
}

// TC-SERVER-004 Feature Comparison Table
export async function TC_SERVER_004(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC004(page, checklistManager);
}

// TC-SERVER-005 Maintenance Service Terms
export async function TC_SERVER_005(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC005(page, checklistManager);
}

// TC-SERVER-006 All-in-one server page header and footer are correct
export async function TC_SERVER_006(page: any, checklistManager: ChecklistManager) {
    await directAllInOneServerPage(page, checklistManager);
    await allInOneServerPageCheckTC006(page, checklistManager);
}
export const SERVER_TEST_CASE_REGISTRY: Record<string, ServerTestCaseFn> = {
    'TC-SERVER-001': TC_SERVER_001,
    'TC-SERVER-002': TC_SERVER_002,
    'TC-SERVER-003': TC_SERVER_003,
    'TC-SERVER-004': TC_SERVER_004,
    'TC-SERVER-005': TC_SERVER_005,
    'TC-SERVER-006': TC_SERVER_006,
};