class hashMessage {
    hash;
    createHMAC(key, message) {
        const crypto = require('crypto');
        const hash = crypto.createHmac('sha3-256', key).update(message);
        this.hash = hash.digest('hex');
    }
};

module.exports = hashMessage;