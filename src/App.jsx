import { Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout";
import IssuedTable from "./components/IssuedTable";
import ReturnedAndConsumedTable from "./components/ReturnedAndConsumedTable";
import InventoryForm from "./components/InventoryForm";
import InventoryFormTable from "./components/InventoryFormTable";
import Login from "./components/Login";
import DataGrid from "./components/DataGrid";
import UserForm from "./components/UserForm";
import MiniDrawer from "./layouts/Drawer";
import { Box } from "@mui/material";
function App() {
  const location = useLocation();

  const isLoginPage = location?.pathname === "/";

  return (
    <>
      <div
        className="App"
        // style={{ display: "flex", backgroundColor: "bisque" }}
      >
        {/* {!isLoginPage && <MiniDrawer />} */}

        {/* <main
          style={{
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "#f4f4f4",
            paddingTop: isLoginPage ? "0" : "60px",
          }}
        > */}
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3, width: "99.5%" }}> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user_form" element={<UserForm />} />
          <Route path="/" element={<MiniDrawer />}>
            <Route path="/dashboard" element={<DashboardLayout />} />
            <Route path="/issued_records" element={<IssuedTable />} />
            <Route
              path="/returned_consumed"
              element={<ReturnedAndConsumedTable />}
            />
            <Route path="/inventory_form" element={<InventoryForm />} />
            <Route path="/inventory_records" element={<InventoryFormTable />} />

            <Route path="/datagrid" element={<DataGrid />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
        {/* </Box> */}
        {/* </main> */}
      </div>
    </>
  );
}

export default App;
