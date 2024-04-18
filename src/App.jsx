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
      <NavBar />
        <hr />

        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/create-real-estate" element={<CreateRealState/>} />
            <Route path="/view-real-estate" element={<ViewRealEstates/>} />

        </Routes>
    </>
  )
}

export default App
