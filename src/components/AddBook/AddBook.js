import React, { useState } from "react";
import style from "./AddBook.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  let navigate = useNavigate();

  const [book, setBook] = useState({
    bookname: "",
    author: "",
    year: "",
    number: "",
  });

  const { bookname, author, year, number } = book;

  const [errors, setErrors] = useState({
    bookname: "",
    author: "",
    year: "",
    number: "",
  });


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [e.target.name]: e.target.value });

    if (name === "author" ) {
      const regex = /^[a-zA-Zа-яА-ЯіїєІЇЄ'-]*$/;
      if (!regex.test(value)) {
        setErrors({
          ...errors,
          [name]:
            "Поле не може містити спеціальні символи та цифри, окрім апострофа та дефіса!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setBook({ ...book, [name]: value });
      }
    } else if (name === "number") {
      const regex = /^([0-9]|[1-4][0-9])$/;
      if (value !== "" && !regex.test(value)) {
        setErrors({
          ...errors,
          [name]: "Поле має приймати значення від 0!",
        });
      } else {
        setErrors({ ...errors, [name]: "" });
        setBook({ ...book, [name]: value });
      }
    } else {
      setBook({ ...book, [name]: value });
    }

    if (name === "task") {
      setErrors({ ...errors, task: "" });
    }
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    let formValid = true;
    const newErrors = { ...errors };

    if (bookname.trim() === "") {
      newErrors.bookname = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (author.trim() === "") {
      newErrors.author = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (year.trim() === "") {
      newErrors.year = "Поле обов'язкове для заповнення!";
      formValid = false;
    }

    if (number.trim() === "") {
      newErrors.number = "Поле обов'язкове для заповнення!";
      formValid = false;
    }
    setErrors(newErrors);

    if (formValid) {
      await axios.post("https://nikalib-backend.herokuapp.com/add", book);
    navigate("/");
    }

    
  };

  return (
    <div>
      <div className={style.h1}>Додавання книжки</div>
      <form onSubmit={onSubmit} className={style.form}>
        <div>
          <div>Назва</div>
          <input
            type={"text"}
            className={style.input}
            placeholder="Введіть назву книжки"
            name="bookname"
            value={bookname}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div>
          <div className={style.label}>Автор</div>
          <input
            type={"text"}
            className={style.input}
            placeholder="Введіть прізвище та ініціали"
            name="author"
            value={author}
            onChange={(e) => onInputChange(e)}
          />
          {errors.author && (
            <div className="invalid-feedback">{errors.author}</div>
          )}
        </div>
        <div>
          <div className={style.label}>Рік видання</div>
          <input
            type={"text"}
            className={style.input}
            placeholder="Введіть рік видання книжки"
            name="year"
            value={year}
            onChange={(e) => onInputChange(e)}
          />
          {errors.year && <div className="invalid-feedback">{errors.year}</div>}
        </div>
        <div>
          <div className={style.label}>Кількість екземплярів</div>
          <input
            type={"text"}
            className={style.input}
            placeholder="Введіть кількість екземплярів"
            name="number"
            value={number}
            onChange={(e) => onInputChange(e)}
          />
          {errors.number && (
            <div className="invalid-feedback">{errors.number}</div>
          )}
        </div>
        <div className={style.btn}>
          <button className={style.button}>Додати</button>
          <button className={style.buttonCancel}>Скасувати</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
