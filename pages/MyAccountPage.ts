import {Page, expect, Locator} from '@playwright/test'
import { error } from 'console';
import {LogoutPage} from './LogoutPage';
import { EditAccountInfo } from './EditAccountInfoPage';

export class MyAccountPage{

    private readonly page:Page;
    private readonly msgHeading:Locator;
    private readonly lnkLogout:Locator;
    private readonly editAccountInfolnk:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.msgHeading=this.page.locator("h2:nth-child(1)");
        this.lnkLogout=this.page.locator("aside[id='column-right'] a:nth-child(13)")
        this.editAccountInfolnk=this.page.locator('a:has-text("Edit your account information")');
    }

    async isMyAccountPageExists():Promise<boolean>
    {
        try{
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        }catch(error)
        {
            console.log(`Error checking My Account Page heading visibility: ${error}`);
            return false;
        }
    }
    
    async EditAccountLinkExists()
    {
        try{
            const isVisible = await this.editAccountInfolnk.isVisible();
            return isVisible;
        }catch(error)
        {
            console.log(`Error checking Edit Account Information link visibility: ${error}`);
            return false;
        }
    }

    async clickEditAccountInfolink()
    {
        try{
            await this.editAccountInfolnk.click();
        }catch(error)
        {
            console.log(`Unable to click Edit Account Information link: ${error}`);
            throw error;
        }

    }

    async clickLogout():Promise<LogoutPage>
    {
        try{
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        }catch(error)
        {
            console.log(`Unable to click logout link: ${error}`);
            throw error;
        }
    }

    async getPageTitle(): Promise<string>
    {
        return (this.page.title());
    }   





}