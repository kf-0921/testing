import { promiseHooks } from "v8";

export async function genInput(page: any) {
  console.log('current page:', page.url());

  console.log('start generating test document...');
  try {
    await page.waitForSelector('textarea.form-control', { timeout: 1000 });
  } catch {
    console.log('Selector not found: textarea.form-control');
    return false;
  }
  console.log('textarea found...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  await page.type('textarea.form-control', 'What is ABCSengitalLimited', { delay: 100 });

  

  await page.keyboard.press('Tab');
  await new Promise(resolve => setTimeout(resolve, 2000));


  await page.keyboard.press('Enter');
 
  await new Promise(resolve => setTimeout(resolve, 1000));

  //div.css-100opl0 span.css-1y04kt4 number-flow-react
  try {
    await page.waitForSelector('div.css-100opl0 span.css-1y04kt4 number-flow-react', { timeout: 1000 });
  } catch {
    console.log('Selector not found: div.css-100opl0 span.css-1y04kt4 number-flow-react');
    return false;
  }
  console.log('number element found...');
  await new Promise(resolve => setTimeout(resolve, 2000));



  return true;
}