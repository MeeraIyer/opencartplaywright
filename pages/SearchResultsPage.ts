import { fa } from '@faker-js/faker';
import {Page, expect, Locator} from '@playwright/test'
import { ProductPage } from './ProductPage';
import { ProductComparePage } from './ProductCompare';



export class SearchResultsPage{

    private readonly page:Page;
    private readonly searchPageHeader:Locator;
    private readonly searchProducts:Locator;
    private readonly compareProductbtn:Locator;
    private readonly compareProductSuccess:Locator;
    private readonly productComparisonlink:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.searchPageHeader=this.page.locator("div[id='content'] h1");
        //this.searchProducts=this.page.locator("h4>a");
        this.searchProducts=this.page.locator('h4>a');
        this.compareProductbtn=this.page.locator("button[data-original-title='Compare this Product']");
        this.compareProductSuccess=this.page.locator('//div[@class="alert alert-success alert-dismissible"]');
        this.productComparisonlink=this.page.locator('//div[@class="alert alert-success alert-dismissible"]/a[2]');
    }

    async isSearchResultsPageExists():Promise<boolean>
    {
        try{
            const headerText = await this.searchPageHeader.textContent();
            return headerText?.includes('Search -')?? false;
        }catch(error)
        {
            return false; 
        }
    }

    async isProductExists(productName:string):Promise<boolean>
    {
        try{
            const count = await this.searchProducts.count();
            for(let i=0;i<count;i++)
            {
                const products = this.searchProducts.nth(i);
                const title = await products.textContent();
                if(title === productName)
                {
                    return true;
                }
            }

        }catch(error)
        {
            console.log(`Error checking product existence: ${error}`);
        }
        return false;
    }

    async selectProducts(productName:string)
    {
         try{
            const count = await this.searchProducts.count();
            for(let i=0;i<count;i++)
            {
                const products = this.searchProducts.nth(i);
                const title = await products.textContent();
                if(title === productName)
                {
                    await products.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Product not found ${productName}`);
         }catch(error)
         {
            console.log(`Error selecting product: ${error}`);
         }
         return null;
    }   

        async HoverCompareProduct(productName:string)
        {
         try{
            const count = await this.searchProducts.count();
            for(let i=0;i<count;i++)
            {
                const products = this.searchProducts.nth(i);
                const comparebtn = this.compareProductbtn.nth(i);
                const title = await products.textContent();
                if(title === productName)
                {
                    await comparebtn.hover();
                    const tooltipId = await comparebtn.getAttribute("aria-describedby");
                    return(this.page.locator(`#${tooltipId}`).innerText());

                }
            }
            console.log(`Product not found ${productName}`);
         }catch(error)
         {
            console.log(`Error hovering product: ${error}`);
         }
         return null;
    }   

        async ClickCompareProduct(productName:string)
        {
            try{
            const count = await this.searchProducts.count();
            for(let i=0;i<count;i++)
            {
                const products = this.searchProducts.nth(i);
                const comparebtn = this.compareProductbtn.nth(i);
                const title = await products.textContent();
                if(title === productName)
                {
                    await comparebtn.click();
                    return await this.compareProductSuccess.innerText();
                    
                }
            }
            console.log(`Product not found ${productName}`);
         }catch(error)
         {
            console.log(`Error hovering product: ${error}`);
         }
         return null;
        }

        async clickProductComparisonLink()
        {
             try{
              await this.productComparisonlink.click();
              return new ProductComparePage(this.page);
        }catch(error){
        console.log("Exception occured while clicking 'Compare Product'",error)
        throw(error);
        }

           
        }

        async getProductCount()
        {
            return await this.searchProducts.count();
        }



}
