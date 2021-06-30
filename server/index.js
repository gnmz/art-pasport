const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT ||  3001;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "my-32-character-ultra-secure-and-ultra-long-secret";

const { check, validationResult } = require("express-validator");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userList = [
  {
    id: 1,
    firstName: "john",
    password: "$2a$08$M7PXSFlSLbjXxxRl5.Eo6.uWR2FMpFGgS/b9/W2MdCUr8.osLjZ2e",
    email: "john",
    role: "user",
    favoritesList: [
      {
        id: 1,
        title: `Выставочная программа Винзавод.Open`,
        location: `Центр современного искусства "Винзавод"`,
        address: "Москва, 4-й Сыромятнический переулок, 1/8",
        price: 100,
        startDate: `18.06.2021`,
        endDate: `25.07.2021`,
      },
      {
        id: 2,
        title: `Отблеск будущего`,
        location: `Ruarts Gallery`,
        startDate: `18.06.2021`,
        endDate: `29.08.2021`,
      },
    ],
    purchasedTickets: [],
  },
  {
    id: 2,
    firstName: "test",
    email: "test",
    password: "test",
    role: "company",
    favoritesList: [],
    purchasedTickets: [],
  },
  {
    id: 3,
    firstName: "user",
    email: "user",
    password: "user",
    role: "user",
    favoritesList: [],
    purchasedTickets: [],
  },
];

const companyList = [
  {
    id: 1,
    login: "vinzavod",
    password: "vinzavod",
    email: "vinzavod@index.ru",
    title: "Центр современного искусства Винзавод",
    address: "Москва, 4-й Сыромятнический переулок, 1/8",
    phone: "+7 (495) 917 17 99",
    role: "company",
    exhibitions: [
      {
        id: 1,
        title: "Выставочная программа Винзавод.Open",
        startDate: "18.06.2021",
        endDate: "25.07.2021",
        tickets: [{ id: 1, serialNumber: "", price: 100 }],
      },
    ],
  },
  {
    id: 2,
    login: "WIP",
    password: "WIP",
    email: "WIP@index.ru",
    title: "Центр современного искусства Винзавод",
    address: "Москва, Яузский бул., 11",
    phone: "",
    role: "company",
    exhibitions: [
      {
        id: 1,
        title: "Выставка Варвары Васильевой",
        startDate: "22.07.2021",
        endDate: "22.07.2021",
        tickets: [
          { id: 1, serialNumber: "", price: null },
          { id: 2, serialNumber: "", price: null },
        ],
      },
      {
        id: 2,
        title: "Мучительная реальность.Выставка Романа Якубсона",
        startDate: "17.06.2021",
        endDate: "30.06.2021",
        tickets: [
          { id: 1, serialNumber: "", price: null },
          { id: 2, serialNumber: "", price: null },
        ],
      },
    ],
  },
];

const data = [
  {
    id: 1,
    title: `Выставочная программа Винзавод.Open`,
    location: `Центр современного искусства "Винзавод"`,
    price: 100,
    startDate: `18.06.2021`,
    endDate: `25.07.2021`,
  },
  {
    id: 2,
    title: `Отблеск будущего`,
    location: `Ruarts Gallery`,
    startDate: `18.06.2021`,
    endDate: `29.08.2021`,
  },
  {
    id: 3,
    title: `"Вовремя быть". Выставка участников школы "Каскад. Проект как метод"`,
    location: `Центр Вознесенского`,
    startDate: `11.06.2021`,
    endDate: `11.07.2021`,
  },
  {
    id: 4,
    title: `Выставка Варвары Васильевой`,
    location: `WIP`,
    startDate: `22.07.2021`,
    endDate: `22.07.2021`,
  },
  {
    id: 5,
    title: `Мучительная реальность.Выставка Романа Якубсона`,
    location: `WIP`,
    startDate: `17.06.2021`,
    endDate: `30.06.2021`,
  },
  {
    id: 6,
    title: `Сахаров. Новый век`,
    location: `ГРАУНД СОЛЯНКА`,
    price: 300,
    startDate: `21.05.2021`,
    endDate: `27.06.2021`,
  },
];

app.get("/", (req, res) => {
  res.send(JSON.stringify(data));
});

app.get("/exhibitions/:id", (req, res) => {
  const id = +req.params.id;
  const exhibition = data.find((item) => item.id === id);
  res.send(JSON.stringify(exhibition));
});

app.post("/favorites", (req, res) => {
  const { userID, favorite } = req.body;
  const checkUser = userList.find((user) => user.id === userID);
  if (checkUser) {
    const { favoritesList } = checkUser;
    const addFavorite = { ...favorite, id: favoritesList.length + 1 };
    favoritesList.push(addFavorite);
  }
});

app.get("/auth", (req, res) => {
  const currentToken = req.headers.authorization.split(" ")[1];

  if (currentToken === "null") {
    return;
  }
  const decode = jwt.verify(currentToken, secretKey);
  const userID = decode.id;

  const checkUser = userList.find((user) => user.id === userID);

  const token = jwt.sign({ id: checkUser.id }, secretKey, { expiresIn: "12h" });
  res.json({ token, user: { ...checkUser } });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body.user;

  const checkUser = await userList.find((user) => user.email === email);
  const isPassValid = bcrypt.compareSync(password, checkUser.password);
  if (checkUser && isPassValid) {
    const token = jwt.sign({ id: checkUser.id }, secretKey, {
      expiresIn: "12h",
    });
    res.json({ token, user: { ...checkUser } });
  }
});

app.post(
  "/reg",
  // [
  //   check("email", "Неверный формат почты.").isEmail(),
  //   check(
  //     "password",
  //     "Пароль должен быть длинной от 3 до 12 симловов."
  //   ).isLength({ min: 3, max: 12 }),
  // ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {

    //   return res.status(404).json(errors.errors);
    // }

    const newUser = req.body;
    const checked = await userList.find((user) => user.email === newUser.email);
    if (checked) {
      res.send({ message: "Пользователь с такой почтой уже существует" });
    }

    const hashPassword = await bcrypt.hash(newUser.password, 8);
    const user = {
      id: userList.length + 1,
      firstName: newUser.firstName,
      password: hashPassword,
      email: newUser.email,
      role: "user",
      favoritesList: [],
      purchasedTickets: [],
    };

    userList.push(user);
    res.send({ message: "Пользователь успешно зарегестрирован" });
  }
);

app.get("/favorites", (req, res) => {
  const userID = +req.query.userID;
  const checkUser = userList.find((user) => user.id === userID);
  if (checkUser) {
    res.send(checkUser.favoritesList);
  }
});

app.delete("/favorites", (req, res) => {
  const userID = +req.query.userID;
  const favoriteID = +req.query.favoriteID;
  const checkUser = userList.find((user) => user.id === userID);
  if (checkUser) {
    checkUser.favoritesList = checkUser.favoritesList.filter(
      (item) => item.id !== favoriteID
    );
    res.send({ message: "Удалено из избранного" });
  }
});

app.get("/purchased-tickets", (req, res) => {});

app.post("/purchased-tickets", (req, res) => {});

app.listen(PORT, () => {
  console.log("Server is running");
});
