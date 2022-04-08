class SecretKey {
    create() {
        const secureRandom = require('secure-random');
        let bytes = secureRandom.randomArray(256);

        return bytes.map((byte) => {
            return byte.toString(16);
        }).join('');
    }
}

module.exports = SecretKey;