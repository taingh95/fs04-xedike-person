const { User } = require("../../../models/User");
const { Trip } = require("../../../models/Trip");

const createTrip = (req, res, next) => {
//   const {
//     locationFrom,
//     locationTo,
//     startTime,
//     availableSeats,
//     passengerIds,
//     fee
//   } = req.body;
  const driverId = req.user.id;
  User.findById(driverId)
    .then(driver => {
      if (!driver) return Promise.reject({ errors: "Does not exsits" });

      const trip = { ...req.body, driverId };
      const newTrip = new Trip(trip);
      return newTrip.save();
    })
    .then(trip => res.status(200).json(trip))
    .catch(err => res.status(400).json(err));
};

// const bookTrip = async (req,res,next) => {
//     const {tripId} = req.params;
    
//     const {numberOfBookingSeats} = req.body;
//     const passengerId = req.user.id;

//     const passenger = await User.findById(passengerId);
//     const trip = await Trip.findById(tripId);

//     if(!passenger) return res.status(404).json({errors: 'Passenger not found'})
//     if(!trip) return res.status(404).json({errors: 'Trip not found'})
    
//     if(numberOfBookingSeats > trip.availableSeats) return res.status(400).json({errors: 'Your booking is over limitation'})

//     trip.availableSeats -= numberOfBookingSeats;

//     trip.passengerIds.push(passengerId);
//     const sendTrip = await trip.save();
//     res.status(200).json(sendTrip);
// }

const bookTrip = (req,res,next) => {
    const {tripId} = req.params;
    const {numberOfBookingSeats} = req.body;
    const passengerId = req.user.id;

    Promise.all([
      User.findById(passengerId),
      Trip.findById(tripId)
    ])
    .then(results => {
      const passenger = results[0]
      const trip = results[1]
    if(!passenger) return Promise.reject({errors: 'Passenger not found'})
    if(!trip) return Promise.reject({errors: 'Trip not found'})
    
    if(numberOfBookingSeats > trip.availableSeats) return Promise.reject({errors: 'Your booking is over limitation'})

    trip.availableSeats -= numberOfBookingSeats;

    trip.passengerIds.push(passengerId);
    return trip.save()
    })
    .then(trip => {
      res.status(200).json(trip)
    })
    .catch(err=> console.log('err',err))
}

module.exports = {
  createTrip, bookTrip
};
