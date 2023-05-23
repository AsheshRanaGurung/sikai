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
