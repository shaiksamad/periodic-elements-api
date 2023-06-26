const mongoose = require("mongoose");
require('dotenv').config()


class DB{
    
    async connect() {
            mongoose.connect(process.env.MONGOOSE_DB_URL)
            .catch(err=>console.log("Error: DB", err.message))
    }
}

module.exports = DB
