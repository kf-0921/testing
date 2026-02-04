// check if the field is required and fill it if it is empty
async function fillRequiredFieldIfEmpty(page: any, selector: string, value: string, fieldName: string) {
    try {
        const fieldExists = await page.$(selector);
        if (!fieldExists) {
            console.log(`${fieldName} field not found, skipping...`);
            return;
        }
        // check if the field is required (check parent element class)
        const fieldClasses = await page.$eval(
            selector,
            (el: HTMLInputElement) => el.closest('p')?.className || ''
        );
        // required fields have validate-required class
        const isRequired = fieldClasses.includes('validate-required');
        if (!isRequired) {
            console.log(`${fieldName} is optional, skipping...`);
            return;
        }
        // check if the field is validated (has woocommerce-validated class)
        const isValidated = fieldClasses.includes('woocommerce-validated');
        if (isValidated) {
            console.log(`${fieldName} already validated (field filled), skipping...`);
            return;
        }
        // check if the current value is empty
        const currentValue = await page.$eval(selector, (el: HTMLInputElement) => el.value);

        if (!currentValue || currentValue.trim() === '') {
            console.log(`filling ${fieldName}...`);
            await page.type(selector, value, { delay: 50 });
            await new Promise(resolve => setTimeout(resolve, 300));
            console.log(`${fieldName} filled!`);
        } else {
            console.log(`${fieldName} already filled: ${currentValue}`);
        }
    } catch (error) {
        console.error(`Error filling ${fieldName}:`, error);
    }
}

// fill the checkout form
export async function fillCheckoutForm(page: any) {
    console.log('Start checking and filling required fields...');

    await fillRequiredFieldIfEmpty(page, '#billing_first_name', 'a', 'First Name');
    await fillRequiredFieldIfEmpty(page, '#billing_last_name', 'a', 'Last Name');
    await fillRequiredFieldIfEmpty(page, '#billing_address_1', 'a', 'Street Address');
    await fillRequiredFieldIfEmpty(page, '#billing_city', 'a', 'Town/District');
    await fillRequiredFieldIfEmpty(page, '#billing_phone', '12345678', 'Phone');
    await fillRequiredFieldIfEmpty(page, '#billing_email', 'a@gmail.com', 'Email');

    console.log('Required fields checked and filled!');
}