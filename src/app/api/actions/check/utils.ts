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
interface Content {
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

interface Metadata {
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

export async function verifyMembershipOnChain(ownerAddress: string): Promise<Metadata | boolean> {
    const resp = await searchAssetsByOwner(ownerAddress);
    if (resp.result.total>0){
      const searchAssetsResponse = resp.result.items[0] as SearchAssetsResponse;
      const metadata = searchAssetsResponse.content.metadata;
      console.log(metadata);
      return metadata;
    }
    return false;
}