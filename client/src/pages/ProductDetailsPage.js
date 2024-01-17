import React from 'react'
import NavbarDash from '../features/Navbar/NavbarDash'
import ProductDetail from '../features/product-list/components/ProductDetails'
import SearchProductPage from './SearchProductPage'
const ProductDetailsPage = () => {
  return (
    <div>
        <SearchProductPage></SearchProductPage>
      <ProductDetail></ProductDetail>
    </div>
  )
}

export default ProductDetailsPage
