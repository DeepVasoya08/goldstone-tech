import { createObjectCsvWriter } from "csv-writer";
import dotenv from "dotenv";
import expres from "express";
import fs from "fs";
import fetch from "node-fetch";

import User from "../models/User.js";

dotenv.config();

const router = expres.Router();

router.get("/api/users", async (req, res) => {
  try {
    const usersData = await fetch("https://gorest.co.in/public/v2/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    const parsedData = await usersData.json();
    const operations = parsedData.map((user) => ({
      insertOne: {
        document: user,
      },
    }));
    await User.bulkWrite(operations).catch((err) => {
      throw new Error(err);
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findById(id);
    if (!user) {
      throw new Error(`User with id: ${id} not found!`);
    }
    console.log(req.body);
    await user.updateOne(req.body);

    res.status(200).send("OK");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/export", async (req, res) => {
  const users = await User.find();
  const csvPath = "./data.csv";
  const csvWriter = createObjectCsvWriter({
    path: csvPath,
    header: [
      { id: "_id", title: "_id" },
      { id: "email", title: "email" },
      { id: "gender", title: "gender" },
      { id: "status", title: "status" },
      { id: "name", title: "name" },
      { id: "createdAt", title: "createdAt" },
      { id: "updatedAt", title: "updatedAt" },
    ],
  });

  await csvWriter
    .writeRecords(users)
    .then(() => {
      res.download(csvPath, "data.csv", (err) => {
        if (err) {
          res.status(500).send(err);
        }
        fs.unlink(csvPath, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    })
    .catch((err) => {
      res.status(500).send(`error while writing csv file ${err.message}`);
    });
});

export default router;
