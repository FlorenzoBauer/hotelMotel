import chai from 'chai';
import { customes, roombas, bookins} from '../data/customer-data';
import { totalSpend, matchRooms, findBookings } from '../src/customer';

const expect = chai.expect;
describe('totalSpend', () => {
    it('should calculate the total spend for a customer', () => {
      const customer = customes[0];
      customer.rooms = roombas.slice(0, 2);
  
      const result = totalSpend(customer);
  
      expect(result.total).to.equal(835.78); // Adjust based on the selected rooms
    });
  });
  
  describe('matchRooms', () => {
    it('should match rooms based on bookings', () => {
      const customer = customes[1];
        const customerbookings = findBookings(customer, bookins)
      const result = matchRooms(customerbookings, roombas);
  
      expect(result.rooms).to.deep.equal([
        { number: 5, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 2, costPerNight: 340.17 },
      ]);
    });
    
  });
  
  describe('findBookings', () => {
    it('should find bookings for a customer', () => {
      const customer = customes[1];
  
      const result = findBookings(customer, bookins);
  
      
      expect(result.bookings).to.deep.equal([
        {id: "5fwrgu4i7k55hl6tb",userID: 2, date: "2022/02/06",roomNumber: 5},
        // Add more expected bookings as needed
      ]);
    });
  });