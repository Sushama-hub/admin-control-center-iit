import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import Dropdown Icon
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";

const columns = (updateStatus) => [
  {
    field: "id",
    headerName: "S No.",
    // flex: 1,
    editable: false,
    width: 60,
  },
  { field: "email", headerName: "Email", flex: 0, editable: false, width: 130 },
  { field: "batch", headerName: "Batch", flex: 0, editable: false, width: 60 },
  {
    field: "category",
    headerName: "Category",
    flex: 0,
    editable: false,
    width: 120,
  },
  {
    field: "idNumber",
    headerName: "ID Number",
    flex: 0,
    editable: false,
    width: 120,
  },
  { field: "name", headerName: "Name", flex: 0, editable: false, width: 120 },
  {
    field: "branch",
    headerName: "Branch",
    flex: 0,
    editable: false,
    width: 120,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    flex: 0,
    editable: false,
    width: 120,
  },
  {
    field: "components",
    headerName: "Components",
    flex: 0,
    editable: false,
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0,
    editable: true,
    renderCell: (params) => (
      <EditableStatusCell params={params} updateStatus={updateStatus} />
    ),
  },
  {
    field: "remark",
    headerName: "Remark",
    flex: 0,
    editable: false,
    width: 120,
  },
  { field: "createdAt", headerName: "Created At", flex: 1, editable: false },
];

// Custom Component for Editable Status Cell
const EditableStatusCell = ({ params, updateStatus }) => {
  console.log("params---", params);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (status) => {
    console.log("status--->", status);
    setAnchorEl(null);
    if (status !== "Issued") {
      updateStatus(params.row._id, status);
    }
  };

  // API Call to update status
  // const updateStatus = async (id, newStatus) => {
  //   console.log("newStatus--->", id, newStatus);

  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8000/api/form/update/${id}`,
  //       {
  //         status: newStatus,
  //       }
  //     );
  //     console.log("Update Response:", response.data);
  //     if (response?.data?.success) {
  //       console.log("Status updated successfully!");
  //       alert("Status updated successfully!");
  //       // window.location.reload(); // Reload to reflect changes
  //     } else {
  //       console.error("Failed to update status:", response.data.message);
  //       alert("Failed to update status.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating status", error);
  //   }
  // };

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

  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/form/get-user"
      );

      console.log("response", response);
      // .filter((item) => item.status === "Issued")
      const filteredData = response?.data?.data
        ?.filter((item) => item.status === "Issued")
        ?.map((item, index) => {
          return {
            id: index + 1,
            _id: item._id,
            email: item.email,
            batch: item.batch,
            category: item.category,
            idNumber: item.idNumber,
            name: item.name,
            branch: item.branch,
            mobile: item.mobile,
            components: item.component,
            status: item.status,
            remark: item.remark,
            createdAt: new Date(item.createdAt).toLocaleString(),
            updatedAt: new Date(item.updatedAt).toLocaleString(),
          };
        });
      setRows(filteredData);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/form/update/${id}`,
        { status: newStatus }
      );

      if (response?.data?.success) {
        alert("Status updated successfully!");

        // ✅ Remove row from state instead of reloading
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
      <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
        Issued Table
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          // columns={columns}
          columns={columns(updateStatus)}
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
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false },
              printOptions: { disableToolbarButton: false },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </Box>
  );
}
