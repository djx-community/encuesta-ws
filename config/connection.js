const mongoose = require("mongoose");
const { roomSchema } = require("../schema/schemas");

module.exports = {
    connect: async (done) => {
        try {
            await mongoose
                .connect(process.env.DB_URI)
            done()
        } catch (err) {
            console.log(err.message)
        }
    },
    Room: mongoose.model('Room', roomSchema)
}



