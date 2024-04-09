import { useEffect, useState } from "react";
import { searchRealEstate } from "../firebase/firebase";


export const ViewRealEstates = () => {

    const [realEstates, setRealEstates] = useState([]);

    const searchElements = {
        sector: 'belen',
        bathrooms: "2",
        type: 'apartamento'
      }
      
    const { sector, bathrooms, type } = searchElements;

    useEffect(() => {
        searchRealEstate(sector, bathrooms, type).then((data) => {
          setRealEstates(data);
        });
    }, []);


  return (
    <>
        <h2 className="mb-5">Lista de Propiedades</h2>
        <input type="text" name="search" id="" className="form-control mb-3" placeholder="Buscar propiedad" />
        <div className="container">
            <div className="row">
            {realEstates.map((realEstate) => (
                <div className="col-md-4" key={realEstate.id}>
                <div className="card">
                    <img
                    src={realEstate.images[0]}
                    className="card-img-top"
                    alt={realEstate.name}
                    />
                    <div className="card-body">
                    <h5 className="card-title">{realEstate.name}</h5>
                    <p className="card-text">
                        <strong>Sector:</strong> {realEstate.sector}
                    </p>
                    <p className="card-text">
                        <strong>Precio:</strong> {realEstate.price}
                    </p>
                    <p className="card-text">
                        <strong>Área:</strong> {realEstate.area}
                    </p>
                    <p className="card-text">
                        <strong>Habitaciones:</strong> {realEstate.rooms}
                    </p>
                    <p className="card-text">
                        <strong>Baños:</strong> {realEstate.bathrooms}
                    </p>
                    <p className="card-text">
                        <strong>Parqueo:</strong> {realEstate.parking}
                    </p>
                    <p className="card-text">
                        <strong>Dirección:</strong> {realEstate.address}
                    </p>
                    <p className="card-text">
                        <strong>Tipo:</strong> {realEstate.type}
                    </p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
    </>
  )
}
