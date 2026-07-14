
import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
});


test('login page title test @manju1', async ({ loginPage }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test @manju1', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app test @manju1', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    //verify that if on homepage logout link visible
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   
});


//DD_1. sequence mode -- only 1 test is running with test data one by one using testData from fixture
test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});


//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
let testData = CsvHelper.readCsv('src/testdata/loginData.csv');
for (let row of testData) {
    test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

let loginTestData = ExcelHelper.readExcel('src/testdata/OpenCartTestData.xlsx', 'login');
for (let row of loginTestData) {
    test(`invalid login test with excel data - ${row.username}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

