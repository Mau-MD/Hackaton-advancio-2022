import { router, publicProcedure } from "../trpc";
import getBlobName from "../../../pages/admin/form"
import { z } from "zod";
import intostream from 'into-stream';
import {BlobService} from "azure-storage";
//import {BlobURL} from "@azure/storage-blob";
import {Readable} from 'stream';


export const imagesRouter = router({
    subir_imagen: publicProcedure
     .input(z.object({
        blob : z.string(),
        nombre: z.string()
     }))
    .mutation(({input}) => {
        const blobName = getBlobName(input.nombre);
        const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=cs4100320016ceab448;AccountKey=jBVGHaDxalXIUGkTFkS6EDKUSQVYNelk3qEhRzSlnkYKw7DycAygCxO7Yj8dQnZDtvqa8LYMQ5hf+ASts3e9Rg==;EndpointSuffix=core.windows.net";
        const streamLength = input.blob.length;
        const containerName = 'imagenes-hackaton';
        const ps = new BlobService(AZURE_STORAGE_CONNECTION_STRING);
        const s = new Readable();
        s._read = () => {};
        s.push(input.blob);
        s.push(null);
        ps.createBlockBlobFromStream(containerName, "blobname", s, streamLength, (err: any) => {
            if (err){
                console.log("hubo error", err);
            }

        })
    })
})
