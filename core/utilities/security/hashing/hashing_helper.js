const bcrypt = require("bcrypt");

class HashingHelper{

    async CreatePasswordHash(password, saltRounds){
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        return {salt: salt, hash: hash};
    }

    async VerifyPasswordHash(password, hash){
        const compareResult = await bcrypt.compare(password, hash);
        return compareResult;
    }
}

module.exports = HashingHelper;