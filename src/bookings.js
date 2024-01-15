import { bookins } from '../data/bookings-data';

export const findBookings = (customer, allbookings) => {
    customer.bookings =  allbookings.filter(booking => booking.userID === customer.id);
    return customer
}

