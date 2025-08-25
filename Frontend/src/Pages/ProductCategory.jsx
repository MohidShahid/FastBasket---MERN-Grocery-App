import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';
import ProductCard from '../Components/ProductCard';

const ProductCategory = () => {
    const {category} = useParams();
    const { products } = useAppContext();
  return (
    <div className='flex flex-col mt-11 px-6 md:px-16 lg:px-24 xl:px-32 pb-10 gap-10'>
        <div className='flex flex-col items-end w-max'>
            <p className='uppercase text-2xl font-medium'>{category}</p>
            <div className='w-16 h-0.5 bg-[#E4553D] rounded-full'></div>
        </div>
        <div className='flex flex-wrap justify-between pt-3 gap-8'>
          {
            products.filter((product)=> product.category == category).map((product , index)=>{
                return <ProductCard product={product} key={index} />
            })
          }
        </div>
    </div>
  )
}

export default ProductCategory