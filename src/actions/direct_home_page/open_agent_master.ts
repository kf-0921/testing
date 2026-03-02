import { ChecklistManager } from "../../utils/checklist";

export async function openAgentMaster(page: any, checklistManager: ChecklistManager) {
    console.log('start generating agent...');

    // clcik agent manager 
    try {
        await page.waitForSelector('label[for="agent-manager-mode"]');
    } catch {
        console.log('Selector not found');
        return;
    }
    console.log('agent manager mode badge found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('label[for="agent-manager-mode"]');
    console.log('agent manager mode badge clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));


    const agentManagerModal = await page.$('div.settings-modal[style="display: block;"]');
    if (agentManagerModal) {
        // close popup
        const closepopup = await page.$('div.am-tour-overlay[style="display: flex;"] ');
        if (closepopup) {
            try {
                await page.waitForSelector('button.am-tour-skip', { timeout: 1000 });
            } catch {
                checklistManager.logDirectMessage('open agent master', 'Selector not found: button.am-tour-skip');
                return;
            }
            await page.click('button.am-tour-skip');
            console.log('close popup...');
        }

        console.log('Combine area found');
        checklistManager.logDirectMessage('Home Page', `Selector found: ${agentManagerModal}`);
        checklistManager.logDirectMessage('Home Page', 'Successfully opened agent manager modal');
    } else {
        checklistManager.logDirectMessage('Home Page', `Selector not found: ${agentManagerModal}`);
        checklistManager.logDirectMessage('Home Page', 'Failed to open agent manager modal');
    }
}

export async function clearAllAgent(page: any) {
    try {
        await page.waitForSelector('button.btn-clear-all');
    } catch {
        console.log('Selector not found');
        return;
    }
    console.log('clear all agent button found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('button.btn-clear-all');
    console.log('clear all agent button clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

export async function enableAgentMaster(page: any, checklistManager: ChecklistManager) {
    const hitelement = await page.$('div.am-validation-hint[style="display: flex;"]');
    if (!hitelement) {
        console.log('hint element not found...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        try {
            await page.waitForSelector('div.am-enable-row span.slider', { timeout: 1000 });
        } catch {
           checklistManager.logDirectMessage('enable agent master', 'Selector not found: div.am-enable-row span.slider');
            return;
        }
        await page.click('div.am-enable-row span.slider');

        console.log('slider clicked...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

export async function addAgent(page: any) {
    try {
        await page.waitForSelector('div[data-agent-id="0"] button.am-agent-add-btn');
    } catch {
        console.log('Selector not found');
        return;
    }
    console.log('agent button found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('div[data-agent-id="0"] button.am-agent-add-btn');
    console.log('agent button clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

export async function applyAgent(page: any) {
    try {
        await page.waitForSelector('div.settings-modal-footer button[id="agent-master-apply-btn"]');
    } catch {
        console.log('Selector not found');
        return;
    }
    console.log('apply agent button found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('div.settings-modal-footer button[id="agent-master-apply-btn"]');
    console.log('apply agent button clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));
}

export async function cancelAgent(page: any) {
    try {
        await page.waitForSelector('div.settings-modal-footer button[id="agent-master-cancel-btn"]');
    } catch {
        console.log('Selector not found');
        return;
    }
    console.log('cancel agent button found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await page.click('div.settings-modal-footer button[id="agent-master-cancel-btn"]');
    console.log('cancel agent button clicked...');
    await new Promise(resolve => setTimeout(resolve, 2000));
}