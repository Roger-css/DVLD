import { Box, Button, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { TabPanelProps } from "@mui/lab/TabPanel/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import CloseIcon from "@mui/icons-material/Close";
import PersonDetailsWithSearch from "../Person/PersonDetailsWithSearch";
import Ldla from "./LDLA";
import { localDrivingLA } from "../../../Types/Applications";
import usePrivate from "../../../hooks/usePrivate";
import { personInfo } from "../../../Types/Person";
type TyProps = {
  handleClose: () => void;
  title: string;
  ldlaId?: number | null;
  readonly?: boolean;
};
type LdlaWithPersonDetails = localDrivingLA & { person: personInfo };

function TabPanel(props: TabPanelProps) {
  const { children, value, tabIndex, style } = props;
  const intValue = parseInt(value);
  return (
    <div role="tabpanel" hidden={intValue != tabIndex} style={style}>
      {intValue == tabIndex && <Box>{children}</Box>}
    </div>
  );
}
const LdlaWithPersonDetails = ({
  title,
  handleClose,
  ldlaId,
  readonly,
}: TyProps) => {
  const [tab, setTab] = useState<number>(0);
  const [id, setId] = useState<number | undefined>(undefined);
  const [dataSet, setDataSet] = useState<LdlaWithPersonDetails | null>(null);
  const axios = usePrivate();
  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await axios.get(`Applications/LDLA/${ldlaId}`);
        console.log(data);
        setDataSet(data.data);
        setId(data.data.person.id);
      } catch (error) {
        console.log(error);
      }
    };
    ldlaId ? fetching() : false;
  }, [axios, ldlaId]);
  return (
    <div className="ModalBox">
      <h1 className="text-2xl text-center">{title}</h1>
      <TabContext value={tab}>
        <div className="flex justify-between">
          <TabList onChange={(_, v) => (id && id != -1 ? setTab(v) : false)}>
            <Tab label="Step One" />
            <Tab label="Step Two" />
          </TabList>
          <Button
            sx={{
              mr: "15px",
              width: "35px",
              height: "30px",
              padding: 0,
              minWidth: 0,
            }}
            variant="contained"
            color="error"
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </div>
        <TabPanel value="0" tabIndex={tab}>
          <PersonDetailsWithSearch
            readonly={readonly}
            setTab={setTab}
            setId={setId}
            id={id}
            Details={dataSet?.person}
          />
        </TabPanel>
        <TabPanel value="1" tabIndex={tab}>
          <Ldla
            handleClose={handleClose}
            dataSet={dataSet as localDrivingLA}
            personId={id}
            readonly={readonly}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default LdlaWithPersonDetails;
