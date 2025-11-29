import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';

let homepage:HomePage;
let config:TestConfig;
let loginpage:LoginPage;
let searchresultspage:SearchResultsPage;

test.beforeEach(async({page})=>{

    config=new TestConfig()
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    searchresultspage=new SearchResultsPage(page);
    await page.goto('/demo/');
    //await page.goto(config.appUrl);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Search Products @master @sanity @regression", async()=>{

    await homepage.enterProductName(config.productName);
    await homepage.clickSearchButton();
    expect(await searchresultspage.isSearchResultsPageExists()).toBeTruthy();   
    const isProductFound = await searchresultspage.isProductExists(config.productName);
    expect(isProductFound).toBeTruthy();


});