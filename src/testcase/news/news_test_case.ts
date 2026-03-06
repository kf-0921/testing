import { ChecklistManager } from '../../utils/checklist';
import { directNewsPage } from '../../actions/direct_dropdown/direct_dropdown';
import { directGeneralNews, directUrgentNews, directEventNews } from '../../actions/direct_dropdown/news/direct_news_page';
import { newsPageCheck } from '../../checking/page/news/news_page';
import { openNews } from '../../actions/direct_dropdown/news/open_news';
import { newsDetailCheck } from '../../checking/page/news/news_detail';

export type NewsTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-NEWS-001: verify category page, first news and page are visible (All ) ----------
export async function TC_NEWS_001(page: any, checklistManager: ChecklistManager) {
  await directNewsPage(page, checklistManager);
  await newsPageCheck(page, checklistManager);
  const all = await openNews(page, checklistManager);
  if (all){await newsDetailCheck(page, checklistManager);}
}

// ---------- TC-NEWS-002: verify category page, first news and page are visible (General) ----------
export async function TC_NEWS_002(page: any, checklistManager: ChecklistManager) {
  await directGeneralNews(page, checklistManager);
  await newsPageCheck(page, checklistManager);
  const general = await openNews(page, checklistManager);
  if (general){await newsDetailCheck(page, checklistManager);}
}

// ---------- TC-NEWS-003: verify category page, first news and page are visible (Urgent) ----------
export async function TC_NEWS_003(page: any, checklistManager: ChecklistManager) {
  await directUrgentNews(page, checklistManager);
  await newsPageCheck(page, checklistManager);
  const urgent = await openNews(page, checklistManager);
  if (urgent){await newsDetailCheck(page, checklistManager);}
}
// ---------- TC-NEWS-004: verify category page, first news and page are visible (Event) ----------
export async function TC_NEWS_004(page: any, checklistManager: ChecklistManager) {
  await directEventNews(page, checklistManager);
  await newsPageCheck(page, checklistManager);
  const event = await openNews(page, checklistManager);
  if (event){await newsDetailCheck(page, checklistManager);}

}

export const NEWS_TEST_CASE_REGISTRY: Record<string, NewsTestCaseFn> = {
  'TC-NEWS-001': TC_NEWS_001,
  'TC-NEWS-002': TC_NEWS_002,
  'TC-NEWS-003': TC_NEWS_003,
  'TC-NEWS-004': TC_NEWS_004,
};



