import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { LogoutPage } from '../pages/LogoutPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { EditAccountInfo } from '../pages/EditAccountInfoPage';

let homepage:HomePage;
let loginpage:LoginPage;
let myaccountpage:MyAccountPage;
let config:TestConfig;
let editaccountinfopage:EditAccountInfo;

test.beforeEach(async({page})=>{
    
    config = new TestConfig();
    //await page.goto(config.appUrl);
    await page.goto('/demo/');
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    myaccountpage=new MyAccountPage(page);
    editaccountinfopage=new EditAccountInfo(page);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("My Account Information Page", async()=>{

    await homepage.clickMyAccountLink();
    await homepage.clickloginLink();
    await loginpage.login(config.email,config.password);
    expect(await myaccountpage.isMyAccountPageExists()).toBeTruthy();
    expect(await myaccountpage.EditAccountLinkExists()).toBeTruthy();
    
})
