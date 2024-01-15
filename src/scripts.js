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
const bookingsCard = document.querySelectorAll('.booking-card');
const billingCard = document.querySelectorAll('.billing-card');
const bookingsContainer = document.querySelector('.bookings-container');
const billingsContainer = document.querySelector('.billings-container');
const bookARoomContainer = document.querySelector('.book-a-room-container');
const checkDate = document.querySelector('#date');
const formView = document.querySelector('.book-a-room-container');
const homeContainer = document.querySelector('.home-container');

let arrivalDate;
let allCustomers;
let allBookings;
let allRooms;
let currentCustomer0;
let currentCustomer;
let bookDate;
let bookedRoom;
let currentDate = new Date();

window.addEventListener('load', () => {
    retrieveData();
});

homeButton.addEventListener('click', () => {
renderHomeView();
});

bookRoomFormSubmit.addEventListener('submit', (event) => {
event.preventDefault();
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
            console.log(data);
            allCustomers = data[0].customers;
            allBookings = data[1].bookings;
            allRooms = data[2].rooms;
            currentCustomer0 = allCustomers[23];
        })
        .then(() => {
            customerObject();
        })
        .catch(err => console.log(err.message, err));
}

const sendBookedRoom = (url) => {
    
    const data = {
      userID: parseInt(currentCustomer.id),
      date: `${bookDate.value.replaceAll('-', '/')}`,
      roomNumber: parseInt(bookedRoom[0].number),
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };

function customerObject () {
    let currentCustomer1st = findBookings(currentCustomer0, allBookings);
    let currentCustomer2nd = matchRooms(currentCustomer1st, allRooms);
    currentCustomer = totalSpend(currentCustomer2nd);
    console.log(currentCustomer);
}

function rendershowBillings() {
    billingsContainer.classList.remove('hidden');
    bookingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    
    billingsContainer.innerHTML =' ';
    
    billingsContainer.innerHTML += currentCustomer.rooms.map(room => {
        return `
        <div class="billing-card">
            <p>Room Number: ${room.number}</p>
            <p>Room Type: ${room.roomType}</p>
            <p>Cost per Night: $${room.costPerNight}</p>
        </div>
            `
    }).join('');
}

function rendershowBookings() {
    bookingsContainer.classList.remove('hidden');

    billingsContainer.classList.add('hidden');
    formView.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');

    bookingsContainer.innerHTML =' ';
    bookingsContainer.innerHTML += `
    <div class="total-container">
        <h2 class="totalSign">Total Cost: ${currentCustomer.total}</h2>
      </div>
    `
    bookingsContainer.innerHTML += currentCustomer.bookings.map(booking => {
        
        return `
        <div class="booking-card">
            <p>Room Number: ${booking.roomNumber}</p>
            <p>Date: ${booking.date}</p>
        </div>
        `
    }).join('');
}

const findBookedRooms = () => {
    let checkInDate = checkDate.value
    .split('-')
    .join('/');
    
    let arrivalDate = checkInDate;

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
        availableRoomsContainer.classList.remove('hidden');


    availableRoomsContainer.innerHTML = '';

    if (result.length > 0) {
        availableRoomsContainer.innerHTML += `
           
            ${result.map(room => `
                <div class="available-room-card">
                    <p>Room Number: ${room.number}</p>
                    <p>Room Type: ${room.roomType}</p>
                    <p>Cost Per Night: $${room.costPerNight}</p>
                </div>
            `).join('')}
        `;
    } else {
        availableRoomsContainer.innerHTML += '<p>No available rooms.</p>';
    }
}

function renderHomeView() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    bookARoomContainer.classList.add('hidden');

    homeContainer.classList.remove('hidden');
}

function renderBookRoomForm() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    homeContainer.classList.add('hidden');
    availableRoomsContainer.classList.add('hidden');
    
    bookARoomContainer.classList.remove('hidden');  
}