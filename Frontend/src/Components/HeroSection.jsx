import React from 'react'
import { assets } from "../assets/greencart_assets/assets";
import hero_banner from "../assets/greencart_assets/hero_banner.jpg";
import hero_banner_sm from "../assets/greencart_assets/hero_banner_sm.jpg";
import { useAppContext } from '../context/AppContext';

const HeroSection = () => {
  const {navigate} = useAppContext();
  return (
          <div className="relative h-auto">
            <img
              src={hero_banner}
              className="md:block hidden rounded-2xl w-full h-[70vh]"
              alt=""
            />
            <img src={hero_banner_sm} className="md:hidden rounded-2xl" alt="" />
            <div className="absolute md:top-1/4 top-2/4 text-white md:pl-12 pl-6 flex flex-col gap-14">
              <h1 className="text-4xl leading-14 font-bold text-white">Groceries Made Simple,<br /> Life Made Easy.</h1>
              <div className="flex gap-7">
                <button className="cursor-pointer px-8 py-2 bg-[#FF6347] hover:bg-[#e4553d] transition text-white "
                onClick={()=> navigate('/products')}>
                        Shop Now
                    </button>
                <button className="flex items-center justify-center gap-3.5">Explore deals <img src={assets.black_arrow_icon} className="" alt="" /></button>
              </div>
            </div>
          </div>
  )
}

export default HeroSection