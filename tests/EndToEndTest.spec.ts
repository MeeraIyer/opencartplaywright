import {test, expect, Page} from '@playwright/test';
import {RegistrationPage} from '../pages/RegistrationPage';
import {HomePage} from '../pages/HomePage';
import {RandomDataUtil} from '../utils/randomDataGenerator';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { TestConfig } from '../test.config'; 
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutPage } from '../pages/CheckoutPage';

let registrationpage:RegistrationPage;
let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let logoutpage:LogoutPage;
let myaccountpage:MyAccountPage;
let shoppingcartpage:ShoppingCartPage;
let searchresultspage:SearchResultsPage;
let productpage:ProductPage;
let checkoutpage:CheckoutPage;


test("Execute end-to-end testcase flow", async({page})=>{

    config = new TestConfig();
   // await page.goto(config.appUrl);
   await page.goto('/demo/');

    let registeredEmail = await performRegistration(page);
    console.log("Registration is completed");

    await performLogout(page);
    console.log("Logout is completed");

    await performLogin(page, registeredEmail);
    console.log("Login is completed");

    await performAddtoCart(page);
    console.log("Add Product to Cart is completed")

    await verifyShoppingCart(page);
    console.log("Shopping Cart is verified");

    await performCheckout(page);
    console.log("Check checkout exists is completed");

})


async function performRegistration(page:Page)
{
    homepage=new HomePage(page);
    registrationpage=new RegistrationPage(page);

    await homepage.clickMyAccountLink();
    await homepage.clickRegisterLink();

    await registrationpage.setFirstname(RandomDataUtil.getFirstname());
    await registrationpage.setLastname(RandomDataUtil.getLastname());

    let email = RandomDataUtil.getEmail();
    await registrationpage.setEmail(email);
    await registrationpage.setTelephone(RandomDataUtil.getphoneNumber());

    
    await registrationpage.setPassword('test@123');
    await registrationpage.setConfirmPassword('test@123');

    await registrationpage.checkPrivacyPolicy();
    await registrationpage.clickContinue();

    const confirmationMsg = await registrationpage.getConfirmationMessage();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email;

}

async function performLogout(page:Page)
{
    myaccountpage = new MyAccountPage(page);
    const logoutpage = await myaccountpage.clickLogout();

    expect(await logoutpage.isContinueButtonVisible()).toBeTruthy();

    const homepage = await logoutpage.clickContinue();
    expect(await homepage.isHomePageExists()).toBe(true);
}

async function performLogin(page:Page, email:string)
{
    homepage=new HomePage(page);
    await homepage.clickMyAccountLink();
    await homepage.clickloginLink();

    loginpage=new LoginPage(page);
    await loginpage.login(email, 'test@123');
    //await loginpage.clickLogin();

    myaccountpage = new MyAccountPage(page);
    expect(await myaccountpage.isMyAccountPageExists()).toBeTruthy();


}

async function performAddtoCart(page:Page)
{
        config=new TestConfig()
        homepage=new HomePage(page);
        loginpage=new LoginPage(page);
        searchresultspage=new SearchResultsPage(page);
        productpage=new ProductPage(page);

        const productname = config.productName;
        const quantity = config.productQuantity;

        await homepage.enterProductName(productname);
        await homepage.clickSearchButton();
        expect(await searchresultspage.isSearchResultsPageExists()).toBeTruthy();
             const isProductFound = await searchresultspage.isProductExists(productname);
             if(isProductFound)
             {
             await searchresultspage.selectProducts(config.productName);
             await productpage.setQuantity(quantity);
             await productpage.addToCart();
             await page.waitForTimeout(3000);
             expect(await productpage.isConfirmationMessageVisible()).toBeTruthy();
             }


}

async function verifyShoppingCart(page:Page)
{
        config=new TestConfig()
        homepage=new HomePage(page);
        loginpage=new LoginPage(page);
        searchresultspage=new SearchResultsPage(page);
        productpage=new ProductPage(page);
        
        await productpage.clickItemsToNavigateToCart();
        shoppingcartpage =  await productpage.clickViewCart();

        console.log("Navigated to shopping cart");

        expect(await shoppingcartpage.getTotalPrice()).toBe(config.totalPrice);


}

async function performCheckout(page:Page)
{
    shoppingcartpage = new ShoppingCartPage(page);
    await shoppingcartpage.clickOnCheckout();
    await page.waitForTimeout(5000);
    checkoutpage=new CheckoutPage(page);
    await checkoutpage.isCheckoutPageExists();
    
}