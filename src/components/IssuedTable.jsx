import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit Icon
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import Dropdown Icon
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { field: "email", headerName: "Email", flex: 1, editable: false },
  { field: "batch", headerName: "Batch", flex: 1, editable: false },
  { field: "category", headerName: "Category", flex: 1, editable: false },
  { field: "idNumber", headerName: "ID Number", flex: 1, editable: false },
  { field: "name", headerName: "Name", flex: 1, editable: false },
  { field: "branch", headerName: "Branch", flex: 1, editable: false },
  { field: "mobile", headerName: "Mobile", flex: 1, editable: false },
  { field: "components", headerName: "Components", flex: 1, editable: false },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    editable: true,
    renderCell: (params) => <EditableStatusCell params={params} />,
  },
  { field: "remark", headerName: "Remark", flex: 1, editable: false },
  { field: "date_time", headerName: "Date/Time", flex: 1, editable: false },
];

// Custom Component for Editable Status Cell
const EditableStatusCell = ({ params }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (status) => {
    setAnchorEl(null);
    if (status) {
      updateStatus(params.row._id, status);
    }
  };

  // API Call to update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/forms/${id}`, {
        status: newStatus,
      });
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <span>{params.value}</span>
      <IconButton onClick={handleClick} size="small">
        <ArrowDropDownIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
        {["Issued", "Returned", "Consumed"].map((option) => (
          <MenuItem key={option} onClick={() => handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default function QuickFilteringGrid() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forms");
      const filteredData = response.data
        .filter((item) => item.status === "Issued")
        .map((item, index) => ({
          id: index + 1,
          _id: item._id,
          email: item.email,
          batch: item.batch,
          category: item.category,
          idNumber: item.idNumber,
          name: item.name,
          branch: item.branch,
          mobile: item.mobile,
          components: item.components,
          status: item.status,
          remark: item.remark,
        }));
      setRows(filteredData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        autoHeight
        disableRowSelectionOnClick
        disableColumnMenu
        getRowHeight={() => "auto"}
        sx={{
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        }}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
