const hostController = require("../controller/hostController");
const triviaDb = require("../service/triviaDb");

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        try {
            const room = await hostController.createRoom(payload)
            socket.join(room._id);
            socket.join(room._id + "_host");
            socket.emit('room', {
                action: "room:create",
                status: "success",
                ...room
            });
        } catch (e) {
            socket.emit('room', {
                action: "room:create",
                status: "success",
                message: "Something went wrong"
            });
        }
    })
    socket.on("room:set_question", async (payload) => {
        try {
            const room = await hostController.authRoom(payload.room._id, payload.room.password)
            const quizSet = await triviaDb.getQuestions(payload.parameters)
            await hostController.addQuestionsToDb(room._id, quizSet)
            socket.emit("room", {
                action: "room:set_question",
                status: "success",
            })
        } catch (e) {
            let msg = "Something went wrong";
            if (typeof e === "string") msg = e
            socket.emit("room", {
                action: "room:set_question",
                status: "error",
                message: msg,
                error: e
            })
        }
    })
}
