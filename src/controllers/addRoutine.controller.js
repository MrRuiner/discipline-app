import fs from "fs";
import path from "path";
import { __dirname } from "../index.js";

export const getRoutine = (req, res) => {
  const filePath = path.resolve(__dirname, "./src/data/data.json");

  fs.readFile(filePath, (error, data) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка на стороне сервера." });
    }

    try {
      const jsonData = JSON.parse(data);
      res.render("main", { routines: jsonData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Ошибка при получении данных." });
    }
  });
};

export const addRoutine = (req, res) => {
  const filePath = path.resolve(__dirname, "./src/data/data.json");
  const { deal, time } = req.body;

  // Читаем существующие данные
  fs.readFile(filePath, 'utf8', (error, fileData) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка на стороне сервера." });
    }

    let data = [];
    try {
      data = JSON.parse(fileData);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Ошибка при обработке данных." });
    }

    // Добавляем новую задачу
    const newRoutine = { deal, time };
    data.push(newRoutine);

    // Записываем обновленные данные в файл
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Ошибка при записи данных." });
      }
      res.redirect('/');
    });
  });
};
