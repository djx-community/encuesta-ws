const { createRoom } = require("../controller/hostController");
const { getQuestions } = require("../service/triviaDb");

module.exports = (io, socket) => {
    socket.on("room:create", async (payload) => {
        try {
            const room = await createRoom(payload)
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
    socket.on("room:set_question", async payload => {
        const auth = await authRoom(payload.room._id, payload.room.password)
        if(!auth)
        socket.emit("room", {
            action: "room:set_question",
            status: "error",
            message: "unauthorized"

        })
        else{
            try{
                const quizSet = await getQuestions(payload.parameters)
                try{
                    await addQuestionsToDb(payload.room._id,quizSet)
                    socket.emit("room", {
                        action:"room:set_question",
                        status:"success",
                    })
                }catch(e) {
                    socket.emit("room", {
                        action: "room:set_question",
                        status: "error",
                        message: "Something went wrong",
                        error:e
                    })
                }
            }catch (e) {
                socket.emit("room", {
                    action: "room:set_question",
                    status: "error",
                    message:e
                })
            }
        }
    })
}
