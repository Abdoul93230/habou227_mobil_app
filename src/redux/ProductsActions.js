// getSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";


// const BackendUrl = "https://chagona.onrender.com";
// console.log("")
export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    dispatch(setProducts(response.data.data));
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const getTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/getAllType`);
    dispatch(setTypes(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/getAllCategories`);
    dispatch(setCategories(response.data.data));
    // console.log(response.data.data)
  } catch (error) {
    console.log(error);
  }
};
export const getProducts_Pubs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/productPubget`);
    dispatch(setProducts_Pubs(response.data));
  } catch (error) {
    console.log(error);
  }
};
export const getProducts_Commentes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/getAllCommenteProduit`);
    dispatch(setProducts_Commentes(response.data));
    // console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

export const getSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    types: [],
    categories: [],
    products_Pubs: [],
    products_Commentes: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setTypes: (stat, action) => {
      stat.types = action.payload;
    },
    setCategories: (stat, action) => {
      stat.categories = action.payload;
    },
    setProducts_Pubs: (stat, action) => {
      stat.products_Pubs = action.payload;
    },
    setProducts_Commentes: (stat, action) => {
      stat.products_Commentes = action.payload;
    },
  },
});

export const {
  setProducts,
  setTypes,
  setCategories,
  setProducts_Pubs,
  setProducts_Commentes,
} = getSlice.actions;

export default getSlice.reducer;
