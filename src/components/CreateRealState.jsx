import { useState } from "react";
import { createRealEstate } from "../firebase/firebase";
import "../App.css";

const initialData = {
  price: "",
  offer: "",
  city: "",
  sector: "",
  type: "",
  area: "",
  rooms: "",
  bathrooms: "",
  parking: "",
  address: "",
  status: "",
  furnished: "",
  age: "",
  exterior: [],  
  additionalAmenities: [],  
  images: [],
};

export const CreateRealState = () => {
  const [realEstate, setRealEstate] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    createRealEstate(realEstate);
  };

  const handleCityChange = (e) => {
    setRealEstate({ ...realEstate, city: (e.target.value).toLowerCase() });
  };

  const handleSectorChange = (e) => {
    setRealEstate({ ...realEstate, sector: (e.target.value).toLowerCase() });
  };

  const handlePriceChange = (e) => {
    setRealEstate({ ...realEstate, price: e.target.value });
  };

  const handleAreaChange = (e) => {
    setRealEstate({ ...realEstate, area: e.target.value });
  };

  const handleRoomsChange = (e) => {
    setRealEstate({ ...realEstate, rooms: e.target.value });
  };

  const handleBathroomsChange = (e) => {
    setRealEstate({ ...realEstate, bathrooms: e.target.value });
  };

  const handleParkingChange = (e) => {
    setRealEstate({ ...realEstate, parking: e.target.value });
  };

  const handleAddressChange = (e) => {
    setRealEstate({ ...realEstate, address: e.target.value });
  };

  const handleTypeChange = (e) => {
    setRealEstate({ ...realEstate, type: e.target.value });
  };

  const handleStatusChange = (e) => {
    setRealEstate({ ...realEstate, status: e.target.value });
  };

  const handleFurnishedChange = (e) => {
    setRealEstate({ ...realEstate, furnished: e.target.value });
  };

  const handleAgeChange = (e) => {
    setRealEstate({ ...realEstate, age: e.target.value });
  };

  const handleExteriorChange = (e) => {
    const { value, checked } = e.target;
    const existingExteriors = [...realEstate.exterior];

    if (checked) {
      existingExteriors.push(value);
    } else {
      const index = existingExteriors.indexOf(value);
      existingExteriors.splice(index, 1);
    }

    setRealEstate({ ...realEstate, exterior: existingExteriors });
  };

  const handleCommunalAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const existingCommunalAmenities = [...realEstate.additionalAmenities];

    if (checked) {
      existingCommunalAmenities.push(value);
    } else {
      const index = existingCommunalAmenities.indexOf(value);
      existingCommunalAmenities.splice(index, 1);
    }

    setRealEstate({ ...realEstate, additionalAmenities: existingCommunalAmenities });
  };

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
  };

  return (
    <>
      {/* Crear nueva propiedad */}
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Precio:
          <input type="text" name="price" onChange={handlePriceChange} />
        </label>
        <label>Tipo de oferta:</label>
        <select name="" onChange={handleTypeChange}>
          <option value="">Seleccione</option>
          <option value="venta">Venta</option>
          <option value="arriendo">Arriendo</option>
        </select>
        <label>
          Ciudad:
          <input type="text" name="city" onChange={handleCityChange} />
        </label>
        <label>
          Sector de la vivienda:
          <input type="text" name="sector" onChange={handleSectorChange} />
        </label>
        <label>Tipo de vivienda:</label>
        <select name="" onChange={handleTypeChange}>
          <option value="">Seleccione</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="lote">Lote</option>
        </select>
        <label>
          Área:
          <input type="text" name="area" onChange={handleAreaChange} />
        </label>
        <label>
          Habitaciones:
          <input type="text" name="rooms" onChange={handleRoomsChange} />
        </label>
        <label>
          Baños:
          <input
            type="text"
            name="bathrooms"
            onChange={handleBathroomsChange}
          />
        </label>
        <label>Parqueadero:</label>
        <select name="" onChange={handleParkingChange}>
          <option value="">Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <label>
          Dirección:
          <input type="text" name="address" onChange={handleAddressChange} />
        </label>
        <label>Estado del inmueble:</label>
        <select name="" onChange={handleStatusChange}>
          <option value="">Seleccione</option>
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
        <label>Amoblado:</label>
        <select name="" onChange={handleFurnishedChange}>
          <option value="">Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <label>Edad del inmueble:
          <input type="text" name="age" onChange={handleAgeChange}/>
        </label>
        <div>
          <h3>Exterior:</h3>
          <label>Balcón
            <input type="checkbox" name="exterior" value="balcon" onChange={handleExteriorChange} />
          </label>
          <label>Jardín
            <input type="checkbox" name="exterior" value="jardin" onChange={handleExteriorChange}/>
          </label>
          <label>Terraza
            <input type="checkbox" name="exterior" value="terraza" onChange={handleExteriorChange}/>
          </label>
        </div>
        <div>
          <h3>Comodidades adicionales:</h3>
          <label>Piscina
            <input type="checkbox" name="additionalAmenities" value="piscina" onChange={handleCommunalAmenitiesChange}/>
          </label>
          <label>Gimnasio
            <input type="checkbox" name="additionalAmenities" value="gym" onChange={handleCommunalAmenitiesChange}/>
          </label>
          <label>Áreas comunes
            <input type="checkbox" name="additionalAmenities" value="areas comunes" onChange={handleCommunalAmenitiesChange}/>
          </label>
        </div>
        <br />
        {/* Cargar imagenes */}
        <p>Cargar imagenes:</p>
        <input
          className="img_input"
          type="file"
          name="file"
          id="file"
          onChange={handleImagesChange}
        />
        <input type="submit" value="Enviar" />
      </form>
    </>
  );
};
