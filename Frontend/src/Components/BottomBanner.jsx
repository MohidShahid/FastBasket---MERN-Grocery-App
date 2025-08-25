import { features } from '../assets/greencart_assets/assets';
import bottom_banner_red from '../assets/greencart_assets/bottom_banner_red.png';

const BottomBanner = () => {
  return (
    <div className='flex flex-col-reverse md:gap-0 gap-52  md:flex-row md:items-center items-start md:pl-0 pl-8 w-full rounded-2xl justify-around bg-gradient-to-r from-[#FF5050] to-[#ff514b] my-28 pt-9 px-6'>
      <img src={bottom_banner_red} className='md:w-1/2 w-full' alt="" />
      
      <div className="flex flex-col gap-3">
        <h1 className='text-3xl py-5 text-[#2B3441] font-bold'>Why we are the best?</h1>
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3.5">
            <feature.icon size={40} color={'#ffffff'} />
            <div className="flex flex-col">
              <h3 className='text-xl text-white font-semibold'>{feature.title}</h3>
              <p className='text-[#f2f2f2]'>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BottomBanner;
