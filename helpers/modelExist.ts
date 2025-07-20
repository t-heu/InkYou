export const modelExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });

    if (!response.ok) {
      // Aqui sim o modelo não existe (404, 403 etc.)
      console.warn(`Modelo não encontrado: status ${response.status}`);
      throw new Error("O modelo selecionado não foi encontrado.");
    }

    return response.ok;
  } catch (error) {
    console.error("Erro ao verificar modelo:", error);
    throw new Error("Erro ao verificar modelo");
  }
};
