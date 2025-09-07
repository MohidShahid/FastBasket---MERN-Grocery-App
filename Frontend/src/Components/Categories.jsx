import { Link } from "react-router-dom";
import { categories } from "../assets/greencart_assets/assets";

const Categories = () => {
  return (
    <div className="mt-11 flex flex-col gap-8">
      <h1 className="text-[#2B3441] text-3xl font-semibold">Categories</h1>
      <div className="grid lg:grid-cols-7 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {categories.map((category) => {
          return (
            <Link
            key={category.text}
              to={`/${category.text}`}
              className={`p-5 flex flex-col items-center justify-center`}
              style={{backgroundColor : category.bgColor}}
            >
              <img src={category.image} alt="" />
              <p>{category.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
