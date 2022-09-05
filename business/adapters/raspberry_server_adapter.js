const axios = require("axios").default;
class RaspBerryServerAdapter {
    async isRunning(ip = "192.168.137.43") {
        try {
            const response = await axios("http://" + ip + ":3000");
            // const response = await axios("http://localhost:4000");
            return response.status;
        } catch (err) {
            // res.status(500).json({ message: err });
            // console.log(err);
        }
    }
}
module.exports = RaspBerryServerAdapter;