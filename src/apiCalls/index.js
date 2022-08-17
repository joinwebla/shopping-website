import axios from 'axios';

const HEADERS = {
    "X-Authorization": "pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b"
}
const GET = "GET";


export const loadProductFeed = async () => {
    const response = await axios({
        method: GET,
        url: "https://api.chec.io/v1/products",
        headers: HEADERS
    })

    return response;
}


export const createCart = async () => {
    const response = await axios({
        method: GET,
        url: "https://api.chec.io/v1/carts",
        headers: HEADERS
    });

    return response;
}


export const loadDataFromCart = async (cartID) => {
    const response = await axios({
        method: GET,
        url: `https://api.chec.io/v1/carts/${cartID}`,
        headers: HEADERS
    })

    return response;
}


export const addProductToTheCart = async (cartId, productID) => {
    const response = await axios({
        method: "POST",
        url: `https://api.chec.io/v1/carts/${cartId}`,
        headers: HEADERS,
        data: {
            id: productID
        }
    })


    return response;
}