import { test, expect } from '@playwright/test';


  test.describe('Test suite backend V1', () => {

  let tokenValue;
    test.beforeAll('Test case 01 - Get all rooms', async ({ request }) => {
      const respToken = await request.post("http://localhost:3000/api/login", {
        data:{
          username:"tester01",
          password:"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }
      })

      tokenValue = (await respToken.json()).token;



    });

    test('Test case 01 - Get all rooms', async ({ request }) => {
      const respRooms = await request.get("http://localhost:3000/api/rooms", {
        headers: {
          "X-user-auth": JSON.stringify({
            username: "tester01",
            token: tokenValue 
          })
        },
      });

      console.log(await respRooms.json())
      expect (await respRooms.ok())

  })



  test('Test case 02 - Delete room', async ({ request }) => {
    const respDeletedRoom = await request.delete("http://localhost:3000/api/room/1", {
      headers: {
        "Content-Type": "application/json", 
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue 
        })
      },
      
    });

    //console.log(await respCreatedRoom.json())
    expect (await respDeletedRoom.ok())

})



  test('Test case 03 - Post new room', async ({ request }) => {
    const respCreatedRoom = await request.post("http://localhost:3000/api/room/new", {
      headers: {
        "Content-Type": "application/json", 
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue 
        })
      },
      data: JSON.stringify({  // Convert the data to a JSON string
        category: 'single',
        floor: 2,
        number: 103,
        available: true,
        price: 1600,
        features: ['balcony', 'ensuite', 'penthouse']
      })
      
    });

    //console.log(await respCreatedRoom.json())
    expect (await respCreatedRoom.ok())

})

test('Test case 04 - Edit Room', async ({ request }) => {
  const respCreatedRoom = await request.put("http://localhost:3000/api/room/2", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  // Convert the data to a JSON string
      category: 'single',
      floor: 3,
      number: 777,
      available: true,
      price: 1669,
      features: ['balcony', 'ensuite', 'penthouse']
    })
    
  });

  //console.log(await respCreatedRoom.json())
  expect (await respCreatedRoom.ok())

})

test('Test case 05 - Get all clients', async ({ request }) => {
  const respClients = await request.get("http://localhost:3000/api/clients", {
    headers: {
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
  });

  console.log(await respClients.json())
  expect (await respClients.ok())

})

test('Test case 06 - Delete client', async ({ request }) => {
  const respDeletedRoom = await request.delete("http://localhost:3000/api/client/1", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    
  });

  //console.log(await respCreatedRoom.json())
  expect (await respDeletedRoom.ok())

})

})
