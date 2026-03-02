export async function genAgent(page: any) {
    console.log('start generating agent...');

    // clcik agent manager 
    try {
        await page.waitForSelector('label[for="agent-manager-mode"]', { timeout: 1000 });
    } catch {
        console.log('Selector not found: label[for="agent-manager-mode"]');
        return false;
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
                console.log('Selector not found: button.am-tour-skip');
                return false;
            }
            await page.click('button.am-tour-skip');
            console.log('close popup...');
        }


        // clear all agent
        try {
            await page.waitForSelector('button.btn-clear-all', { timeout: 1000 });
        } catch {
            console.log('Selector not found: button.btn-clear-all');
            return false;
        }
        console.log('clear all agent button found...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.click('button.btn-clear-all');
        console.log('clear all agent button clicked...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // enable agent master
        const hitelement = await page.$('div.am-validation-hint[style="display: flex;"]');
        if (!hitelement) {
            console.log('hint element not found...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await page.waitForSelector('div.am-enable-row span.slider', { timeout: 1000 });
            } catch {
                console.log('Selector not found: div.am-enable-row span.slider');
                return false;
            }
            await page.click('div.am-enable-row span.slider');
            console.log('slider clicked...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        
        // add agent
        try {
            await page.waitForSelector('div[data-agent-id="0"] button.am-agent-add-btn', { timeout: 1000 });
        } catch {
            console.log('Selector not found: div[data-agent-id="0"] button.am-agent-add-btn');
            return false;
        }
        console.log('agent button found...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.click('div[data-agent-id="0"] button.am-agent-add-btn');
        console.log('agent button clicked...');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // apply agent
        try {
            await page.waitForSelector('div.settings-modal-footer button.button-primary[id="agent-master-apply-btn"]', { timeout: 1000 });
        } catch {
            console.log('Selector not found: div.settings-modal-footer button.button-primary[id="agent-master-apply-btn"]');
            return false;
        }
        console.log('apply agent button found...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.click('div.settings-modal-footer button.button-primary[id="agent-master-apply-btn"]');
        console.log('apply agent button clicked...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return true;
}