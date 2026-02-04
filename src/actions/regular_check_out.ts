import { ChecklistManager } from '../utils/checklist';
import { getUrlIfLink, getTextIfExists } from '../utils/selectorContent';

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
async function fillCheckoutForm(page: any) {
  console.log('Start checking and filling required fields...');

  await fillRequiredFieldIfEmpty(page, '#billing_first_name', 'John', 'First Name');
  await fillRequiredFieldIfEmpty(page, '#billing_last_name', 'Doe', 'Last Name');
  await fillRequiredFieldIfEmpty(page, '#billing_address_1', '123 Main Street', 'Street Address');
  await fillRequiredFieldIfEmpty(page, '#billing_city', 'Central', 'Town/District');
  await fillRequiredFieldIfEmpty(page, '#billing_phone', '12345678', 'Phone');
  await fillRequiredFieldIfEmpty(page, '#billing_email', 'john.doe@example.com', 'Email');

  console.log('Required fields checked and filled!');
}

// navigate to plan page
async function navigateToPlanPage(page: any, checklistManager: ChecklistManager) {
  console.log('goto poffices.ai...');
  await page.goto('https://poffices.ai/', {
    waitUntil: 'networkidle0'
  });

  // close pop up if it exists
  const popupCloseFound = await checklistManager.checkElement(page, 'button.credit-popup-close');
  const popupCloseUrl = await getUrlIfLink(page, 'button.credit-popup-close', popupCloseFound);
  const popupCloseText = await getTextIfExists(page, 'button.credit-popup-close', popupCloseFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'popup close button',
    found: popupCloseFound,
    text: popupCloseText,
    url: popupCloseUrl
  });

  if (popupCloseFound) {
    console.log('click credit popup close button...');
    await page.click('button.credit-popup-close');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('credit popup close button clicked!');
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  const userDropdownFound = await checklistManager.checkElement(page, 'div.nav-user-dropdown');
  const userDropdownUrl = await getUrlIfLink(page, 'div.nav-user-dropdown', userDropdownFound);
  const userDropdownText = await getTextIfExists(page, 'div.nav-user-dropdown', userDropdownFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'user dropdown',
    found: userDropdownFound,
    text: userDropdownText,
    url: userDropdownUrl
  });

  await page.waitForSelector('div.nav-user-dropdown', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User dropdown element is visible!');
  console.log('click User dropdown...');

  page.click('div.nav-user-dropdown');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User dropdown clicked!');

  const planLinkFound = await checklistManager.checkElement(page, 'a#nav-dropdown-plan');
  const planLinkUrl = await getUrlIfLink(page, 'a#nav-dropdown-plan', planLinkFound);
  const planLinkText = await getTextIfExists(page, 'a#nav-dropdown-plan', planLinkFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'plan link',
    found: planLinkFound,
    text: planLinkText,
    url: planLinkUrl
  });

  console.log('click Plan link...');
  const planStart = performance.now();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('a#nav-dropdown-plan')
  ]);
  const planDuration = performance.now() - planStart;
  console.log(`Plan page load (networkidle0) time: ${planDuration.toFixed(0)} ms`);
  console.log('click completed!');

  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('current page:', page.url());
}

// purchase regular plan
async function purchaseRegularPlan(page: any, checklistManager: ChecklistManager) {
  // wait for element to appear
  console.log('wait for Regular Buy Now button...');
  const buyNowButtonFound = await checklistManager.checkElement(page, 'div.elementor-element-05f1227 a.elementor-size-md');
  const buyNowButtonUrl = await getUrlIfLink(page, 'div.elementor-element-05f1227 a.elementor-size-md', buyNowButtonFound);
  const buyNowButtonText = await getTextIfExists(page, 'div.elementor-element-05f1227 a.elementor-size-md', buyNowButtonFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'regular buy now button',
    found: buyNowButtonFound,
    text: buyNowButtonText,
    url: buyNowButtonUrl
  });

  await page.waitForSelector('div.elementor-element-05f1227 a.elementor-size-md', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('button is visible!');

  // click element and wait for page to fully load (measure time)
  console.log('click Regular Buy Now button...');
  const buyStart = performance.now();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('div.elementor-element-05f1227 a.elementor-size-md')
  ]);
  const buyDuration = performance.now() - buyStart;
  console.log(`Buy Now page load (networkidle0) time: ${buyDuration.toFixed(0)} ms`);
  await new Promise(resolve => setTimeout(resolve, 2000));
}

// apply coupon
async function applyCoupon(page: any, checklistManager: ChecklistManager) {
  // wait for coupon input box to appear
  const couponInputFound = await checklistManager.checkElement(page, '#coupon_code');
  const couponInputUrl = await getUrlIfLink(page, '#coupon_code', couponInputFound);
  const couponInputText = await getTextIfExists(page, '#coupon_code', couponInputFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'coupon input',
    found: couponInputFound,
    text: couponInputText,
    url: couponInputUrl
  });

  await page.waitForSelector('#coupon_code', { timeout: 10000 });
  console.log('coupon input is visible!');

  // type coupon code
  console.log('typing coupon code...');
  await page.type('#coupon_code', 'RPA-Regular', { delay: 100 });
  await new Promise(resolve => setTimeout(resolve, 2000));

  // click Apply coupon button
  const applyCouponButtonFound = await checklistManager.checkElement(page, 'button[name="apply_coupon"]');
  const applyCouponButtonUrl = await getUrlIfLink(page, 'button[name="apply_coupon"]', applyCouponButtonFound);
  const applyCouponButtonText = await getTextIfExists(page, 'button[name="apply_coupon"]', applyCouponButtonFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'apply coupon button',
    found: applyCouponButtonFound,
    text: applyCouponButtonText,
    url: applyCouponButtonUrl
  });

  console.log('click Apply coupon button...');
  await page.click('button[name="apply_coupon"]');
  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('coupon applied!');
}

// navigate to checkout page
async function navigateToCheckout(page: any, checklistManager: ChecklistManager) {
  const checkoutButtonFound = await checklistManager.checkElement(page, 'a.checkout-button.button.alt.wc-forward');
  const checkoutButtonUrl = await getUrlIfLink(page, 'a.checkout-button.button.alt.wc-forward', checkoutButtonFound);
  const checkoutButtonText = await getTextIfExists(page, 'a.checkout-button.button.alt.wc-forward', checkoutButtonFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'checkout button',
    found: checkoutButtonFound,
    text: checkoutButtonText,
    url: checkoutButtonUrl
  });

  console.log('Start click checkout button...');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('a.checkout-button.button.alt.wc-forward')
  ]);
  console.log('Checkout button clicked!');
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('checkout completed!');
}

// place order
async function placeOrder(page: any, checklistManager: ChecklistManager) {
  // fill checkout form
  console.log('goto checkout page...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await fillCheckoutForm(page);
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('checkout form filled!');

  // click place order button
  const placeOrderButtonFound = await checklistManager.checkElement(page, 'button[name="woocommerce_checkout_place_order"]');
  const placeOrderButtonUrl = await getUrlIfLink(page, 'button[name="woocommerce_checkout_place_order"]', placeOrderButtonFound);
  const placeOrderButtonText = await getTextIfExists(page, 'button[name="woocommerce_checkout_place_order"]', placeOrderButtonFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'place order button',
    found: placeOrderButtonFound,
    text: placeOrderButtonText,
    url: placeOrderButtonUrl
  });

  console.log('click place order button...');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('button[name="woocommerce_checkout_place_order"]')
  ]);
  console.log('Place order button clicked!');
}

// confirm order
async function confirmOrder(page: any, checklistManager: ChecklistManager): Promise<string | null> {
  console.log('checking for order number...');
  const orderNumberElementFound = await checklistManager.checkElement(page, 'li.woocommerce-order-overview__order strong');
  const orderNumberElementUrl = await getUrlIfLink(page, 'li.woocommerce-order-overview__order strong', orderNumberElementFound);
  const orderNumberElementText = await getTextIfExists(page, 'li.woocommerce-order-overview__order strong', orderNumberElementFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'order number element',
    found: orderNumberElementFound,
    text: orderNumberElementText,
    url: orderNumberElementUrl
  });

  const orderNumberElement = await page.$('li.woocommerce-order-overview__order strong');

  if (orderNumberElement) {
    const orderNumber = await page.evaluate((el: Element) => el.textContent, orderNumberElement);
    console.log(`Order found! Order number: ${orderNumber}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return orderNumber?.trim() || null;
  } else {
    console.log('Order number not found');
    await new Promise(resolve => setTimeout(resolve, 2000));
    return null;
  }
}


async function navigateToAccountOrdersPage(page: any, checklistManager: ChecklistManager) {

  const userDropdownFound = await checklistManager.checkElement(page, 'div.nav-user-dropdown');
  const userDropdownUrl = await getUrlIfLink(page, 'div.nav-user-dropdown', userDropdownFound);
  const userDropdownText = await getTextIfExists(page, 'div.nav-user-dropdown', userDropdownFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'user dropdown in order number page',
    found: userDropdownFound,
    text: userDropdownText,
    url: userDropdownUrl
  });

  await page.waitForSelector('div.nav-user-dropdown', { timeout: 10000 });
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User dropdown element is visible!');
  console.log('click User dropdown...');

  page.click('div.nav-user-dropdown');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('User dropdown clicked!');

  const accountLinkFound = await checklistManager.checkElement(page, 'a#nav-dropdown-account');
  const accountLinkUrl = await getUrlIfLink(page, 'a#nav-dropdown-account', accountLinkFound);
  const accountLinkText = await getTextIfExists(page, 'a#nav-dropdown-account', accountLinkFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'account link',
    found: accountLinkFound,
    text: accountLinkText,
    url: accountLinkUrl
  });

  console.log('click Account link...');
  const planStart = performance.now();
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('a#nav-dropdown-account')
  ]);
  const planDuration = performance.now() - planStart;
  console.log(`Plan page load (networkidle0) time: ${planDuration.toFixed(0)} ms`);
  console.log('click completed!');

  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('current page:', page.url());

  const accountOrdersLinkFound = await checklistManager.checkElement(page, 'li.woocommerce-MyAccount-navigation-link--orders a');
  const accountOrdersLinkUrl = await getUrlIfLink(page, 'li.woocommerce-MyAccount-navigation-link--orders a', accountOrdersLinkFound);
  const accountOrdersLinkText = await getTextIfExists(page, 'li.woocommerce-MyAccount-navigation-link--orders a', accountOrdersLinkFound);
  checklistManager.addItemToFile('regular check out', {
    name: 'account orders link',
    found: accountOrdersLinkFound,
    text: accountOrdersLinkText,
    url: accountOrdersLinkUrl
  });
  console.log('click Account orders link...');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    page.click('li.woocommerce-MyAccount-navigation-link--orders a')
  ]);
  console.log('click completed!');

  await new Promise(resolve => setTimeout(resolve, 5000));
  console.log('current page:', page.url());
}

async function checkOrder(page: any, checklistManager: ChecklistManager, orderNumber: string | null) {
  if (!orderNumber) {
    console.log('Order number is not available, cannot check order');
    return;
  }

  console.log(`Checking order for order number: ${orderNumber}`);


  const orderExists = await page.$(`th[data-title="Order"] a[aria-label="View order number ${orderNumber}"]`);
  const orderNumberElementText = await getTextIfExists(page, `th[data-title="Order"] a[aria-label="View order number ${orderNumber}"]`, !!orderExists);
  const orderNumberElementUrl = await getUrlIfLink(page, `th[data-title="Order"] a[aria-label="View order number ${orderNumber}"]`, !!orderExists);
  const viewOrderButtonText = await getTextIfExists(page, `td[data-title="Actions"] a[aria-label="View order number ${orderNumber}"]`, !!orderExists);
  const viewOrderButtonUrl = await getUrlIfLink(page, `td[data-title="Actions"] a[aria-label="View order number ${orderNumber}"]`, !!orderExists);

  checklistManager.addItemToFile('regular check out', {
    name: 'order number',
    found: !!orderExists,
    text: orderNumberElementText,
    url: orderNumberElementUrl
  });

  if (orderExists) {
      console.log(`Order ${orderNumber} exists`);
      checklistManager.addItemToFile('regular check out', {
        name: 'view order button exists',
        found: true,
        text: viewOrderButtonText,
        url: viewOrderButtonUrl
      });
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click(`td[data-title="Actions"] a[aria-label="View order number ${orderNumber}"]`)
      ]);
      console.log('View order button clicked!');
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('current page:', page.url());
  } else {
      console.log(`Order ${orderNumber} does not exist`);
      return false;
  }
  return true;
}



export async function regularPlanStep(page: any, checklistManager: ChecklistManager) {
  // navigate to plan page
  await navigateToPlanPage(page, checklistManager);
  // purchase regular plan
  await purchaseRegularPlan(page, checklistManager);
  // apply coupon
  await applyCoupon(page, checklistManager);
  // navigate to checkout page
  await navigateToCheckout(page, checklistManager);
  // place order
  await placeOrder(page, checklistManager);
  // confirm order
  const orderNumber = await confirmOrder(page, checklistManager);
  // navigate to account orders page
  await navigateToAccountOrdersPage(page, checklistManager);
  // check order
  await checkOrder(page, checklistManager, orderNumber);
}