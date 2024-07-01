import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import usePrivate from "../../hooks/usePrivate";
import { localDrivingLA_view } from "../../Types/Applications";
import DataTable from "../../components/DataTable.Server";
import LdlaWithPersonDetails from "../../components/Modals/LdlaWithPersonDetails";
import TestAppointment from "../../components/Modals/TestAppointment";
import IssueDrivingLicense from "../../components/Modals/IssueDrivingLicense";
import Actions from "./Actions";
import LocalLicenseInfo from "../../components/Modals/Licences/LicenseInfo";
import LicenseHistory from "../../components/Modals/Licences/LicenseHistory";
import ShortDateString from "../../Utils/ShortDateString";
import { PageOptions, FilterOptions } from "../../Types/Shared";
interface Filters {
  [key: string]: string;
  none: string;
  Id: string;
  NationalNo: string;
  FullName: string;
  Status: string;
}
const FilterMode: Filters = {
  none: "None",
  Id: "Id",
  FullName: "Full Name",
  NationalNo: "National No",
  Status: "Status",
};
const OrderBy = {
  asc: 1,
  desc: 2,
};
const allFilters = () => {
  const arrOfFilters = [];
  for (const key in FilterMode) {
    arrOfFilters.push(FilterMode[key]);
  }
  return arrOfFilters;
};
const LocalDrivingLicenseApplication = () => {
  const { asc, desc } = OrderBy;
  const [filter, setFilter] = useState<keyof Filters>(FilterMode.none);
  const [openLdlaModal, setOpenLdlaModal] = useState<boolean>(false);
  const [openIssueDrivingLicenseModal, setOpenIssueDrivingLicenseModal] =
    useState<boolean>(false);
  const [openTestsModal, setOpenTestsModal] = useState<boolean>(false);
  const [openLicenseInfoModal, setOpenLicenseInfoModal] =
    useState<boolean>(false);
  const [licenseHistoryModal, setLicenseHistoryModal] = useState(false);
  const [modalData, setModalData] = useState<number | null>(null);
  const [testsModalData, setTestsModalData] = useState<{
    passedTests: number;
    id: number;
    testTypeId: number;
  } | null>(null);
  const [filterText, setFilterText] = useState("");
  const Debounced = useDebounce(filterText);
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [DataSet, setDataSet] = useState<localDrivingLA_view[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    gender: 0,
    page: 1,
    pageSize: 10,
    orderBy: asc,
  });
  const [pages, setPages] = useState<PageOptions>({
    totalCount: 0,
    hasPrev: false,
    hasNext: false,
  });
  const axios = usePrivate();
  const cancelApplication = async (id: number) => {
    try {
      const Success = await axios.delete(`Applications/LDLA/cancel/${id}`);
      if (Success) setRefreshData(!refreshData);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteApplication = async (id: number) => {
    try {
      const Success = await axios.delete(`Applications/Ldla/delete/${id}`);
      if (Success) setRefreshData(!refreshData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const RequestingData = async () => {
      try {
        let SearchTermKey = Object.keys(FilterMode).find(
          (e) => FilterMode[e] === filter
        );
        SearchTermKey = filter == FilterMode.none ? "" : SearchTermKey;
        const body = {
          SearchTermKey,
          SearchTermValue: filterText,
          page: filterOptions.page,
          pageSize: filterOptions.pageSize,
          orderBy: filterOptions.orderBy,
        };
        const response = await axios.post("Applications/LDLA/get", body, {
          signal: controller.signal,
        });
        setDataSet(response.data.collection);
        setPages(response.data.page);
      } catch (error) {
        console.log(error);
      }
    };
    RequestingData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    Debounced,
    axios,
    openLdlaModal,
    refreshData,
    filterOptions,
    openTestsModal,
  ]);
  const COLUMNS = useMemo(
    (): ColumnDef<localDrivingLA_view, unknown>[] => [
      {
        accessorKey: "id",
        header: () => {
          return (
            <Button
              onClick={() =>
                setFilterOptions((p) => ({
                  ...p,
                  orderBy: p.orderBy == desc ? asc : desc,
                }))
              }
              sx={{ color: "white", minWidth: "auto" }}
            >
              Id{" "}
              {filterOptions.orderBy === desc ? <ExpandLess /> : <ExpandMore />}
            </Button>
          );
        },
        cell: ({ getValue }) => getValue(),
        size: 50,
      },
      {
        accessorKey: "drivingClass",
        header: "Driving Class",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "nationalNo",
        header: "National No",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "applicationDate",
        header: "Application Date",
        cell: ({ getValue }) => ShortDateString(new Date(getValue() as string)),
      },
      {
        accessorKey: "passedTests",
        header: "Passed Tests",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => getValue(),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <Actions
            row={row}
            handleModelData={(id) => setModalData(id)}
            handleReadOnly={(val) => setReadOnly(val)}
            handleOpenModal={(v) => setOpenLdlaModal(v)}
            cancelApplication={(id) => cancelApplication(id)}
            deleteApplication={(id) => deleteApplication(id)}
            handleTestsModal={(v) => setOpenTestsModal(v)}
            handleTestModalData={(v) => setTestsModalData(v)}
            handleModalTitle={(title) => setModalTitle(title)}
            handleIssueDLModal={(v) => setOpenIssueDrivingLicenseModal(v)}
            handleLicenseInfoModal={() => setOpenLicenseInfoModal(true)}
            handleLicenseHistoryModal={() => setLicenseHistoryModal(true)}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterOptions.orderBy]
  );
  return (
    <div className="w-10/12 mx-auto">
      <section className="flex justify-between mt-10 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center ml-6">
            <div className="flex ml-3">
              <select
                className="h-10 mx-3 text-center text-white rounded-lg outline-none users mainColorBg"
                value={filter}
                onChange={(e) => {
                  setFilterText("");
                  setFilter(e.target.value);
                }}
              >
                {allFilters().map((f, i) => {
                  return (
                    <option className="text-white" key={i} value={f}>
                      {f}
                    </option>
                  );
                })}
              </select>
              {filter !== FilterMode.none && filter !== FilterMode.IsActive && (
                <TextField
                  size="small"
                  placeholder={`Search by ${filter}`}
                  value={filterText}
                  type={
                    filter == FilterMode.Id || filter == FilterMode.PersonId
                      ? "number"
                      : "text"
                  }
                  sx={{ width: "250px" }}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setModalData(null);
            setReadOnly(false);
            setModalTitle("Add New Local driving license Application");
            setOpenLdlaModal(true);
          }}
        >
          <PersonAddIcon />
        </Button>
      </section>
      <Modal open={openLdlaModal} onClose={() => setOpenLdlaModal(false)}>
        <div>
          <LdlaWithPersonDetails
            ldlaId={modalData}
            title={modalTitle}
            handleClose={() => setOpenLdlaModal(false)}
            readonly={readOnly}
          />
        </div>
      </Modal>
      <Modal open={openTestsModal} onClose={() => setOpenTestsModal(false)}>
        <div>
          <TestAppointment
            id={testsModalData?.id as number}
            title={modalTitle}
            passedTests={testsModalData?.passedTests as number}
            testTypeId={testsModalData?.testTypeId as number}
          />
        </div>
      </Modal>
      <Modal
        open={openIssueDrivingLicenseModal}
        onClose={() => setOpenIssueDrivingLicenseModal(false)}
      >
        <div>
          <IssueDrivingLicense
            id={modalData as number}
            onClose={() => {
              setOpenIssueDrivingLicenseModal(false);
              setRefreshData(!refreshData);
            }}
          />
        </div>
      </Modal>
      <Modal
        open={openLicenseInfoModal}
        onClose={() => setOpenLicenseInfoModal(false)}
      >
        <div>
          <LocalLicenseInfo applicationId={modalData as number} />
        </div>
      </Modal>
      <Modal
        open={licenseHistoryModal}
        onClose={() => setLicenseHistoryModal(false)}
      >
        <div>
          <LicenseHistory id={modalData as number} />
        </div>
      </Modal>

      <main>
        <DataTable
          Data={DataSet}
          column={COLUMNS}
          handleFiltersChange={setFilterOptions}
          pages={pages}
        />
      </main>
    </div>
  );
};

export default LocalDrivingLicenseApplication;
