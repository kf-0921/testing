import { navigateToDigitalAssetsPage } from "./digital_assets_page";
import { ChecklistManager } from "../../utils/checklist";

export async function openFailedContent(page: any, checklistManager: ChecklistManager): Promise<boolean> {
    await navigateToDigitalAssetsPage(page, checklistManager);
    // First check if any expand button exists
    const expandButtons = await page.$$('button.css-15ksupa');
    
    if (expandButtons.length === 0) {
        checklistManager.logDirectMessage('open failed content', 'No uploaded document found');
        return false;
    }
    
    // Find the button that has "Failed" status in its parent card
    let failedButton = null;
    
    for (const button of expandButtons) {
        try {
            // Verify this is actually an expand button (not a chip)
            const isExpandButton = await page.evaluate((btn: any) => {
                // Check if it's a button with aria-label="Expand"
                const ariaLabel = btn.getAttribute('aria-label');
                return ariaLabel === 'Expand';
            }, button);
            
            if (!isExpandButton) {
                continue; // Skip if not an expand button
            }
            
            // Check if this button's card contains "Failed" status
            const hasFailed = await page.evaluate((btn: any) => {
                // Find the parent card
                const card = btn.closest('.MuiCard-root');
                if (!card) return false;
                
                // Look for the Failed chip within this card
                const failedChip = card.querySelector('.MuiChip-filledError .MuiChip-label');
                if (failedChip) {
                    return failedChip.textContent?.trim() === 'Failed';
                }
                return false;
            }, button);
            
            if (hasFailed) {
                failedButton = button;
                break;
            }
        } catch (error) {
            console.warn('Error checking button for Failed status:', error);
            continue;
        }
    }
    
    if (!failedButton) {
        checklistManager.logDirectMessage('open failed content', 'No expand button with Failed status found');
        return false;
    }
    
    // Click the expand button (not the Failed chip)
    await failedButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
}

export default openFailedContent;