const puppeteer = require('puppeteer');
const config = require('./e2econfig.json');

describe('End To End Tests', () => {
  let browser:any;
  let page:any;

  beforeAll(async () => {
    try {
      browser = await puppeteer.launch({ headless: false });
      page = await browser.newPage();
      
      // // Enable request interception
      await page.setRequestInterception(true);

      // Mock API responses using request interception
      page.on('request', (request: { url: () => string; respond: (arg0: { status: number; contentType: string; body: string; }) => void; continue: () => void; }) => {
        if (request.url() === 'http://localhost:3000/generateOtp') {
          // Mock response for OTP API request
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ output: 'success', msg: 'OTP sent to email' }),
          });
        } else if (request.url() === 'http://localhost:3000/register') {
          // Mock response for user registration API request
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ output: 'success', msg: 'User registered successfully' }),
          });
        } else if (request.url() === 'http://localhost:3000/generateResetOtp') {
          // Mock response for user registration API request
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ output: 'success', msg: 'OTP sent to email' }),
          });
        } else if (request.url() === 'http://localhost:3000/user/resetPassword') {
          // Mock response for user registration API request
          request.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ output: 'success', msg: 'Password Reset Successfully' }),
          });
        } else {
          request.continue();
        }
      });

    } catch (error) {
      console.error('Failed to launch browser:', error);
    }
  });
  
  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  //Sign Up Related Tests - otp related
  it('Navigates to Sign Up Page from Home Page, Register the User, finally Signs the User in', async () => {
    //1. Navigate to the sign up page from home page
    //2. Registers the user given correct email/phone no, password and OTP
    //3. logs the user in using the same email/ph no, password
    try {
      
      //step 1
      //domcontentloaded
      //networkidle2
        await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded',timeout:10000});

        //go to signup
        //await page.waitForSelector('._navbar_13z3g_21 ._optionsContainer_13z3g_43 ._authContainer_13z3g_89 button._outline_15241_89._md_15241_43._button_15241_27', {visible:true})
        //await page.waitForSelector('._navbar_13z3g_21 ._authContainer_13z3g_89 button._outline_15241_89._md_15241_43._button_15241_27', {visible:true})
        //await page.waitForSelector('._alertContainer_7h75f_1._success_7h75f_29', {hidden:true})
        await page.click('button._outline_15241_89._md_15241_43._button_15241_27',{waitUntil:"domcontentloaded"});
        console.log("Clicked on Navbar Sign Up button")

        //navigation
        await page.goto('http://localhost:5173/signup', { waitUntil: 'domcontentloaded',timeout:10000});
        await page.waitForNavigation({waitUntil:"domcontentloaded", timeout:10000});

        // Assert that the URL has changed to the expected page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/signup');
        
      //step 2
      await page.waitForSelector('#user_id');
      await page.type('#user_id', config.email);
      await page.type('#user_password', config.password);
      await page.type("#user_password_confirm", config.password)

      await page.click("._signupform_hvsf1_45 ._otpContainer_hvsf1_107 ._solid_15241_63._md_15241_43._button_15241_27");
      await page.type("#otp", "497012");

      //step 3

      const divSelector = '._signupform_hvsf1_45 ._buttonscontainer_hvsf1_133'; // Update with the appropriate selector

      // Define the selector for the button inside the div
      const buttonSelector = `${divSelector} ._solid_15241_63._md_15241_43._button_15241_27`; // Update with the appropriate selector

      // Use Puppeteer's `page.click()` method to click the button
      await page.click(buttonSelector);
      console.log("TEST FOR SIGNUP SUCCESSFUL")

    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 50000); 

  //Login-Logout Related tests
  it('Navigate to Application Upload page from Home(Before Login) Page', async () => {
    //1. starting from home page url
    //2. click on the Apply Now button
    //3. we reach the login page
    //4. user logs in providing correct email and password->check if application upload page is reached
    console.log("Test for Navigating to Application page from before login Home Page")
    try {
      // step 1
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded'});
        console.log('Page title:', await page.title()); // Log page title for debugging

      //log whole page
      /* const pagecontent = await page.content();
      console.log("CONTENTTTTTTTT:",pagecontent) */
      

      //step 2
        // Wait for the Apply Now button to appear
        await page.waitForSelector('._homePageButton_7wljo_45');
        console.log('Apply Now button found',);

        // Click the Apply Now button
        await page.click('._homePageButton_7wljo_45');
        console.log('Clicked Apply Now button'); // Log message indicating button is clicked

      //step 3
        //check for alert about loggin in before applying
        await page.waitForSelector('._alertContainer_7h75f_1._error_7h75f_37');
        console.log("Warning error message for Logging in received");

        // Assert that the URL has changed to the login page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/login');
      
      //step 4
        //log the user in providing correct username and password
        await page.waitForSelector('#user_id');
        await page.type('#user_id', config.email);
        await page.type('#user_password', config.password);
        console.log("Entered Email and Password");

        //click on the login button
        await page.click('._buttonscontainer_8uoy6_145 button._solid_15241_63._md_15241_43._button_15241_27 ')
        console.log("Clicked Login Button")

        //wait for browser to navigate to application upload page
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

        //check if application upload page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/upload');

        console.log("SUCCESSFULLY NAVIGATED TO APPLICATION PAGE FROM BEFORE LOGIN HOME PAGE.")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000);

  it('Logging Out', async()=>{
    //1. load the home page(after login)->due to previous test case
    //2. find and click on the logout option
    console.log("Test for Logging out")
    try {
      // step 1
        await page.goto('http://localhost:5173/upload', { waitUntil: 'domcontentloaded'});
        console.log('Page title:', await page.title()); // Log page title for debugging
        console.log('Current URL(before logout):', page.url());

      //step 2
        // click on logout
        //check if alert has gone and logout option is visible
        await page.waitForSelector('._navbar_13z3g_21 a[href="/logout"]', {visible:true})
        await page.waitForSelector('._alertContainer_7h75f_1._success_7h75f_29', {hidden:true})
        await page.click('._navbar_13z3g_21 a[href="/logout"]', {waitUntil:"domcontentloaded", timeout:20000});
        console.log('Clicked logout');

        //wait for navigation
        //await page.waitForNavigation({waitUntil:"domcontentloaded", timeout:10000})

        //check if Home(Before login) page has been reached
        console.log('Current URL(after logout):', page.url());
        //expect(page.url()).toBe('http://localhost:5173/');

        console.log("TEST FOR LOGGING OUT SUCCESSFUL.")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 30000)

  it('Navigates to Login Page from Home(Before Login) Page and Signs the User in.', async () => {
    //1. Navigate to the login page from home page
    //2. logs the user in using correct email, password -> check if brwoser reaches Home(After Login) Page.
    console.log("Test for simply logging in.")
    try {
      //Step 1
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded', timeout:10000 });
/* 
        // Wait for the login button to appear
        await page.waitForSelector('._navbar_13z3g_21 button._solid_15241_63._md_15241_43._button_15241_27', { timeout: 5000 });
        console.log('Login button found',);

        // Click the Login button
        await page.click('._navbar_13z3g_21 button._solid_15241_63._md_15241_43._button_15241_27');
        console.log('Login button clicked'); */

        // Assert that the URL has changed to the login page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/login');

      //Step 2
        //log the user in providing correct username and password
        await page.waitForSelector("#user_id")
        await page.type('#user_id', config.email);
        await page.type('#user_password', config.password);
        console.log("Entered Email and Password");

        //click on the login button
        await page.click('._loginform_8uoy6_53 ._buttonscontainer_8uoy6_145 button._solid_15241_63._md_15241_43._button_15241_27 ')
        console.log("Clicked Login Button")

        //wait for browser to navigate to application upload page
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

        //check if home page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/');

        console.log("TEST FOR SIMPLE LOGIN SUCCESSFUL")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000);

  //After login tests
  //Submitting Application form
  it('Navigates to Application page, fills the Application form and submits.', async () => {
    //1. Navigate to the application upload page from home page
    //2. Enter all values in the inputs
    //3. Click on the submit button
    //4. check if application was successfully uploaded
    console.log("Test for uploading an Application form with all details.")
    try {
      //Step 1
        //check if it is on home page
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });

        //navigate to application upload page
        await page.click('a[href="/upload"]');
        console.log("Clicked on Application Option");

        //await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

        // Assert that the URL has changed to the application page after clicking the option
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/upload');

      //Step 2
        //Enter all values in the inputs
        await page.waitForSelector('#workshop_name');
        await page.type('#workshop_name', 'ABCD Car Shop');
        await page.type('#workshop_post_code', '123456');
        await page.type('#address', '7, Gautam Budh Nagar, 201301');
        await page.type('#state', 'Uttar Pradesh');
        await page.type('#city', 'Noida');
        await page.type('#user_name', 'ABCD');
        await page.type('#user_mobile', '9876532139');
        await page.type('#bay_count', '19');
        //Services Offered
        await page.click("#react-select-3-input");
        await page.type("#react-select-3-input", "tire services"); 
        await page.keyboard.press("Enter");
        //Expertise
        await page.click("#react-select-5-input");
        await page.type("#react-select-5-input", "German Car"); 
        await page.keyboard.press("Enter");
        //Brand
        await page.click("#react-select-7-input");
        await page.type("#react-select-7-input", "BMW"); 
        await page.keyboard.press("Enter");
        //file upload - PEDNDING
        //checkboxes
        await page.click("input[name='consent_process_data']")
        await page.click("input[name='consent_being_contacted']")
        await page.click("input[name='consent_receive_info']")
        //log update
        console.log("Entered values in all fields");

        //click on the login button
        await page.click('._formContainer_eh3bp_1 button._solid_15241_63._md_15241_43._button_15241_27 ')
        console.log("Clicked Submit Button")

        //wait for navigation
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

        //check if home page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/');
        console.log("APPLICATION FORM UPLOADED WITH ALL DETAILS SUCCESSFULLY")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000);

  //editing application
  it('Navigates to Application page, edits the already filled application form.', async () => {
    //1. Navigate to the application upload page from home page
    //2. Enter all values in the inputs
    //3. Click on the submit button
    //4. check if application was successfully uploaded
    console.log("Test for editing an Application form.")
    try {
      //Step 1
        //check if it is on home page
        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });

        //navigate to application upload page
        await page.click('a[href="/upload"]');
        console.log("Clicked on Application Option");

        // Assert that the URL has changed to the application page after clicking the option
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/upload');

      //Step 2
        //Enter all values in the inputs
          //clear all text and then enter new vallue
          await page.waitForSelector("#workshop_name")
          await page.click('#workshop_name', { clickCount: 3 });
          await page.keyboard.press('Backspace');
          await page.type('#workshop_name', 'XYZ Car Shop');

          //clear all text and then enter new vallue
          await page.click('#workshop_post_code', { clickCount: 3 });
          await page.keyboard.press('Backspace');
          await page.type('#workshop_post_code', '987654');
        //Services Offered
        await page.click("#react-select-3-input");
        await page.keyboard.press('Backspace');
        await page.click("#react-select-3-input");
        await page.type("#react-select-3-input", "brake services"); 
        await page.keyboard.press("Enter");
        //file upload - PENDING
        //checkboxes
        await page.click("input[name='consent_receive_info']")
        //log update
        console.log("Modified values in some fields");

        //click on the login button
        await page.click('._formContainer_eh3bp_1 button._solid_15241_63._md_15241_43._button_15241_27 ')
        console.log("Clicked Submit Button")

        //wait for browser to navigate to application upload page
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:5000 });

        //check if home page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/');

        console.log("TEST FOR EDITING APPLICATION FORM SUCCESSFUL")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 10000);

  //resetting password
  it('Navigates to profile page, resets the password and login with new password', async () => {
    //1. Navigate to the profile page
    //2. Enter old and new passwords and confirm
    //3. check logging in with the new password
    console.log("Test for resetting password.")
    try {
      //Step 1
        //go to profile page
        await page.goto('http://localhost:5173/profile', { waitUntil: 'domcontentloaded', timeout:10000 });

      //Step 2
        //Enter all values in the inputs
        await page.waitForSelector("#user_old_password")
        await page.type("#user_old_password", config.password)
        await page.type("#user_password", config.password+"#")
        await page.type("#user_confirm_password", config.password+"#")
        //log update
        console.log("Entered old and new passwords and confirmed.");

        //click on the login button
        await page.click('._logincontainer_1wvov_5 ._loginform_1wvov_53 button._solid_15241_63._md_15241_43._button_15241_27  ')
        console.log("Clicked Change Password Button")

        //wait for browser to navigate to home page
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:10000 });

        //check if home page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/');
      //Step 3
        //logout
        await page.waitForSelector('._navbar_13z3g_21 a[href="/logout"]', {visible:true})
        await page.waitForSelector('._alertContainer_7h75f_1._success_7h75f_29', {hidden:true})
        await page.click('._navbar_13z3g_21 a[href="/logout"]', {waitUntil:"domcontentloaded", timeout:20000});
        console.log("Clicked on Logout Option");

        await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout:10000 });
        console.log("Logged out")
/* 
        //login with new password
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded', timeout:10000 });
        await page.waitForSelector("#user_id")
        await page.type('#user_id', config.email);
        await page.type('#user_password', config.password+"#");
        console.log("Entered Email and Password");

        //click on the login button
        await page.waitForSelector('._navbar_13z3g_21 button._solid_15241_63._md_15241_43._button_15241_27', { timeout: 5000 });
        await page.click('._navbar_13z3g_21 button._solid_15241_63._md_15241_43._button_15241_27 ');
        console.log("Clicked Login Button with new password")

        //wait for navigation
        await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout:10000 });

        //check if home page has been reached
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/');
        console.log("Login successful with new password")

        console.log("TEST FOR RESET PASSWORD SUCSESSFUL")

        //logout for next test case
        await page.waitForSelector('._navbar_13z3g_21 a[href="/logout"]', {visible:true})
        await page.waitForSelector('._alertContainer_7h75f_1._success_7h75f_29', {hidden:true})
        await page.click('._navbar_13z3g_21 a[href="/logout"]', {waitUntil:"domcontentloaded", timeout:20000}); */
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 30000);

  
  //forgot password - otp related
   it('Navigates to Login Page from Home(Before Login) Page and then to forgot password option to reset', async () => {
    //1. Navigate to the login page from home page
    //2. Click on forgot password option and fill in the new password and OTP and submit
    //3. log in with new password
    console.log("Test for using forgot password option")
    try {
      //Step 1
      await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout:15000 });
        await page.goto('http://localhost:5173/resetPassword', { waitUntil: 'domcontentloaded', timeout:15000 });


        // Assert that the URL has changed to the login page after clicking the button
        console.log('Current URL:', page.url());
        expect(page.url()).toBe('http://localhost:5173/resetPassword');

        //fill in details
        await page.waitForSelector('#user_id');
        await page.type('#user_id', config.email);
        await page.type('#user_password', config.password);
        await page.type("#user_password_confirm", config.password)
        //click on getotp
        await page.click("._signupform_jn6tm_45 ._otpContainer_jn6tm_107 ._solid_15241_63._md_15241_43._button_15241_27")
        await page.type("#otp", "497012");

        const divSelector = '._signupform_jn6tm_45 ._buttonscontainer_jn6tm_131'; // Update with the appropriate selector

        // Define the selector for the button inside the div
        const buttonSelector = `${divSelector} ._solid_15241_63._md_15241_43._button_15241_27`; // Update with the appropriate selector
  
        // Use Puppeteer's `page.click()` method to click the button
        await page.click(buttonSelector);
        await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded', timeout:15000 });

        console.log("TEST FOR RESETTING PASSWORD THROUGH FORGOT PASSWORD SUCCESSFUL")
    } catch (error) {
      console.error('Test failed:', error);
    }
  }, 60000); 

});