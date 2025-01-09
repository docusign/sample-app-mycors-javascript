// Convert file to base64 string
export const fileToBase64 = async (filepath) => {
  const response = await fetch(filepath);
  const fileBlob = await response.blob();
  const reader = new FileReader();
  await new Promise((resolve) => {
    reader.onloadend = resolve;
    reader.readAsDataURL(fileBlob);
  });
  const base64File = reader.result.split(",")[1];
  return base64File;
};
