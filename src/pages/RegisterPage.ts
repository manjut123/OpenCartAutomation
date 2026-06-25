
import{Locator, Page} from '@playwright/test'
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage
{
   private readonly firstName:Locator;
   private readonly lastName:Locator;
   private readonly emmailid:Locator;
   private readonly telePhone:Locator;
   private readonly password:Locator;
   private readonly confirmPassword:Locator;
   private readonly RegisterAccountHeader:Locator;
   private readonly agreeCheckbox:Locator;

   private readonly listgroup:Locator;
   private readonly submitButton:Locator;

   private readonly acctCreateSuccessMesssage:Locator;

   constructor(page:Page)
   {
      super(page);
      this.firstName=page.getByRole('textbox', { name: 'First Name' });
      this.lastName=page.getByRole('textbox', { name: 'Last Name' });
      this.emmailid=page.getByRole('textbox', { name: 'E-Mail' });
      this.telePhone=page.getByRole('textbox', { name: 'Telephone' });
      this.password=page.locator('input#input-password');
      this.confirmPassword=page.locator('input#input-confirm');
      this.RegisterAccountHeader=page.getByRole('heading', { name: 'Register Account', level: 1 });
      this.agreeCheckbox=page.locator('[name="agree"]');
      this.listgroup=page.locator('div.list-group a');
      this.submitButton=page.locator('input.btn-primary')
      //Your Account Has Been Created!
      this.acctCreateSuccessMesssage=page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });

   }

    async gotoRegisterPage():Promise<void>
    {
         await this.page.goto("opencart/index.php?route=account/register");
    }

    async isAccountRegisterVisible():Promise<boolean>
    {
        return await this.RegisterAccountHeader.isVisible();
    }
    
    async getListOptionsCount():Promise<number>
    {
        return await this.listgroup.count();
    }

    async enterRegisterData(fname:string,lname:string,email:string,telephone:string,pwd:string,confirmpwd:string):Promise<void>
    {
        await this.firstName.fill(fname);
        await this.lastName.fill(lname);
        await this.emmailid.fill(email);
        await this.telePhone.fill(telephone);
        await this.password.fill(pwd);
        await this.confirmPassword.fill(confirmpwd);
        await this.page.pause();
        await this.agreeCheckbox.check();
        await this.submitButton.click();
        await this.page.pause();
        
    }

    async isAccountCreated():Promise<boolean>
    {
        return await this.acctCreateSuccessMesssage.isVisible();
    }

}