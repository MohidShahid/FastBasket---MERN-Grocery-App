import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const {backendUrl , axios} = useAppContext();

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/order/orders');
      if(data.success){
        setOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-6 md:w-9/12 w-[100%]">
      <h2 className="text-2xl font-semibold text-gray-800">Orders List</h2>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition p-6 space-y-6"
          >
            {/* Order Header */}
            <div className="flex flex-wrap justify-between items-center gap-3">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Order ID:</span>{" "}
                {order._id}
              </p>
              <p className="px-3 py-1 text-xs rounded-full bg-[#ff6347]/10 text-[#ff6347] font-semibold">
                {order.isPaid ? "Paid" : "Pending"}
              </p>
            </div>

            {/* Order Items */}
            <div className="flex flex-col gap-4 max-h-60 overflow-y-auto pr-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 border-b last:border-b-0 pb-4"
                >
                  <img
                    className="w-14 h-14 object-cover rounded-md bg-gray-100 flex-shrink-0"
                    src={item.product.image[0] || boxIcon}
                    alt={item.product.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity:{" "}
                      <span className="font-medium">{item.quantity}</span>
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                    ${item.product.offerPrice * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="flex flex-col gap-6 md:grid md:grid-cols-3 text-sm text-gray-600">
              {/* Address */}
              <div>
                <p className="font-medium text-gray-800 mb-1">
                  Shipping Address
                </p>
                <p className="truncate">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="truncate">
                  {order.address.street}, {order.address.city}
                </p>
                <p className="truncate">
                  {order.address.state} {order.address.zipcode},{" "}
                  {order.address.country}
                </p>
                <p>{order.address.phone}</p>
              </div>

              {/* Payment */}
              <div>
                <p className="font-medium text-gray-800 mb-1">Payment</p>
                <p>Method: {order.paymentType}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`${
                      order.isPaid ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </span>
                </p>
              </div>

              {/* Date & Total */}
              <div className="flex flex-col items-start md:items-end justify-between">
                <p>
                  Date:{" "}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-lg font-bold text-[#ff6347] mt-2">
                  ${order.amount}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
