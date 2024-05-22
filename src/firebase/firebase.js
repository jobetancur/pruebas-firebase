import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, where, query } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2z9a0VNRBmbV5kMe_8Qp4vAr9o-E292U",
  authDomain: "pruebas-inmuebles.firebaseapp.com",
  projectId: "pruebas-inmuebles",
  storageBucket: "pruebas-inmuebles.appspot.com",
  messagingSenderId: "530118818996",
  appId: "1:530118818996:web:28b92a0d34561d831c2be1",
};

// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore();

const createId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Consultar la collection numbers de la base de datos para obtener todos los documentos
export const getAllNumbers = async () => { 
    const querySnapshot = collection(db, 'numbers');
    const querySnapshotData = await getDocs(querySnapshot);
    
    const numbers = querySnapshotData.docs.map((doc) => {
        return doc.data();
    });
    // console.log(numbers);
    return numbers;
};

// Consultar la collection realEstates de la base de datos para obtener todos los documentos
export const getRealEstates = async () => {
  const querySnapshot = collection(db, "realEstates");
  const querySnapshotData = await getDocs(querySnapshot);

  const realEstates = querySnapshotData.docs.map((doc) => {
    return doc.data();
  });

  // console.log(realEstates);
  return realEstates;
};

// Crear un nuevo documento en la collection realEstates.
export const createRealEstate = async (data) => {
    try {
      const id = createId();
      const storage = getStorage();
      const storageRef = ref(storage, `images/${id}`);
  
      // Subir todas las imágenes en paralelo al storage
      const uploadPromises = data.images.map(async (image) => {
        const imageRef = ref(storageRef, `${id}_${image.name}`);
        await uploadBytesResumable(imageRef, image);
        return getDownloadURL(imageRef);
      });
  
      // Esperar a que todas las imágenes se suban y obtengan sus URLs
      const imageUrls = await Promise.all(uploadPromises);
  
      // Crear el objeto realEstate con las URLs de las imágenes
      const realEstate = {
        ...data,
        id,
        images: imageUrls,
      };
  
      // Agregar el nuevo documento a Firestore
      await addDoc(collection(db, "realEstates"), realEstate);
  
      console.log("Propiedad creada exitosamente:", realEstate);
    } catch (error) {
      console.error("Error al crear la propiedad:", error);
    }
  };

// Función para buscar un propiedad dentro de la collection realEstates de la base de datos usando querys.

// const terminoBusqueda = [
//   ['city', '==', 'Medellín'],
//   ['type', '==', 'apartment'],
//   ['bedrooms', '>=', 3],
//   ['bathrooms', '>=', 2],
//   ['kitchen', '==', true],
//   ['living_room', '==', true],
//   ['dining_room', '==', true],
//   ['parking', '==', true],
//   ['furnished', '==', true],
//   ['security', '==', true],
//   ['swimming_pool', '==', true]
// ]

export const searchRealEstate = async (sector, bathrooms, type) => {
  const realEstatesRef = collection(db, "realEstates");

  // Realizar la consulta por sector (obligatoria)
  const qSector = query(realEstatesRef, where("sector", "==", sector));
  const sectorSnapshot = await getDocs(qSector);

  // Realizar la consulta por baños (opcional)
  let bathroomsSnapshot;
  if (bathrooms) {
    const qBathrooms = query(realEstatesRef, where("bathrooms", "==", bathrooms), where("sector", "==", sector));
    bathroomsSnapshot = await getDocs(qBathrooms);
  }

  // Realizar la consulta por tipo (opcional)
  let typeSnapshot;
  if (type) {
    const qType = query(realEstatesRef, where("type", "==", type), where("sector", "==", sector));
    typeSnapshot = await getDocs(qType);
  }

  // Combinar los resultados
  let results = [];
  let addedDocIds = new Set();

  const addDocToResults = (doc) => {
    const docData = doc.data();
    if (!addedDocIds.has(docData.id)) {
      results.push(docData);
      addedDocIds.add(docData.id);
    }
  };

  sectorSnapshot.forEach(addDocToResults);
  if (bathroomsSnapshot) bathroomsSnapshot.forEach(addDocToResults);
  if (typeSnapshot) typeSnapshot.forEach(addDocToResults);

  // Imprimir los resultados
  results.forEach((result) => {
    console.log(result);
  });

  return results;

};


// let images = ['img1', 'img2']

// console.log(images)

export const filterProperties = async (filters) => {
  const querySnapshot = collection(db, "realEstates");
  const querySnapshotData = await getDocs(querySnapshot);

  const realEstates = querySnapshotData.docs.map((doc) => {
    return doc.data();
  });

  const resultFilter = realEstates.filter(property => {
    let matches = true;

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      matches = matches && property.price >= filters.minPrice && property.price <= filters.maxPrice;
    }
    if (filters.title !== undefined || filters.title !== null) {
        matches = matches && property.title.toLowerCase().includes(filters.title.toLowerCase());
    }
    if (filters.type !== undefined || filters.type !== null) {
        matches = matches && property.type.toLowerCase().includes(filters.type.toLowerCase());
    }
    if (filters.city !== undefined || filters.city !== null) {
        matches = matches && property.city.toLowerCase().includes(filters.city.toLowerCase());
    }
    if (filters.sector !== undefined || filters.sector !== null) {
        matches = matches && property.sector.toLowerCase().includes(filters.sector.toLowerCase());
    }
    if (filters.type !== undefined || filters.type !== null) {
        matches = matches && property.type >= filters.type;
    }

    return matches;
  });

  return resultFilter.length > 0 ? resultFilter : "No se encontraron propiedades que coincidan con los filtros aplicados.";
}

// Ejemplo de uso:
// const filters = {
//   minPrice: 0,
//   maxPrice: 5400000,
//   city: "bogota",
//   type: "arriendo",
// };

// const filteredProperties = filterProperties(filters);
// console.log(filteredProperties);
