import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, setAllCountries } from "../redux/Slices/Countries";
import axios from "../Api/Axios";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Loading from "../components/UI/Loading";

const InitialData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const countries = useSelector(getAllCountries);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const allCountries = await axios.get("/Country", {
          signal: controller.signal,
        });
        dispatch(setAllCountries(allCountries.data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    countries ? setIsLoading(false) : fetchData();
    return () => controller.abort();
  }, [countries, dispatch]);
  return (
    <React.Fragment>
      <Header />
      <div style={{ minHeight: "calc(100vh - 100px)" }}>
        {isLoading ? <Loading color="warning" /> : <Outlet />}
      </div>
    </React.Fragment>
  );
};

export default InitialData;
