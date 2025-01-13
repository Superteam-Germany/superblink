import fetch from 'node-fetch';

// Define the URL for the API request
const url = 'https://aura-mainnet.metaplex.com';

// Define the request payload type
interface getAssetsByOwnerRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params: object;
}

// Define the method to fetch assets by owner
async function getAssetsByOwner(pubKey: string): Promise<void> {
    const requestBody: getAssetsByOwnerRequest = {
        jsonrpc: '2.0',
        id: 1,
        method: 'getAssetsByOwner',
        params: {"ownerAddress": pubKey}
      };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse the JSON response
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}



// Define the request payload type
interface searchAssetsByOwnerRequest {
    jsonrpc: string;
    id: number;
    method: string;
    params: {
      ownerAddress: string;
      conditionType: string;
      interface: string;
      creatorAddress: string;
    };
  }
  
  // Define the response interface
  interface ApiResponse {
    jsonrpc: string;
    id: number;
    result: any;  // Define 'result' type according to the structure you expect
  }
  
  // Define the function to search assets by owner
  async function searchAssetsByOwner(ownerAddress: string): Promise<ApiResponse> {
    // Define the request body
    const requestBody: searchAssetsByOwnerRequest = {
      jsonrpc: '2.0',
      id: 1,
      method: 'searchAssets',
      params: {
        ownerAddress,
        conditionType: 'all',
        interface: 'V1_NFT',
        creatorAddress: '2KP32tgxhJQ7VYiCaEZuM4BneeDDRYLiZHbojPDzZeFS',
      },
    };
  
    try {
      // Make the API request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Ensure the response is valid and parse the JSON response
      const data = await response.json() as ApiResponse;
     return data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch assets');
    }
  }


interface SearchAssetsResponse {
    interface: string;
    id: string;
    content: {
      $schema: string;
      json_uri: string;
      files: File[];
      metadata: Metadata;
      links: Links;
    }; 

  }
export interface Content {
  $schema: string;
  json_uri: string;
  files: File[];
  metadata: Metadata;
  links: Links;
}

interface File {
  uri: string;
  mime: string;
}

export interface Metadata {
  attributes: Attribute[];
  description: string;
  name: string;
  symbol: string;
  token_standard: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

interface Links {
  image: string;
}
export interface verifyMembershipOnChainResponse {
  id: string;
  content: Content;
  name: string | null;
  discord: string | null;
  imageUrl: string | null;
}
export async function verifyMembershipOnChain(ownerAddress: string): Promise<verifyMembershipOnChainResponse | boolean> {
    const resp = await searchAssetsByOwner(ownerAddress);
    if (resp.result.total>0){
      const searchAssetsResponse = resp.result.items[0] as SearchAssetsResponse;
      const content = searchAssetsResponse.content;
      const id = searchAssetsResponse.id;
     // console.log(content);
      const imageUrl = content.links.image;
const urlParams = new URL(imageUrl).searchParams;

const name = urlParams.get('name');
const discord = urlParams.get('discord');
return {id,content, name, discord, imageUrl} ;
    }
    return false;
}

export function shortenSolanaWallet(wallet: string): string {
  if (wallet.length <= 8) {
    return wallet; // No need to shorten if the wallet is already short.
  }
  const firstPart = wallet.slice(0, 4);
  const lastPart = wallet.slice(-4);
  return `${firstPart}...${lastPart}`;
}


export function createTwitterShareLink(url?: string, hashtags?: string[], via?: string): string {
  let tweetText = "Thanks to @SuperteamDE and @saydialect, I can now keep track of my precious ST Germany NFT as well as my XP progress seamlessly with a few clicks. Check yours now: https://dial.to/?action=solana-action%3Ahttp%3A%2F%2Flocalhost%3A3000%2Fapi%2Factions%2Fcheck&cluster=mainnet \n";
  // Replace each `#` in the tweetText with the corresponding hashtag
  if (hashtags && hashtags.length > 0) {
    tweetText = tweetText.replace(/#/g, () => `#${hashtags.shift()}`);
  }

  // Base Twitter intent URL
  const baseURL = "https://twitter.com/intent/tweet";

  // URL parameters
  const params = new URLSearchParams();

  // Add the text parameter
  if (tweetText) {
    params.append("text", tweetText);
  }

  // Add the URL parameter (optional)
  if (url) {
    params.append("url", url);
  }

  // Add via (optional, no `@` symbol in the handle)
  if (via) {
    params.append("via", via);
  }

  // Construct the final URL
  return `${baseURL}?${params.toString()}`;
}

// // Example Usage:
// const tweetText = "I love # and #!";
// const shareUrl = "https://example.com";
// const hashtags = ["TypeScript", "Coding"];
// const via = "YourTwitterHandle";

// const twitterLink = createTwitterShareLink(tweetText, shareUrl, hashtags, via);
// console.log("Twitter Share Link:", twitterLink);
