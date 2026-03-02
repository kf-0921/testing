import { ChecklistManager } from '../../utils/checklist';
import { directEnterprisePage } from '../../actions/direct_dropdown/direct_dropdown';
import {
  enterprisePageCheckTC001,
  enterprisePageCheckTC002,
  enterprisePageCheckTC003,
  enterprisePageCheckTC004,
} from '../../checking/page/enterprise_page';

export type EnterpriseTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// TC-ENTERPRISE-001: page loads with title, description, invite button
export async function TC_ENTERPRISE_001(page: any, checklistManager: ChecklistManager) {
  await directEnterprisePage(page, checklistManager);
  await enterprisePageCheckTC001(page, checklistManager);
}

// TC-ENTERPRISE-002: verify plan, member, role, team table are visible
export async function TC_ENTERPRISE_002(page: any, checklistManager: ChecklistManager) {
  await directEnterprisePage(page, checklistManager);
  await enterprisePageCheckTC002(page, checklistManager);
}

// TC-ENTERPRISE-003: verify shared credit and team usage block are visible
export async function TC_ENTERPRISE_003(page: any, checklistManager: ChecklistManager) {
  await directEnterprisePage(page, checklistManager);
  await enterprisePageCheckTC003(page, checklistManager);
}

// TC-ENTERPRISE-004: verify enterprise page header and footer are correct
export async function TC_ENTERPRISE_004(page: any, checklistManager: ChecklistManager) {
  await directEnterprisePage(page, checklistManager);
  await enterprisePageCheckTC004(page, checklistManager);
}
export const ENTERPRISE_TEST_CASE_REGISTRY: Record<string, EnterpriseTestCaseFn> = {
  'TC-ENTERPRISE-001': TC_ENTERPRISE_001,
  'TC-ENTERPRISE-002': TC_ENTERPRISE_002,
  'TC-ENTERPRISE-003': TC_ENTERPRISE_003,
  'TC-ENTERPRISE-004': TC_ENTERPRISE_004,
};