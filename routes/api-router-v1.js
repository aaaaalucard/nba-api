var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json("Let's do this!");
});

//Movement Tracking Information
router.get('/game/:game_id/play/:play_id');

//Catch&Shoot
router.get('/data/:season/catchshoot');

//Defense
router.get('/data/:season/defense');

//Drives
router.get('/data/:season/drives');

//Passing
router.get('/data/:season/passing');

//Possessions
router.get('/data/:season/possessions');
//Pull-up Shooting
router.get('/data/:season/pullupshooting');

//Rebounding
router.get('/data/:season/rebounding');

//Efficiency
router.get('/data/:season/efficiency');

//Speed
router.get('/data/:season/speed');

module.exports = router;
