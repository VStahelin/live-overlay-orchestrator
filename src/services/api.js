import { SERVER_URL } from "../constants";

export const getLastStatus = async (overlayId) => {
  const path = `${SERVER_URL}/status/${overlayId}`;
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar estado do overlay:", error);
    return null;
  }
};

export const getSponsorsImages = async () => {
  const path = `${SERVER_URL}/sponsors`;

  try {
    const response = await fetch(`${path}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP! status: ${response.status}`);
    }
    const imageNames = await response.json();
    return imageNames.map((name) => `${path}/${name}`);
  } catch (error) {
    console.error("Erro ao buscar lista de imagens:", error);
    return [];
  }
};
