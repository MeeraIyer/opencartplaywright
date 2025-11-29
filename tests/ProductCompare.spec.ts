import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductComparePage } from '../pages/ProductCompare';


let homepage:HomePage;
let config:TestConfig;
let loginpage:LoginPage;
let searchresultspage:SearchResultsPage;
let productcomparepage:ProductComparePage;

test.beforeEach(async({page})=>{

    config=new TestConfig()
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    searchresultspage=new SearchResultsPage(page);
    productcomparepage=new ProductComparePage(page);
    await page.goto('/demo/');
   // await page.goto(config.appUrl);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Search Products and Compare @master @sanity @regression", async()=>{

    await homepage.enterProductName(config.productName);
    await homepage.clickSearchButton();
    expect(await searchresultspage.isSearchResultsPageExists()).toBeTruthy();   
    const isProductFound = await searchresultspage.isProductExists(config.productName);
    expect(isProductFound).toBeTruthy();
    const tooltiptext = await searchresultspage.HoverCompareProduct(config.productName);
    expect(tooltiptext).toContain('Compare this Product'); 
    console.log(`The tooltip is:  ${tooltiptext}`);
    const productComparisonMsg = await searchresultspage.ClickCompareProduct(config.productName);
    console.log(productComparisonMsg);
    expect(productComparisonMsg).toContain('Success: You have added');
    await searchresultspage.clickProductComparisonLink();
    const prodCompHdr = await productcomparepage.IsProductCmpHdrExists();
    expect(prodCompHdr).toContain('Product Comparison');
    await productcomparepage.isProductCorrect(config.productName);

});