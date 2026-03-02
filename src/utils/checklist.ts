import * as fs from 'fs';
import * as path from 'path';
import ExcelJS from 'exceljs';

interface ChecklistItem {
  name: string;
  found: boolean;
  text: string;
  url: string;
}

interface SectionData {
  sectionName: string;
  items: ChecklistItem[];
}

class ChecklistManager {
  private excelPath: string;
  private txtPath: string;
  private workbook: ExcelJS.Workbook;
  private txtContent: string[];
  private fileItems: Map<string, ChecklistItem[]>;
  private fileSections: Map<string, SectionData[]>; // New: track sections per file
  private directMessages: Map<string, string[]>;
  private currentSheetName?: string;


  constructor(timestamp: string) {
    // create directories
    const excelDir = path.join('dist', 'excel_result');
    const txtDir = path.join('dist', 'txt_result');

    if (!fs.existsSync(excelDir)) {
      fs.mkdirSync(excelDir, { recursive: true });
      console.log('create folder:', excelDir);
    }

    if (!fs.existsSync(txtDir)) {
      fs.mkdirSync(txtDir, { recursive: true });
      console.log('create folder:', txtDir);
    }

    // file paths with timestamp
    this.excelPath = path.join(excelDir, `checklist-${timestamp}.xlsx`);
    this.txtPath = path.join(txtDir, `checklist-${timestamp}.txt`);

    // initialize workbook and txt content
    this.workbook = new ExcelJS.Workbook();
    this.txtContent = [];
    this.fileItems = new Map();
    this.fileSections = new Map(); // New
    this.directMessages = new Map();
  }

  // check if element exists on page
  async checkElement(page: any, selector: string): Promise<boolean> {
    try {
      const element = await page.$(selector);
      return element !== null;
    } catch (error) {
      return false;
    }
  }
  setCurrentSheetName(id: string | undefined) {
    this.currentSheetName = id;
  }

  // add item to a file's checklist (collect items by file name). If sheetName is provided, use it as the worksheet name; otherwise use fileName.
  addItemToFile(fileName: string, item: ChecklistItem, sheetName?: string) {
    const key = sheetName ?? this.currentSheetName ?? fileName;
    if (!this.fileItems.has(key)) {
      this.fileItems.set(key, []);
    }
    this.fileItems.get(key)!.push(item);
  }

  // Add item to a specific section within a file. If sheetName is provided, use it as the worksheet name; otherwise use fileName.
  addItemToSection(fileName: string, sectionName: string, item: ChecklistItem, sheetName?: string) {
    const key = sheetName ?? this.currentSheetName ?? fileName;
    if (!this.fileSections.has(key)) {
      this.fileSections.set(key, []);
    }

    const sections = this.fileSections.get(key)!;
    let section = sections.find(s => s.sectionName === sectionName);

    if (!section) {
      section = { sectionName: sectionName, items: [] };
      sections.push(section);
    }

    section.items.push(item);
  }

  // Calculate statistics for items
  private calculateStats(items: ChecklistItem[]): { total: number; trueCount: number; falseCount: number; falseItems: ChecklistItem[] } {
    const total = items.length;
    const trueCount = items.filter(item => item.found).length;
    const falseCount = total - trueCount;
    const falseItems = items.filter(item => !item.found);
    return { total, trueCount, falseCount, falseItems };
  }

  // Add section to Excel worksheet
  private addSectionToExcel(worksheet: ExcelJS.Worksheet, sectionName: string, items: ChecklistItem[]) {
    // Add section header row (with section name in first column)
    worksheet.addRow([sectionName, '', '', '']);

    // Add data rows
    items.forEach(item => {
      const found = item.found ? 'true' : 'false';
      const text = item.found ? (item.text || '') : 'error';
      const url = item.found ? (item.url || '') : 'error';
      worksheet.addRow([item.name, found, text, url]);
    });

    // Add statistics row
    const stats = this.calculateStats(items);
    worksheet.addRow([`${stats.trueCount}/${stats.total} selector true`, '', '', '']);
    if (stats.falseCount > 0) {
      worksheet.addRow([`${stats.falseCount}/${stats.total} selector false`, '', '', '']);
    }

    // Add blank row
    worksheet.addRow(['', '', '', '']);
  }

  // Add section to TXT
  private addSectionToTxt(sectionName: string, items: ChecklistItem[]) {
    this.txtContent.push(sectionName);

    // Add each item
    items.forEach(item => {
      let itemLine = `${item.name}: ${item.found ? 'true' : 'false'}`;
      if (item.text && item.text.trim() !== '') {
        itemLine += ` (${item.text})`;
      }
      this.txtContent.push(itemLine);
    });

    // Add statistics
    const stats = this.calculateStats(items);
    this.txtContent.push(`${stats.trueCount}/${stats.total} selector true`);
    if (stats.falseCount > 0) {
      this.txtContent.push(`${stats.falseCount}/${stats.total} selector false`);
      this.txtContent.push('false selector:');
      stats.falseItems.forEach(item => {
        this.txtContent.push(item.name);
      });
    }

    // Add blank line
    this.txtContent.push('');
  }

  // add checklist for a file (all items collected for this file)
  async addFileChecklist(fileName: string, items: ChecklistItem[]) {
    // Check if worksheet already exists, if so, get it; otherwise create new one
    let worksheet = this.workbook.getWorksheet(fileName);
    if (!worksheet) {
      worksheet = this.workbook.addWorksheet(fileName);
      // add header row: A=name, B=true/false, C=text, D=url
      worksheet.addRow(['name', 't/f', 'text', 'url']);
    }

    // add data rows
    items.forEach(item => {
      const found = item.found ? 'true' : 'false';
      const text = item.found ? (item.text || '') : 'error';
      const url = item.found ? (item.url || '') : 'error';
      worksheet.addRow([item.name, found, text, url]);
    });

    // add to TXT
    this.txtContent.push(fileName);

    // Calculate statistics
    const stats = this.calculateStats(items);

    // Add each item
    items.forEach(item => {
      let itemLine = `${item.name}: ${item.found ? 'true' : 'false'}`;
      if (item.text && item.text.trim() !== '') {
        itemLine += ` (${item.text})`;
      }
      this.txtContent.push(itemLine);
    });

    // Add statistics
    this.txtContent.push(`${stats.trueCount}/${stats.total} selector true`);

    // Add false selectors if any
    if (stats.falseItems.length > 0) {
      this.txtContent.push('false selector:');
      stats.falseItems.forEach(item => {
        this.txtContent.push(item.name);
      });
    }

    this.txtContent.push(''); // empty line between files
  }

  // Log direct message to Excel and TXT (accumulate per worksheet). If sheetName is provided, use it as the worksheet name; otherwise use worksheetName.
  logDirectMessage(worksheetName: string, message: string, sheetName?: string) {
    const key = sheetName ?? this.currentSheetName ?? worksheetName;
    if (!this.directMessages.has(key)) {
      this.directMessages.set(key, []);
    }
    this.directMessages.get(key)!.push(message);
  }

  // save all collected file checklists
  async save() {
    // Process files with sections first
    for (const [fileName, sections] of this.fileSections.entries()) {
      let worksheet = this.workbook.getWorksheet(fileName);
      if (!worksheet) {
        worksheet = this.workbook.addWorksheet(fileName);
        worksheet.addRow(['name', 't/f', 'text', 'url']);
      }

      // Process direct messages for this file FIRST (before sections)
      if (this.directMessages.has(fileName)) {
        const messages = this.directMessages.get(fileName)!;
        messages.forEach((msg) => {
          worksheet.addRow([msg]);
        });
        worksheet.addRow(['', '', '', '']);
        this.txtContent.push(fileName);
        messages.forEach((msg) => {
          this.txtContent.push(msg);
        });
        this.txtContent.push(''); // Add blank line after direct messages
      }

      // Add each section
      const allItems: ChecklistItem[] = [];
      for (const section of sections) {
        this.addSectionToExcel(worksheet, section.sectionName, section.items);
        this.addSectionToTxt(section.sectionName, section.items);
        allItems.push(...section.items);
      }

      // Add final summary
      const finalStats = this.calculateStats(allItems);
      worksheet.addRow([`Summary: ${finalStats.trueCount}/${finalStats.total} selector true`, '', '', '']);
      if (finalStats.falseCount > 0) {
        worksheet.addRow([`Summary: ${finalStats.falseCount}/${finalStats.total} selector false`, '', '', '']);
      }

      this.txtContent.push(`Summary: ${finalStats.trueCount}/${finalStats.total} selector true`);
      if (finalStats.falseCount > 0) {
        this.txtContent.push(`Summary: ${finalStats.falseCount}/${finalStats.total} selector false`);
      }
      this.txtContent.push('');
    }

    // save all collected file checklists to Excel and TXT (for files without sections)
    for (const [fileName, items] of this.fileItems.entries()) {
      // Skip if already processed as sections
      if (!this.fileSections.has(fileName)) {
        await this.addFileChecklist(fileName, items);
      }
    }

    // process direct messages for files WITHOUT sections (Excel + TXT)
    for (const [worksheetName, messages] of this.directMessages.entries()) {
      // Skip if already processed above (files with sections)
      if (!this.fileSections.has(worksheetName)) {
        let worksheet = this.workbook.getWorksheet(worksheetName);
        if (!worksheet) {
          try {
            worksheet = this.workbook.addWorksheet(worksheetName);
          } catch (e: any) {
            if (e.message && e.message.includes('Worksheet name already exists')) {
              // 名稱已存在時再取一次；若仍然拿不到就放棄寫入，避免崩潰
              worksheet = this.workbook.getWorksheet(worksheetName) || undefined;
            } else {
              throw e;
            }
          }
        }

        // 如果還是拿不到 worksheet，就跳過這個 worksheet，避免 addRow 出錯
        if (!worksheet) {
          console.warn(`Worksheet '${worksheetName}' not found, skip writing direct messages.`);
          continue;
        }

        messages.forEach((msg) => {
          worksheet.addRow([msg]);
        });
        worksheet.addRow(['', '', '', '']);

        this.txtContent.push(worksheetName);
        messages.forEach((msg) => {
          this.txtContent.push(msg);
        });
        this.txtContent.push('');
      }
    }

    // save Excel
    await this.workbook.xlsx.writeFile(this.excelPath);
    console.log('Excel checklist saved:', this.excelPath);

    // save TXT
    fs.writeFileSync(this.txtPath, this.txtContent.join('\n'), 'utf-8');
    console.log('TXT checklist saved:', this.txtPath);
  }
}
export { ChecklistManager, ChecklistItem };