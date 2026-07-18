import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput, {
  isValidPhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Icon } from "@iconify/react";
import { lgas } from "../../../states/lgas";
import { states } from "../../../states";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define validation schema with yup
const schema = yup.object().shape({
  guardianFullName: yup
    .string()
    .required("Full Name is required")
    .trim(),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email Address is required"),
  phone: yup
    .string()
    .required("Phone Number is required")
    .test(
      "isValidPhoneNumber",
      "Invalid phone number",
      (value) => value && isValidPhoneNumber(value)
    ),
  // phone: yup
  //   .string()
  //   .test(
  //     'isValidPhoneNumber',
  //     'Invalid phone number',
  //     (value) => value ? isValidPhoneNumber(value) : true // Allow empty values
  //   ),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  lga: yup.string().required("LGA is required"),
  // lga: yup.string().nullable() // Allow LGA to be optional
});

export default function InivitedParentGuardianForm({
  onSubmit,
  initialData,
  email,
  s,
}) {
  const [countryCode, setCountryCode] = useState(getCountryCallingCode("NG"));
  const [countries, setCountries] = useState([]);
  const [isNigeria, setIsNigeria] = useState(
    initialData?.country === "Nigeria"
  );
  const [availableLGAs, setAvailableLGAs] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      country: "Nigeria", // Set default country to Nigeria
    },
  });

  useEffect(() => {
    if (initialData) {
      // Update form values when initialData changes
      setValue("guardianFullName", initialData.guardianFullName || "");
      setValue("email", initialData.email || email);
      setValue(
        "phone",
        s === "Children's International School"
          ? "+2349062684338"
          : initialData.phone
            ? initialData.phone
            : ""
      );
      setValue(
        "country",
        initialData.country !== "N/A" ? initialData.country : "Nigeria"
      );
      setValue(
        "state",
        initialData.state !== "N/A" ? initialData.state : "Lagos"
      );
      setValue(
        "lga",
        initialData.lga
          ? initialData.lga
          : s !== "Children's International School"
            ? ""
            : "Lagos Island"
      );
    }
  }, [initialData, email, setValue]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedData = data.sort((a, b) => {
          const nameA = a.name.common.toUpperCase();
          const nameB = b.name.common.toUpperCase();
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        });
        setCountries(sortedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (isNigeria && watch("state")) {
      setAvailableLGAs(lgas[watch("state")] || []);
    } else {
      setAvailableLGAs([]);
    }
  }, [isNigeria, watch("state")]);

  useEffect(() => {
    setIsNigeria(watch("country") === "Nigeria");
  }, [watch("country")]);

  const submitHandler = (data) => {
    // Example: Add a default phone number and LGA if the user is from Nigeria and hasn't entered them
    if (s === "Children's International School") {
      if (!data.phone) {
        data.phone = "+2349062684338"; // Default phone number for Nigerian users
      }
      if (!data.lga) {
        data.lga = "Lagos Island"; // Default LGA for Nigerian users
      }
    } else {
      if (!data.phone) return toast.error("Please enter a valid phone number!");
      if (!data.lga) return toast.error("lga is required!");
    }
    onSubmit(data);
  };

  return (
    <div
      className="registration-page overflow-hidden"
      style={{ height: "400px" }}
    >
      <div className="top-section mt-2">
        <h2 className="d-flex justify-content-between align-center">
          Parent/Guardian Information
          <Icon
            icon="radix-icons:cross-1"
            onClick={() => navigate("/", { replace: true })}
            width={24}
          />
        </h2>
        <hr />
        <span>*Indicates Required</span>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="form-section">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="Type here..."
              {...register("guardianFullName")}
            />
            {errors.guardianFullName && (
              <p className="error-message">{errors.guardianFullName.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="Type here..."
              {...register("email")}
              disabled // Disable the input field
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <div className="flex-code-input">
              <PhoneInput
                placeholder="Enter phone number"
                value={watch("phone")} // Watch and use the form's phone value
                onChange={(val) =>
                  setValue("phone", val, { shouldValidate: true })
                }
                defaultCountry="NG" // Default to Nigeria
                onCountryChange={(country) => {
                  if (country) {
                    setCountryCode(getCountryCallingCode(country));
                  }
                }}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "1px",
                }}
              />
              {countryCode && (
                <span
                  style={{ color: "#5b616a" }}
                  className="country-code register"
                >
                  +{countryCode}
                </span>
              )}
            </div>
            {errors.phone && (
              <p className="error-message">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Country *</label>
            <select {...register("country")}>
              <option value="Nigeria">Nigeria</option>
              {countries.map((country) => (
                <option key={country.cca2} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="error-message">{errors.country.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>State *</label>
            {isNigeria ? (
              <select {...register("state")}>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Type here..."
                {...register("state")}
              />
            )}
            {errors.state && (
              <p className="error-message">{errors.state.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>LGA *</label>
            {isNigeria && availableLGAs.length > 0 ? (
              <select {...register("lga")}>
                <option value="">Select LGA</option>
                {availableLGAs.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder="Type here..."
                {...register("lga")}
              />
            )}
            {errors.lga && (
              <p className="error-message">{errors.lga.message}</p>
            )}
          </div>
        </div>
        <div style={{ width: "30%", margin: "1.2rem auto", marginTop: "3rem" }}>
          <button
            style={{
              backgroundColor: "#275DAD",
              borderRadius: "5px",
              color: "#fff",
              border: "none",
              padding: ".3rem ",
              display: "block",
              width: "100%",
            }}
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
