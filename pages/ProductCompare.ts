import {test, Page, Locator, expect} from '@playwright/test'
import { ProductPage } from './ProductPage'
import { SearchResultsPage } from './SearchResultsPage'

export class ProductComparePage{

    private readonly page:Page;
    private readonly comparisonHeader:Locator;
    private readonly productName:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.comparisonHeader = this.page.locator('div[id="content"] h1');
        this.productName = this.page.locator('tbody tr td a strong');

    }

    async IsProductCmpHdrExists()
    {
       return await this.comparisonHeader.innerText();

    }

    async isProductCorrect(pName:string)
    {
        expect(await this.productName.textContent()).toBe(pName);
    }





   

}