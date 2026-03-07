const crypto = require('crypto');
const fs = require('fs');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

//Save the private key to a file
fs.writeFileSync('privateKey.pem', privateKey);
console.log('Private Key:', privateKey);

//Save the public key to a file
fs.writeFileSync('publicKey.pem', publicKey);
console.log('Public Key:', publicKey);