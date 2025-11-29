import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductDisplayPage } from '../pages/ProductDisplayPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';

let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let searchresults:SearchResultsPage;
let productpage:ProductPage;
let productdisplaypage:ProductDisplayPage;
let shoppingcart:ShoppingCartPage;

test.beforeEach(async({page})=>{

    config=new TestConfig()
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    searchresults=new SearchResultsPage(page);
    productpage=new ProductPage(page);
    productdisplaypage=new ProductDisplayPage(page);
    shoppingcart=new ShoppingCartPage(page);
   // await page.goto(config.appUrl);
   await page.goto('/demo/');
})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Add Product to Cart and verify shopping cart", async({page})=>{

    homepage.enterProductName(config.productName);
    homepage.clickSearchButton();
    expect(await searchresults.isSearchResultsPageExists()).toBeTruthy();
         const isProductFound = await searchresults.isProductExists(config.productName);
         if(isProductFound)
         {
            await searchresults.selectProducts(config.productName);
            await productpage.setQuantity(config.productQuantity);
            await productpage.addToCart();
            expect(await productpage.isConfirmationMessageVisible()).toBeTruthy();
            await productdisplaypage.clickShoppingCartlink();
            expect(await shoppingcart.verifyShoppingCart()).toContain('Shopping Cart');

         }
})
