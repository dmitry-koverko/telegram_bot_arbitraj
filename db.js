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

module.exports.createUser = async (uid, uname) => {
  var ref = firebase.database().ref("users/uid");
  var user = User(uid, uname, makeid(10))
  console.log(user);
  await ref.set(user)
        .then(function() {
          return ref.once("value");
        })
        .then(function(snapshot) {
          return snapshot.val();
        });
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
/*module.exports.getSettings = async (request, response, next) => {
  const currentLocale = response.locals.currentLocale
  const { settings } = response.locals

  const errorList = await generateErrorList(settings, currentLocale)

  // If no errors detected, update app to use new settings
  if (!errorList.length) {
    applyUpdatedSettings(request, response, settings)
  }

  const errors = generateErrorDictionary(errorList)

  await renderSettings(response, {
    settings,
    errors,
    hasErrors: errorList.length > 0,
    success: isCustomCredentials(settings) && errorList.length === 0
  })
}*/
