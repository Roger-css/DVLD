import { useMemo } from "react";
import DataTable from "../../components/DataTable.Memory";
import { ColumnDef } from "@tanstack/react-table";
import { applicationTypes } from "../../Types/Applications";
import { useSelector } from "react-redux";
import { getApplicationTypes } from "../../redux/Slices/Applications";

const ApplicationTypes = () => {
  const applicationTypesArr = useSelector(getApplicationTypes) ?? [];
  console.log(applicationTypesArr);
  const COLUMNS = useMemo(
    (): ColumnDef<applicationTypes, unknown>[] => [
      {
        accessorKey: "applicationTypeId",
        header: "Id",
        cell: ({ getValue }) => getValue(),
        size: 50,
      },
      {
        accessorKey: "applicationTypeTitle",
        header: "Title",
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "applicationTypeFees",
        header: "Fees",
        cell: ({ getValue }) => {
          const numberOfDigits = (getValue() as number).toString().length;
          return (getValue() as number).toPrecision(numberOfDigits + 2);
        },
      },
      // {
      //   header: "Actions",
      //   cell: ({ row }) => {
      //     // eslint-disable-next-line react-hooks/rules-of-hooks
      //     const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(
      //       null
      //     );
      //     // eslint-disable-next-line react-hooks/rules-of-hooks
      //     const [openDialog, setOpenDialog] = useState(false);
      //     const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      //       setAnchorEl(event.currentTarget);
      //     };
      //     const handleClose = () => {
      //       setAnchorEl(null);
      //     };
      //     const handleCloseDialog = () => {
      //       setOpenDialog(false);
      //     };
      //     const handleOpenDialog = () => {
      //       setOpenDialog(true);
      //     };
      //     const open = Boolean(anchorEl);
      //     const id = row.original.id;
      //     return (
      //       <div>
      //         <Button
      //           onClick={handleClick}
      //           sx={{ color: "black", fontSize: "20px", pt: "0" }}
      //         >
      //           ...
      //         </Button>
      //         <Popover
      //           open={open}
      //           anchorEl={anchorEl}
      //           onClose={handleClose}
      //           anchorOrigin={{
      //             vertical: "bottom",
      //             horizontal: "right",
      //           }}
      //         >
      //           <List>
      //             <ListItem disablePadding>
      //               <ListItemButton
      //                 onClick={() => {
      //                   setModalData(id);
      //                   setReadOnly(true);
      //                   setOpenModal(true);
      //                   setUpdatePassword(false);
      //                   setModalTitle("Person Details");
      //                   setAnchorEl(null);
      //                 }}
      //               >
      //                 <ListItemIcon>
      //                   <PsychologyAltIcon />
      //                 </ListItemIcon>
      //                 <ListItemText primary="Show details" />
      //               </ListItemButton>
      //             </ListItem>
      //             <ListItem disablePadding>
      //               <ListItemButton
      //                 onClick={() => {
      //                   setModalData(id);
      //                   setReadOnly(false);
      //                   setUpdatePassword(true);
      //                   setModalTitle("Update person details");
      //                   setOpenModal(true);
      //                   setAnchorEl(null);
      //                 }}
      //               >
      //                 <ListItemIcon>
      //                   <DisplaySettingsIcon />
      //                 </ListItemIcon>
      //                 <ListItemText primary="Update" />
      //               </ListItemButton>
      //             </ListItem>
      //             <ListItem disablePadding>
      //               <ListItemButton
      //                 onClick={() => {
      //                   handleOpenDialog();
      //                   setAnchorEl(null);
      //                 }}
      //               >
      //                 <ListItemIcon>
      //                   <PersonRemoveIcon />
      //                 </ListItemIcon>
      //                 <ListItemText primary="Delete" />
      //               </ListItemButton>
      //             </ListItem>
      //           </List>
      //         </Popover>
      //         <Dialog open={openDialog}>
      //           <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      //           <DialogContent>
      //             <DialogContentText id="alert-dialog-description">
      //               Are you sure you want to delete the user with ID {id}?
      //             </DialogContentText>
      //           </DialogContent>
      //           <DialogActions>
      //             <Button
      //               onClick={handleCloseDialog}
      //               autoFocus
      //               variant="outlined"
      //             >
      //               Close
      //             </Button>
      //             <Button
      //               onClick={() => {
      //                 deleteUser(id);
      //                 handleCloseDialog();
      //               }}
      //               autoFocus
      //               variant="outlined"
      //               color="error"
      //             >
      //               Delete
      //             </Button>
      //           </DialogActions>
      //         </Dialog>
      //       </div>
      //     );
      //   },
      // },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div className="w-10/12 mx-auto">
      <DataTable
        Data={applicationTypesArr}
        // @ts-expect-error react.Memo problem
        column={COLUMNS}
      />
    </div>
  );
};

export default ApplicationTypes;
