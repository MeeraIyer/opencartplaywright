import {Page, Locator, expect} from '@playwright/test'
import { LoginPage } from './LoginPage';

export class ForgotPwdPage{

    private readonly page:Page;
    private readonly txtEmail:Locator;
    private readonly btnContinue:Locator;
    private readonly emailwarningMsg:Locator;
    private readonly emailSuccessMsg:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.txtEmail=this.page.locator("#input-email");
        this.btnContinue=this.page.locator("input[value='Continue']");
        this.emailwarningMsg=this.page.locator(".alert.alert-danger.alert-dismissible");
        this.emailSuccessMsg=this.page.locator(".alert.alert-success.alert-dismissible");
    }

    async enterEmail(email:string)
    {
         try{
            await this.txtEmail.fill(email);
        }catch(error)
        {
            console.log(`Exception occured while entering email id: ${error}`);
            throw(error);
        }

        
    }

    async clickContinue()
    {
         try{
             await this.btnContinue.click();
        }catch(error)
        {
            console.log(`Exception occured while clicking on Continue button: ${error}`);
            throw(error);
        }

       
    }

    async emailSuccess()
    {
        return(await this.emailSuccessMsg.textContent());
    }

    async emailWarning()
    {
        return(await this.emailwarningMsg.textContent());
    }

}
