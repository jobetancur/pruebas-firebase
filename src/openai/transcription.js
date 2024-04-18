import fs from "fs"; // Sirve para leer archivos del sistema de archivos
import OpenAI from "openai";

const openai = new OpenAI(
    { 
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    }
);

export async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("/assets/audio/prueba.m4a"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}

main();

