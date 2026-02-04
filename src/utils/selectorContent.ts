export async function getUrlIfLink(page: any, selector: string, found: boolean): Promise<string> {
    if (!found) {
        return '';
    }

    try {
        const element = await page.$(selector);
        if (!element) {
            return '';
        }

        // Check if element is a link (has href attribute)
        const tagName = await page.evaluate((el: any) => el.tagName.toLowerCase(), element);
        if (tagName === 'a') {
            const href = await page.evaluate((el: any) => el.getAttribute('href'), element);
            if (href) {
                // Convert relative URL to absolute if needed
                if (href.startsWith('/')) {
                    const origin = await page.evaluate(() => window.location.origin);
                    return origin + href;
                }
                return href;
            }
        }
        return '';
    } catch (error) {
        return '';
    }
}

// Helper function to get text content from element if it exists
export async function getTextIfExists(page: any, selector: string, found: boolean): Promise<string> {
    if (!found) {
        return '';
    }

    try {
        const element = await page.$(selector);
        if (!element) {
            return '';
        }

        const text = await page.evaluate((el: any) => el.innerText || el.textContent || '', element);
        return text.trim();
    } catch (error) {
        console.warn(`Could not get text for selector ${selector}:`, error);
        return '';
    }
}

