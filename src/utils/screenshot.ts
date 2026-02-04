// take screenshot
export async function takeScreenshot(page: any, screenshotPath: string) {
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('screenshot saved:', screenshotPath);
  }