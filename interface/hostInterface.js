const { createRoom, authRoom, addQuestionsToDb } = require("../controller/hostController");
const { getQuestions } = require("../service/triviaDb");

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        const room = await createRoom(payload)
        socket.join(room.roomId);
        socket.join(room.roomId + "_host");
        socket.emit('room', {
            action: "create",
            status: "success",
            ...room
        });
    })

    socket.on("room:set_question", async payload => {
        const auth = await authRoom(payload.room._id, payload.room.password)
        if (!auth)
            socket.emit("room", {
                action: "room:set_question",
                status: "error",
                message: "unauthorized"
            })
        else {
            // {
            //     "maxNumberOfQuestions":50,
            //     "difficulty":"easy",
            //     "categories":2 
            // }
            try {
                const quizSet = await getQuestions(payload.parameters)
                try {
                    await addQuestionsToDb(payload.room._id, quizSet)
                    socket.emit("room", {
                        action: "room:start",
                        status: "success",
                    })
                } catch (e) {
                    socket.emit("room", {
                        action: "room:start",
                        status: "error",
                        message: "Something went wrong",
                        error: e
                    })
                }
            } catch (e) {
                socket.emit("room", {
                    action: "room:start",
                    status: "error",
                    message: e
                })
            }

        }
    })

    socket.on("room:start", async payload => {
        const auth = await authRoom(payload.room._id, payload.room.password)
        if (!auth)
            socket.emit("room", {
                action: "room:start",
                status: "error",
                message: "unauthorized"
            })
    })
}