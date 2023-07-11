import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";

function App() {
  return (
    <>

      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route exact path="/register" element={<RegisterScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/admin/userlist" element={<UserListScreen />} />
            <Route exact path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />


    </>
  );
}

export default App;
