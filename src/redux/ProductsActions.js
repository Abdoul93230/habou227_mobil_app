import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

const CACHE_DURATION = 3600 * 1000; // 1 heure en millisecondes

const fetchDataWithCache = async (url, cacheKey, dispatch, action) => {
  try {
    const cachedData = await AsyncStorage.getItem(cacheKey);
    const cacheTimestamp = await AsyncStorage.getItem(`${cacheKey}_timestamp`);

    // Si les données en cache sont encore valides, les utiliser
    if (cachedData && cacheTimestamp && new Date().getTime() < parseInt(cacheTimestamp) + CACHE_DURATION) {
      dispatch(action(JSON.parse(cachedData)));
    } else {
      // Requête API si les données ne sont pas en cache ou expirées
      const response = await axios.get(url);
      const data = response.data?.data || response.data; // Récupère les données selon leur emplacement

      // Vérifier que les données sont définies avant de les stocker
      if (data) {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(data));
        await AsyncStorage.setItem(`${cacheKey}_timestamp`, new Date().getTime().toString());
        dispatch(action(data));
      } else {
        console.log(`Données non disponibles pour la clé ${cacheKey}`);
      }
    }
  } catch (error) {
    console.log("Erreur lors de la récupération des données:", error);
  }
};



// Thunks avec logique de cache intégrée
export const getProducts = () => async (dispatch) => {
  await fetchDataWithCache(`${API_URL}/products`, "products_cache", dispatch, setProducts);
};

export const getTypes = () => async (dispatch) => {
  await fetchDataWithCache(`${API_URL}/getAllType`, "types_cache", dispatch, setTypes);
};

export const getCategories = () => async (dispatch) => {
  await fetchDataWithCache(`${API_URL}/getAllCategories`, "categories_cache", dispatch, setCategories);
};

export const getProducts_Pubs = () => async (dispatch) => {
  await fetchDataWithCache(`${API_URL}/productPubget`, "products_pubs_cache", dispatch, setProducts_Pubs);
};

export const getProducts_Commentes = () => async (dispatch) => {
  await fetchDataWithCache(`${API_URL}/getAllCommenteProduit`, "products_commentes_cache", dispatch, setProducts_Commentes);
};

// Slice Redux Toolkit pour la gestion des produits
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

export const { setProducts, setTypes, setCategories, setProducts_Pubs, setProducts_Commentes } = getSlice.actions;
export default getSlice.reducer;
