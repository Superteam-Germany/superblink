/**
 * Solana Actions Example
 */
import {SignMessageResponse, SignMessageData} from "@solana/actions-spec";
import { verifyMembershipOnChain } from "./utils";
import bs58 from "bs58";
import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
  ACTIONS_CORS_HEADERS,
  createSignMessageText,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  VersionedTransaction,
  MessageV0,
} from "@solana/web3.js";
import {keyPair} from './const';

import nacl from "tweetnacl";

const message = 'yo yo yo 148 3 to the 3 to the 6 to the 9';
let counter = 0;

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: 'https://i.imgur.com/WSXGTgt.png',
      title: "Check your Superteam Germany Memebership now",
      description: "Check your membership now. You'll be able to see your XP.",
      links: {
        actions: [
          {
            type: 'message',
            href: baseHref,
            label: 'Check Membership',
          },
          {
            type: 'message',
            href: baseHref,
            label: 'I ❤️ Superteam Germany',
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = async () => Response.json(null, { headers:ACTIONS_CORS_HEADERS });
export const POST = async (req: Request) => {
  counter++;
  return routePostRequest(req);
};
async function routePostRequest(req: Request): Promise<Response> {
  const requestUrl = new URL(req.url);
  // Extract the endpoint path
  const endpoint = requestUrl.pathname;
  console.log('raaaaaaaah' + counter);
  console.log(endpoint);
  const next = validateQueryParams(requestUrl);
  // Route to the correct handler based on the endpoint
  switch (next) {
    case '':
      return handleSignPlain(req);
    case 'verify-signature':
      console.log("handling verify signature, in router");
      return handleVerifySignature(req);
    default:
      return Response.json({ message: "Endpoint not found" }, { status: 404, headers: ACTIONS_CORS_HEADERS });
  }
}
export const handleSignPlain = async (req: Request) => {
  const {account} = await req.json();
  console.log("handling sign plain");
  try {
    const payload: SignMessageResponse = {
           type: 'message',
           data: message,
           links: {
             next: {
               type: 'post',
               href: `/api/actions/check?next=${'verify-signature'}`,
             },
           },
         };
    const response = await verifyMembershipOnChain(account);
    if (response) {
      console.log("LFG")
      return Response.json(payload, {
        headers: ACTIONS_CORS_HEADERS,
      });
    }
    console.log("NOT LFG")
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

async function handleVerifySignature(req: Request): Promise<Response> {
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: 'https://i.imgur.com/WSXGTgt.png',
      title: "Check your Superteam Germany Memebership now",
      description: "Check your membership now. You'll be able to see your XP.",
      links: {
        actions: [
          {
            type: 'message',
            href: baseHref,
            label: 'Check Membership',
          },
          {
            type: 'message',
            href: baseHref,
            label: 'I ❤️ Superteam German',
          },
        ],
      },
    };
    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let actionError: ActionError = { message: "An unknown error occurred" };
    if (typeof err == "string") actionError.message = err;
    return Response.json(actionError, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
}

// async function handleVerifySignature(req: Request): Promise<Response> {
//   const { account } = await await req.json();
//   // 1. Generate sign message data
//   const signMessageData: SignMessageData = {
//     address: account,
//     domain: 'localhost:3003', // In real world should be the domain of the action server
//     statement: 'This is example structured statement',
//     issuedAt: new Date().toISOString(),
//     nonce: Keypair.generate().publicKey.toString(),
//   };
//   // 2. Generate server signature for the message to later during verification ensure message was not tampered
//   // 2.1 Serialize sign message data to a standard text format, same format is used by clients to generate the plaintext message
//   const message = createSignMessageText(signMessageData);
//   // 2.2 Sign the text with server keypair
//   const serverSignature = bs58.encode(
//     nacl.sign.detached(
//       new TextEncoder().encode(message),
//       serverSigningKeypair.secretKey,
//     ),
//   );
//   // 2.3 State will be used to store the message and server signature to later verify the message
//   const state: { message: string; serverSignature: string } = {
//     message,
//     serverSignature,
//   };
//   const response: SignMessageResponse = {
//     type: 'message',
//     data: signMessageData,
//     state: JSON.stringify(state),
//     links: {
//       next: {
//         type: 'post',
//         href: '/api/sign-message/sign-structured/verify-signature',
//       },
//     },
//   };
//   return Response.json(response, {headers: ACTIONS_CORS_HEADERS});
// }















const serverSigningKeypair = nacl.sign.keyPair.fromSecretKey(
  Uint8Array.from(
    bs58.decode(
      '2NNPV1WzBQaXkEC7h8S1HBRMcSHB2GhC7XVn6Z3nCccJF3DFHBg9MLiDiidk8HCxn4sPvD1SKq6HPMjBxwbyjGK',
    ),
  ),
);
function signMessage(message: string, signer: string){
  const keypair: Keypair = Keypair.fromSecretKey(Uint8Array.from(signer.split(',')));
  const messageBytes = new TextEncoder().encode(message);
  const signature  = nacl.sign.detached(messageBytes, Uint8Array.from(signer.split(',')));

  return bs58.encode(signature);
}
function verifySignature(message: string, signature: string, account: string) {
  const messageBytes = new TextEncoder().encode(message);
  const signatureBytes = Uint8Array.from(bs58.decode(signature));
  return nacl.sign.detached.verify(
    messageBytes,
    signatureBytes,
    Uint8Array.from(new PublicKey(account).toBuffer()),
  );
}

function validateQueryParams(requestUrl: URL): string {
  const next = requestUrl.searchParams.get('next');
  if (!next) {
    return '';
  }
  return next;
}
