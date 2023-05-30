export const convertToBase64 = (file?: File) => {
  if (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = error => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
};

export const urlToObject = async (url: string): Promise<any> => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  }).then((objectData: string) => {
    // Parse the object data as needed
    const parsedObject = JSON.parse(objectData);
    return parsedObject;
  });
};
