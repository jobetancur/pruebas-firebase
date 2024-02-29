import { useState } from 'react';
import './App.css'
import { createRealEstate, getRealEstates } from './firebase/firebase'

const initialData = {
  name: '',
  sector: '',
  price: '',
  area: '',
  rooms: '',
  bathrooms: '',
  parking: '',
  address: '',
  type: '',
  images: []
}

function App() {

  const [ realEstate, setRealEstate ] = useState(initialData);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    createRealEstate(realEstate);
  }

  const handleNameChange = (e) => {
    setRealEstate({ ...realEstate, name: e.target.value });
  }

  const handleSectorChange = (e) => {
    setRealEstate({ ...realEstate, sector: e.target.value });
  }

  const handlePriceChange = (e) => {
    setRealEstate({ ...realEstate, price: e.target.value });
  }

  const handleAreaChange = (e) => {
    setRealEstate({ ...realEstate, area: e.target.value });
  }

  const handleRoomsChange = (e) => {
    setRealEstate({ ...realEstate, rooms: e.target.value });
  }

  const handleBathroomsChange = (e) => {
    setRealEstate({ ...realEstate, bathrooms: e.target.value });
  }

  const handleParkingChange = (e) => {
    setRealEstate({ ...realEstate, parking: e.target.value });
  }

  const handleAddressChange = (e) => {
    setRealEstate({ ...realEstate, address: e.target.value });
  }

  const handleTypeChange = (e) => {
    setRealEstate({ ...realEstate, type: e.target.value });
  }

  const handleImagesChange = (e) => {
    // Obtén las imágenes seleccionadas por el usuario
    const files = e.target.files;
    
    // Crea una copia del arreglo de imágenes actual
    const existingImages = [...realEstate.images];
    
    // Agrega las nuevas imágenes al arreglo existente
    for (let i = 0; i < files.length; i++) {
      existingImages.push(files[i]);
    }

    // Actualiza el estado con las imágenes combinadas
    setRealEstate({ ...realEstate, images: existingImages });
  }

  getRealEstates();

  return (
    <>
      {/* Crear nueva propiedad */}
      <form className='form' onSubmit={ handleSubmit } >
        <label>
          Nombre:
          <input type="text" name="name" onChange={ handleNameChange } />
        </label>
        <label>
          Sector de la vivienda:
          <input type="text" name="sector" onChange={ handleSectorChange } />
        </label>
        <label>
          Precio:
          <input type="text" name="price" onChange={ handlePriceChange } />
        </label>
        <label>
          Área:
          <input type="text" name="area" onChange={ handleAreaChange } />
        </label>
        <label>
          Habitaciones:
          <input type="text" name="rooms" onChange={ handleRoomsChange } />
        </label>
        <label>
          Baños:
          <input type="text" name="bathrooms" onChange={ handleBathroomsChange } />
        </label>
        <label>
          Parqueadero:
          <input type="text" name="parking" onChange={ handleParkingChange } />
        </label>
        <label>
          Dirección:
          <input type="text" name="address" onChange={ handleAddressChange } />
        </label>
        <label>
          Tipo de vivienda:
        </label>
        <select name="" onChange={ handleTypeChange }>
          <option value="">Seleccione</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="lote">Lote</option>
        </select>
        {/* Cargar imagenes */}
        <p>Cargar imagenes:</p>
        <input className='img_input' type="file" name="file" id="file" onChange={ handleImagesChange } />
        <input type="submit" value="Enviar" />
      </form>
    </>
  )
}

export default App
