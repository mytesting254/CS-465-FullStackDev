const mongoose = require('mongoose'); //.set('debug', true);
const model = mongoose.model('trips');

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
    model
        .findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true }
        .then(trip => {
            if (!trip) {  // trip not found
                return res
                    .status(404)
                    .send({
                        message: "trip not found with code " + req.params.tripCode
                    });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500)
                .json(err);
        }));
};

// add a new trip
const tripsAddTrip = async (req, res) => {
    model
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, (err, trip) => {
            if (err) {
                return res
                    .status(400) // 400 Bad Request, invalid data
                    .json(err);
            } else {
                return res
                    .status(201) // 201 Created
                    .json(trip);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
};