import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <>
    
      <Header/>
      <main className="py-3">
        <Container>
        <Routes>
            <Route exact path="/" element={ <HomeScreen/>}/>
            <Route  exact path="/product/:id" element={<ProductScreen/>}/>
          </Routes>
      </Container>
      </main>
      <Footer/>
      
    </>
  );
}

export default App;
