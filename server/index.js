const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const data = [
  {
    id: 1,
    title: `Выставочная программа Винзавод.Open`,
    location: `Центр современного искусства "Винзавод"`,
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
    startDate: `21.05.2021`,
    endDate: `27.06.2021`,
  },
];

app.get("/", (req, res) => {
  res.send(JSON.stringify(data));
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running");
});
