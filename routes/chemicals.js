const express = require("express");
const router = express.Router();
const {Chemicals} = require("../db")
const { Sequelize } = require("sequelize");

const Op = Sequelize.Op;
// GETS
/// routes to grab and process the table results to iuptut just an array of values to be based to front end so i can then chart
// results will be row objects then need to map through that array so i can get the values of the chemicals that i want to see 


// @route   GET /chemicals/pH
// @desc    Add new review
// @access  Private
router.post("/", async (req, res) => {
    

    // have it be like query params for the time view 
    // can view day week month etc 
    const { poolID,startDate,endDate } = req.body;
    console.log(poolID,startDate,endDate)
       // presets are 12h 24h 1w 1m 
    // start date is today and week will default to going 7 days back 
    // can also do there own query of dates 
    
    
    
    // This one is for main chems 
    // need to parse date object to extract time and date 
        let reports = await Chemicals.findAll({
        where:{
            poolID,
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        },
        raw: true,
        attributes: { 
            exclude: ['Alkalinity','Calcium','Cynuaric']
         }
        // / get one week by BETWEEN and go by todays date 
     
       
    
    })


    // 5n prob can refactor ?

    let pH = reports.map(x => x.pH)
    let cL = reports.map(x => x.Chlorine)
    let Tempature = reports.map(x => x.Tempature)
    let timestamps = reports.map(x =>x.createdAt)

    let chems = {
        pH,
        cL,
        Tempature,
        timestamps
    }

    res.send(chems)
    
});


// get all the chems in date range then go thorugh eacah and take out chem i want
// one big all for all chems in range 


/// POSTS
// on form insert send chem data to database and then we can



module.exports = router;