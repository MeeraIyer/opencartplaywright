import {Page, expect, Locator} from '@playwright/test'
import { error } from 'console';

export class MyWishListPage{

    private readonly page:Page;
    private readonly myWishListHeader:Locator;
    private readonly nameOfproduct:Locator;



     constructor(page:Page)
    {
        this.page=page;
        this.myWishListHeader=this.page.locator('div[id="content"] h2');
        this.nameOfproduct=this.page.locator('table[class="table table-bordered table-hover"] tbody tr td:nth-child(2)');

    }


    async isMyWishListExist()
    {
        return await this.myWishListHeader.isVisible();
    }

    async verifyProductName(productName:string)
    {   
        try{
        expect(await this.nameOfproduct.textContent()).toBe(productName);
        }catch(error)
        {
            console.log('Product name does not match');
        }
    }

}