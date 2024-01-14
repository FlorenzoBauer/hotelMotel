import './css/styles.css';
import './images/turing-logo.png'
import { fetchData } from './api-calls';

const bookingsButton = document.querySelector('#bookings-button');
const billingsButton = document.querySelector('#billings-button');

const bookingsContainer = document.querySelector('.bookings-container');
const billingsContainer = document.querySelector('.billings-container');

let allCustomers;
let allBookings;
let allRooms;
let currentCustomer0;
let currentCustomer;

window.addEventListener('load', () => {
    retrieveData();
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
        .catch(err => console.log(err.message, err));
}

function customerObject () {
    currentCustomer1st = findBookings(currentCustomer0);
    currentCustomer2nd = matchRooms(currentCustomer1st);
    currentCustomer = totalSpend(currentCustomer2nd);
}

function rendershowBillings() {
    billingsContainer.classList.remove('hidden');
    bookingsContainer.classList.add('hidden');
}

function rendershowBookings() {
    bookingsContainer.classList.remove('hidden');
    billingsContainer.classList.add('hidden');
}