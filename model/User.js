var method = User.prototype;

function User(uid, uname, key) {
  this.uid = uid;
  this.uname = uname;
  this.key = key
  this.balance = 0
}

function User(uid, uname, key, balance) {
  this.uid = uid;
  this.uname = uname;
  this.key = key
  this.balance = balance
}

  method.getUid = function() {
    return this.uid;
  }

  method.getUname = function() {
    return this.uname;
  }

  method.getKey = function() {
    return this.key;
  }

  method.getBalance = function() {
    return this.balance;
  }


 module.exports = User;
