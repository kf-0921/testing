import { ChecklistManager } from "../../utils/checklist";

export const switchLanguage = async (
  page: any,
  checklistManager: ChecklistManager,
  targetLanguage: "ENG" | "繁中" = "ENG"
) => {
  // 1) 等語言容器出現
  try {
    await page.waitForSelector("div.language-container", { timeout: 10000 });
    console.log("Selector found: div.language-container");
  } catch {
    console.log("Selector not found: div.language-container");
    checklistManager.logDirectMessage(
      "switch language",
      "Selector not found: div.language-container"
    );
    return;
  }

  // 2) 點語言容器，打開下拉清單
  console.log("click div.language-container...");
  await page.click("div.language-container");

  // 等它變成打開狀態（is-open / open）
  try {
    await page.waitForSelector("div.language-container.is-open", {
      timeout: 5000,
    });
    await page.waitForSelector("div.language-dropdown.open", {
      timeout: 5000,
    });
    console.log("language dropdown is open");
  } catch {
    console.log("language dropdown did not open properly");
    checklistManager.logDirectMessage(
      "switch language",
      "Language dropdown did not open"
    );
    return;
  }

  // 3) 等選項容器存在（保險）
  try {
    await page.waitForSelector("div.language-options", { timeout: 10000 });
    console.log("Selector found: div.language-options");
  } catch {
    console.log("Selector not found: div.language-options");
    checklistManager.logDirectMessage(
      "switch language",
      "Selector not found: div.language-options"
    );
    return;
  }

  // 4) 取得所有語言項目
  const languageOptions = await page.$$(
    "div.language-options a.language-option"
  );

  if (languageOptions.length === 0) {
    console.log("No language options found");
    checklistManager.logDirectMessage(
      "switch language",
      "Selector not found: div.language-options a.language-option"
    );
    return;
  }

  let clicked = false;

  // 5) 逐一檢查文字，點擊目標語言
  for (const option of languageOptions) {
    const text = await option.evaluate((el: Element) =>
      (el.textContent || "").trim()
    );
    console.log(`found language option: "${text}"`);

    if (text === targetLanguage) {
      console.log(`click language option: "${text}"`);
      await option.click();
      clicked = true;
      break;
    }
  }

  if (!clicked) {
    console.log(`Language option "${targetLanguage}" not found`);
    checklistManager.logDirectMessage(
      "switch language",
      `Language option "${targetLanguage}" not found`
    );
  }
};