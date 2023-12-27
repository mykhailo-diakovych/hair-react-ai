import {
  CountryIso2,
  PhoneInput as IntlPhoneInput
} from "react-international-phone";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "antd";

import { GeolocationResponse } from "../../../interfaces/GeolocationResponse.interface";

export const PhoneInputBase = ({ ...props }) => {
  const [countryCode, setCountryCode] = useState<CountryIso2 | undefined>();

  const getCountryCode = async () => {
    const {
      data: { ip }
    } = await axios.get<any, { data: { ip: string } }>(
      "https://api.ipify.org?format=json",
      {
        timeout: 10000
      }
    );

    const {
      data: { country_code }
    } = await axios.get<any, { data: GeolocationResponse }>(
      `https://ipapi.co/${ip}/json/`
    );

    setCountryCode(country_code.toLowerCase() as CountryIso2);
  };

  useEffect(() => {
    getCountryCode();
  }, []);

  if (!countryCode) {
    return (
      <Skeleton.Input
        active
        style={{ width: "100%", height: 50, borderRadius: 8 }}
      />
    );
  }

  return <IntlPhoneInput defaultCountry={countryCode} {...props} />;
};
