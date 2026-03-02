import { ChecklistManager } from '../../utils/checklist';
import { checkCredit, creditCount } from '../../actions/test/credit/check_credit';
import { genDoc } from '../../actions/test/gen_document/gen_doc';

export type CreditTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-CREDIT-001: Get original credit → gen doc (use credit) → get new credit → count used credit ----------
export async function TC_CREDIT_001(page: any, checklistManager: ChecklistManager) {
  const startCredit = await checkCredit(page, checklistManager);
  await genDoc(page, checklistManager);
  const endCredit = await checkCredit(page, checklistManager);
  await creditCount(startCredit ?? '0', endCredit ?? '0', checklistManager);
}

export const CREDIT_TEST_CASE_REGISTRY: Record<string, CreditTestCaseFn> = {
  'TC-CREDIT-001': TC_CREDIT_001,
};