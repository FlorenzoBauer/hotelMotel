
import { roombas } from '../data/rooms-data'
import { findBookings } from '../src/bookings'

export const matchRooms = (customer) => {
    customer.rooms = []
     customer.bookings.forEach(booking => {
        roombas.map(room => {
            if(room.number === booking.roomNumber) {
            customer.rooms.push(room)
            }
        
        })
    })
    return customer
}
