
export const totalSpend = (customer) => {
    customer.total =  customer.rooms.reduce((totals, room) => {
        
        totals += room.costPerNight;
        return totals
    }, 0)
    return customer
}