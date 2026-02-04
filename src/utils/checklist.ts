import * as fs from 'fs';
import * as path from 'path';
import ExcelJS from 'exceljs';

interface ChecklistItem {
  name: string;
  found: boolean; // true/false only
  text: string; // text content
  url: string; // URL if it's a link
}

class ChecklistManager {
  private excelPath: string;
  private txtPath: string;
  private workbook: ExcelJS.Workbook;
  private txtContent: string[];
  private fileItems: Map<string, ChecklistItem[]>;
  private directMessages: Map<string, string[]>;

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

  // add item to a file's checklist (collect items by file name)
  addItemToFile(fileName: string, item: ChecklistItem) {
    if (!this.fileItems.has(fileName)) {
      this.fileItems.set(fileName, []);
    }
    this.fileItems.get(fileName)!.push(item);
  }

  // add checklist for a file (all items collected for this file)
  async addFileChecklist(fileName: string, items: ChecklistItem[]) {
    // add to Excel - new format
    const worksheet = this.workbook.addWorksheet(fileName);
    
    // add header row: A=name, B=true/false, C=text, D=url
    worksheet.addRow(['name', 't/f', 'text', 'url']);
    
    // add data rows
    items.forEach(item => {
      const found = item.found ? 'true' : 'false';
      // If found is false, show "error" for text and url
      const text = item.found ? (item.text || '') : 'error';
      const url = item.found ? (item.url || '') : 'error';
      worksheet.addRow([item.name, found, text, url]);
    });

    // add to TXT
    this.txtContent.push(fileName);
    
    // Calculate statistics
    const totalCount = items.length;
    const trueCount = items.filter(item => item.found).length;
    const falseItems = items.filter(item => !item.found);
    
    // Add each item (only name and true/false, no text or url)
    items.forEach(item => {
      this.txtContent.push(`${item.name}: ${item.found ? 'true' : 'false'}`);
    });
    
    // Add statistics: x/y selector true
    this.txtContent.push(`${trueCount}/${totalCount} selector true`);
    
    // Add false selectors if any
    if (falseItems.length > 0) {
      this.txtContent.push('false selector:');
      falseItems.forEach(item => {
        this.txtContent.push(item.name);
      });
    }
    
    this.txtContent.push(''); // empty line between files
  }

  // log direct message to Excel and TXT (accumulate per worksheet)
  logDirectMessage(worksheetName: string, message: string) {
    if (!this.directMessages.has(worksheetName)) {
      this.directMessages.set(worksheetName, []);
    }
    this.directMessages.get(worksheetName)!.push(message);
  }

  // save all collected file checklists
  async save() {
    // save all collected file checklists to Excel and TXT
    for (const [fileName, items] of this.fileItems.entries()) {
      await this.addFileChecklist(fileName, items);
    }

    // process direct messages (Excel + TXT)
    for (const [worksheetName, messages] of this.directMessages.entries()) {
      // Excel: each message is a new row (A1, A2, A3, ...)
      const worksheet = this.workbook.addWorksheet(worksheetName);
      messages.forEach((msg) => {
        worksheet.addRow([msg]);
      });

      // TXT: title line + one line per message
      this.txtContent.push(worksheetName);
      messages.forEach((msg) => {
        this.txtContent.push(msg);
      });
      this.txtContent.push(''); // empty line between message groups
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