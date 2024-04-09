import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2z9a0VNRBmbV5kMe_8Qp4vAr9o-E292U",
  authDomain: "pruebas-inmuebles.firebaseapp.com",
  projectId: "pruebas-inmuebles",
  storageBucket: "pruebas-inmuebles.appspot.com",
  messagingSenderId: "530118818996",
  appId: "1:530118818996:web:28b92a0d34561d831c2be1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Consultar la collection users de la base de datos para obtener todos los documentos
export const getAllNumbers = async (numberParam) => { 

  const numberNormalize = numberParam.slice(9);
  console.log(numberNormalize);

  const querySnapshot = collection(db, 'users');
  const querySnapshotData = await getDocs(querySnapshot);
  const dataNumbers = querySnapshotData.docs.map( doc  => doc.data());
  const findNumber = dataNumbers.find( user => user.number === numberNormalize);
  const result = findNumber ? findNumber.name : 'No se encontró el número';

  console.log(result);
  return result;
};