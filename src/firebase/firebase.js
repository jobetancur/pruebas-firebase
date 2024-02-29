import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
const db = getFirestore();

const createId = () =>
  Math.random().toString(36).substring(2) + Date.now().toString(36);

// Consultar la collection numbers de la base de datos para obtener todos los documentos
export const getAllNumbers = async () => {
  const querySnapshot = collection(db, "numbers");
  const querySnapshotData = await getDocs(querySnapshot);

  const numbers = querySnapshotData.docs.map((doc) => {
    return doc.data();
  });
  console.log(numbers);
};

// Consultar la collection realEstates de la base de datos para obtener todos los documentos
export const getRealEstates = async () => {
  const querySnapshot = collection(db, "realEstates");
  const querySnapshotData = await getDocs(querySnapshot);

  const realEstates = querySnapshotData.docs.map((doc) => {
    return doc.data();
  });

  console.log(realEstates);
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
  
