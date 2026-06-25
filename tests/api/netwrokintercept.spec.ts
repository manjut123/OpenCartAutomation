

import {test,expect} from '@playwright/test';

test('intercept test',async({page})=>{
      
      await page.route('**/*',async(route)=>{

         console.log(route.request().method(),"  ",route.request().url());
         await route.continue();
      })

       await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

      await page.pause();
})

  test('mock test',async({page})=>{
        
    let fakeproduct=[
        {name:'Fake Macbook Pro',price:'$344'},
        {name:'Fake Macbook Air',price:'$566'}           
    ]
        await page.route('**/index.php?route=product/search&search=macbook',async (route)=>{
              
               route.fulfill({
                status:200,
                contentType:'application/json',
                body:JSON.stringify(fakeproduct),
               });
        });
         
        await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
       // await page.pause();

        let fakeres=await page.evaluate(async()=>{
            let fakeres=await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');
            return await fakeres.json();
        })

       let total=fakeres.length;

       for(let i=0;i<total;i++)
       {
          console.log(fakeres[i].name);
       }

  })

  test('redbus initial api list',async({page})=>{
     
      await page.route("**/*",async(route)=>{
            console.log(route.request().method()," ",route.request().url());
            await route.continue();
      })

      await page.goto("https://www.redbus.in/");
      await page.pause();

  })

  test('mock redbus result',async({page})=>{

       const fakeresponse={        
         inventories:[
           {
            travelsName:'Manju travel',
            departureTime:'2026-06-30 23:15:00',
            arrivalTime:'2026-07-02 23:15:00',
            availableSeats:30,
            fareList: [499]
           }
         ]
        };

        await page.route('**/bus-tickets/*',async(route)=>{
             await route.fulfill({
                status:200,
                contentType:'application/json',
                body:JSON.stringify(fakeresponse)
             })
        });

        await page.goto('https://www.redbus.in/bus-tickets/pune-to-aurangabad?fromCityName=Pune&fromCityId=130&srcCountry=India&fromCityType=CITY&toCityName=Aurangabad%20(Maharashtra)&toCityId=309&destCountry=India&toCityType=CITY&onward=30-Jun-2026&doj=30-Jun-2026&ref=home');
         
        let getFakeres=await page.evaluate(async()=>{
             let res=await fetch('https://www.redbus.in/bus-tickets/pune-to-aurangabad?fromCityName=Pune&fromCityId=130&srcCountry=India&fromCityType=CITY&toCityName=Aurangabad%20(Maharashtra)&toCityId=309&destCountry=India&toCityType=CITY&onward=30-Jun-2026&doj=30-Jun-2026&ref=home')
              return await res.json();
            });
        console.log(await getFakeres.inventories[0].travelsName);
        await page.pause();
      
  })