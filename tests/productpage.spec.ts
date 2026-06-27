
import { test, expect } from '../src/fixtures/pagefixtures';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
});


test('comp logo exists on product page @manju', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('footers exist on product page @manju', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});

test('verify product images count @manju', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProductImagesCount();
    console.log('total images: ', imgCount);
    expect(imgCount).toBe(4);
    //act vs exp
});


test('verify product Information/Data @manju', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');
});

test('add product to cart @manju',async({homePage, searchResultsPage, productInfoPage})=>{
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    let message=await productInfoPage.addProductToCart();
    
    let productname=await productInfoPage.getProductHeader();
   let expectedMessage=`Success: You have added ${productname} to your shopping cart!`
    expect(message.trim()).toContain(expectedMessage);
    await productInfoPage.clickOnCartbutton();

})