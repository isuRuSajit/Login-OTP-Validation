import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
  let myPromise = new Promise(async function (myResolve, myReject) {
    console.log("before MongoMemoryServer create");
    let mongo = await MongoMemoryServer.create();
    if (mongo) {
      myResolve(mongo);
    } else {
      myReject(mongo);
    }
  });
  myPromise
    .then(async function (mongo) {
      console.log(mongo);
      await mongo.stop();
    })
    .catch(function (error) {
      console.log(error);
    });
}

export default connect;
