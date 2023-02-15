import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const uri =
  "mongodb+srv://root:1234@cluster0.iifcrfm.mongodb.net/db_proyecto_fastify";

export const connectDb = async () => {
  try {
    const db = await mongoose.connect(uri);
    console.log("Base de datos conectada con éxito", db.connection.name);
  } catch (error) {
    console.log(
      `Ha sucedido un error al conectar con la base de datos ${error.message}`
    );
  }
};
