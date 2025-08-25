import ProductCard from "./ProductCard"
import { useAppContext } from "../context/AppContext";
const BestSeller = () => {
  const {products , navigate} = useAppContext();
  return (
   <div className="flex flex-col gap-8 mt-11">
    <h1 className="text-[#2B3441] text-3xl font-semibold">Best Sellers</h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-8 gap-x-3 md:gap-6 lg:grid-cols-5 justify-between pt-3">
    {
    products.filter((product)=> product.inStock).slice(0,5).map((product , index)=>(
      <ProductCard key={index} product={product} />
    ))
    }
    </div>
    <button className="mx-auto cursor-pointer px-12 mt-16 py-2.5 border-rounded border border-[#FF9F88] text-primary hover:bg-[#FF9F88]/10 transition text-[#FF6347]" onClick={()=> navigate('/products')}>See More</button>
   </div>
  )
}

export default BestSeller