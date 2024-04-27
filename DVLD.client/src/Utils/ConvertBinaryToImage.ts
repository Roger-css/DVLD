function ConvertBinaryToImage(binStr: string) {
  const binaryData = atob(binStr);
  const byteArray = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([byteArray]);
  return URL.createObjectURL(blob);
}
export default ConvertBinaryToImage;
