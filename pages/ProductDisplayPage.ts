import {test, Page, Locator, expect} from '@playwright/test'
import { ProductPage } from './ProductPage'
import { SearchResultsPage } from './SearchResultsPage'

export class ProductDisplayPage{

    private readonly page:Page;
    private readonly addToWishlistbtn:Locator;
    private readonly WishListCnfrmMsg:Locator;
    private readonly wishListlink:Locator;
    private readonly shoppingCartlink:Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.addToWishlistbtn=this.page.locator("button[data-original-title='Add to Wish List']");
        this.WishListCnfrmMsg=this.page.locator(".alert.alert-success.alert-dismissible");
        this.wishListlink=this.page.locator('div[class="alert alert-success alert-dismissible"] a:nth-child(3)');
        this.shoppingCartlink=this.page.locator('div[class="alert alert-success alert-dismissible"] a:nth-child(2)');
    }

    async clickAddWishListButton()
    {
        await this.addToWishlistbtn.click();
        
    } 

    async isWishListsuccess()
    {
        return await this.WishListCnfrmMsg.textContent();
    }

    async clickWishListlink()
    {
        await this.wishListlink.click();
    }
    
    async clickShoppingCartlink()
    {
        await this.shoppingCartlink.click();
    }


}
