import {React, useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export default function Update() {
  const {id} = useParams()
  const navigate = useNavigate()
  const API_URL = "https://library-prd4.onrender.com/books"
  const [formData, setFormData] = useState({
    title : "",
    author : "",
    year : ""
  })

  useEffect(()=>{
    axios.get(`${API_URL}/${id}`)
      .then(res=> setFormData(res.data))
  },[id])

  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.put(`${API_URL}/${id}`, formData)
    navigate("/")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
                <button className="btn btn-warning btn-sm">UPDATE</button>
              </td>
            </tr>
          </tbody>
    </table>
      </form>
    </div>
  )
}
