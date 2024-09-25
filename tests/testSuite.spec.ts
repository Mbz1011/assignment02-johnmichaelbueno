import { test, expect } from '@playwright/test';


  test.describe('Test suite - Tester Hotel', () => {

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
      data: JSON.stringify({  
        category: 'single',
        floor: 2,
        number: 103,
        available: true,
        price: 1600,
        features: ['balcony', 'ensuite', 'penthouse']
      })
      
    });

    
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
    data: JSON.stringify({  
      category: 'single',
      floor: 3,
      number: 777,
      available: true,
      price: 1669,
      features: ['balcony', 'ensuite', 'penthouse']
    })
    
  });

  
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
  const respDeletedClient= await request.delete("http://localhost:3000/api/client/1", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    
  });

  //console.log(await respCreatedRoom.json())
  expect (await respDeletedClient.ok())

})



test('Test case 07 - Post new Client', async ({ request }) => {
  const respCreatedClient = await request.post("http://localhost:3000/api/client/new", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  
      email: "johndoe@gmail.com",
      name: "John Doe",
      telephone: "0738975622",
      
    })
    
  });

  
  expect (await respCreatedClient.ok())

})


test('Test case 08 - Edit Client', async ({ request }) => {
  const respEditedClient = await request.put("http://localhost:3000/api/client/2", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  
      
      email: "johndoe@gmail.com",
      name: "John Doe",
      telephone: "0738975622",
    })
    
  });

  
  expect (await respEditedClient.ok())

})

test('Test case 09 - Post new Bill', async ({ request }) => {
  const respCreatedClient = await request.post("http://localhost:3000/api/bill/new", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  
      paid: true,
      value: "3000",
      
      
    })
    
  });

  
  expect (await respCreatedClient.ok())

})
test('Test case 10 - Post new Reservation', async ({ request }) => {
  const respCreatedClient = await request.post("http://localhost:3000/api/reservation/new", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  
      bill: 1,
      client: 1,
      end: "2024-07-11",
      id: 1,
      room: 1,
      start: "2024-07-01"
      
      
    })
  });

  
  expect (await respCreatedClient.ok())
  //console.log(respCreatedClient.json()) figure out how to print result

})



})
