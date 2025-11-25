import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { LogoutPage } from '../pages/LogoutPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';

let homepage:HomePage;
let loginpage:LoginPage;
let myaccountpage:MyAccountPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
    
    config = new TestConfig();
    await page.goto(config.appUrl);
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    myaccountpage=new MyAccountPage(page);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("User login @master @sanity @regression", async()=>{

    await homepage.clickMyAccountLink();
    await homepage.clickloginLink();

    await loginpage.setEmail(config.email);
    await loginpage.setPassword(config.password);
    await loginpage.clickLogin();
    
    const isLoggedin = await myaccountpage.isMyAccountPageExists();
   expect(isLoggedin).toBeTruthy();

})