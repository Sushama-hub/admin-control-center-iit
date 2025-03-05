import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns = [
  { field: "email", headerName: "Component Name", flex: 1, editable: false },
  { field: "batch", headerName: "Specification", flex: 1, editable: false },
  { field: "category", headerName: "Quantity", flex: 1, editable: false },
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
