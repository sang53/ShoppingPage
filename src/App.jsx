import { Outlet } from "react-router";
import Header from "./components/Header/HeaderMain/Header";
import CartContextWrapper from "./contexts/CartContext/CartContextWrapper/CartContextWrapper";
import DataContextWrapper from "./contexts/Data/DataContextWrapper";
import "./styles.css";

function App() {
  return (
    <CartContextWrapper>
      <DataContextWrapper>
        <div id="main" className="flex-column-center gap-1rem relative">
          <Header />
          <Outlet />
        </div>
      </DataContextWrapper>
    </CartContextWrapper>
  );
}

export default App;
