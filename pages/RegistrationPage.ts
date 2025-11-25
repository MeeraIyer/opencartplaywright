import { StringColorFormat } from '@faker-js/faker';
import {Page, expect, Locator} from '@playwright/test'

export class RegistrationPage{

    private readonly page:Page;
    private readonly txtFirstname:Locator;
    private readonly txtLastname:Locator;
    private readonly txtEmail:Locator;
    private readonly txtTelephone:Locator;
    private readonly txtPassword:Locator;
    private readonly txtConfirmPassword:Locator;
    private readonly checkPolicy:Locator;
    private readonly Continuebtn:Locator;
    private readonly msgConfirmation:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.txtFirstname=this.page.locator("#input-firstname");
        this.txtLastname=this.page.locator("#input-lastname");
        this.txtEmail=this.page.locator("#input-email");
        this.txtTelephone=this.page.locator("#input-telephone");
        this.txtPassword=this.page.locator("#input-password");
        this.txtConfirmPassword=this.page.locator("#input-confirm");
        this.checkPolicy=this.page.locator("input[value='1'][name='agree']");
        this.Continuebtn=this.page.locator("input[value='Continue']");
        this.msgConfirmation=this.page.locator("div[id='content'] h1");

    }

    async setFirstname(fname:string):Promise<void>
    {
        await this.txtFirstname.fill(fname);
    }

    async setLastname(lname:string):Promise<void>
    {
        await this.txtLastname.fill(lname);
    }

    async setEmail(email:string):Promise<void>
    {
        await this.txtEmail.fill(email);
    }

    async setTelephone(telephone:string):Promise<void>
    {
        await this.txtTelephone.fill(telephone);
    }

    async setPassword(password:string):Promise<void>
    {
        await this.txtPassword.fill(password);
    }
    async setConfirmPassword(confirmpwd:string):Promise<void>
    {
        await this.txtConfirmPassword.fill(confirmpwd);
    }

    async checkPrivacyPolicy():Promise<void>
    {
        await this.checkPolicy.check();
    }

    async clickContinue():Promise<void>
    {
        await this.Continuebtn.click();
    }

    async getConfirmationMessage():Promise<string>
    {
        return await this.msgConfirmation.textContent() ?? '';
    }

    async completeRegistration(userData:{
        firstName:string;
        lastName:string;
        email:string;
        telephone:string;
        password:string
    }):Promise<void>
    {
        await this.setFirstname(userData.firstName);
        await this.setLastname(userData.lastName);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.telephone);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);
        await this.checkPrivacyPolicy();
        await this.clickContinue();
        await expect(this.msgConfirmation).toBeVisible();

    }


}