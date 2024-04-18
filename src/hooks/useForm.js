import { useState } from "react"
import { createRealEstate } from "../firebase/firebase"

export const useForm = ( initialForm = [] ) => {

    const [ formState, setFormState ] = useState(initialForm)

    const onInputChange = ({ target }) => {
        // Se desestructura el evento para obtener el valor del input desde el target.
        const { name, value } = target
        // Se desestructura name y value del target para hacer el código más limpio.
        setFormState({
            ...formState,
            [ name ]: value
            // Se usa la notación de corchetes para reasignar el valor de la propiedad que se está modificando.
        })
    }

    const onSelectedChange = ({ target }) => {
        const { name, value } = target
        setFormState({
            ...formState,
            [ name ]: value
        })
    }

    const onInputImageChange = ({ target }) => {
      
      const { files } = target;
      
        // Crea una copia del arreglo de imágenes actual
        const existingImages = [...formState.images];
        
        // Agrega las nuevas imágenes al arreglo existente
        for (let i = 0; i < files.length; i++) {
          existingImages.push(files[i]);
        }
    
        // Actualiza el estado con las imágenes combinadas
        setFormState({ ...formState, images: existingImages });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      createRealEstate(formState);
    }

    const onResetForm = () => {
        setFormState( initialForm )
    }

    console.log([formState])

  return {
    formState,
    onInputChange,
    onInputImageChange,
    onSelectedChange,
    handleSubmit,
    onResetForm
  }
}