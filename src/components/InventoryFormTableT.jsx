import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  { field: "email", headerName: "Email", width: 120, editable: false },
  { field: "batch", headerName: "Batch", width: 120, editable: false },
  { field: "category", headerName: "Category", width: 120, editable: false },
  { field: "idNumber", headerName: "ID Number", width: 120, editable: false },
  { field: "name", headerName: "Name", width: 120, editable: false },
  { field: "branch", headerName: "Branch", width: 120, editable: false },
  { field: "mobile", headerName: "Mobile", width: 120, editable: false },
  {
    field: "components",
    headerName: "Components",
    width: 120,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1, // Auto width (flexible)
    editable: true, // Allow editing
    type: "singleSelect",
    valueOptions: ["Issued", "Returned", "Consumed"], // Status options
    maxWidth: 100,
  },
  {
    field: "remark",
    headerName: "Remark",
    flex: 1,
    editable: false,
    width: 100,
    // minWidth: 100,
  }, // Auto width (flexible)
];

export default function QuickFilteringGrid() {
  const [rows, setRows] = useState([]);

  const fetchTableData = async () => {
    const baseUrl = "http://localhost:5000";
    const url = `${baseUrl}/api/forms`;

    try {
      const response = await axios.get(url);
      const filteredData = response.data
        .filter((item) => item.status === "Issued") // Show only 'Issued' status
        .map((item, index) => ({
          id: index + 1, // Ensure unique row id
          _id: item._id, // Store actual database ID
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

  useEffect(() => {
    fetchTableData();
  }, []);

  // Handle row update
  const processRowUpdate = async (newRow) => {
    try {
      const updatedRow = { ...newRow };
      await axios.put(`http://localhost:5000/api/forms/${newRow._id}`, {
        status: newRow.status, // Send only the updated field
      });

      setRows((prevRows) =>
        prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
      );
      return updatedRow;
    } catch (error) {
      console.error("Error updating status", error);
      return newRow; // Keep the UI consistent
    }
  };

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", overflow: "auto" }}>
        {/* <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate} // Handle inline edits
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          getRowHeight={() => "auto"}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        /> */}
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate} // Handle inline edits
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          autoHeight
          disableRowSelectionOnClick
          disableColumnMenu
          getRowHeight={() => "auto"}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              csvOptions: { disableToolbarButton: false },
              printOptions: { disableToolbarButton: true },
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            "& .MuiDataGrid-row": {
              transition: "none !important", // Disable row height transition
            },
          }}
        />
      </Box>
    </>
  );
}
