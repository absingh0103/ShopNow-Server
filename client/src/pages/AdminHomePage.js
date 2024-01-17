import React from "react";
import NavBar from "../features/Navbar/NavBar";
import NavbarDash from "../features/Navbar/NavbarDash";
import AdminProductList from "../features/admin/components/AdminProductList";
import ProductBanner from "../features/product-list/components/ProductBanner";
import SearchProductPage from "./SearchProductPage";

// Here we Are Not Using React router Hence We use Children Prop to pass compones as chilren
// All the Componenet inside Navbar contains Navbar
const AdminHomePage = () => {
    return (
        <div><SearchProductPage></SearchProductPage>
            <ProductBanner></ProductBanner>
            <AdminProductList></AdminProductList>
        </div>
    );
};

export default AdminHomePage;
