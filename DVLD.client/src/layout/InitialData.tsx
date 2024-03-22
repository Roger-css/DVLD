import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, setAllCountries } from "../redux/Slices/Countries";
import usePrivate from "../hooks/usePrivate";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Loading from "../components/UI/Loading";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "../hooks/useLocalStorage";
import { getCurrentUserInfo, setUserInfo } from "../redux/Slices/Auth";
import {
  getApplicationTypes,
  setApplicationTypes,
} from "../redux/Slices/Applications";

const InitialData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getItem } = useLocalStorage("token");
  const dispatch = useDispatch();
  const countries = useSelector(getAllCountries);
  const userInfo = useSelector(getCurrentUserInfo);
  const applicationTypes = useSelector(getApplicationTypes);
  const navigate = useNavigate();
  const axios = usePrivate();
  useEffect(() => {
    const countryController = new AbortController();
    const fetchData = async () => {
      try {
        // Getting all countries
        const allCountries = await axios.get("/Country", {
          signal: countryController.signal,
        });
        dispatch(setAllCountries(allCountries?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    countries ? setIsLoading(false) : fetchData();
    return () => countryController.abort();
  }, [axios, countries, dispatch, navigate]);
  useEffect(() => {
    const appTypesController = new AbortController();
    const fetchAppTypes = async () => {
      try {
        const appTypes = await axios.get("Applications/types", {
          signal: appTypesController.signal,
        });
        dispatch(setApplicationTypes(appTypes?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    applicationTypes ? setIsLoading(false) : fetchAppTypes();
    return () => appTypesController.abort();
  }, [dispatch, navigate, axios, applicationTypes]);
  useEffect(() => {
    const userController = new AbortController();
    const fetchUserInfo = async () => {
      try {
        // Getting User information
        const { sub } = jwtDecode(getItem());
        const body = {
          SearchTermKey: "Id",
          SearchTermValue: sub,
        };
        const userInfo = await axios.post("User/Get/single", body, {
          signal: userController.signal,
        });
        dispatch(setUserInfo(userInfo?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    userInfo ? setIsLoading(false) : fetchUserInfo();
    return () => userController.abort();
  }, [dispatch, navigate, axios, userInfo, getItem]);
  return (
    <React.Fragment>
      <Header />
      <div id="mainBody" style={{ minHeight: "calc(100vh - 100px)" }}>
        {isLoading ? <Loading color="warning" /> : <Outlet />}
      </div>
    </React.Fragment>
  );
};

export default InitialData;
