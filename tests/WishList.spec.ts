import {test, expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { ProductDisplayPage } from '../pages/ProductDisplayPage';
import { MyWishListPage } from '../pages/MyWishListPage';

let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let searchresults:SearchResultsPage;
let productpage:ProductPage;
let productdisplaypage:ProductDisplayPage;
let mywishlistpage:MyWishListPage;

test.beforeEach(async({page})=>{

    config=new TestConfig()
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    searchresults=new SearchResultsPage(page);
    productpage=new ProductPage(page);
    mywishlistpage=new MyWishListPage(page);
    productdisplaypage=new ProductDisplayPage(page);
    await page.goto(config.appUrl);
    

})

test.afterEach(async({page})=>{

    await page.waitForTimeout(3000);
    await page.close();

})

test("Add to Wish List and Verify", async({page})=>{

    await homepage.clickMyAccountLink();
    await homepage.clickloginLink();
    await loginpage.login(config.email, config.password);
    await homepage.enterProductName(config.productName);
    await homepage.clickSearchButton();
    expect(await searchresults.isSearchResultsPageExists()).toBeTruthy();
    expect(await searchresults.isProductExists(config.productName)).toBeTruthy();
    await searchresults.selectProducts(config.productName);
    await productdisplaypage.clickAddWishListButton();
    const wishlistmsg = await productdisplaypage.isWishListsuccess();
    console.log(wishlistmsg);
    await productdisplaypage.clickWishListlink();
    expect(await mywishlistpage.isMyWishListExist()).toBeTruthy();
    await mywishlistpage.verifyProductName(config.productName);


})

test("Add to WishList from Featured section", async({page})=>{


await homepage.clickMyAccountLink();
await homepage.clickloginLink();
await loginpage.login(config.email, config.password);
await homepage.isStoreLogoexists();
await homepage.clickStoreLogo();
await homepage.scrollToBottom();
await homepage.isFeaturedSectionExists();
await searchresults.isProductExists(config.productName);
await homepage.clickAddWishListFeatured(config.productName);
await productdisplaypage.isWishListsuccess();
await productdisplaypage.clickWishListlink();
await mywishlistpage.isMyWishListExist();
await mywishlistpage.verifyProductName(config.productName);




})
