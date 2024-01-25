const getPromises = [
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/customers/'),
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/bookings'),
    fetch('https://murmuring-plateau-60579-55a1e980f710.herokuapp.com/api/v1/rooms')
];
// this is a comment for no reason that to redeploy
export const fetchData = () => {
    return Promise.all(getPromises);
}