import { useEffect, useState } from "react";
import usePrivate from "../../../hooks/usePrivate";
import {
  LicenseView,
  LocalDrivingLicenseInfo,
  ReplaceType,
} from "../../../Types/License";
import { useSelector } from "react-redux";
import { getCurrentUserInfo } from "../../../redux/Slices/Auth";
import { AxiosError } from "axios";
export const useGetLocalDrivingLicenseInfo = (appId?: number) => {
  const [licenseInfo, setLicenseInfo] = useState<LocalDrivingLicenseInfo>({
    licenseId: 0,
    dateOfBirth: "",
    driverId: 0,
    expireDate: "",
    fullName: "",
    gender: "",
    isActive: false,
    isDetained: false,
    issueDate: "",
    issueReason: "",
    licenseClass: "",
    nationalNo: "",
    notes: "",
    image: "",
  });
  const resetInfo = () =>
    setLicenseInfo({
      licenseId: 0,
      dateOfBirth: "",
      driverId: 0,
      expireDate: "",
      fullName: "",
      gender: "",
      isActive: false,
      isDetained: false,
      issueDate: "",
      issueReason: "",
      licenseClass: "",
      nationalNo: "",
      notes: "",
      image: "",
    });
  const axios = usePrivate();
  useEffect(() => {
    const fetchingLicenseInfo = async () => {
      try {
        const response = await axios.get(`License/local/${appId}`);
        setLicenseInfo(response.data);
      } catch (error) {
        resetInfo();
      }
    };
    appId ? fetchingLicenseInfo() : false;
  }, [appId, axios]);
  return licenseInfo as LocalDrivingLicenseInfo;
};
export const useGetAllLocalDrivingLicenses = (personId: number) => {
  const [allLicense, setAllLicense] = useState<LicenseView[]>([]);
  const axios = usePrivate();
  useEffect(() => {
    const fetchingLicenseInfo = async () => {
      try {
        const response = await axios.get(`License/local/All/${personId}`);
        setAllLicense(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingLicenseInfo();
  }, [axios, personId]);
  return allLicense;
};
export const useGetAllInternationalDrivingLicenses = (personId: number) => {
  const [allLicenses, setAllLicenses] = useState<LicenseView[]>([]);
  const axios = usePrivate();
  useEffect(() => {
    const fetchingLicenseInfo = async () => {
      try {
        const response = await axios.get(
          `License/International/All/${personId}`
        );
        setAllLicenses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchingLicenseInfo();
  }, [axios, personId]);
  return allLicenses;
};
export const useAddInternationalLicenseApplication = () => {
  const [newLicenseInfo, setNewLicenseInfo] = useState({
    applicationId: 0,
    licenseId: 0,
  });
  const [error, setError] = useState("");
  const axios = usePrivate();
  const user = useSelector(getCurrentUserInfo);
  const fetching = async (localLicenseId: number) => {
    try {
      const body = {
        licenseId: localLicenseId,
        createdByUserId: user?.id,
      };
      const response = await axios.post("License/international", body);
      setNewLicenseInfo({
        licenseId: response.data.licenseId,
        applicationId: response.data.applicationId,
      });
      setError("");
    } catch (error) {
      if ((error as AxiosError)?.response?.status == 409) {
        setError((error as AxiosError)?.response?.data as string);
      }
      setNewLicenseInfo({ applicationId: 0, licenseId: 0 });
    }
  };
  const resetError = () => setError("");
  return [fetching, { LicenseInfo: newLicenseInfo, error, resetError }] as [
    (localLicenseId: number) => Promise<void>,
    {
      LicenseInfo: {
        applicationId: number;
        licenseId: number;
      };
      error: string;
      resetError: () => void;
    }
  ];
};
export const useGetApplicationIdFromLicenseId = (id?: number) => {
  const [applicationId, setApplicationId] = useState(0);
  const axios = usePrivate();
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(`License/application/${id}`);
        setApplicationId(response.data);
      } catch (error) {
        setApplicationId(-1);
      }
    };
    id && id >= 0 ? fetching() : null;
  }, [axios, id]);
  return applicationId;
};
export const useRenewLicenseApplication = () => {
  type RenewLicenseApplicationProps = {
    notes: string;
    licenseId: number;
  };
  type NewLicenseInfo = {
    applicationId: number;
    licenseId: number;
  };
  const [licenseInfo, setLicenseInfo] = useState<NewLicenseInfo>();
  const [error, setError] = useState("");
  const axios = usePrivate();
  const user = useSelector(getCurrentUserInfo);
  const fetching = async ({
    licenseId,
    notes,
  }: RenewLicenseApplicationProps) => {
    try {
      const body = {
        licenseId,
        createdByUserId: user?.id,
        notes,
      };
      const response = await axios.post("License/Renew", body);
      setLicenseInfo({
        licenseId: response.data.licenseId,
        applicationId: response.data.applicationId,
      });
      setError("");
    } catch (error) {
      if (((error as AxiosError)?.response?.status as number) < 500)
        setError((error as AxiosError)?.response?.data as string);
      setLicenseInfo({ applicationId: 0, licenseId: 0 });
    }
  };
  const resetError = () => setError("");
  return [fetching, { LicenseInfo: licenseInfo, error, resetError }] as [
    (localLicenseId: RenewLicenseApplicationProps) => Promise<void>,
    {
      LicenseInfo: {
        applicationId: number;
        licenseId: number;
      };
      error: string;
      resetError: () => void;
    }
  ];
};
export const useReplaceLicenseApplication = () => {
  type ReplaceLicenseApplicationProps = {
    licenseId: number;
    type: ReplaceType;
  };
  type NewLicenseInfo = {
    applicationId: number;
    licenseId: number;
  };
  const [licenseInfo, setLicenseInfo] = useState<NewLicenseInfo>();
  const [error, setError] = useState("");
  const axios = usePrivate();
  const user = useSelector(getCurrentUserInfo);
  const fetching = async ({
    licenseId,
    type,
  }: ReplaceLicenseApplicationProps) => {
    try {
      const body = {
        licenseId,
        reasonType: type,
        createdByUserId: user?.id,
      };
      const response = await axios.post("License/Replace", body);
      setLicenseInfo({
        licenseId: response.data.licenseId,
        applicationId: response.data.applicationId,
      });
      setError("");
    } catch (error) {
      if (((error as AxiosError)?.response?.status as number) < 500)
        setError((error as AxiosError)?.response?.data as string);
      setLicenseInfo({ applicationId: 0, licenseId: 0 });
    }
  };
  const resetError = () => setError("");
  return [fetching, { LicenseInfo: licenseInfo, error, resetError }] as [
    (localLicenseId: ReplaceLicenseApplicationProps) => Promise<void>,
    {
      LicenseInfo: {
        applicationId: number;
        licenseId: number;
      };
      error: string;
      resetError: () => void;
    }
  ];
};
