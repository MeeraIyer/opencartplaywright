import {Page, expect, Locator} from '@playwright/test'
import { error } from 'console';

export class LoginPage{

    private readonly page:Page;
    private readonly txtEmailaddress:Locator;
    private readonly txtPassowrd:Locator;
    private readonly btnLogin:Locator;
    private readonly txtErrormessage:Locator;
    //adding Forgot Password link
    private readonly lnkForgotpwd:Locator;

    constructor (page:Page)
    {
        this.page=page;
        this.txtEmailaddress=this.page.locator("#input-email");
        this.txtPassowrd=this.page.locator("#input-password");
        this.btnLogin=this.page.locator("input[value='Login']");
        this.txtErrormessage=this.page.locator(".alert.alert-danger.alert-dismissible");
        this.lnkForgotpwd=this.page.locator("div[class='form-group'] a");

    }

    async setEmail(email:string)
    {
        await this.txtEmailaddress.fill(email);
    }

    async setPassword(password:string)
    {
        await this.txtPassowrd.fill(password);   
    }

    async clickLogin()
    {
        await this.btnLogin.click();
    }

    async login(email:string, password:string)
    {
        await this.setEmail(email);
        await this.setPassword(password);
        await this.clickLogin();
    }

    async getloginErrorMessage():Promise<null|string>
    {   
        return(this.txtErrormessage.textContent());

    }

    async clickForgotPwd()
    {
         try{
              await this.lnkForgotpwd.click();
        }catch(error){
        console.log("Exception occured while clicking 'Forgot Password'",error)
        throw(error);
        }
        
    }

}