// const CryptoJS = require('crypto-js');
// const mongoose = require('mongoose');

//     let text = {
//         "phone_number":"987654321",
//         "pan":"asdf1234n",
//         "customer_name":"Raghanv",
//        "dob":"2000/09/21"
//        }
//     let  key  = "9513574562580799"
//      let iv   = "7648513279456184"

// key = CryptoJS.enc.Base64.parse(key)
// iv  = CryptoJS.enc.Base64.parse(iv)

// let crypted = CryptoJS.AES.encrypt(JSON.stringify(text), key, { iv: iv }).toString();
// console.log(crypted,'crypted')


// // const indianCitiesDatabase = require('indian-cities-database');
// // var cities = indianCitiesDatabase.cities.city;
// // console.log(cities,'cities')


// // const indianCitiesDatabase = require('indian-cities-database');
// // var citySchema = indianCitiesDatabase.citySchema;
// // citySchema.set('collection', 'my_cities_collection');

// // // create model to query
// // var myCity = mongoose.model('myCity', citySchema);
// // let a = myCity.find({}, callback);

// const cities = require('all-the-cities');
 
// let a = cities.filter(city => city.name.match('mumbai'));
// console.log(a,'a');

// const { getAllCities } = require('ugama');

// getAllCities().then(a => console.log(a))

// const indianCitiesDatabase = require('indian-cities-database');
// var cities = indianCitiesDatabase.cities;
// console.log(cities,'aaaa')


const indianCitiesDatabase = require('indian-cities-database');
var cities = indianCitiesDatabase.cities;
let a = cities.filter(a => a.city.match('Che'));
console.log(a, 'citylist')


var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));