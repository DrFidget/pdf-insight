// import { PineconeClient } from '@pinecone-database/pinecone'

// export const getPineconeClient = async () => {
//   const client = new PineconeClient()

//   await client.init({
//     apiKey: process.env.PINECONE_API_KEY!,
//     environment: 'gcp-starter',
//   })

//   return client
// }


// import { Pinecone } from "@pinecone-database/pinecone";
// export const pinecone=new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY!,
//   environment:'gcp-starter'
// })

import { Pinecone } from "@pinecone-database/pinecone";

export const getPineconeClient = async () => {
  const client = new Pinecone({
    environment: 'gcp-starter',
    apiKey: process.env.PINECONE_API_KEY!,
    
  });
  return client;
};