import { bookins } from '../data/bookings-data';

export const findBookings = (customer, allbookings) => {
    customer.bookings =  allbookings.filter(booking => booking.userID === customer.id);
    return customer
}

export const findOpenBookings = (date, bookings) => {
    return bookings.map(booking => {
        if(booking.date === date) {
            return booking.roomNumber
        }
    })
}