import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import ProductCard from '../Components/ProductCard';

const AllProducts = () => {
    const [filterProducts , setFilterProducts] = useState([]);
    const {searchQuery , products} = useAppContext();
    useEffect(()=>{
      if(searchQuery.length > 0){
        setFilterProducts(products.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))}else{
        setFilterProducts(products);
      }
    },[products , searchQuery])
  return (
    <div className='flex flex-col mt-11 px-6 md:px-16 lg:px-24 xl:px-32 pb-10 gap-10'>
        <div className='flex flex-col items-end w-max'>
            <p className='uppercase text-2xl font-medium'>All Products</p>
            <div className='w-16 h-0.5 bg-[#E4553D] rounded-full'></div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-3 md:gap-6 lg:grid-cols-5 justify-between pt-3'>
          {
            filterProducts.filter((product)=> product.inStock).map((product , index)=>{
             return <ProductCard key={index} product={product} />
            })
          }
        </div>
    </div>
  )
}

export default AllProducts