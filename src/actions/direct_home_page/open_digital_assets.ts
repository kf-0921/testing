import { ChecklistManager } from "../../utils/checklist";
export async function openDigitalAssets(page: any, checklistManager: ChecklistManager) {
    console.log('start digital assets...');

    // clcik digital assets
    try {
        await page.waitForSelector('label[for="digital-assets-mode"]', { timeout: 1000 });
    } catch {
        checklistManager.logDirectMessage('open digital assets', 'Selector not found: label[for="digital-assets-mode"]');
        return;
    }
    console.log('digital assets mode badge found...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.click('label[for="digital-assets-mode"]');
    console.log('digital assets mode badge clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    const digitalAssetsModal = await page.$('div.settings-modal[style*="display: block;"]');
    if (digitalAssetsModal) {
        console.log('Digital assets modal found');
        checklistManager.logDirectMessage('Home Page', `Selector found: ${digitalAssetsModal}`);
        checklistManager.logDirectMessage('Home Page', 'Successfully opened digital assets modal');
    } else {
        checklistManager.logDirectMessage('Home Page', `Selector not found: ${digitalAssetsModal}`);
        checklistManager.logDirectMessage('Home Page', 'Failed to open digital assets modal');
    }
}