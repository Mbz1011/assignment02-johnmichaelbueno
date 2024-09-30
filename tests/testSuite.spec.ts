import { test, expect } from '@playwright/test';



  test.describe('Test suite - Tester Hotel', () => {
 //Acquires token from API to allow access to the endpoints
  let tokenValue;
    test.beforeAll('Token Acquisition', async ({ request }) => {
      const respToken = await request.post("http://localhost:3000/api/login", {
        data:{
          username:"tester01",
          password:"GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
        }
      })

      tokenValue = (await respToken.json()).token;



    });
    //Test that checks if Rooms endpoint returns all rooms and validates the first entry to have the correct data
    test('Test case 01 - Get all rooms', async ({ request }) => {
      const respRooms = await request.get("http://localhost:3000/api/rooms", {
        headers: {
          "X-user-auth": JSON.stringify({
            username: "tester01",
            token: tokenValue 
          })
        },
      });
    
      // Ensure the response is OK
      expect(respRooms.ok()).toBeTruthy();
      const roomsData = await respRooms.json();
      console.log(roomsData);
    
      // Ensure the response is an array of rooms
      expect(Array.isArray(roomsData)).toBeTruthy();
    
      // If the response contains multiple rooms, checks the first one
      if (roomsData.length > 0) {
        const firstRoom = roomsData[0];
    
        // Checks if first room entry has properties like id and if the different fields are the correct values etc.
        expect(firstRoom).toHaveProperty('id'); 
        expect(firstRoom.category).toBe('double'); 
        expect(firstRoom.floor).toBe(1);
        expect(firstRoom.number).toBe(101);
        console.log(firstRoom);
      } else { //In case there is no rooms
        throw new Error("No rooms returned in the response");
      }
    });
    
    
//Tests Delete endpoint for rooms
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

  //Verifying the response to be 200 since that's what the API seems to be designed to do.
  expect(respDeletedRoom.ok());
  
  console.log(await respDeletedRoom.json());
  

  
  //Trying to retrieve the deleted room to confirm it no longer exists
  const respGetDeletedRoom = await request.get("http://localhost:3000/api/room/1", {
    headers: {
      "Content-Type": "application/json",
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue
      })
    },
  });
    
  //Currently a bug causes the API to return a 401 Unauthorized so test will fail.

  // Trying to verify that the deleted room no longer exists
  expect(respGetDeletedRoom.status()).toBe(404); 
 
});

//Test for Post endpoint for new rooms
  test('Test case 03 - Post new room', async ({ request }) => {
    const respCreatedRoom = await request.post("http://localhost:3000/api/room/new", {
      headers: {
        "Content-Type": "application/json", 
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: tokenValue 
        })
      },
    //Test Data
      data: JSON.stringify({  
        category: 'single',
        floor: 2,
        number: 103,
        available: true,
        price: 1600,
        features: ['balcony', 'ensuite', 'penthouse']
      })
      
    });

    //Checks if the API response is successful
    expect (await respCreatedRoom.ok()).toBeTruthy();
    const createdRoomData = await respCreatedRoom.json(); 

  // Checks that the response contains the correct room data
    expect(createdRoomData).toHaveProperty('id'); 
    expect(createdRoomData.category).toBe('single');
    expect(createdRoomData.floor).toBe(2);
    expect(createdRoomData.number).toBe(103);

})
//Test for PUT endpoint for rooms
test('Test case 04 - Edit Room', async ({ request }) => {
  
  const respEditedRoom = await request.put("http://localhost:3000/api/room/2", {
    headers: {
      "Content-Type": "application/json",
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue
      })
    },
    //Test Data
    data: JSON.stringify({
      category: 'single',
      floor: 3,  
      number: 777,  
      available: true,
      price: 1669,
      features: ['balcony', 'ensuite', 'penthouse']
    })
  });

  //Request Validation
  expect(respEditedRoom.ok()).toBeTruthy(); 
  const editedRoomData = await respEditedRoom.json(); 

  //Test Data Validation
  expect(editedRoomData.category).toBe('single'); 
  expect(editedRoomData.floor).toBe(3); 
  expect(editedRoomData.number).toBe(777); 
  expect(editedRoomData.available).toBe(true); 
  expect(editedRoomData.price).toBe(1669); 
  expect(editedRoomData.features).toEqual(['balcony', 'ensuite', 'penthouse']); 
});

// Similiar test to Test case 01 but for clients endpoint
test('Test case 05 - Get all clients', async ({ request }) => {
  const respClients = await request.get("http://localhost:3000/api/clients", {
    headers: {
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
  });

  
  expect(respClients.ok()).toBeTruthy();
  const clientsData = await respClients.json();
  console.log(clientsData);

  
  expect(Array.isArray(clientsData)).toBeTruthy();

  
  if (clientsData.length > 0) {
    const firstclient= clientsData[0];

    
    expect(firstclient).toHaveProperty('id'); 
    expect(firstclient.name).toBe("Jonas Hellman"); 
    expect(firstclient.email).toBe("jonas.hellman@example.com");
    expect(firstclient.telephone).toBe("070 000 0001");
    console.log(firstclient);
  } else { //In case there is no clients
    throw new Error("No clients returned in the response");
  }
})
//Delete bug persists for Client Delete endpoint as well so this test will fail
test('Test case 06 - Delete client', async ({ request }) => {
  
  const respDeletedClient = await request.delete("http://localhost:3000/api/client/1", {
    headers: {
      "Content-Type": "application/json",
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    }
  });

  
  expect(respDeletedClient.ok()).toBeTruthy();
  

  
  const respGetClient = await request.get("http://localhost:3000/api/client/1", {
    headers: {
      "Content-Type": "application/json",
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    }
  });

  //Bug makes API return 401 instead of 404
  expect(respGetClient.status()).toBe(404); 
});



//Test for Client Post endpoint
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
  const createdClientData = await respCreatedClient.json(); 

  //Test Data Validation
    expect(createdClientData).toHaveProperty('id'); 
    expect(createdClientData.email).toBe('johndoe@gmail.com');
    expect(createdClientData.name).toBe("John Doe");
    expect(createdClientData.telephone).toBe("0738975622");

})

// Test for Client Put Endpoint
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
      
      email: "janedoe@gmail.com",
      name: "Jane Doe",
      telephone: "0778978842",
    })
    
  });

  
  expect (await respEditedClient.ok())
  const editedClientData = await respEditedClient.json(); 

  // Test Data Validation
  expect(editedClientData.email).toBe("janedoe@gmail.com"); 
  expect(editedClientData.name).toBe("Jane Doe"); 
  expect(editedClientData.telephone).toBe("0778978842"); 
  

})

//Test for Bill Post endpoint
test('Test case 09 - Post new Bill', async ({ request }) => {
  const respCreatedBill = await request.post("http://localhost:3000/api/bill/new", {
    headers: {
      "Content-Type": "application/json", 
      "X-user-auth": JSON.stringify({
        username: "tester01",
        token: tokenValue 
      })
    },
    data: JSON.stringify({  
      paid: true,
      value: 3000,
      
      
    })
    
  });

  expect(respCreatedBill.ok()).toBeTruthy(); 
  expect(respCreatedBill.status()).toBe(200); 

  const createdBill = await respCreatedBill.json();
  console.log(createdBill); 

  expect(createdBill).toHaveProperty('id'); 
  expect(createdBill.paid).toBe(true);
  expect(createdBill.value).toBe(3000);

})

//Test for Reservation Post endpoint
test('Test case 10 - Post new Reservation', async ({ request }) => {
  const respCreatedReservation = await request.post("http://localhost:3000/api/reservation/new", {
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

  
  expect(respCreatedReservation.ok()).toBeTruthy(); 
  expect(respCreatedReservation.status()).toBe(200); 

  
  const createdReservation= await respCreatedReservation.json();
  console.log(createdReservation); 

  
  expect(createdReservation).toHaveProperty('id'); 
  expect(createdReservation.client).toBe(1); 
  expect(createdReservation.room).toBe(1); 
  expect(createdReservation.start).toBe("2024-07-01"); 
  expect(createdReservation.end).toBe("2024-07-11"); 


})





})
