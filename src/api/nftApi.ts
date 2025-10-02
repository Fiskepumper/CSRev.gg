const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/nft`;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error: ${response.status} - ${errorMessage}`);
  }
  return response.json();
};

export const mintNFT = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mint`, {
      method: 'POST',
      body: formData,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

export const getUserNFTs = async (walletAddress: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user-nfts/${walletAddress}`);
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user NFTs:', error);
    throw error;
  }
};