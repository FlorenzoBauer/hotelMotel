import { bookins } from '../data/bookings-data';

export const findBookings = (customer) => {

    customer.bookings =  bookins.filter(booking => booking.userID === customer.id);
    return customer
}