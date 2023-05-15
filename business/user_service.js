const AuthDal = require("../data_access/auth_dal");

class UserService {
    constructor() {
        this.dal = new AuthDal();
    }

    async getUserByMail(email) {
        var result = await this.dal.getUserByMail(email);
        return result;
    }
}

module.exports = UserService;