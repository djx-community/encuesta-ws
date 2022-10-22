const mongoose = require("mongoose");
const { roomSchema, roomQuestionSchema } = require("../schema/schemas");
const { collections } = require("./constant");

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
    Room: mongoose.model(collections.Room, roomSchema),
    RoomQuestions: mongoose.model(collections.RoomQuestions, roomQuestionSchema)
}



