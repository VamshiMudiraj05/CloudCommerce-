import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";

const SignUp = () => {
  // ============= Initial State ================
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);

  // ============= Error State ==================
  const [errorMessages, setErrorMessages] = useState({
    clientName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });
  
  const [successMsg, setSuccessMsg] = useState("");

  // ============= Event Handlers ================
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessages((prev) => ({ ...prev, [setter.name]: "" }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      const newErrors = {};
      if (!clientName) newErrors.clientName = "Enter your name";
      if (!email) {
        newErrors.email = "Enter your email";
      } else if (!EmailValidation(email)) {
        newErrors.email = "Enter a valid email";
      }
      if (!phone) newErrors.phone = "Enter your phone number";
      if (!password) {
        newErrors.password = "Create a password";
      } else if (password.length < 6) {
        newErrors.password = "Passwords must be at least 6 characters";
      }
      if (!address) newErrors.address = "Enter your address";
      if (!city) newErrors.city = "Enter your city name";
      if (!country) newErrors.country = "Enter your country";
      if (!zip) newErrors.zip = "Enter the zip code of your area";

      setErrorMessages(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setSuccessMsg(`Hello dear ${clientName}, Welcome to Cloud Commerce Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`);
        
        // Resetting the form fields
        setClientName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
        setCity("");
        setCountry("");
        setZip("");
      }
    }
  };

  // ============= Email Validation ==============
  const EmailValidation = (email) => {
    return String(email).toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">Get started for free</h1>
            <p className="text-base">Create your account to access more</p>
          </div>
          {["Get started fast with Cloud Commerce", "Access all Cloud Commerce services", "Trusted by online shoppers"].map((text, index) => (
            <div className="w-[300px] flex items-start gap-3" key={index}>
              <span className="text-green-500 mt-1"><BsCheckCircleFill /></span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">{text}</span>
                <br />
                Experience the best online shopping experience with Cloud Commerce.
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">© Cloud Commerce</p>
            {["Terms", "Privacy", "Security"].map((item, index) => (
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">{successMsg}</p>
            <Link to="/signin">
              <button className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">Sign in</button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center" onSubmit={handleSignUp}>
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">Create your account</h1>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Full Name", value: clientName, setter: setClientName, error: errorMessages.clientName },
                  { label: "Work Email", value: email, setter: setEmail, error: errorMessages.email },
                  { label: "Phone Number", value: phone, setter: setPhone, error: errorMessages.phone },
                  { label: "Password", value: password, setter: setPassword, error: errorMessages.password, type: "password" },
                  { label: "Address", value: address, setter: setAddress, error: errorMessages.address },
                  { label: "City", value: city, setter: setCity, error: errorMessages.city },
                  { label: "Country", value: country, setter: setCountry, error: errorMessages.country },
                  { label: "Zip/Postal code", value: zip, setter: setZip, error: errorMessages.zip },
                ].map(({ label, value, setter, error, type = "text" }, index) => (
                  <div className="flex flex-col gap-.5" key={index}>
                    <p className="font-titleFont text-base font-semibold text-gray-600">{label}</p>
                    <input
                      onChange={handleChange(setter)}
                      value={value}
                      className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                      type={type}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {error && (
                      <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                        <span className="font-bold italic mr-1">!</span>{error}
                      </p>
                    )}
                  </div>
                ))}
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the Cloud Commerce <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  type="submit"
                  className={`${
                    checked
                      ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
