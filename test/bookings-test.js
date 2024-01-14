// Import necessary libraries
const { expect } = require('chai');
const { findBookings } = require('../src/bookings'); // Replace 'your-file' with the actual path to your file
const { bookins } = require('../data/bookings-data'); // Replace 'your-data' with the actual path to your data

describe('findBookings function', () => {
    it.skip('returns bookings for a customer', () => {
        // Mocking the data for testing
        const mockCustomer = { id: 1, name: 'Test Customer' };

        // Calling the findBookings function
        const result = findBookings(mockCustomer);

        // Filtering the expected bookings manually
        const expectedBookings = bookins.filter(booking => booking.userID === mockCustomer.id);

        // Asserting the returned bookings
        expect(result).to.deep.equal(expectedBookings);
    });

    it.skip('returns an empty array for a customer with no bookings', () => {
        // Mocking the data for testing
        const mockCustomer = { id: 8, name: 'Customer with no bookings' };

        // Calling the findBookings function
        const result = findBookings(mockCustomer);

        // Asserting that the result is an empty array
        expect(result).to.deep.equal([]);
    });
});
