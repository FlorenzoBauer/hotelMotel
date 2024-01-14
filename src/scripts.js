import './css/styles.css';
import './images/turing-logo.png'
import { fetchData } from './api-calls';
import { findBookings } from './bookings';
import { matchRooms } from './rooms';
import { totalSpend } from './customer';

const bookingsButton = document.querySelector('#bookings-button');
const billingsButton = document.querySelector('#billings-button');
const bookRoomButton = document.querySelector('#book-room-button');
const submitButton = document.querySelector('#submit-button');

const bookingsCard = document.querySelectorAll('.booking-card');
const billingCard = document.querySelectorAll('.billing-card');
const bookingsContainer = document.querySelector('.bookings-container');
const billingsContainer = document.querySelector('.billings-container');
const bookARoomContainer = document.querySelector('.book-a-room-container');


let allCustomers;
let allBookings;
let allRooms;
let currentCustomer0;
let currentCustomer;
let bookDate;
let bookedRoom;

window.addEventListener('load', () => {
    retrieveData();
});

bookRoomButton.addEventListener('click', () => {
renderBookRoom();
});

bookingsButton.addEventListener('click', () => {
    rendershowBookings();
});

billingsButton.addEventListener('click', () => {
    rendershowBillings();
});

submitButton.addEventListener('click', () => {
submitBooking();
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

function submitBooking() {
    
}

function renderBookRoom() {
    bookingsContainer.classList.add('hidden');
    billingsContainer.classList.add('hidden');
    bookARoomContainer.classList.remove('hidden');
   
    
    
}