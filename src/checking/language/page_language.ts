import { ChecklistManager } from "../../utils/checklist";

interface PageLanguageInfo {
    hasChinese: boolean;
    hasEnglish: boolean;
    chineseChars: string;      // unique Chinese characters concatenated
    englishWords: string[];    // unique English words (lowercased)
}

export async function getPageLanguageInfo(
    page: any,
    checklistManager: ChecklistManager,
    sectionName: string = "Page Language"
): Promise<PageLanguageInfo> {
    const info = await page.evaluate(() => {
        const text = document.documentElement.innerText || "";

        const hasChinese = /[\u4e00-\u9fff]/.test(text);
        const hasEnglish = /[A-Za-z]/.test(text);

        // collect all Chinese characters
        const chineseMatches = text.match(/[\u4e00-\u9fff]/g) || [];
        const uniqueChineseChars = Array.from(
            new Set(
                chineseMatches
                    .map((w) => w.toLowerCase())
                    .filter((w) => w !== "語言我們致力以創新和科技令大活更美好研有限公司香港界荃灣柴角街號順豐工業中心樓室關於聯繫隱私政策條款與細則")   // filter out "apple"
            )
        );
        // collect all English words, EXCLUDING "apple"
        const englishMatches = text.match(/[A-Za-z]+/g) || [];
        const uniqueEnglishWords = Array.from(
            new Set(
                englishMatches
                    .map((w) => w.toLowerCase())
                    .filter((w) => w !== "rpa, tester, h, info, hkrnd, com, company, legal")   // filter out "apple"
            )
        );

        return {
            hasChinese,
            hasEnglish,
            chineseChars: uniqueChineseChars,
            englishWords: uniqueEnglishWords
        };
    });

    const { hasChinese, hasEnglish, chineseChars, englishWords } = info;

    // 1) 判斷摘要
    let summary: string;
    if (hasChinese && !hasEnglish) {
        summary = "has only Chinese";
    } else if (hasEnglish && !hasChinese) {
        summary = "has only English";
    } else if (hasChinese && hasEnglish) {
        summary = "has both Chinese and English";
    } else {
        summary = "has neither Chinese nor English";
    }

    // 2) 紀錄摘要
    checklistManager.logDirectMessage(sectionName, summary);

    // 3) 寫進 Excel（不再截斷）
    const chineseTextForLog = chineseChars;
    const englishTextForLog = englishWords.join(", ");

    checklistManager.addItemToSection(sectionName, "all chinese found", {
        name: "chinese characters",
        found: hasChinese,
        text: chineseTextForLog,
        url: ""
    });

    checklistManager.addItemToSection(sectionName, "all english found", {
        name: "english words",
        found: hasEnglish,
        text: englishTextForLog,
        url: ""
    });

    return info;
}