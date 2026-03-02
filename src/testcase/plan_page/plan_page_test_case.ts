import { ChecklistManager } from '../../utils/checklist';
import { directPlanPage } from '../../actions/direct_dropdown/direct_dropdown';
  import { plan001Check, plan002Check, plan003Check, plan004Check, plan005Check, plan006Check, planPageCheck } from '../../checking/page/plan_page';

export type PlanTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-PLAN-001: verify plan page can load and display plan blocks ----------
export async function TC_PLAN_001(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan001Check(page, checklistManager);
}
// ---------- TC-PLAN-002: verify plan page can load and display plan blocks (Regular) ----------
export async function TC_PLAN_002(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan002Check(page, checklistManager);
}
// ---------- TC-PLAN-003: verify plan page can load and display plan blocks (Professional) ----------
export async function TC_PLAN_003(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan003Check(page, checklistManager);
}
// ---------- TC-PLAN-004: verify plan page can load and display plan blocks (Enterprise) ----------
export async function TC_PLAN_004(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan004Check(page, checklistManager);
}
// ---------- TC-PLAN-005: verify plan page can load and display plan blocks (Remark) ----------
export async function TC_PLAN_005(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan005Check(page, checklistManager);
}
// ---------- TC-PLAN-006: verify plan page header and footer are correct ----------
export async function TC_PLAN_006(page: any, checklistManager: ChecklistManager) {
  await directPlanPage(page, checklistManager);
  await plan006Check(page, checklistManager);
}
export const PLAN_TEST_CASE_REGISTRY: Record<string, PlanTestCaseFn> = {
  'TC-PLAN-001': TC_PLAN_001,
  'TC-PLAN-002': TC_PLAN_002,
  'TC-PLAN-003': TC_PLAN_003,
  'TC-PLAN-004': TC_PLAN_004,
  'TC-PLAN-005': TC_PLAN_005,
  'TC-PLAN-006': TC_PLAN_006,
};