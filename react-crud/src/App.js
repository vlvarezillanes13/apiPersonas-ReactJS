import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';

function App() {
  const baseURL = "https://localhost:7202/api/personas";
  const [data, setData] = useState([]);

  const petionGet = async() =>{
    await axios.get(baseURL)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(data)
      console.log(error);
    })
  }

  useEffect(() => {
    petionGet();
  },[])

  return (
    <div className='App'>
      <table className='table table-bordered'>
        <thead>
          <th>ID</th>
          <th>Rut</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Email</th>
          <th>Acciones</th>
        </thead>
        <tbody>
          {data.map(person => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.rut}</td>
              <td>{person.nombre}</td>
              <td>{person.apellidos}</td>
              <td>{person.edad}</td>
              <td>{person.email}</td>
              <td>
                <button className='btn btn-primary'>Editar</button>
                <button className='btn btn-danger'>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
