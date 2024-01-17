import React from 'react'
import NavbarDash from '../features/Navbar/NavbarDash'
import SearchProductPage from './SearchProductPage'
import AdminProductDetails from "../features/admin/components/AdminProductDetails"
const AdminProductDetailsPage = () => {
    
    return (
        <div><SearchProductPage></SearchProductPage>
            <AdminProductDetails></AdminProductDetails>
        </div>
    )
}

export default AdminProductDetailsPage;
