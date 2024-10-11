const axios = require("axios");
const FormData = require("form-data");

// Função auxiliar para upload de imagem
const uploadImageToImgbb = async (fileBuffer) => {
  try {
    const formData = new FormData();
    formData.append("image", fileBuffer.toString("base64"));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      {
        headers: { ...formData.getHeaders() },
      }
    );

    return response.data.data.url;
  } catch (error) {
    console.error("Erro ao enviar imagem para o Imgbb:", error);
    throw new Error("Erro ao enviar imagem");
  }
};

module.exports = uploadImageToImgbb;
