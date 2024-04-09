import { useEffect, useMemo, useState } from "react";
import DataTable from "../../components/DataTable.Memory";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Popover,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { FaEdit } from "react-icons/fa";
import usePrivate from "../../hooks/usePrivate";
import { testType } from "../../Types/Test";
import TestTypeDetails from "../../components/Modals/TestTypeDetails";
import { getTestTypes, setTestTypes } from "../../redux/Slices/Tests";
const TestTypes = () => {
  const axios = usePrivate();
  const dispatch = useDispatch();
  const testTypesArr = useSelector(getTestTypes) ?? [];
  const [modal, setModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<testType | null>(null);
  useEffect(() => {
    const fetching = async () => {
      const data = await axios.get("Tests/Types");
      if (data) {
        dispatch(setTestTypes(data.data));
      }
    };
    testTypesArr ? fetching() : false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axios, dispatch, modal]);
  const COLUMNS = useMemo(
    (): ColumnDef<testType, unknown>[] => [
      {
        accessorKey: "id",
        header: ({ header }) => (
          <Button
            onClick={() =>
              header.column.toggleSorting(header.column.getIsSorted() == "asc")
            }
            sx={{ color: "white", minWidth: "auto" }}
          >
            Id{" "}
            {header.column.getIsSorted() == "desc" ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </Button>
        ),
        cell: ({ getValue }) => getValue(),
        size: 50,
      },
      {
        accessorKey: "testTypeTitle",
        header: "Title",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "testTypeDescription",
        header: "Description",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "testTypeFees",
        header: "Fees",
        cell: ({ getValue }) => {
          const numberOfDigits = (getValue() as number).toString().length;
          return (getValue() as number).toPrecision(numberOfDigits + 4);
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
            null
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
          };
          const handleClose = () => {
            setAnchorEl(null);
          };
          const open = Boolean(anchorEl);
          const data = row.original;
          return (
            <div>
              <Button
                onClick={handleClick}
                sx={{ color: "black", fontSize: "20px", pt: "0" }}
              >
                ...
              </Button>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setModalData(data);
                        setModal(true);
                        setAnchorEl(null);
                      }}
                    >
                      <ListItemIcon>
                        <FaEdit />
                      </ListItemIcon>
                      <ListItemText primary="Update" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Popover>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="w-10/12 mx-auto">
      <h1 className="my-6 text-3xl font-bold text-center">Manage Test Types</h1>
      <Modal open={modal} onClose={() => setModal(false)}>
        <div>
          <TestTypeDetails
            handleClose={() => setModal(false)}
            initialValues={modalData}
          />
        </div>
      </Modal>
      <DataTable
        Data={testTypesArr}
        // @ts-expect-error react.Memo problem
        column={COLUMNS}
      />
    </div>
  );
};
export default TestTypes;
