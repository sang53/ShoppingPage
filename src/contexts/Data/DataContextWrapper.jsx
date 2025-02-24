import { useEffect, useState } from "react";
import Helpers from "../../Helper/Helpers";
import { Products } from "./DataContext";
import PropTypes from "prop-types";

export default function DataContextWrapper({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const newData = await Helpers.getProduct();
      if (useData) setData(newData);
    }
    let useData = true;
    getData();

    return () => (useData = false);
  }, []);

  return <Products.Provider value={data}>{children}</Products.Provider>;
}

DataContextWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
