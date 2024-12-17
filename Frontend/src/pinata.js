import axios from 'axios';
import { toast } from 'react-toastify';
const FormData = require('form-data');
const key =process.env.REACT_APP_pinata_api_key; 
const secret =process.env.REACT_APP_pinata_secret_api_key;
// console.log("key",key)
// console.log("secret",secret)

export const uploadJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key:key,
                pinata_secret_api_key:secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataURL: "https://ipfs.io/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            toast.error("upload failed")
            return {
                success: false,
                message: error.message,
            }

    });
};

export const uploadFileToIPFS = async(file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    
    let data = new FormData();
    data.append('file', file);


    return axios 
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key:key,
                pinata_secret_api_key:secret,
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash)
            return {
               success: true,
               pinataURL:"https://ipfs.io/ipfs/"+response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log("error",error.message)
            toast.error("upload failed")
            return {
                success: false,
                message: error.message,
            }

    });
};