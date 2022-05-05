import { MongoClient, Db } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://root:khaled12@bks-app-v1.g8wlh.mongodb.net"
);

export let db: Db;

export const connect = async (dbName: string) => {
  try {
    const conn = await client.connect();
    db = conn.db(dbName);
    // eslint-disable-next-line no-console
    //console.log("connected to db ! ..");
    return client;
  } catch (e) {
    throw new Error(`[Error]: ${e.message}`);
  }
};
