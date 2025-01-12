import { PublicKey } from "@solana/web3.js";
 
const programId = new PublicKey("UeXfwweGMBV8JkTQ7pFF6shPR9EiKEg8VnTNF4qKjhh");
 
const [PDA, bump] = PublicKey.findProgramAddressSync([], programId);
 
console.log(`PDA: ${PDA}`);
console.log(`Bump: ${bump}`);



'9BnfpQCxeUAU2TmngcShLFArsd3VULU5iXjRA5YB13Qj'