const Machine = require('knearest');
const chalk = require('chalk');
const wines = require("./wines.json")
const wineTest = require("./wine-test.json")


let machine= new Machine({
    k: 5,  // Optional. Defaults to 1                             
    props: [
      {
        name: 'wine',
        type: String
      },
      {
        name: 'alcohol',
        type: Number
      },
      {
        name: 'malicAcid',
        type: Number
      },
      {
        name: 'ash',
        type: Number
      },
      {
        name: 'alcalinityOfAsh',
        type: Number
      },
      {
        name: 'magnesium',
        type: Number
      },
      {
        name: 'totalPhenols',
        type: Number
      },
      {
        name: 'flavinoids',
        type: Number
      },
      {
        name: 'nonflavinodPhenols',
        type: Number
      },
      {
        name: 'proanthocyanins',
        type: Number
      },
      {
        name: 'colorIntensity',
        type: Number
      },
      {
        name: 'hue',
        type: Number
      },
      {
        name: 'OD280OD315OfDilutedWines',
        type: Number
      },
      {
        name: 'proline',
        type: Number
      }
    ],                   
    nodes: wines, // training data in wines.json (object array length 99 - trimmed down from 187)
    data: {
      store: 'memory', // TODO: create a mongo data store
    },
    verbose: false,  // defaults to false
    stringAlgorithm: 'Levenshtein'  // Optional. Defaults to 'Jaro-Winkler'
  });

// machine.guess takes a dependent variable (wine), and 
// uses the 13 independent variables here to predict the wine's type.
// the below data is the first wine object in wine-test.json, hardcoded here
  machine.guess('wine', {
    "alcohol": 14.23,
    "malicAcid": 1.71,
    "ash": 2.43,
    "alcalinityOfAsh": 15.6,
    "magnesium": 127,
    "totalPhenols": 2.8,
    "flavinoids": 3.06,
    "nonflavinodPhenols": 0.28,
    "proanthocyanins": 2.29,
    "colorIntensity": 5.64,
    "hue": 1.04,
    "OD280OD315OfDilutedWines": 3.92,
    "proline": 1065
})
    .then((result) => {
      console.log('"' + result.feature + '" type is: ' + chalk.green(result.value) + ' ('+result.elapsed / 1000+'sec)');
    });


////////////////////////////////////////////////////////////////

// below code is an attempted implementation of a 
// tensorflow.js neural network - the output of 'predict' is
// showing inaccurate predictions

////////////////////////////////////////////////////////////////

// const tf = require("@tensorflow/tfjs")
// require("@tensorflow/tfjs-node")
// const wines = require("./wines.json")
// const wineTest = require("./wine-test.json")

// // convert/setup our data
// const trainingData = tf.tensor2d(wines.map(item => [
//   item.alcohol, item.malicAcid, item.ash, item.alcalinityOfAsh, item.magnesium, item.totalPhenols, item.flavinoids, item.nonflavinodPhenols, item.proanthocyanins, item.colorIntensity, item.hue, item.OD280OD315OfDilutedWines, item.proline,
// ]))

// const outputData = tf.tensor2d(wines.map(item => [
//   item.wine === "1" ? 1 : 0,
//   item.wine === "2" ? 1 : 0,
//   item.wine === "3" ? 1 : 0,
// ]))
// const testingData = tf.tensor2d(wineTest.map(item => [
//     item.alcohol, item.malicAcid, item.ash, item.alcalinityOfAsh, item.magnesium, item.totalPhenols, item.flavinoids, item.nonflavinodPhenols, item.proanthocyanins, item.colorIntensity, item.hue, item.OD280OD315OfDilutedWines, item.proline,
// ]))

// // build neural network
// const model = tf.sequential()

// model.add(tf.layers.dense({
//   inputShape: [13],
//   activation: "sigmoid",
//   units: 14,
// }))
// model.add(tf.layers.dense({
//   inputShape: [14],
//   activation: "sigmoid",
//   units: 3,
// }))
// model.add(tf.layers.dense({
//   activation: "sigmoid",
//   units: 3,
// }))
// model.compile({
//   loss: "meanSquaredError",
//   optimizer: tf.train.adam(.06),
// })
// // train/fit our network
// // const startTime = Date.now()
// model.fit(trainingData, outputData, {epochs: 100})
//   .then((history) => {
//     // console.log(history)
//     model.predict(testingData).print()
//   })
// // test network

