import React, { useState } from "react";
const InputField = ({ placeholder, handleChange, address, name }) => {
  return (
    <input
      type={"text"}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-[#FF6347] transition"
      required
    />
  );
};

const AddAddress = () => {
  const [address, setAddress] = useState({
    fname: "",
    lname: "",
    email: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    street: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(address)
  };

  return (
    <div className="flex items-start mt-11 px-6 md:px-16 lg:px-24 xl:px-32">
      <div>
        <p className="text-3xl pt-6 text-gray-500">
          Add Shipping
          <span className="text-[#FF6347] font-semibold"> Address</span>
        </p>
        <div className="pt-5">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                placeholder={"First Name"}
                handleChange={handleChange}
                address={address}
                name={"fname"}
              />
              <InputField
                placeholder={"Last Name"}
                handleChange={handleChange}
                address={address}
                name={"lname"}
              />
            </div>
            <InputField
              placeholder={"Email"}
              handleChange={handleChange}
              address={address}
              name={"email"}
            />
            <InputField
              placeholder={"Street"}
              handleChange={handleChange}
              address={address}
              name={"street"}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                placeholder={"City"}
                handleChange={handleChange}
                address={address}
                name={"city"}
              />
              <InputField
                placeholder={"State"}
                handleChange={handleChange}
                address={address}
                name={"state"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                placeholder={"ZipCode"}
                handleChange={handleChange}
                address={address}
                name={"zipcode"}
              />
              <InputField
                placeholder={"Country"}
                handleChange={handleChange}
                address={address}
                name={"country"}
              />
            </div>
            <InputField
              placeholder={"Phone"}
              handleChange={handleChange}
              address={address}
              name={"phone"}
            />
            <button type="submit" className="w-full mt-6 bg-[#FF6347] text-white py-3 hover:bg-[#FF6347] transition cursor-pointer uppercase">Save Address </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
