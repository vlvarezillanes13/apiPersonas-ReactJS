import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { useEffect, useState } from 'react';

function App() {
  const baseURL = "https://localhost:7202/api/personas";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [personSeleccionada, setpersonSeleccionada] = useState({
    id:'',
    rut:'',
    nombre:'',
    apellidos:'',
    edad:'',
    email:''
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setpersonSeleccionada({
        ...personSeleccionada,
        [name]: value
      });
    console.log(personSeleccionada);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async() =>{
    await axios.get(baseURL)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const peticionPost = async() =>{
    delete personSeleccionada.id;
    personSeleccionada.edad = parseInt(personSeleccionada.edad);
    await axios.post(baseURL, personSeleccionada)
    .then(response => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error => {
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    personSeleccionada.edad=parseInt(personSeleccionada.edad);
    await axios.put(baseURL+"/"+personSeleccionada.id, personSeleccionada)
    .then(response=>{
      var respuesta=response.data;
      var dataAuxiliar=data;
      dataAuxiliar.map(person => {
        if(person.id===personSeleccionada.id){
          person.rut=respuesta.rut;
          person.nombre=respuesta.nombre;
          person.apellidos=respuesta.apellidos;
          person.edad=respuesta.edad;
          person.email=respuesta.email;
        }
      });
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseURL+"/"+personSeleccionada.id)
    .then(response=>{
     setData(data.filter(person=>person.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarPersona=(gestor, caso)=>{
    setpersonSeleccionada(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }


  useEffect(() => {
    peticionGet();
  },[])

  return (
    <div className='App'>
      <br/>
      <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success mb-4">Insertar Nueva Persona</button>
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
                <button className='btn btn-primary'onClick={()=>seleccionarPersona(person, "Editar")}>Editar</button>{" "}
                <button className='btn btn-danger' onClick={()=>seleccionarPersona(person, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen = {modalInsertar}>
        <ModalHeader>Insertar Persona</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Rut</label>
            <br />
            <input type="text" className='form-control' name='rut' onChange={ handleChange }/>
            <br />
            <label>Nombre</label>
            <br />
            <input type="text" className='form-control' name='nombre' onChange={ handleChange }/>
            <br />
            <label>Apellidos</label>
            <br />
            <input type="text" className='form-control' name='apellidos' onChange={ handleChange }/>
            <br />
            <label>Edad</label>
            <br />
            <input type="number" className='form-control' name='edad' onChange={ handleChange }/>
            <br />
            <label>Email</label>
            <br />
            <input type="email" className='form-control' name='email' onChange={ handleChange }/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => peticionPost()}>Insertar</button>
          <button className='btn btn-danger' onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Persona</ModalHeader>
        <ModalBody>
            <div className='form-group'>
            <label>ID: </label>
            <br />
            <input type="text" className="form-control" readOnly value={personSeleccionada && personSeleccionada.id}/>
            <br />
            <label>Rut</label>
            <br />
            <input type="text" className='form-control' name='rut' onChange={ handleChange } value={personSeleccionada && personSeleccionada.rut}/>
            <br />
            <label>Nombre</label>
            <br />
            <input type="text" className='form-control' name='nombre' onChange={ handleChange } value={personSeleccionada && personSeleccionada.nombre}/>
            <br />
            <label>Apellidos</label>
            <br />
            <input type="text" className='form-control' name='apellidos' onChange={ handleChange }  value={personSeleccionada && personSeleccionada.apellidos}/>
            <br />
            <label>Edad</label>
            <br />
            <input type="number" className='form-control' name='edad' onChange={ handleChange }  value={personSeleccionada && personSeleccionada.edad}/>
            <br />
            <label>Email</label>
            <br />
            <input type="email" className='form-control' name='email' onChange={ handleChange }  value={personSeleccionada && personSeleccionada.email}/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => peticionPut()}>Editar</button>
          <button className='btn btn-danger' onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar a {personSeleccionada && personSeleccionada.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
