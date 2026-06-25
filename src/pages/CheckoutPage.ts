import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class CheckoutPage extends BasePage {

    //private Locators: 
    private readonly header: Locator;
    private readonly prodtable:Locator;
    private readonly productName:Locator;
    private readonly productCount:Locator;
    private map: Map<string, string | number>
   // private readonly totalprice:Locator;
    private readonly VATprice:Locator;
    private readonly checkoutlink:Locator;
    private readonly total:Locator;


    //const... of the class: init the locators
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.prodtable=page.locator('.table-bordered');
        this.productName=page.locator('tbody tr td.text-left').nth(1);
        this.productCount=page.locator("input[name^='quantity']");
        this.map=new Map<string,string|number>();
     
        this.checkoutlink=this.page.getByRole('link',{name:'Checkout'});
        this.total=page.locator("//td[contains(text(),'Total')]/following::td[@class='text-right'][2]");
        this.VATprice=page.locator('div.col-sm-offset-8 table tr td:nth-child(2)').nth(2);
    };

    async getHeader(): Promise<string> {
        return await this.header.innerText();
    }
     async getProducttables():Promise<number>{
        return await this.prodtable.count();
     }

     async getProductName():Promise<string>
     {
        return await this.productName.innerText();
     }

     async clickCheckout():Promise<void>
     {
        await this.checkoutlink.click();
     }

     async getProductCount():Promise<string|null>{
        return await this.productCount.getAttribute('value');
     }

     async getPriceInfo():Promise<Map<string, string |number|null>>
     {
         let productName=await this.productName.innerText();
         let prodtableCount=await this.prodtable.count();
         let totalPrice=await this.total.innerText()
         let vatprice=await this.VATprice.innerText();
         this.map.set("ProductName",productName);
         this.map.set("ProductTablecnt",prodtableCount);
         this.map.set("Total",totalPrice);
         this.map.set("VATprice",vatprice);
         return this.map;
     }

     async getTotal():Promise<string>{
        return await this.total.innerText();
     }


}