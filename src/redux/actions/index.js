import API from '../../api';
import {REQUEST_API} from '../../api/method';
import {AlertOnly} from '../../components/alert';
import store from '../store';
import types from '../types';

export const saveUserData = data => {
  store.dispatch({
    type: types.USERDATA,
    payload: data,
  });
};

export const saveProductData = data => {
  store.dispatch({
    type: types.PRODUCTS,
    payload: data,
  });
};
export const saveCategoryData = data => {
  store.dispatch({
    type: types.CATEGORIES,
    payload: data,
  });
};
export const saveCartData = data => {
  store.dispatch({
    type: types.CART,
    payload: data,
  });
};
export const saveFavoriteData = data => {
  store.dispatch({
    type: types.FAVORITES,
    payload: data,
  });
};
export const saveAddressData = data => {
  store.dispatch({
    type: types.ADRESS,
    payload: data,
  });
};
// API
export const addToCart = async data => {
  try {
    const url = API.addToCart();
    const [res] = await Promise.all([
      REQUEST_API({
        url: url,
        method: 'post',
        data: {
          product_id: data.product_id,
          customer_id: data.customer_id,
          quantity: data.quantity,
          total_money: data.total_money,
          add_cart: data.add_cart,
        },
      }),
    ]);
    if (res.message) {
      AlertOnly(res.message);
    } else {
      AlertOnly(res.message);
    }
  } catch (error) {
    AlertOnly(error.message);
  }
};
export const addToFavorite = async data => {
  try {
    const url = API.addToFavorite();
    const [res] = await Promise.all([
      REQUEST_API({
        url: url,
        method: 'post',
        data: {
          product_id: data.product_id,
          customer_id: data.customer_id,
        },
      }),
    ]);
    if (res.message) {
      AlertOnly(res.message);
    } else {
      AlertOnly(res.message);
    }
  } catch (error) {
    AlertOnly(error.message);
  }
};
export const getDataCart = async customer_id => {
  try {
    const url = API.cart(customer_id);
    const [res] = await Promise.all([
      REQUEST_API({
        url: url,
        method: 'get',
      }),
    ]);
    if (res.data) {
      saveCartData(res.data);
    } else {
      AlertOnly(res.msg);
    }
  } catch (error) {
    AlertOnly(error.message);
  }
};
export const getDataFavorite = async customer_id => {
  try {
    const url = API.getFavorite(customer_id);
    const [res] = await Promise.all([
      REQUEST_API({
        url: url,
        method: 'get',
      }),
    ]);
    if (res.data) {
      saveFavoriteData(res.data);
    } else {
      AlertOnly(res.msg);
    }
  } catch (error) {
    AlertOnly(error.message);
  }
};
export const getAddress = async (id) => {
  try {
    const url = API.getAddress(id);
    const [res] = await Promise.all([
      REQUEST_API({
        url: url,
        method: 'get',
      }),
    ]);
    if (res.data) {
      saveAddressData(res.data);
    } else {
      AlertOnly(res.msg);
    }
  } catch (error) {
    AlertOnly(error.message);
  } 
};