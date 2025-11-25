import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';

let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let searchresults:SearchResultsPage;
let productpage:ProductPage;

test.beforeEach(async({page})=>{

    config=new TestConfig()
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    searchresults=new SearchResultsPage(page);
    productpage=new ProductPage(page);

    await page.goto(config.appUrl);
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Search Product and add to cart", async({page})=>{

     await homepage.enterProductName(config.productName);
     await homepage.clickSearchButton();
     expect(await searchresults.isSearchResultsPageExists()).toBeTruthy();
     const isProductFound = await searchresults.isProductExists(config.productName);
     if(isProductFound)
     {
     await searchresults.selectProducts(config.productName);
     await productpage.setQuantity(config.productQuantity);
     await productpage.addToCart();
     expect(await productpage.isConfirmationMessageVisible()).toBeTruthy();
     }

})



