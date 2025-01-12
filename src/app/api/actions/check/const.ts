import {
    Keypair,
  } from "@solana/web3.js";

export const keyPair: Keypair = Keypair.fromSecretKey(Uint8Array.from([240,122,148,217,230,149,20,217,31,111,243,24,13,48,228,234,106,152,192,205,217,87,112,101,135,118,210,103,58,69,88,125,121,238,43,14,204,17,205,115,84,212,68,117,89,227,196,100,246,82,73,112,115,199,195,234,43,221,200,1,30,70,45,105]))
// console.log(Keypair)
// console.log(keyPair.publicKey.toBase58())
// console.log(keyPair.secretKey.toString())
// console.log(Keypair)