import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

export default function ParentGuardianFormModal({
  onSubmit,
  setStep,
  onClose,
  initialData,
}) {
  const [countryCode, setCountryCode] = useState(getCountryCallingCode("NG"));
  const [countries, setCountries] = useState([]);
  const [isNigeria, setIsNigeria] = useState(
    initialData?.country === "Nigeria"
  );
  const [availableLGAs, setAvailableLGAs] = useState([]);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    guardianFullName: yup
      .string()
      .required("Full Name is required")
      .test(
        "is-three-words-or-less",
        "Full Name must contain between 1 and 3 words",
        (value) => value && value.trim().split(/\s+/).length <= 3
      )
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
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    lga: yup.string().required("LGA is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  const selectedCountry = watch("country");
  const selectedState = watch("state");

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
    if (isNigeria && selectedState) {
      setAvailableLGAs(lgas[selectedState] || []);
    } else {
      setAvailableLGAs([]);
    }
  }, [isNigeria, selectedState]);

  useEffect(() => {
    setIsNigeria(selectedCountry === "Nigeria");
  }, [selectedCountry]);

  const submitHandler = (data) => {
    onSubmit(data);
  };

  return (
    <div
      className="registration-page overflow-hidden"
      // style={{ height: "fit-content" }}
    >
      <div className="top-section mt-2">
        <h2 className="d-flex justify-content-between align-center">
          Parent/Guardian Information
          <Icon icon="radix-icons:cross-1" onClick={onClose} width={24} />
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
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <div className="flex-code-input">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    placeholder="Enter phone number"
                    {...field}
                    onCountryChange={(country) => {
                      field.onChange("");
                      setCountryCode(getCountryCallingCode(country));
                    }}
                    defaultCountry="NG"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "1px",
                    }}
                  />
                )}
              />
              {countryCode && (
                <span style={{ color: "#5b616a" }} className="country-code">
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
