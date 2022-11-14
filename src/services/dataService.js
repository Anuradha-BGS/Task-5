import axios from "axios";

export const getData = async () => {
  return axios.get("https://fakestoreapi.com/products")
    .then((response) => response)
    .catch((error) => console.log(error));
};
