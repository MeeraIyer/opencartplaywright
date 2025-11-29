import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';

let homepage:HomePage;
let myaccountpage:MyAccountPage;
let logoutpage:LogoutPage;
let config:TestConfig;
let loginpage:LoginPage;

test.beforeEach(async({page})=>{

    config = new TestConfig();
    //await page.goto(config.appUrl);
    await page.goto('/demo/');
    homepage=new HomePage(page);
    myaccountpage=new MyAccountPage(page);
    logoutpage= new LogoutPage(page);
    loginpage=new LoginPage(page);

})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Logout ", async()=>{

    await homepage.clickMyAccountLink();
    await homepage.clickloginLink();

    await loginpage.login(config.email, config.password);

    expect(await myaccountpage.isMyAccountPageExists()).toBeTruthy();

    await myaccountpage.clickLogout();

    expect(await logoutpage.isContinueButtonVisible()).toBeTruthy();

    await logoutpage.clickContinue();

    expect(await homepage.isHomePageExists()).toBeTruthy();


})