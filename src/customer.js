export const totalSpend = (customer) => {
    customer.total =  customer.rooms.reduce((totals, room) => {
        
        totals += room.costPerNight;
        return totals
    }, 0)
    return customer
}

export const matchRooms = (customer, allrooms) => {
    customer.rooms = []
     customer.bookings.forEach(booking => {
        allrooms.map(room => {
            if(room.number === booking.roomNumber) {
            customer.rooms.push(room)
            }
        
        })
    })
    return customer
}


export const findBookings = (customer, allbookings) => {
    customer.bookings =  allbookings.filter(booking => booking.userID === customer.id);
    return customer
}

