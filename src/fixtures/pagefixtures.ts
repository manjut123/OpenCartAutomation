import { test as baseTest } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { CsvHelper } from '../utils/CsvHelper';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchResultsPage } from '../pages/SearchPage';
import { ProductInfoPage } from '../pages/ProductInfo';
import { BasePage } from '../pages/BasePage';
import { CheckoutPage } from '../pages/checkoutPage';




//define types for page fixtures:
type pageFixtures = {
    basePage:BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    registerPage:RegisterPage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    testData: Record<string, string>[],
    registerData:Record<string,string>[],
    checkoutPage:CheckoutPage,
    

};

//extend playwright base test:
export let test = baseTest.extend<pageFixtures>({
       basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    checkoutPage:async ({page},use) => {
       let checkoutPage=new CheckoutPage(page);
       await use(checkoutPage);        
    },
    
    registerPage:async({page},use)=>{
        let registerPage=new RegisterPage(page);
        await use(registerPage);
    },

    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/testdata/loginData.csv');
        await use(testData);
    },

     registerData: async ({ }, use) => {
        let registerData = CsvHelper.readCsv('src/testdata/registerData.csv');
        await use(registerData);
    },
      searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },


});

export { expect } from '@playwright/test';

