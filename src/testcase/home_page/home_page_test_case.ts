import { ChecklistManager } from '../../utils/checklist';
import directToHomePage from '../../actions/direct_home_page/home_page';
import { homePageCheckTC001, homePageCheckTC002 } from '../../checking/page/home/home_page';
import { loginHeaderCheck } from '../../checking/defaultLayout/login_header';
import { footerCheck } from '../../checking/defaultLayout/footer';
import { cancelAgent, clearAllAgent, enableAgentMaster, openAgentMaster } from '../../actions/direct_home_page/open_agent_master';
import { homeAgentMasterCheckTC001, homeAgentMasterCheckTC002, homeAgentMasterCheckTC003, homeAgentMasterCheckTC004, homeAgentMasterCheckTC005, homeAgentMasterCheckTC006 } from '../../checking/page/home/home_agent_master';
import { homeDigitalAssetsCheckTC001, homeDigitalAssetsCheckTC002, homeDigitalAssetsCheckTC003 } from '../../checking/page/home/home_digital_assets';
import { openDigitalAssets } from '../../actions/direct_home_page/open_digital_assets';

export type HomeTestCaseFn = (page: any, checklistManager: ChecklistManager) => Promise<void>;

// ---------- TC-HOME-001: 驗證首頁可正常載入，歡迎圖、標題與主要內容可見 ----------
export async function TC_HOME_001(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await homePageCheckTC001(page, checklistManager);
}
// ---------- TC-HOME-002: 驗證首頁主要控制項皆存在且可用 ----------
export async function TC_HOME_002(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await homePageCheckTC002(page, checklistManager);
}
// ---------- TC-HOME-003: 驗證首頁的 header 與 footer 正確顯示 ----------
export async function TC_HOME_003(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await loginHeaderCheck(page, checklistManager, 'Home Page');
  await footerCheck(page, checklistManager, 'Home Page');
}
export async function TC_HOME_AGENT_MASTER_001(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC001(page, checklistManager);
  await cancelAgent(page);
}

export async function TC_HOME_AGENT_MASTER_002(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC002(page, checklistManager);
  await cancelAgent(page);
}

export async function TC_HOME_AGENT_MASTER_003(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC003(page, checklistManager);
  await cancelAgent(page);
}

export async function TC_HOME_AGENT_MASTER_004(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC004(page, checklistManager);
  await cancelAgent(page);
}

  export async function TC_HOME_AGENT_MASTER_005(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC005(page, checklistManager);
  await cancelAgent(page);
}

export async function TC_HOME_AGENT_MASTER_006(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openAgentMaster(page, checklistManager);
  await clearAllAgent(page);
  await enableAgentMaster(page, checklistManager);
  await homeAgentMasterCheckTC006(page, checklistManager);
  await cancelAgent(page);
}

export async function TC_HOME_DIGITAL_ASSETS_001(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openDigitalAssets(page, checklistManager);
  await homeDigitalAssetsCheckTC001(page, checklistManager);
}

export async function TC_HOME_DIGITAL_ASSETS_002(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openDigitalAssets(page, checklistManager);
  await homeDigitalAssetsCheckTC002(page, checklistManager);
}

export async function TC_HOME_DIGITAL_ASSETS_003(page: any, checklistManager: ChecklistManager) {
  await directToHomePage(page, checklistManager);
  await openDigitalAssets(page, checklistManager);
  await homeDigitalAssetsCheckTC003(page, checklistManager);
}


export const HOME_TEST_CASE_REGISTRY: Record<string, HomeTestCaseFn> = {
  'TC-HOME-001': TC_HOME_001,
  'TC-HOME-002': TC_HOME_002,
  'TC-HOME-003': TC_HOME_003,
  'TC-HOME-AGENT-MASTER-001': TC_HOME_AGENT_MASTER_001,
  'TC-HOME-AGENT-MASTER-002': TC_HOME_AGENT_MASTER_002,
  'TC-HOME-AGENT-MASTER-003': TC_HOME_AGENT_MASTER_003,
  'TC-HOME-AGENT-MASTER-004': TC_HOME_AGENT_MASTER_004,
  'TC-HOME-AGENT-MASTER-005': TC_HOME_AGENT_MASTER_005,
  'TC-HOME-AGENT-MASTER-006': TC_HOME_AGENT_MASTER_006,
  'TC-HOME-DIGITAL-ASSETS-001': TC_HOME_DIGITAL_ASSETS_001,
  'TC-HOME-DIGITAL-ASSETS-002': TC_HOME_DIGITAL_ASSETS_002,
  'TC-HOME-DIGITAL-ASSETS-003': TC_HOME_DIGITAL_ASSETS_003,
};