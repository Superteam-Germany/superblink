/**
 * Solana Actions Example
 */
import {SignMessageResponse, SignMessageData, ActionResponse} from "@solana/actions-spec";
import { verifyMembershipOnChain, shortenSolanaWallet, Metadata, Content, verifyMembershipOnChainResponse } from "./utils";
import bs58 from "bs58";
import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
  ACTIONS_CORS_HEADERS,
  Action,
  createSignMessageText,
  NextActionLink
} from "@solana/actions";
import {
  Keypair,
  PublicKey,
} from "@solana/web3.js";
import {keyPair} from './const';
import {log, logLove, getLoversCount} from "./log";
import nacl from "tweetnacl";
import { Console } from "console";
import { createNFT } from "./image";
import { metadata } from "@/app/layout";
import { createTwitterShareLink } from "./utils";
let counter = 0;
const teletubbies = 'https://i.imgur.com/WSXGTgt.png';
const loveKitty  = "https://i.imgur.com/LuaAGt4.png";
const sadKitty = 'https://i.imgur.com/yHr2cBe.png'
const plainLogo = "https://i.imgur.com/NLhj2bZ.png"
const design = "https://i.imgur.com/dluUGua.png"
export const GET = async (req: Request) => {
  
  console.log("Console: GET Request Received");
  const requestUrl = new URL(req.url);
  const next = requestUrl.searchParams.get('next'); // Fetch `next` parameter
  switch (next) {
    case 'show-love':
      console.log("Console: Handling Show Love via GET");
      console.log("Console: ***********************************************************************")
      return await handleShowLove(req);
    default:
      console.log("Console: ***********************************************************************")
      return defaultGet(req);
  }

};

export const defaultGet = async (req: Request) => {
  console.log("Console: ***********************************************************************")
  
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check?next=`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Superteam Germany Membership',
      icon: design,
      title: "Superteam Germany Membership",
      description: "You can check your Superteam Germany membership status here. Find out your XP and more.",
      links: {
        actions: [
          {
            type: 'message',
            href: baseHref + 'sign-plain',
            label: 'Check Membership',
          },
          // {
          //   type: 'post',
          //   href: baseHref + 'show-love',
          //   label: 'ISuperteam Germany',
          // },
        ],
      },
    };
    console.log("Console: ***********************************************************************")
    console.log(Response.json(payload));
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
  console.log("Console: ***********************************************************************")
  console.log("Console: Post Request Received");
  counter++;
  console.log("Console: ***********************************************************************")
  return routePostRequest(req);
};
async function routePostRequest(req: Request): Promise<Response> {
  console.log("Console: Routing Post Request");
  const requestUrl = new URL(req.url);
  // Extract the endpoint path
  const endpoint = requestUrl.pathname;
  const {next, nft, name, id} = validateQueryParams(requestUrl);

  console.log("Console: This is the endpoint: ", endpoint);
  // Route to the correct handler based on the endpoint
  switch (next) {
    case '':
      return handleSignPlain(req);
    case 'sign-plain':
      console.log("Console: Handling Sign Plain in Router");
      return await handleSignPlain(req);
    case 'is-member':
      console.log("Console: Handling Is Member in Router");
      return await handleIsMember(req);
    case 'show-love-sign':
      console.log("Console: Handling Show Love in Router");
      return await handleShowLoveSign(req);
    case 'show-love':
      console.log("Console: Handling Show Love in Router");
      return await handleShowLove(req);
    case 'is-non-member':
      console.log("Console: Handling Is Non Member in Router");
      return await handleIsNonMember(req);
    case 'external-link-nft':
      console.log("Console: Handling External Link in Router");
      return await handleRedirect(req, nft);
    case 'external-link-twitter':
      console.log("Console: Handling External Link in Router");
      return await handleRedirect(req, nft);
    case 'external-link-solscan':
      console.log("Console: Handling External Link in Router");
      return await handleRedirect(req, nft);
    case 'display-nft':
      console.log("Console: Handling Display NFT in Router");
      return await handleDisplayNFT(req);
    case 'display-nft-request':
      console.log("Console: Handling Display NFT Request in Router");
      return await handleDisplayNFRequest(req);
    default:
      console.log("Console: Endpoint not found in Router");
      return await handleEnding(req);
  }
}
export const handleSignPlain = async (req: Request) => {
  console.log("Console: Handling Sign Plain helper function");

 
  const host = req.headers.get('host');
  const {account} = await req.json();
  const message = host+" wants you to sign this signature to prove ownership of your account: " + shortenSolanaWallet(account)  + "\n" +"Please sign in." +
  "\n\nTime: " + new Date().toISOString();
  const time = new Date().toISOString();
  
  try {
    
    
    const isMember = await verifyMembershipOnChain(account) as verifyMembershipOnChainResponse;
   
    if (isMember) {
      log(time, account, true);
      console.log("Console: Returning Sign Plain payload. Membership found");
      //console.log(isMember.content.metadata.attributes);
      const nftUrl = await createNFT(isMember.content.metadata.attributes, isMember.name || "", isMember.discord || "", isMember.imageUrl || "");
      const payloadMember: SignMessageResponse = {
        type: 'message',
        data: message,
        links: {
          next: {
            type: 'post',
            href: `/api/actions/check?next=${'is-member'}&nft=${nftUrl}&name=${isMember.name}&id=${isMember.id}`,
          },
        },
      };
      return Response.json(payloadMember , {
        headers: ACTIONS_CORS_HEADERS,
      });
    }
    const payloadNonMember: SignMessageResponse = {
      type: 'message',
      data: message,
      links: {
        next: {
          type: 'post',
          href: `/api/actions/check?next=is-non-member`,
        },
      },
    };
    console.log("Console: Returning Sign Plain payload. Membership not found");
    return Response.json(payloadNonMember, {
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
async function handleRedirect(req: Request, nft: string){
  console.log("Console: Handling Redirect helper function");
  const teletubbies = 'https://i.imgur.com/WSXGTgt.png';
  try {
    const requestUrl = new URL(req.url);
    const payload: ActionPostResponse = {
      'type': 'external-link',
      'externalLink': nft
    };
    console.log("Console: Returning Redirect payload");
    console.log(Response.json(payload));
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
async function handleIsNonMember(req: Request): Promise<Response> {
  const {next, nft, name, id} = validateQueryParams(new URL(req.url));
  console.log("Console: Handling Is Non Member helper function");
  const twitterShareLink = 'https://x.com/SuperteamDE'
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: sadKitty,
      title: "You are unfortunately not a Superteam Germany member, yet...",
      description: `Make sure to stay up to date with our latest activities to prove your contributions and earn your prestigious NFT!`,
      links: {
        actions: [
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-twitter&nft='+twitterShareLink,
            label: 'Follow us on X',
          },
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-nft&nft=https://discord.gg/XjPNQx24CP',
            label: 'Join Our Discord',
          },
          {
            type: 'message',
            href: baseHref+'?next=show-love-sign',
            label: 'I ❤️ Superteam Germany',
          }
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
async function handleShowLoveSign(req: Request): Promise<Response> {
  console.log("Console: Handling Show Love Sign helper function");
  const message = "I pinky promise to always show love to Superteam Germany!";
  const payload: ActionPostResponse = {
    type: 'post',
    links: {
      next: {
        type: 'post',
        href: `/api/actions/check?next=show-love`,
      },
      }
    };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

async function handleShowLove(req: Request): Promise<Response> {
  const {account } = await req.json();
  const {next, nft, name, id} = validateQueryParams(new URL(req.url));
  console.log("Console: Handling Show Love helper function");
  const lovesCount = await getLoversCount();
  const twitterShareLink = createTwitterShareLink();
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: loveKitty,
      title: `Live frens count: ${lovesCount} `,
      description: `Thank you for showing love. You are a real fren!. We'll make sure to let the team know you showed love!`,
      links: {
        actions: [
         
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-twitter&nft='+twitterShareLink,
            label: 'Follow us on X',
          },
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-nft&nft=https://discord.gg/XjPNQx24CP',
            label: 'Join Our Discord',
          },
          {
            type: 'post',
            href: baseHref+'?next=end',
            label: '⬅️ Membership Checker',
          },
        
        ],
      },
    };
    logLove(new Date().toISOString(), account);
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
async function handleDisplayNFT(req: Request): Promise<Response> {
  const {next, nft, name, id} = validateQueryParams(new URL(req.url));
  console.log("Console: Handling Display NFT helper function");
  const twitterShareLink = createTwitterShareLink();
  const solscanLink = "https://solscan.io/token/"+id;
  console.log("SOLSCAN LINK: ",solscanLink);
  console.log(nft);
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: nft,
      title: "This is your personalised Superteam Germany NFT!",
      description: ``,
      links: {
        actions: [
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-twitter&nft='+twitterShareLink,
            label: 'Share on X',
          },
          // {
          //   type: 'external-link',
          //   href: baseHref+'?next=external-link-nft&nft='+nft,
          //   label: 'Download NFT',
          // },
          {
            type: 'external-link',
            href: baseHref+'?next=external-link-solscan&nft='+solscanLink,
            label: 'View on Solscan',
          }
          ,
          {
            type: 'message',
            href: baseHref+'?next=show-love-sign',
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
}
async function handleDisplayNFRequest(req: Request): Promise<Response> {
  const {next, nft, name, id} =  validateQueryParams(new URL(req.url));
  console.log("Console: Handling Display NFT Request helper function");
  const payload: ActionPostResponse = {
    type: 'post',
    links: {
      next: {
        type: 'post',
        href: `/api/actions/check?next=display-nft&nft=${nft}&name=${name}&id=${id}`,
      },
      }
    };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

async function handleEnding(req: Request): Promise<Response> {
  const {next, nft, name, id} = validateQueryParams(new URL(req.url));
  console.log("Console: Handling Ending helper function");
  const requestUrl = new URL(req.url);
  const baseHref = new URL(
    `/api/actions/check?next=`,
    requestUrl.origin,
  ).toString();
  const payload: ActionResponse = {
    type: 'post',
    links: {
      next: {
        type: 'inline',
        action: {
          type: 'action',
          label: 'Superteam Germany Membership',
          icon: 'https://i.imgur.com/NLhj2bZ.png',
          title: "Superteam Germany Membership",
          description: "You can check your Superteam Germany membership status here. Find out your XP and more.",
          links: {
            actions: [
              {
                type: 'message',
                href: baseHref + 'sign-plain',
                label: 'Check Membership',
              },
              // {
              //   type: 'post',
              //   href: baseHref + 'show-love',
              //   label: 'ISuperteam Germany',
              // },
            ],
        }
      },
      },
      }
    };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

async function handleIsMember(req: Request): Promise<Response> {
  const {next, nft, name, id} = validateQueryParams(new URL(req.url));
  console.log("Console: Handling Is Member helper function");
  const twitterShareLink = createTwitterShareLink();
  try {
    const requestUrl = new URL(req.url);
    const baseHref = new URL(
      `/api/actions/check`,
      requestUrl.origin,
    ).toString();
    const payload: ActionGetResponse = {
      type: 'action',
      label: 'Memebership Checker',
      icon: teletubbies,
      title: "You are a certified Superteam Germany member!",
      description: `Hi, ${name}! You are a certified Superteam Germany member. Check out you precious NFT!`,
      links: {
        actions: [
          {
            type: 'post',
            href: baseHref+'?next=display-nft-request&nft='+nft+'&name='+name+'&id='+id,
            label: 'Reveal NFT',
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

function validateQueryParams(requestUrl: URL):{next: string, nft: string, name: string, id: string} {
  if (!requestUrl.searchParams.has('next')) {
    // throw 'Missing required query parameter: next';
  }
  const next = requestUrl.searchParams.get('next')as string;
  if (next === null) {
    // throw 'Invalid query parameter: next';
  }
  if (!requestUrl.searchParams.has('nft')) {
    // throw 'Missing required query parameter: nft';
  }
  const nft = requestUrl.searchParams.get('nft') as string;
  if (nft === null) {
    // throw 'Invalid query parameter: nft';
  }
  if (!requestUrl.searchParams.has('name')) {
    // throw 'Missing required query parameter: name';
  }
  const name = requestUrl.searchParams.get('name')as string;
  if (name === null) {
    // throw 'Invalid query parameter: name';
  }
  const id  = requestUrl.searchParams.get('id')as string;
  if (id === null) {
    // throw 'Invalid query parameter: id';
  }

  console.log("Console: This is next: ",next);
  console.log("Console: This is nft: ",nft);
  console.log("Console: This is name: ",name);
  console.log("Console: This is id: ",id);
  return {next, nft, name, id};
}
