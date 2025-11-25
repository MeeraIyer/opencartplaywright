import {Page, expect, Locator} from '@playwright/test'
import { error } from 'console';

export class HomePage{

    private readonly page:Page;
    private readonly myAccountLink:Locator;
    private readonly registerlink:Locator;
    private readonly loginlink:Locator;
    private readonly searchbox:Locator;
    private readonly searchbutton:Locator;
    private readonly storeLogo:Locator;
    private readonly featuredHeader:Locator;
    private readonly featuredProd:Locator;
    private readonly addToWishListbtn:Locator;
    private readonly WishListCnfrmMsg:Locator;
    private readonly wishListlink:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.myAccountLink= this.page.locator("a[title='My Account']");
        this.registerlink=this.page.locator("//a[normalize-space()='Register']");
        this.loginlink=this.page.locator("//ul[@class='dropdown-menu dropdown-menu-right']//a[normalize-space()='Login']");
        this.searchbox=this.page.locator("input[placeholder='Search']");
        this.searchbutton=this.page.locator("//i[@class='fa fa-search']");
        this.storeLogo=this.page.locator('div[id="logo"] h1 a');
        this.featuredHeader=this.page.locator('div[id="content"] h3');
        this.featuredProd=this.page.locator('h4>a');
        this.addToWishListbtn=this.page.locator("button[data-original-title='Add to Wish List']");
        this.WishListCnfrmMsg=this.page.locator(".alert.alert-success.alert-dismissible");
        this.wishListlink=this.page.locator('div[class="alert alert-success alert-dismissible"] a:nth-child(3)');

    }

    async isHomePageExists(){

        let title:string = await this.page.title();
        if(title)
        {
            return true;
        }
        return false;
    }

    async clickMyAccountLink()
    {
        try{
              await  this.myAccountLink.click();
        }catch(error){
        console.log("Exception occured while clicking 'My Account'",error)
        throw(error);
        }
    }

    async clickRegisterLink()
    {
        try{
            await this.registerlink.click();
        }catch(error){
            console.log(`Exception occured while clicking Register: ${error}`);
            throw(error);
        }
    }

    async clickloginLink()
    {
        try{
                await this.loginlink.click();
        }catch(error)
        {
            console.log(`Exception occured while clicking login link: ${error}`);
            throw(error);
        }
    }

    async enterProductName(pName:string)
    {
        try{
            await this.searchbox.fill(pName);
        }catch(error)
        {
            console.log(`Exception occured while entering product name: ${error}`);
            throw(error);
        }
    }

    async clickSearchButton()
    {
        try{
            await this.searchbutton.click();
        }catch(error)
        {
            console.log(`Exception occured while clicking on Search button: ${error}`);
            throw(error);
        }
    }

    async isStoreLogoexists()
    {
        try{
        await expect(this.storeLogo).toBeVisible();
        return true;
        }catch(error)
        {
            console.log(`Confirmation message not found: ${error}`);
            return false;

        }
    }

    async clickStoreLogo()
    {
         try{
            await this.storeLogo.click();
        }catch(error)
        {
            console.log(`Exception occured while clicking on Store Logo: ${error}`);
            throw(error);
        }

        
    }

    async scrollToBottom()
    {
        try{
            await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        });
        }catch(error)
        {
            console.log(`Exception occured while scrolling to the bottom: ${error}`);
            throw(error);
        }
        

    }

    async isFeaturedSectionExists()
    {
        try{
        await expect(this.featuredHeader).toBeVisible();
        return true;
        }catch(error)
        {
            console.log(`Featured section not found: ${error}`);
            return false;

        }
        
    }


    async clickAddWishListFeatured(pName:string)
    {
            try{
            const count = await this.featuredProd.count();
            for(let i=0;i<count;i++)
            {
                const products = this.featuredProd.nth(i);
                const wishList = this.addToWishListbtn.nth(i);
                const title = await products.textContent();
                if(title === pName)
                {
                    await wishList.click();
                    return await this.WishListCnfrmMsg.innerText();
                    
                }
            }
            console.log(`Product not found ${pName}`);
         }catch(error)
         {
            console.log(`Error hovering product: ${error}`);
         }
         return null;
    }

}

