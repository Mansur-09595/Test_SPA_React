import React, { useState } from "react";
import { useSelector } from "react-redux";
import search  from '../../images/search.png'
import Post from "../Post/Post";
import TableRow from "../Table/TableRow";

const Table = () => {
  const allPosts = useSelector((state) => state.posts);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения значения поиска
  const [sortField, setSortField] = useState(""); // Состояние для хранения текущего поля сортировки
  const [sortOrder, setSortOrder] = useState("asc"); // Состояние для хранения текущего порядка сортировки

  // Функция для фильтрации записей на основе значения поиска
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Рассчитываем индексы для отображения текущей страницы
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

  // Обработчик для переключения на предыдущую страницу
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Обработчик для переключения на следующую страницу
  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredPosts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Обработчик для обновления значения поиска
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Сбросить текущую страницу при новом поиске
  };

  // Функция для генерации навигации с номерами страниц
  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pageNumber ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </span>
      );
    }

    return pageNumbers;
  };

  // Обработчик для сортировки
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Функция для сортировки записей
  const sortedPosts = [...currentPosts].sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="search">
        <input
          className="input-search" type="text" value={searchTerm} onChange={handleSearch} placeholder="Поиск" />
        <img className="img-search" src={search} alt="Поиск"/>
      </div>
      <table>
        <TableRow handleSort={handleSort} sortField={sortField} sortOrder={sortOrder}/>
        <tbody>
          {sortedPosts.map((post) => (
            <Post key={post.id} id={post.id} title={post.title} body={post.body} />
          ))}
        </tbody>
      </table>
      <div className="navigation">
        <button className="buttons" onClick={goToPreviousPage}>Назад</button>
        <div className="pages">
          {renderPageNumbers()} {/* Выводим навигацию с номерами страниц */}
        </div>
        <button className="buttons" onClick={goToNextPage}>Далее</button>
      </div>
    </>
  );
};

export default Table;
