import puppeteer from 'puppeteer';
import { PuppeteerScreenRecorder } from 'puppeteer-screen-recorder';
import * as fs from 'fs';
import * as path from 'path';
import { ChecklistManager } from './checklist';

// create directories
export function setupDirectories() {
  const screenshotDir = path.join('dist', 'screenshot');
  const recordingDir = path.join('dist', 'recording');

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    console.log('create folder:', screenshotDir);
  }

  if (!fs.existsSync(recordingDir)) {
    fs.mkdirSync(recordingDir, { recursive: true });
    console.log('create folder:', recordingDir);
  }

  return { screenshotDir, recordingDir };
}

// Helper function to wait for page to be fully loaded
export async function waitForPageComplete(page: any, timeout: number = 30000) {
  try {
    await page.waitForFunction(
      () => document.readyState === 'complete',
      { timeout }
    );
    // Additional small delay to ensure rendering is complete
    await new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    console.warn('Page complete check timeout, continuing...');
  }
}

// setup browser and recorder with auto-tracking for new pages
export async function setupBrowserAndRecorder(videoPath: string) {
  console.log('start browser...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
  });

  console.log('open new page...');
  let currentPage: any = await browser.newPage();

  // Set up automatic tracking for new pages/tabs
  browser.on('targetcreated', async (target: any) => {
    const newPage = await target.page();
    if (newPage && newPage !== currentPage) {
      console.log('New page/tab detected, switching to it...');
      currentPage = newPage;
      
      // Wait for the new page to load
      try {
        await currentPage.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 });
      } catch (error) {
        // Page might already be loaded, just wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      console.log('Switched to new page:', currentPage.url());
    }
  });

  // Set viewport BEFORE starting recorder to ensure consistent recording
  // 1680x1050 = 16:10 aspect ratio
  await currentPage.setViewport({ width: 1680, height: 1050 });
  
  // Wait a bit for viewport to stabilize
  await new Promise(resolve => setTimeout(resolve, 500));

  // create recorder (only record the browser window)
  const recorder = new PuppeteerScreenRecorder(currentPage, {
    followNewTab: true,
    fps: 24, // Smooth video recording
    aspectRatio: '16:10', // Match viewport ratio (1680:1050)
  });

  // start recording
  console.log('start recording...');
  await recorder.start(videoPath);
  
  // Wait for recorder to stabilize before proceeding
  // This helps prevent capturing loading states
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Create a page wrapper that always returns the current page
  // This avoids Proxy issues with private members
  const pageWrapper = {
    get current() {
      return currentPage;
    },
    // Forward all common Puppeteer methods
    goto: (...args: any[]) => currentPage.goto(...args),
    click: (...args: any[]) => currentPage.click(...args),
    type: (...args: any[]) => currentPage.type(...args),
    waitForSelector: (...args: any[]) => currentPage.waitForSelector(...args),
    waitForNavigation: (...args: any[]) => currentPage.waitForNavigation(...args),
    waitForFunction: (...args: any[]) => currentPage.waitForFunction(...args),
    evaluate: (...args: any[]) => currentPage.evaluate(...args),
    $: (...args: any[]) => currentPage.$(...args),
    $$: (...args: any[]) => currentPage.$$(...args),
    url: () => currentPage.url(),
    setViewport: (...args: any[]) => currentPage.setViewport(...args),
    screenshot: (...args: any[]) => currentPage.screenshot(...args),
    // Add any other methods you use frequently
  };

  // Use Proxy only for property access, not method calls
  const pageProxy = new Proxy(pageWrapper, {
    get: (target, prop: string | symbol) => {
      // If it's a method we've explicitly defined, use that
      if (prop in target) {
        return (target as any)[prop];
      }
      // Otherwise, try to get it from currentPage
      const value = (currentPage as any)[prop];
      if (typeof value === 'function') {
        return value.bind(currentPage);
      }
      return value;
    }
  });

  return { browser, page: pageProxy as any, recorder, getCurrentPage: () => currentPage };
}

// create checklist manager
export function createChecklistManager(timestamp: string): ChecklistManager {
  return new ChecklistManager(timestamp);
}

// cleanup resources
export async function cleanup(recorder: PuppeteerScreenRecorder, browser: any, videoPath: string) {
  // wait 2 seconds to see the result
  await new Promise(resolve => setTimeout(resolve, 2000));

  // stop recording
  console.log('stop recording...');
  await recorder.stop();
  console.log(`video saved: ${videoPath}`);

  console.log('close browser...');
  await browser.close();
}