var method = User.prototype;

function User(uid, uname, key) {
  this.uid = uid;
  this.uname = uname;
  this.key = key
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


 module.exports = User;
