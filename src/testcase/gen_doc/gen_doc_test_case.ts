import { ChecklistManager } from '../../utils/checklist';
import { genDoc } from '../../actions/test/gen_document/gen_doc';

export type GenDocTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-GEN-DOC-001: Generate document from home page (agent + input, submit) ----------
export async function TC_GEN_DOC_001(page: any, checklistManager: ChecklistManager) {
  await genDoc(page, checklistManager);
}

export const GEN_DOC_TEST_CASE_REGISTRY: Record<string, GenDocTestCaseFn> = {
  'TC-GEN-DOC-001': TC_GEN_DOC_001,
};