import chai from 'chai';
import { customes } from '../data/customer-data';
import { findBookings }  from '../src/bookings';
import { matchRooms } from '../src/rooms';
import { totalSpend } from '../src/customer';

const expect = chai.expect;

describe('totalSpend function', () => {
    it('calculates the total spend for a customer', () => {
        // Mocking the data for testing
        const mockCustomer = customes[0];
        const expectedBookings = findBookings(mockCustomer);
        const expectedRooms = matchRooms(expectedBookings);

        const result = totalSpend(expectedRooms);

        // Calculating the expected total spend manually
        const expectedTotalSpent = expectedRooms.rooms.reduce((total, room) => total + room.costPerNight, 0);

        // Asserting the total spend
        expect(result).to.equal(expectedTotalSpent);
    });
});

describe('matchRooms function', () => {
    it.skip('matches rooms for a customer based on bookings', () => {
        // Mocking the data for testing
        const mockCustomer = customes[1];
        const expectedBookings = findBookings(mockCustomer);
        const expectedRooms = matchRooms(expectedBookings);

        
        const result = expectedRooms.rooms;

        // Asserting the length of the result array
        expect(result).to.have.lengthOf(expectedBookings.length);

    });
});