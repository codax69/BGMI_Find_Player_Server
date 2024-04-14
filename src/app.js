import express from "express";
import { User } from "./models/user.model.js";
import session from "express-session";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "good session",
  })
);

app.use(express.json());

app.get("/api/users", async (req, res) => {
  // Delete all users
  await User.deleteMany({});

  const newUsers = [
    {
      username: "player2",
      fullName: "Jane Smith",
      dateOfBirth: "1995-05-05",
      inGameRole: "igl",
      achievement: "2nd place in ABC tournament",
      device: "Samsung Galaxy S10",
      headShotRate: "10",
      totalMatch: "25",
      top10: "8",
      wins: "6",
      KDRating: "3",
    },
    {
      username: "player2",
      fullName: "Jane Smith",
      dateOfBirth: "1995-05-05",
      inGameRole: "igl",
      achievement: "2nd place in ABC tournament",
      device: "Samsung Galaxy S10",
      headShotRate: "20",
      totalMatch: "40",
      op10: "20",
      ins: "5",
      KDRating: "6",
    },
    {
      username: "player3",
      fullName: "Michael Johnson",
      dateOfBirth: "1988-09-10",
      inGameRole: "supporter",
      achievement: "3rd place in DEF tournament",
      device: "OnePlus 7 Pro",
      headShotRate: "0.45",
      totalMatch: "150",
      top10: "120",
      wins: "90",
      KDRating: "3.5",
    },
    {
      username: "player14",
      fullName: "Emily Wilson",
      dateOfBirth: "1992-03-15",
      inGameRole: "assaulter",
      achievement: "1st place in GHI tournament",
      device: "Google Pixel 4",
      headShotRate: "0.32",
      totalMatch: "75",
      top10: "50",
      wins: "30",
      KDRating: "2.2",
    },
    {
      username: "player5",
      fullName: "Robert Brown",
      dateOfBirth: "1993-07-20",
      inGameRole: "igl",
      achievement: "2nd place in JKL tournament",
      device: "iPhone 11",
      headShotRate: "0.60",
      totalMatch: "100",
      top10: "80",
      wins: "60",
      KDRating: "4.0",
    },
    {
      username: "player6",
      fullName: "Jessica Davis",
      dateOfBirth: "1991-12-25",
      inGameRole: "supporter",
      achievement: "3rd place in MNO tournament",
      device: "Samsung Galaxy Note 10",
      headShotRate: "0.25",
      totalMatch: "50",
      top10: "40",
      wins: "20",
      KDRating: "1.5",
    },
    {
      username: "player7",
      fullName: "David Taylor",
      dateOfBirth: "1989-06-30",
      inGameRole: "assaulter",
      achievement: "1st place in PQR tournament",
      device: "OnePlus 7T",
      headShotRate: "0.70",
      totalMatch: "200",
      top10: "160",
      wins: "120",
      KDRating: "5.0",
    },
    {
      username: "player8",
      fullName: "Sarah Anderson",
      dateOfBirth: "1994-02-05",
      inGameRole: "igl",
      achievement: "2nd place in STU tournament",
      device: "iPhone SE",
      headShotRate: "0.20",
      totalMatch: "50",
      top10: "40",
      wins: "30",
      KDRating: "2.0",
    },
    {
      username: "player9",
      fullName: "Daniel Martinez",
      dateOfBirth: "1996-08-11",
      inGameRole: "supporter",
      achievement: "3rd place in VWX tournament",
      device: "Samsung Galaxy S20",
      headShotRate: "0.65",
      totalMatch: "175",
      top10: "140",
      wins: "100",
      KDRating: "4.8",
    },
    {
      username: "player10",
      fullName: "Olivia Thompson",
      dateOfBirth: "1997-04-16",
      inGameRole: "assaulter",
      achievement: "1st place in YZA tournament",
      device: "Google Pixel 5",
      headShotRate: "0.35",
      totalMatch: "80",
      top10: "60",
      wins: "40",
      KDRating: "2.5",
    },
  ];

  try {
    const users = newUsers.map((data) => new User(data));
    const savedUsers = await Promise.all(users.map((user) => user.save()));
    res.status(201).json({
      message: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save users" });
  }
});

app.get("/api/players", async (req, res) => {
  try {
    let query = {};

    if (req.query.username) {
      query.username = req.query.username;
    }
    
    if (req.query.fullName) {
      query.fullName = req.query.fullName;
    }
    if(req.query.inGameRole){
      query.inGameRole = req.query.inGameRole
    }

    const players = await User.find(query);
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch players" });
  }
});
app.get("/api/players/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const player = await User.findOne({ username: username });
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch player" });
  }
});


export { app };
