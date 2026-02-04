export async function applyCoupon(page: any, couponCode: string) {
    // wait for coupon input box to appear
    console.log('current page:', page.url());
    console.log('start applying coupon...');
    const couponInput = await page.$('#coupon_code');
    console.log('coupon input found...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (!couponInput) {
        console.log('coupon input not found, applying coupon failed...');
        return;
    }
    await page.type('#coupon_code', couponCode, { delay: 100 });
    const applyCouponButton = await page.$('button[name="apply_coupon"]');
    if (!applyCouponButton) {
        console.log('apply coupon button not found, applying coupon failed...');
        return;
    }
    console.log('click Apply coupon button...');
    await page.click('button[name="apply_coupon"]');
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('coupon applied!');
    return true;
  }