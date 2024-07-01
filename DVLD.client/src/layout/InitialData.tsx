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
import { getLicenseClasses, setLicenseClasses } from "../redux/Slices/License";
import { getTestTypes, setTestTypes } from "../redux/Slices/Tests";
import {
  getApplicationTypes,
  setApplicationTypes,
} from "../redux/Slices/Applications";

const InitialData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { getItem } = useLocalStorage("token");
  const dispatch = useDispatch();
  const countries = useSelector(getAllCountries);
  const userInfo = useSelector(getCurrentUserInfo);
  const appClasses = useSelector(getLicenseClasses);
  const testTypesArr = useSelector(getTestTypes);
  const applicationTypesArr = useSelector(getApplicationTypes);
  const axios = usePrivate();
  useEffect(() => {
    const countryController = new AbortController();
    if (!getItem()) {
      navigate("/", { replace: true });
    }
    const fetchData = async () => {
      try {
        // * Getting all countries
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
  }, [axios, countries, dispatch, getItem, navigate]);
  useEffect(() => {
    const userController = new AbortController();
    const fetchUserInfo = async () => {
      try {
        // * Getting User information
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
  useEffect(() => {
    const userController = new AbortController();
    const fetchUserInfo = async () => {
      try {
        // * Getting Application classes
        const AppClasses = await axios.get("License/classes", {
          signal: userController.signal,
        });
        dispatch(setLicenseClasses(AppClasses?.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    appClasses ? setIsLoading(false) : fetchUserInfo();
    return () => userController.abort();
  }, [dispatch, axios, appClasses]);
  useEffect(() => {
    const fetching = async () => {
      try {
        // * Getting Test Types
        const data = await axios.get("Tests/Types");
        dispatch(setTestTypes(data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    testTypesArr ? setIsLoading(false) : fetching();
  }, [axios, dispatch, testTypesArr]);
  useEffect(() => {
    const fetching = async () => {
      try {
        // * getting application types
        const data = await axios.get("Applications/types");
        dispatch(setApplicationTypes(data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    applicationTypesArr ? setIsLoading(false) : fetching();
  }, [axios, dispatch, applicationTypesArr]);
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
