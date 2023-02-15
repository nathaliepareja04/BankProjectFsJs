import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteImg = async(nameImage) => {
    try {
        await fs.unlink(path.resolve(__dirname, "../storage/imgs", nameImage))
    } catch (error) {
        console.log("An error has occurred in the function deleteImg", error.message)
    }
}