import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

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
    editable: true, // Allow editing
    type: "singleSelect",
    valueOptions: ["Issued", "Returned", "Consumed"], // Status options
  },
  { field: "remark", headerName: "Remark", flex: 1, editable: false },
  { field: "date_time", headerName: "Date/Time", flex: 1, editable: false },
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
    <Box sx={{ height: 400, width: "100%" }}>
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
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1.15,
          },
          "& .MuiDataGrid-row": {
            minHeight: "52px !important",
          },
          "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-main": {
            overflow: "unset",
          },
          "& .MuiDataGrid-columnHeaders": {
            position: "sticky",
            top: 63,
            backgroundColor: "red",
            zIndex: 1,
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: false },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}
