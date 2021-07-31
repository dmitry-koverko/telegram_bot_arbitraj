var firebase = require("firebase");
var User = require('./model/User');
const firebaseConfig = {
  apiKey: "AIzaSyBbQwUAj1rzL_wH307MSW7f7-ub_9x4BDM",
  authDomain: "testnaming-d9014.firebaseapp.com",
  databaseURL: "https://testnaming-d9014-default-rtdb.firebaseio.com",
  projectId: "testnaming-d9014",
  storageBucket: "testnaming-d9014.appspot.com",
  messagingSenderId: "670227042256",
  appId: "1:670227042256:web:744022faaf9ed28c9cb3d5",
  measurementId: "G-1EWFE37SQJ"
};
firebase.initializeApp(firebaseConfig);
var refUsers = firebase.database().ref("users");
var refApps = firebase.database().ref("apps");
module.exports.createUser = async (uid, uname) => {
  console.log('start create user');
  console.log(uid);
  console.log(uname);

  var user = new User(uid, uname, makeid(15), 0)
  console.log(user);
  var errors = false
  await refUsers.child("/" + uid).set(user, (error) => {
      if (error) {
        console.log('Data could not be saved.' + error);
        errors =  true
      } else {
        errors =  false
      }
    });

    return errors

  }

function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
   charactersLength));
     }
     return result;
  }



  module.exports.getAllUsers = async () => {
    await refUsers.once('value').then((snapshot)=>{
          result = [];
          snapshot.forEach(function(usersSnapshot) {
              var value = usersSnapshot.val();
              var user = new User(value.uid, value.uname, value.key, value.balance)
              result.push(user);
          });
          console.log(result);
      })
  }

  module.exports.getUserById = async (uid) => {
    var result = null
    await refUsers.child("/" + uid).once('value').then((snapshot)=>{
          var value = snapshot.val();
          if(value != null) result = new User(value.uid, value.uname, value.key, value.balance)
      })
   return result
  }

 module.exports.getUserBalanceById = async (uid) => {
    var result = 0
    await refUsers.child("/" + uid).once('value').then((snapshot)=>{
          var value = snapshot.val();
          if(value != null) result = value.balance
      })
   return result
  }

  module.exports.getAllApps = async () => {
    result = [];
    await refApps.once('value').then((snapshot)=>{
          snapshot.forEach(function(appsSnapshot) {
              var app = appsSnapshot.val();
              result.push(user);
          });
      })
    return result;
  }

  module.exports.getAllAppsCategory = async () => {
    // 1- dating, 2- gembling, 3- betting, 4 - crypto, 5 -sweepstakes
    var dating = 0;
    var gembling = 0;
    var betting = 0;
    var crypto = 0;
    var sweepstakes = 0;
    await refApps.once('value').then((snapshot)=>{
          snapshot.forEach(function(appsSnapshot) {
              var app = appsSnapshot.val();
              switch (app.type) {
                case 1:
                  dating ++
                  break;
                case 2:
                  gembling ++
                  break;
                case 3:
                  betting ++
                  break;
                case 4:
                  crypto ++
                  break;
                case 5:
                  sweepstakes ++
                  break;
                default:

              }
          });
      })
    var response = {
      dating_count: dating,
      gembling_count: gembling,
      betting_count: betting,
      crypto_count: crypto,
      sweepstakes_count: sweepstakes,
    }
    return response;
  }

  module.exports.getListAppByCategory = async (type) => {
    // 1- dating, 2- gembling, 3- betting, 4 - crypto, 5 -sweepstakes
    result = [];
    await refApps.once('value').then((snapshot)=>{
          snapshot.forEach(function(appsSnapshot) {
              var app = appsSnapshot.val();
              if(app.type == type) result.push(app)
          });
      })

    return result;
  }
