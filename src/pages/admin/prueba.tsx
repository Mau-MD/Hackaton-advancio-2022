import React from "react"
import getBlobName from "./form"
import images from "../../server/trpc/router/images"
import { trpc } from "../../utils/trpc"

const Prueba = () => {
    const [submittedFile, setFile] = React.useState<string|ArrayBuffer>("")
    const [nombre, setNombre] = React.useState<string>("");
    const [blobName, setblobName] = React.useState<string>(null);
    const uploadImage = trpc.images.subir_imagen.useMutation()

    const llamar = () => {
        
        uploadImage.mutate({blob: submittedFile})
    }
    const cambiar = (evt: any) => {
        const reader = new FileReader();
        setNombre(evt.file.originalName);
        //setblobName(getBlobName(nombre))
        reader.addEventListener('load', (e) => {
            
            setFile(e.target?.result??"");
        })
        reader.readAsText(evt);
    }
    return (  
        <div>
            <input type="file" onChange={(e) => cambiar(e.target.files[0])}/>
            <button onClick={() => llamar()}/>
        </div>
    )
}

export default Prueba