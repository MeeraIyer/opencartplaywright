import {Page, expect, Locator} from '@playwright/test'
import { error } from 'console';

export class EditAccountInfo{

    private readonly page:Page;
    private readonly MyAccountHeader:Locator;
    

    constructor(page:Page)
    {
        this.page=page;
        this.MyAccountHeader=this.page.locator('div[id="content"] h1');

    }

    async VerifyMyAccountHeading()
    {
        try{
            const headerText = await this.MyAccountHeader.textContent();
            return headerText?.includes('My Account Information -')?? false;
        }catch(error)
        {
            return false; 
        }
        
    }

}