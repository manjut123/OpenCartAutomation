
import { test,expect } from "../src/fixtures/pagefixtures";

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
});

test('test checkout flow @smoke',async({checkoutPage,homePage,productInfoPage,searchResultsPage})=>{

    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let message=await productInfoPage.addProductToCart();
    //Success: You have added MacBook Pro to your shopping cart!
    let productname=await productInfoPage.getProductHeader();
    console.log(message," ",productname);
    await checkoutPage.clickCheckout();
    console.log(await checkoutPage.getHeader());
   
    let priceinfo=await checkoutPage.getPriceInfo();
    expect.soft(priceinfo.get('ProductName')).toContain('MacBook Pro');
    expect.soft(priceinfo.get('ProductTablecnt')).toBe(3);
    expect.soft(priceinfo.get('Total')).toContain('$');
    //expect.soft(priceinfo.get('VATprice')).toBe('$200.00');

})

