const messageModel = require('../model/MessageModel')

const addMessage = async(req, res, next) => {
    try{
        const {message, from, to} = req.body;
        const data = await messageModel.create(
            {
                message : {text:message},
                users : [from, to],
                sender : from
            }
        )
        console.log("add message controller !");

        if(data){
            return res.json({message : "Message added successfully to DB"})
        }
        return res.json({message : "Failed to add message to DB"})
    }
    catch(er){
        next(er);
    }
}

const getAllMessages = async(req, res, next) => {

}

module.exports = {addMessage, getAllMessages}