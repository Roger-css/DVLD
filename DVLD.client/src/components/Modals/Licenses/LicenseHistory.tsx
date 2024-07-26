import TabList from "@mui/lab/TabList";
import { Tab } from "@mui/material";
import PersonDetailsWithSearch from "../PersonDetailsWithSearch";
import { useState } from "react";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import DataTable from "../../DataTable.Memory";
import {
  localLicensesColumns,
  internationalLicensesColumns,
} from "./licenseColumns";
import {
  useGetAllInternationalDrivingLicenses,
  useGetAllLocalDrivingLicenses,
} from "./License.hooks";
import { ColumnDef } from "@tanstack/react-table";
import TabContext from "@mui/lab/TabContext";

type Props = {
  id: number;
};
const LicenseHistory = ({ id }: Props) => {
  const allLocalLicenses = useGetAllLocalDrivingLicenses(id);
  const allInternationalLicenses = useGetAllInternationalDrivingLicenses(id);
  const [tab, setTab] = useState("0");
  return (
    <main className="overflow-auto ModalBox modalMaxHeight">
      <h3 className="text-4xl text-center">License History</h3>
      <PersonDetailsWithSearch id={id} readonly />
      <TabContext value={tab}>
        <TabList onChange={(_, v) => setTab(v)}>
          <Tab label="Local" value={"0"} />
          <Tab label="International" value={"1"} />
        </TabList>
        <TabPanel value="0">
          <DataTable
            column={
              localLicensesColumns as unknown as ColumnDef<unknown, unknown>[]
            }
            Data={allLocalLicenses as unknown[]}
          />
        </TabPanel>
        <TabPanel value="1">
          <DataTable
            column={
              internationalLicensesColumns as unknown as ColumnDef<
                unknown,
                unknown
              >[]
            }
            Data={allInternationalLicenses as unknown[]}
          />
        </TabPanel>
      </TabContext>
    </main>
  );
};

export default LicenseHistory;
