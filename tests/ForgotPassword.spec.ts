import {test, expect, Page} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { ForgotPwdPage } from '../pages/ForgotPwdPage'
import { dataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';

const JsonPath = "testdata/logindata.json";
const jsonTestData = dataProvider.getTestDatafromJson(JsonPath);

for(const data of jsonTestData)
{
    test(`Forgot Password from JSON testdata: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig();
        await page.goto(config.appUrl);

        let homepage = new HomePage(page);
        let loginpage = new LoginPage(page);
        let forgotPwdPage = new ForgotPwdPage(page);
        await homepage.clickMyAccountLink();
        await homepage.clickloginLink();
        await loginpage.clickForgotPwd();
        await forgotPwdPage.enterEmail(data.email);
        await forgotPwdPage.clickContinue();

        if(data.expected.toLowerCase() === 'success')
        {
            const successMsg = await forgotPwdPage.emailSuccess();
            expect(successMsg).toContain('link has been sent your email address.')
        
        }   
        else
        {
            const warningMsg = await forgotPwdPage.emailWarning();
            expect(warningMsg).toContain('Warning');
            
        }
            
    })

}