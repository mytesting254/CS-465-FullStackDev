const mongoose = require('mongoose'); //.set('debug', true);
const { get } = require('request');
const model = mongoose.model('trips');
const User = mongoose.model('users');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips){
                return res
                    .status(404)
                    .json({"message" : "trip not found"});
            } else if (err){
                return res
                    .status(404)
                    .json(err);
            } else{
                return res  
                    .status(200)
                    .json(trips);
            }
        });
};

// GET: /trips/:tripCode - return a signle trip
const tripsFindCode = async (req, res) => {
    model
        .find({'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip){
                return res
                    .status(404)
                    .json({ "message" : "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip)
            }
        });
};

// Update a trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res, username) => {
            try {
            const trip = model.findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
                },
                { new: true }
            );
        
            if (!trip) {
                return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
                });
            }
        
            res.send(trip);
            } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                message: "Trip not found with code " + req.params.tripCode
                });
            }
        
            return res.status(500).json(err);
            }
        });
  };
  

// add a new trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (req, res, username) => {
    // use try catch to handle errors
        try {
            const trip = model.create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            });
            return res
                .status(201)
                .json(trip);
        } catch (err) {
            return res
                .status(400)
                .json(err);
        }
    });
};

// DELETE: /trips/:tripCode - delete a single trip
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, (req, res, username) => {
    // use try catch to handle errors
        const { tripCode } = req.params;

        if (tripCode) {
            try {
                const trip = model.findOneAndDelete({ 'code': tripCode });
                if (!trip) {
                    return res
                        .status(404)
                        .json({ "message": "trip not found" });
                }
                return res
                    .status(200)
                    .json(trip);
            }   catch (err) {
                return res
                    .status(400)
                    .json(err);
            }
        } else {
            return res
                .status(404)
                .json({ "message": "No tripCode" });
        }
    });
}; 

// get the user from the request
const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email : req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ "message": "User not found" });
                } else if (err) {
                    console.log(err);
                    return res
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};