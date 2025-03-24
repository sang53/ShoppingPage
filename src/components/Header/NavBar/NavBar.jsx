import { NavLink } from "react-router";
import classes from "./NavBar.module.css";
import { use } from "react";
import { CartItems } from "../../../contexts/CartContext/CartContext";

export default function NavBar() {
  const cartSize = Object.keys(use(CartItems)).length;
  return (
    <nav className={"flex-center no-select " + classes.navBar}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navButton
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/categories"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navButton
        }
      >
        Categories
      </NavLink>
      <NavLink
        to="/products"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navButton
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? classes.active : classes.navButton
        }
      >
        Cart({cartSize})
      </NavLink>
    </nav>
  );
}
