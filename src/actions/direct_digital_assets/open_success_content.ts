import { navigateToDigitalAssetsPage } from "./digital_assets_page";
import { ChecklistManager } from "../../utils/checklist";

export async function openSuccessContent(page: any, checklistManager: ChecklistManager): Promise<boolean> {
    await navigateToDigitalAssetsPage(page, checklistManager);
    // First check if any expand button exists
    const expandButtons = await page.$$('button.css-15ksupa');
    
    if (expandButtons.length === 0) {
        throw new Error('No uploaded document found');
    }
    
    // Find the button that has "Success" status in its parent card
    let successButton = null;
    
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
            
            // Check if this button's card contains "Success" status
            const hasSuccess = await page.evaluate((btn: any) => {
                // Find the parent card
                const card = btn.closest('.MuiCard-root');
                if (!card) return false;
                
                // Look for the Success chip within this card
                const successChip = card.querySelector('.MuiChip-filledSuccess .MuiChip-label');
                if (successChip) {
                    return successChip.textContent?.trim() === 'Success';
                }
                return false;
            }, button);
            
            if (hasSuccess) {
                successButton = button;
                break;
            }
        } catch (error) {
            console.warn('Error checking button for Success status:', error);
            continue;
        }
    }
    
    if (!successButton) {
        throw new Error('No expand button with Success status found');
    }
    
    // Click the expand button (not the Success chip)
    await successButton.click();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
}

export default openSuccessContent;