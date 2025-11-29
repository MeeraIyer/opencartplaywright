import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {RegistrationPage} from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homepage:HomePage;
let registration:RegistrationPage;
let config:TestConfig;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    //await page.goto(config.appUrl);
    await page.goto('/demo/');
    homepage=new HomePage(page);
    registration=new RegistrationPage(page);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})


test("User Registration test @master @sanity @regression", async()=>{

    
    await homepage.clickMyAccountLink();
    await homepage.clickRegisterLink();

    
    await registration.setFirstname(RandomDataUtil.getFirstname());
    await registration.setLastname(RandomDataUtil.getLastname());
    await registration.setEmail(RandomDataUtil.getEmail());
    await registration.setTelephone(RandomDataUtil.getphoneNumber());
    const password = RandomDataUtil.getPassword();
    await registration.setPassword(password);
    await registration.setConfirmPassword(password);
    await registration.checkPrivacyPolicy();
    await registration.clickContinue();

    const confirmationMsg = await registration.getConfirmationMessage();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    



})