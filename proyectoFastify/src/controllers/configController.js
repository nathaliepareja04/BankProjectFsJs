import { response } from "../helpers/response.js";
import {configModel} from "../models/configModel.js";

const configCtrl = {};

configCtrl.create = async(req, reply) => {
    try {
        const newConfig = new configModel(req.body)

        await configModel.create(newConfig);
        response(reply, 201, true, newConfig, "Record created successfully");
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

configCtrl.get = async(req, reply) => {
    try {
        const configData = await configModel.find() 
        response(reply, 200, true, configData, "Request for information, accepted.");
    } catch (error) {
        response(reply, 500, false, "", error.message)
    }
}

export default configCtrl;