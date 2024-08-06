import { useMemo, useState } from "react";
import SearchWithFilters, {
  Filters,
} from "../../components/UI/SearchWithFilters";
import DataTable from "../../components/DataTable.Server";
import { FilterOptions } from "../../Types/Shared";
import { DetainPageColumns } from "./Detain.columns";
import { useGetPaginatedEntity } from "../../hooks/FetchPaginatedEntity";
import { DetainedLicensesView } from "../../Types/License";
import { Button, Modal } from "@mui/material";
import ReleaseLicense from "../../components/Modals/Licenses/ReleaseLicense/ReleaseLicense";
import LocalLicenseInfo from "../../components/Modals/Licenses/LocalLicenseInfo";
import { useGetApplicationIdFromLicenseId } from "../../components/Modals/Licenses/License.hooks";
import DetainLicense from "../../components/Modals/Licenses/Detain/DetainLicense";

const filters: Filters = [
  {
    key: "None",
    value: "",
  },
  {
    key: "Detain Id",
    value: "id",
  },
  {
    key: "Is Released",
    value: "releaseApplicationId",
  },
  {
    key: "Full Name",
    value: "fullName",
  },
  {
    key: "National No",
    value: "nationalNo",
  },
  {
    key: "Release Id",
    value: "releaseApplicationId",
  },
];

const DetainLicensesPage = () => {
  const [paginationOptions, setPaginationOptions] = useState<FilterOptions>({
    searchTermKey: "",
    searchTermValue: "",
    page: 1,
    pageSize: 10,
    orderBy: 1,
  });
  const [openRelease, setOpenRelease] = useState<boolean>(false);
  const [openDetain, setOpenDetain] = useState<boolean>(false);
  const [openLicenseInfo, setOpenLicenseInfo] = useState<boolean>(false);
  const [currentLicensesId, setCurrentLicensesId] = useState<number>();
  const handleReleaseLicense = (id: number) => {
    setCurrentLicensesId(id);
    setOpenRelease(true);
  };
  const handleLicenseInfo = (id: number) => {
    setCurrentLicensesId(id);
    setOpenLicenseInfo(true);
  };
  const memoisedColumns = useMemo(
    () =>
      DetainPageColumns({
        filterOptions: paginationOptions,
        handleFilterOptions: setPaginationOptions,
        handleReleaseLicense,
        handleLicenseInfo,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationOptions.orderBy]
  );
  const { entity: detainLicenses, pageOptions } =
    useGetPaginatedEntity<DetainedLicensesView>(
      paginationOptions,
      "License/Detain/info"
    );
  const applicationId = useGetApplicationIdFromLicenseId(currentLicensesId);
  const refreshData = () => {
    setPaginationOptions((p) => ({
      ...p,
      searchTermValue: (p.searchTermValue += " "),
      searchTermKey: "",
    }));
  };
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex justify-between mt-10 mb-5">
        <SearchWithFilters
          filters={filters}
          options={paginationOptions}
          setOptions={setPaginationOptions}
        />
        <div className="mr-5">
          <Button
            sx={{
              mr: "10px",
            }}
            variant="contained"
            color="error"
            onClick={() => setOpenDetain(true)}
          >
            Detain
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setCurrentLicensesId(undefined);
              setOpenRelease(true);
            }}
          >
            Release
          </Button>
        </div>
      </div>
      <DataTable
        handleFiltersChange={setPaginationOptions}
        Data={detainLicenses}
        column={memoisedColumns}
        pages={pageOptions}
      />
      <Modal
        open={openRelease}
        onClose={() => {
          setOpenRelease(false);
          refreshData();
        }}
      >
        <div>
          <ReleaseLicense
            handleClose={() => {
              setOpenRelease(false);
              refreshData();
            }}
            license={currentLicensesId}
          />
        </div>
      </Modal>
      <Modal open={openLicenseInfo} onClose={() => setOpenLicenseInfo(false)}>
        <div className="ModalBox">
          <LocalLicenseInfo applicationId={applicationId} />
        </div>
      </Modal>
      <Modal
        open={openDetain}
        onClose={() => {
          setOpenLicenseInfo(false);
          refreshData();
        }}
      >
        <div>
          <DetainLicense
            handleClose={() => {
              setOpenDetain(false);
              refreshData();
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DetainLicensesPage;
