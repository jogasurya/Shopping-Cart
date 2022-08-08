import React from 'react'
import { CartState } from '../Context/Context'
import SingleProduct from './SingleProduct';
import "./Styles.css";
import Filters from './Filters';

 
const Home = () => {
const {state: {products}, 
productState: {sort, byStock, byFastDelivery, byRating, searchQuery},
}  = CartState()
   console.log(byFastDelivery);
const transfromProducts =() => {
  let sortedProducts = products;

  if(sort) {
    sortedProducts = sortedProducts.sort((a,b) => (
      sort==='lowToHigh' ?a.price - b.price : b.price - a.price
    ))
  }
  if (!byStock) {
    sortedProducts = sortedProducts.filter((prod) => prod.inStock);
  }

if (byFastDelivery) {
  sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
}

if (byRating) {
  sortedProducts = sortedProducts.filter((prod) => prod.rating >=byRating);
}

if (searchQuery) {
  sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery));
}
    return sortedProducts;
};
   return (
    <div className='home'>
      <Filters/>
      <div className='productContainer'>
          {
            transfromProducts().map((prod) => {
             return <SingleProduct prod={prod} key={prod.id}/>
            })
            
          }
      </div>
    </div>
  )
}

export default Home;
