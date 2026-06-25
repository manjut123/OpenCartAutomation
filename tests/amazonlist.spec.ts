// import { expect, Page, test } from '@playwright/test'

// test('click on menu on amazon list', async ({ page }) => {
//      test.setTimeout(80000);
//     await page.goto('https://www.amazon.com/', { waitUntil: 'load' });
//     await page.locator('li.nav-li a').first().waitFor({ state: 'visible' });
//     let count = await page.locator('li.nav-li a').count();
//     for (let i = 0; i < count; i++) {
//         await handlepopup(page);
//         const links = page.locator('li.nav-li a');

//         const link = links.nth(i);
//        // await handlepopup(page);
//         console.log(await link.textContent());

//         await link.click();

//         await page.waitForLoadState('load');
//         //await handlepopup(page);

//         console.log(page.url());

//         await page.goto('https://www.amazon.com/');
//         await page.waitForLoadState('domcontentloaded');
//         //await handlepopup(page);
//     }
// })

// async function handlepopup(page: Page) {
//     const dismissBtn = page.locator("//input[@data-action-type='DISMISS']");

//     try {
//         await dismissBtn.waitFor({
//             state: 'visible',
//             timeout: 3000
//         });

//         await dismissBtn.click();

//     } catch {
//         console.log('No popup appeared');
//     }
// }