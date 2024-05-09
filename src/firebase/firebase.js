import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, where, query, doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID
};

// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const db = getFirestore();

// const createId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

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
    const storage = getStorage();
    
    // Generar un id único para la propiedad
    const docRef = doc(collection(db, "realEstates"));

    const storageRef = ref(storage, `images/${docRef.id}`);

    // Subir todas las imágenes en paralelo al storage
    const uploadPromises = data.images.map(async (image) => {
      const imageRef = ref(storageRef, `${docRef.id}_${image.name}`);
      await uploadBytesResumable(imageRef, image);
      return getDownloadURL(imageRef);
    });

    // Esperar a que todas las imágenes se suban y obtengan sus URLs
    const imageUrls = await Promise.all(uploadPromises);

    // Crear el objeto realEstate con las URLs de las imágenes
    const realEstate = {
      ...data,
      id: docRef.id,
      url: `https://pruebas-whomap.com/#/real-estate/${docRef.id}`,
      images: imageUrls,
    };

    // Agregar el nuevo documento a Firestore con el id especificado
    await setDoc(docRef, realEstate);

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

  
