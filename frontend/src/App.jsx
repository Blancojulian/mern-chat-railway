import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
//import Header1 from "./components/Header1";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <>
      <Header></Header>
      <ToastContainer />
      <Container className="contenido my-2">
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default App;
