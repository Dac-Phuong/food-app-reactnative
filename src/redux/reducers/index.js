import {combineReducers} from 'redux';
import authReducer from './auth';
import products from './products';
import category from './category';
import cartReducer from './cartReducer';
import favoriteReducer from './favoriteReducer';
import addressReducer from './addressReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  products: products,
  category: category,
  cartReducer: cartReducer,
  favoriteReducer: favoriteReducer,
  addressReducer: addressReducer,
});

export default rootReducer;