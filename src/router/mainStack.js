import Address from '../screens/address';
import Chat from '../screens/chat';
import EditAccount from '../screens/editAcount';
import ListOrder from '../screens/orders';
import GetBill from '../screens/orders/bill';
import GetDetailOrder from '../screens/orders/detail';
import DoneOrder from '../screens/orders/done';
import ProductDetail from '../screens/products/detail';
import ProductAllPopular from '../screens/products/popular/show';
import ProductAllSeller from '../screens/products/selling/show';
import Search from '../screens/search';
import DrawerNavigate from './drawer';

export default function (Stack) {
  return (
    <>
      <Stack.Screen name="DrawerNavigate" component={DrawerNavigate} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductAllSeller" component={ProductAllSeller} />
      <Stack.Screen name="EditAccount" component={EditAccount} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="GetBill" component={GetBill} />
      <Stack.Screen name="ListOrder" component={ListOrder} />
      <Stack.Screen name="GetDetailOrder" component={GetDetailOrder} />
      <Stack.Screen name="ProductAllPopular" component={ProductAllPopular} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="DoneOrder" component={DoneOrder} />
    </>
  );
}
