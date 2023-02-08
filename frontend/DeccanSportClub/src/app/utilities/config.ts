import * as CryptoJS from 'crypto-js';

const encryptSecretKey = 'secret-key';

//export const baseUrl = "http://ec2-65-2-152-184.ap-south-1.compute.amazonaws.com:8080"; //spring rest url 
//export const baseUrl = "http://localhost:8080"; //spring rest url 
export const baseUrl = "http://172.27.186.207:8080"; //spring rest url 


export function decryptData(data: any): any {
  try {
    const bytes = CryptoJS.AES.decrypt(data, encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
    return 'error occured while decrypting';
  }
}

export function encryptData(data: any): string {
  try {
    return CryptoJS.AES.encrypt(
      JSON.stringify(data),
      encryptSecretKey
    ).toString();
  } catch (e) {
    console.log(e);
    return 'error occured while encrypting';
  }
}
