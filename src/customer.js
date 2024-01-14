
export const totalSpend = (customer) => {
    customer.total =  customer.rooms.reduce((totals, room) => {
        
        totals += room.costPerNight;
        return totals
    }, 0)
    return customer
}

const getBookings = (customer) => {
    return customer.bookings.map(booking => {
        return booking.date
    })
}

const getRooms = (customer) => {
    return customer.rooms.map(room => {
        return room.number
    })
}