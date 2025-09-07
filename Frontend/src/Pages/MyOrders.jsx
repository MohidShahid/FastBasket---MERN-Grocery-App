import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency , axios , backendUrl, user} = useAppContext();
  console.log(user)
  const fetchOrders = async () => {
       try {
      const {data} = await axios.post(backendUrl + '/api/order/user-orders' , {userId : user._id});
      if(data.success){
        setMyOrders(data.orders);
        console.log(data.orders);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if(user && user._id){
      fetchOrders();
    }
  }, []);

  return (
    <div className="mt-16 pb-16 px-6 md:px-16 lg:px-24 xl:px-32 gap-10">
      {/* Heading */}
      <div className="flex flex-col items-start mb-10">
        <p className="text-2xl uppercase font-semibold text-gray-800">
          My Orders
        </p>
        <div className="w-20 h-0.5 bg-[#FF6347] rounded-full mt-1"></div>
      </div>

      {/* Orders List */}
      {myOrders.length > 0 ? (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm mb-10 p-6 max-w-5xl bg-white hover:shadow-md transition"
          >
            {/* Order Header */}
            <div className="flex flex-wrap justify-between items-center text-sm md:text-base text-gray-500 font-medium mb-6 gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                Order ID:{" "}
                <span className="font-semibold text-gray-700">
                  {order._id}
                </span>
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg">
                Payment:{" "}
                <span className="font-semibold text-gray-700">
                  {order.paymentType}
                </span>
              </span>
              <span className="bg-[#FF6347]/10 px-3 py-1 rounded-lg text-[#FF6347] font-semibold">
                Total: {currency}
                {order.amount}
              </span>
            </div>

            {/* Order Items */}
            <div className="space-y-6">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center border-b pb-6 last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="flex justify-center">
                    <div className="bg-[#ff6347]/10 p-3 rounded-lg">
                      <img
                        src={item.product.image[0]}
                        className="w-20 h-20 object-cover rounded-md"
                        alt={item.product.name}
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="col-span-2 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Category: {item.product.category}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Status:{" "}
                      <span className="font-medium text-[#FF6347]">
                        {order.status}
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      Date:{" "}
                      <span className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Quantity:{" "}
                      <span className="font-medium text-gray-700">
                        {item.quantity || "1"}
                      </span>
                    </p>
                    <p className="text-lg font-semibold text-[#FF6347] mt-2">
                      {currency}
                      {item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
