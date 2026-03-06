// import { directBlogPage } from "../direct_dropdown";
// import { ChecklistManager } from "../../../utils/checklist";
// import { getPageLanguageInfo } from "../../../checking/language/page_language";

// // Helper function to navigate to account page and click a navigation link
// async function check4Items(page: any, checklistManager: ChecklistManager, selector: string, linkName: string, validateElement: string | null = null) {
//     await directBlogPage(page, checklistManager);
//     try {
//         await page.waitForSelector('div.elth-dropdown-box.show-by', { timeout: 1000 });
//     } catch {
//         checklistManager.logDirectMessage('direct blog home page', `Selector not found: div.elth-dropdown-box.show-by`);
//         return;
//     }
//     await page.click('div.elth-dropdown-box.show-by');
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     try {
//         await page.waitForSelector('a[data-number="4"]', { timeout: 1000 });
//     } catch {
//         checklistManager.logDirectMessage('direct blog home page', `Selector not found: a[data-number="4"]`);
//         return;
//     }
//     await Promise.all([
//         page.waitForNavigation({ waitUntil: 'networkidle0' }),
//         page.click('a[data-number="4"]')
//     ]);
// //class="js-content-main list-post-wrap row wrap-list-style2"
//     try {
//         await page.waitForSelector(selector, { timeout: 1000 });
//     } catch {
//         checklistManager.logDirectMessage('direct blog page', `Selector not found: ${selector}`);
//         return;
//     }
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     console.log(`${linkName} link element is visible!`);
//     console.log(`click ${linkName} link...`);

//     await Promise.all([
//         page.waitForNavigation({ waitUntil: 'networkidle0' }),
//         page.click(selector)
//     ]);

//     console.log('click completed!');
//     console.log('current page:', page.url());

//     if (validateElement === 'cart') {
//         await validateInCart(page, checklistManager, linkName);
//         //check page language
//         await getPageLanguageInfo(page, checklistManager);
//     } else if (validateElement) {
//         const validateElementCheck = await page.$(validateElement);
//         if (validateElementCheck) {
//             checklistManager.logDirectMessage('direct blog page', `Selector found: ${validateElementCheck}`);
//             checklistManager.logDirectMessage('direct blog page', `confirm redirect to ${linkName} page success!`);
//             //check page language
//             await getPageLanguageInfo(page, checklistManager);
//             return validateElementCheck;
//         } else {
//             checklistManager.logDirectMessage('direct blog page', `Selector not found: ${validateElementCheck}`);
//             checklistManager.logDirectMessage('direct blog page', `redirect to ${linkName} page failed!`);
//         }
//     } else {
//         await validateDirectedPage(page, checklistManager, linkName);
//         //check page language
//         await getPageLanguageInfo(page, checklistManager);
//     }
// }
