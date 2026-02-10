import path from 'path';

// upload file
const fileInputSelector = '#file-input';

export async function genUploadFile(page: any) {
  console.log('start uploading file...');

  // 1. 等待 input[type=file] 出現
  await page.waitForSelector(fileInputSelector);

  // 2. 取得 input element handle
  const fileInput = await page.$(fileInputSelector);
  if (!fileInput) {
    throw new Error(`File input not found for selector: ${fileInputSelector}`);
  }

  // 3. 準備要上傳的檔案路徑（可放多個）
  const filesToUpload = [
    path.resolve(__dirname, '../../../assets/Company Information Sheet_V1.0.docx'),
    // path.resolve(__dirname, '../../../assets/file2.docx'),
    // path.resolve(__dirname, '../../../assets/file3.docx'),
  ];

  // 4. 使用 Puppeteer 的 uploadFile 上傳多個檔案
  await fileInput.uploadFile(...filesToUpload);

  console.log('file uploaded!');
  return true;
}