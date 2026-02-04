import * as path from 'path';
import { setupDirectories, setupBrowserAndRecorder, cleanup, createChecklistManager } from './utils/setup';
import { loginStep } from './actions/login';
import { regularPlanStep } from './actions/regular_check_out';
import { takeScreenshot } from './utils/screenshot';
import { loginHeaderCheck } from './checking/login_header';
import directToHomePage from './actions/home_page';
import { footerCheck } from './checking/footer';
import { directAccountAccountDetails } from './actions/direct_dropdown/account/direct_account_dashboard';
import { planRegularCheckOut } from './actions/test/checkout/plan_regular_check_out';
import { confirmOrderStep } from './actions/test/checkout/confirm_order';
import { serverRegularCheck } from './actions/test/checkout/server_b1_check_out';


// main function
async function testPoffices() {
  // create timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').split('.')[0];

  // create directories
  const { screenshotDir, recordingDir } = setupDirectories();

  // file path
  const videoPath = path.join(recordingDir, `recording-${timestamp}.mp4`);
  const screenshotPath = path.join(screenshotDir, `screenshot-${timestamp}.png`);

  // create checklist manager
  const checklistManager = createChecklistManager(timestamp);

  try {
    // setup browser and recorder
    const { browser, page, recorder } = await setupBrowserAndRecorder(videoPath);

    // action step
    // login step
    const LoginStep = async () => {
      await loginStep(page, checklistManager);
    };
    // regular plan step
    const RegularPlanStep = async () => {
      await regularPlanStep(page, checklistManager);
    };
    // direct to home page
    const DirectToHomePage = async () => {
      await directToHomePage(page);
    };

    // checking step
    // login header check
    const LoginHeaderCheck = async () => {
      await loginHeaderCheck(page, checklistManager);
    };
    // footer check
    const FooterCheck = async () => {
      await footerCheck(page, checklistManager);
    };


    // direct account address step
    // const DirectAccountAddressStep = async () => {
    //   await directAccountAddress(page);
    // };

    try {
      //login step
      await DirectToHomePage();
      await LoginStep();

      // //action step
      // await DirectToHomePage();
      // await RegularPlanStep();


      // checking step
      await DirectToHomePage();
      await LoginHeaderCheck();
      await FooterCheck();

      //await DirectAccountAddressStep();

      // await planRegularCheckOut(page, checklistManager);
      // await serverRegularCheck(page, checklistManager);



      // take screenshot
      await takeScreenshot(page, screenshotPath);
      // save checklist files
      await checklistManager.save();
      // cleanup resources
      await cleanup(recorder, browser, videoPath);
    } catch (error) {
      console.error('error in test flow:', error);
      // save checklist even if there's an error
      await checklistManager.save();
      await cleanup(recorder, browser, videoPath);
      throw error;
    }

  } catch (error) {
    console.error('error:', error);
  }
}

// execute main function
testPoffices().catch(console.error);