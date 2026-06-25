
import {expect, test} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';

test.beforeEach("login into application register page ", async({registerPage})=>{
    await registerPage.gotoRegisterPage();
})
test("Register page title test ",async({registerPage})=>{
    expect(registerPage.isAccountRegisterVisible()).toBeTruthy();   
})
let registerData = CsvHelper.readCsv('src/testdata/registerData.csv');
test("Register page list options test ",async({registerPage})=>{
let registerData = CsvHelper.readCsv('src/testdata/registerData.csv');
    expect(await registerPage.getListOptionsCount()).toBe(Number(registerData[0].optionscount));   
})

/*
for (let user of registerData) {
    test(`register data using - ${user.firstname}`, async ({ registerPage }) => {
            await registerPage.enterRegisterData(user.firstname,user.lastname,user.email,user.telephone,user.password,user.confirmpassword);
           // await registerPage.pause();
           expect(await registerPage.isAccountCreated()).toBeTruthy();
        });
};
*/

let excelRegisterdata = ExcelHelper.readExcel('src/testdata/OpenCartTestData.xlsx','register');
for (let user of excelRegisterdata) {
    test(`register data using - ${user.firstname}`, async ({ registerPage }) => {
            await registerPage.enterRegisterData(user.firstname,user.lastname,user.email,String(user.telephone),user.password,user.confirmpassword);
           // await registerPage.pause();
           expect(await registerPage.isAccountCreated()).toBeTruthy();
        });
}
