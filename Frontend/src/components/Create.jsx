import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [formData, setFormData] = useState({
    title : "",
    author : "",
    year : ""
  })
  const navigate = useNavigate()

  const handleData = async(e) => {
    e.preventDefault();
    await axios.post("https://library-prd4.onrender.com/books", formData)
    navigate("/")
  };
  return (
    <>
      <h2> - ADD NEW BOOK - </h2>
      <form onSubmit={handleData}>
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
            <tr>
              <td>
                <input
                  placeholder="Enter book titile"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title : e.target.value})}
                  required
                />
              </td>
              <td>
                <input
                  placeholder="Enter book author"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author : e.target.value})}
                  required
                />
              </td>
              <td>
                <input
                  placeholder="Enter book year"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year : e.target.value})}
                  required
                />
              </td>
              <td className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm">ADD</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}
