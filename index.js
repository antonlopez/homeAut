var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var axios = require('axios');

gpio.setup(7, gpio.DIR_OUT);




app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){ 
 	res.render('index',{status:"Press Button To change Status of Led !!"});
});

app.post('/led/on', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Written True to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "Cool!!Led is On"});
    });

});


app.post('/led/off', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Written False to pin');
	console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "Ohh!! Led is Off"});
    });

});

app.post('/led/nodeOn', function(req, res){

axios.post('http://192.168.0.9/LED=ON');

});

app.post('/led/nodeOFF', function(req, res){

axios.post('http://192.168.0.9/LED=OFF');

});







app.listen(3000, function () {
  console.log('Simple LED Control Server Started on Port: 3000!')
})
