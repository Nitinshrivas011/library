import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function List() {
  const [books, setBooks] = useState([]);

  const API_URL = "http://localhost:5001/books";

  useEffect(() => {
    axios.get(API_URL).then((res) => setBooks(res.data));
  }, []);

  const handleDelete = async(id) => {
    await axios.delete(`${API_URL}/${id}`)
    setBooks(books.filter((book) => book._id !== id))
  }

  return (
    <table className="border table table-dark table-striped table-hover">
      <thead>
        <tr>
          <th> Title </th>
          <th> Author </th>
          <th> Year </th>
          <th> Actions </th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year}</td>
            <td className="d-flex justify-content-around" >
              <Link to={`/update/${book._id}`} className="btn btn-primary btn-sm">EDIT</Link>
              <button onClick={()=>{handleDelete(book._id)}} className="btn btn-danger  btn-sm">DELETE</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
