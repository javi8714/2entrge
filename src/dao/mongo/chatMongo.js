
import chatModel from "../models/chat.models.js"

export default class MessagesManager {
    getMessages = async () => {
      try {
        return await chatModel.find().lean().exec();
      } catch (error) {
        return error;
      }
    }
  
    createMessage = async (message) => {
      try {
        return await chatModel.create(message);
      } catch (error) {
        return error;
      }
    }
  }