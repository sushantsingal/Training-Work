const bcrypt = require("bcrypt");

const myPlaintextPassword = "Test@1234";

bcrypt.genSalt(saltRounds, function(err,salt) {
    bcrypt.hash(myPlaintextPassword,salt, function(err, hash) {
        console.log(hash);
    });
});