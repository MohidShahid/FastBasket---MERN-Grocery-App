import React, { useEffect , useState} from "react";
import { assets } from "../assets/greencart_assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    setShowLogin,
    setSearchQuery,
    searchQuery,
    navigate,
    getCartCount,
    user,
    setUser,
    axios ,
    backendUrl
  } = useAppContext();
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to={"/"}>
        <div className="text-2xl font-bold">
          <i className="text-[#FF6347] text-4xl">F</i>
          <span className="text-[#2B3441]">astBasket</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link
          to={"/seller"}
          className="text-[12px] py-0.5 px-3 text-gray-500 border-gray-300 rounded-xl border-1 "
        >
          Seller Dashboard
        </Link>
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>All Product</Link>
        <Link to={"/contact"}>Contact</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={assets.search_icon} alt="cart" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.nav_cart_icon} alt="" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#FF6347] w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-[#FF6347] hover:bg-[#e4553d] transition text-white rounded-full"
            onClick={() => setShowLogin((prev) => !prev)}
          >
            Login
          </button>
        ) : (
          <div className="flex flex-col gap-2 group">
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 cursor-pointer "
            />
            <div className={`flex-col absolute gap-1.5 top-8/12 z-10 bg-white border-gray-300 rounded-2xl border-1 py-5 hidden group-hover:flex`}>
                <Link to={'/orders'} className="hover:bg-[#FFEFEC] pl-3.5 pr-5" >My Orders</Link>
                <Link className="hover:bg-[#FFEFEC] pl-3.5 pr-5" onClick={async()=>{
                    try {
                       const {data} = await axios.get(backendUrl + '/api/user/logout');
                       console.log(data);
                       if(data.success){
                        toast.success(data.message);
                        setUser(null);
                       }else{
                        toast.error(data.message);
                       }
                    } catch (error) {
                        toast.error(error.message);
                    }
                }}>Logout</Link>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] z-30 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"} className="block">
          Home
        </Link>
        <Link to={"/about"} className="block">
          About
        </Link>
        <Link to={"/products"} className="block">
          All Products
        </Link>
        {user && <Link to={'/orders'} className="block mb-2.5" >My Orders</Link>}
        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-[#FF6347] hover:bg-[#e4553d] transition text-white rounded-full"
            onClick={() => setShowLogin((prev) => !prev)}
          >
            Login
          </button>
        ) : (
          <button
            className="cursor-pointer px-8 py-2 bg-[#FF6347] hover:bg-[#e4553d] transition text-white rounded-full"
            onClick={async() =>{
              try {
                       const {data} = await axios.get(backendUrl + '/api/user/logout');
                       console.log(data);
                       if(data.success){
                        toast.success(data.message);
                        setUser(null);
                       }else{
                        toast.error(data.message);
                       }
                    } catch (error) {
                        toast.error(error.message);
                    }
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
