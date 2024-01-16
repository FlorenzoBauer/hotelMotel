import './css/styles.css';
import './images/turing-logo.png'
import { fetchData } from './api-calls';
import { findBookings } from './bookings';
import { matchRooms } from './rooms';
import { totalSpend } from './customer';

const bookingsButton = document.querySelector('#bookings-button');
const billingsButton = document.querySelector('#billings-button');
const bookRoomButton = document.querySelector('#book-room-button');
const homeButton = document.querySelector('#home-button');

const availableRoomsContainer = document.querySelector('.available-room-container');
const bookRoomFormSubmit = document.querySelector('#book-room-form');
const bookingsContainer = document.querySelector('.bookings-container');
const billingsContainer = document.querySelector('.billings-container');
const bookARoomContainer = document.querySelector('.book-a-room-container');
const checkDate = document.querySelector('#date');
const formView = document.querySelector('.book-a-room-container');
const homeContainer = document.querySelector('.home-container');
const navBar = document.querySelector('.nav-bar');
const loginContainer = document.querySelector('.login-container');

const loginButton = document.querySelector('#login-button');
const userName = document.querySelector('#username');
const password = document.querySelector('#password');

let allCustomers;
let allBookings;
let allRooms;
let currentCustomer0;
let currentCustomer;
let bookDate;
let bookedRoom;
let currentDate = new Date();
let customerId;

const loginMoment = (event) => {
    event.preventDefault();
    const regex = new RegExp(/^customer\d{1,}$/);
    if(regex.test(userName.value) && password.value === 'overlook2021') {
        customerId = Number(userName.value.replace('customer',""));
        retrieveData();
    }
    else{
        alert('Please enter a valid username and password');
    }
}

loginButton.addEventListener('click', (event) => {
    loginMoment(event);
});

availableRoomsContainer.addEventListener('click', (event) => {
    if (event.target.id === 'book-button') {
        submitBooking(event)
    }
});

homeButton.addEventListener('click', () => {
renderHomeView();
});

bookRoomFormSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const dateInput = document.getElementById('date');
    const bedNumberInput = document.getElementById('bed-number');

    if (!dateInput.value || !bedNumberInput.value) {
        alert('Please fill out all form fields.');
        return
    }

    displayAvailableRooms();
});

bookRoomButton.addEventListener('click', () => {
renderBookRoomForm();
});

bookingsButton.addEventListener('click', () => {
    rendershowBookings();
});

billingsButton.addEventListener('click', () => {
    rendershowBillings();
});

function retrieveData() {
    fetchData()
        .then(responses => {
            return Promise.all(
                responses.map(response => {
                    if (!response.ok) {
                        throw new Error('Wowza! Something went wrong!')
                    }
                    return response.json();
                })
            );
        })
        .then(data => {
            allCustomers = data[0].customers;
            allBookings = data[1].bookings;
            allRooms = data[2].rooms;
            currentCustomer0 = allCustomers[customerId - 1];
            
        })
       .then(() => {
            customerObject();
       })
        .then(() => {
            renderHomeView();
        
       })
        .catch(err => console.log(err.message, err));
}

function submitBooking(event) {
    
    bookDate = document.querySelector('#date');
        
    bookedRoom = event.target.closest('.available-room-card');
    
    if (bookedRoom) {
        const roomNumberElement = bookedRoom.querySelector('#room-number');
        console.log(roomNumberElement)
        if (roomNumberElement) {
            const roomNumber = roomNumberElement.textContent.trim().replace('Room Number: ', '');
            console.log(roomNumber);
            sendBookedRoom('http://localhost:3001/api/v1/bookings', roomNumber, bookDate)
            
        } else {
            console.error('Room number element not found in the selected room card.');
        }
    } else {
        alert('Please select a room to book');
    }
}

const sendBookedRoom = (url, number, bookDate) => {
    const data = {
      userID: parseInt(currentCustomer.id),
      date: `${bookDate.value.replaceAll('-', '/')}`,
      roomNumber: parseInt(number),
    };
    fetch(url, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.newBooking)
        currentCustomer.bookings.push(data.newBooking)
        showConfirmationMessage();
    } )
    .catch(err => console.log(err.message, err));
      
  }

  function customerObject() {
        let currentCustomer1st = findBookings(currentCustomer0, allBookings);
        let currentCustomer2nd = matchRooms(currentCustomer1st, allRooms);
        currentCustomer = totalSpend(currentCustomer2nd);
        console.log(currentCustomer)
   
}

function rendershowBillings() {
    billingsContainer.classList.remove('hidden');
    bookingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');

    billingsContainer.innerHTML =' ';

    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');
    
    const totalSign = document.createElement('h2');
    totalSign.classList.add('totalSign');
    totalSign.textContent = `Total Cost: $${currentCustomer.total.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
    
    totalContainer.appendChild(totalSign);
    billingsContainer.appendChild(totalContainer);

    currentCustomer.rooms.forEach(room => {
        const billingCard = document.createElement('article');
        billingCard.classList.add('billing-card');
        billingCard.setAttribute('tabindex', '0');
        billingCard.setAttribute('aria-labelledby', 'room-number');

        billingCard.innerHTML = `
            <p id="room-number">Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
            <p>Cost per Night: $${room.costPerNight}</p>
        `;
        
        billingsContainer.appendChild(billingCard);
    });
}


function rendershowBookings() {
    bookingsContainer.classList.remove('hidden');
    billingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');

    const sortedBookings = currentCustomer.bookings.sort((a, b) => new Date(a.date) - new Date(b.date));

    const futureBookings = sortedBookings.filter(booking => new Date(booking.date) >= currentDate);
    const pastBookings = sortedBookings.filter(booking => new Date(booking.date) < currentDate);
    if (futureBookings.length > 0) {
        futureContainer.innerHtml = ''
        const futureContainer = document.querySelector('.future-bookings-container');
        futureContainer.innerHTML += futureBookings.map(booking => {
            return `
            <article class="booking-card" tabindex="0" aria-labelledby="room-number">
                <p id="room-number">Room Number: ${booking.roomNumber}</p>
                <p>Date: ${booking.date}</p>
            </article>
            `;
        }).join('');
    }

    if (pastBookings.length > 0) {
        const pastContainer = document.querySelector('.past-bookings-container');
        pastContainer.innerHTML = ''
        pastContainer.innerHTML += pastBookings.map(booking => {
            return `
            <article class="booking-card" tabindex="0" aria-labelledby="room-number">
                <p id="room-number">Room Number: ${booking.roomNumber}</p>
                <p>Date: ${booking.date}</p>
            </article>
            `;
        }).join('');
    }
}

const findBookedRooms = () => {
    let checkInDate = checkDate.value
    .split('-')
    .join('/');

   return allBookings.filter((booking) => booking.date === checkInDate).map((room)=> room.roomNumber)
}

const findUnbookedRooms = (bookedRooms) => {
    return allRooms.filter((room) => !bookedRooms.includes(room.number));
}

const getAvailableRooms = () => { 
    const numBeds = document.getElementById('bed-number').value;
    const bookedRooms2 = findBookedRooms();
    const unbookedRooms2 = findUnbookedRooms(bookedRooms2);
    
    const result = unbookedRooms2.filter((room) => room.numBeds >= numBeds)
    return result
}

function displayAvailableRooms() {
    const result = getAvailableRooms();
    formView.classList.add('hidden');
    homeContainer.classList.add('hidden');

    availableRoomsContainer.classList.remove('hidden');

    availableRoomsContainer.innerHTML = '';

    if (result.length > 0) {
        result.forEach(room => {
            const roomCard = document.createElement('div');
            roomCard.classList.add('available-room-card');
            roomCard.setAttribute('aria-labelledby', 'room-number');

            const roomNumberElement = document.createElement('p');
            roomNumberElement.id = 'room-number';
            roomNumberElement.textContent = `Room Number: ${room.number}`;
            roomCard.appendChild(roomNumberElement);

            const roomTypeElement = document.createElement('p');
            roomTypeElement.textContent = `Room Type: ${room.roomType}`;
            roomCard.appendChild(roomTypeElement);

            const costPerNightElement = document.createElement('p');
            costPerNightElement.textContent = `Cost Per Night: $${room.costPerNight}`;
            roomCard.appendChild(costPerNightElement);

            const bookButton = document.createElement('button');
            bookButton.id = 'book-button';
            bookButton.textContent = 'Book';
            roomCard.appendChild(bookButton);

            availableRoomsContainer.appendChild(roomCard);
        });
    } else {
        availableRoomsContainer.innerHTML = '<p>No available rooms.</p>';
    }
}

function showConfirmationMessage() {
    availableRoomsContainer.innerHTML = '';

    availableRoomsContainer.innerHTML = `
        <h2 class="confirmationMessage">Thank you for your booking!</h2>
    `;

    setTimeout(() => {
        rendershowBookings();
    }, 2000);
}

function renderHomeView() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    bookARoomContainer.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    loginContainer.classList.add('hidden');
    
    navBar.classList.remove('hidden');
    homeContainer.classList.remove('hidden');
}

function renderBookRoomForm() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    
    bookARoomContainer.classList.remove('hidden');  
}
