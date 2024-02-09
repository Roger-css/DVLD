import CircularProgress from "@mui/material/CircularProgress";
type color = "primary" | "secondary" | "error" | "info" | "success" | "warning";
const Loading = ({ color }: { color: color }) => {
  return (
    <div style={{ height: "90vh" }} className="grid place-items-center">
      <CircularProgress size={200} color={color} />
    </div>
  );
};

export default Loading;
