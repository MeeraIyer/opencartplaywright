import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { dataProvider } from '../utils/dataProvider';

const JsonPath = "testdata/logindata.json";
const jsonTestData = dataProvider.getTestDatafromJson(JsonPath);

for(const data of jsonTestData)
{
    test(`Login Data Driven from JSON testdata: ${data.testName} @datadriven`, async({page})=>{

        const config = new TestConfig();
       // await page.goto(config.appUrl);
       await page.goto('/demo/');

        let homepage = new HomePage(page);
        let loginpage = new LoginPage(page);
        await homepage.clickMyAccountLink();
        await homepage.clickloginLink();

        await loginpage.login(data.email,data.password);

        if(data.expected.toLowerCase() === 'success')
        {
            let myaccountpage = new MyAccountPage(page);
            const isLoggedin = await myaccountpage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
        }
        else
        {
            const errormessage = await loginpage.getloginErrorMessage();
            expect(errormessage).toBe("Warning: No match for E-Mail Address and/or Password.")
        }
            
    })

}

const csvPath = 'testdata/logindata.csv';
const csvtestData = dataProvider.getTestDatafromCsv(csvPath);

for(const data of csvtestData)
{
    test(`login data driven from csv testdata: ${data.testName}`, async({page})=>{

        const config = new TestConfig();
        await page.goto(config.appUrl);

        let homepage = new HomePage(page);
        let loginpage = new LoginPage(page);
        await homepage.clickMyAccountLink();
        await homepage.clickloginLink();

        await loginpage.login(data.email,data.password);

        if(data.expected.toLowerCase() === 'success')
        {
            let myaccountpage = new MyAccountPage(page);
            const isLoggedin = await myaccountpage.isMyAccountPageExists();
            expect(isLoggedin).toBeTruthy();
        }
        else
        {
            const errormessage = await loginpage.getloginErrorMessage();
            expect(errormessage).toBe("Warning: No match for E-Mail Address and/or Password.")
        }
            
    })



}