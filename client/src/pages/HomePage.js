import React from "react";
import NavBar from "../features/Navbar/NavBar";
import NavbarDash from "../features/Navbar/NavbarDash";
import ProductList from "../features/product-list/components/ProductList";
import ProductBanner from "../features/product-list/components/ProductBanner";
import SearchProductPage from "./SearchProductPage";

// Here we Are Not Using React router Hence We use Children Prop to pass compones as chilren
// All the Componenet inside Navbar contains Navbar
const Home = () => {
  return (
    <div>
      <SearchProductPage></SearchProductPage>
      <ProductBanner></ProductBanner>
      
        <ProductList></ProductList>
    </div>
  );
};

export default Home;
