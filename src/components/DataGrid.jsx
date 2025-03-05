import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// ------------------------
import { useMovieData } from "@mui/x-data-grid-generator";
import axios from "axios";
import { useEffect, useState } from "react";

const VISIBLE_FIELDS = [
  "title",
  "company",
  "director",
  "year",
  "cinematicUniverse",
];
// ---------------add
const columns = [
  { field: "email", headerName: "Email", flex: 1 },
  { field: "batch", headerName: "Batch", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "idNumber", headerName: "ID Number", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "branch", headerName: "Branch", flex: 1 },
  { field: "mobile", headerName: "Mobile", flex: 1 },
  { field: "components", headerName: "Components", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "remark", headerName: "Remark", flex: 1 },
];

const rows1 = [
  {
    id: 1,
    email: "john.doe@example.com",
    batch: "2023",
    category: "Component A",
    idNumber: "12345",
    name: "John Doe",
    branch: "Electrical",
    mobile: "9876543210",
    components: "Resistor, Capacitor",
    status: "Issued",
    remark: "N/A",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    batch: "2022",
    category: "Component B",
    idNumber: "67890",
    name: "Jane Smith",
    branch: "Electronics",
    mobile: "9876543211",
    components: "Inductor, Transformer",
    status: "Returned",
    remark: "All good",
  },
  {
    id: 3,
    email: "jane.smith@example.com",
    batch: "2022",
    category: "Component B",
    idNumber: "67890",
    name: "Jane Smith",
    branch: "Electronics",
    mobile: "9876543211",
    components: "Inductor, Transformer",
    status: "Returned",
    remark: "All good",
  },
  {
    id: 4,
    email: "jane.smith@example.com",
    batch: "2022",
    category: "Component B",
    idNumber: "67890",
    name: "Jane Smith",
    branch: "Electronics",
    mobile: "9876543211",
    components: "Inductor, Transformer",
    status: "Returned",
    remark: "All good",
  },
  {
    id: 5,
    email: "jane.smith@example.com",
    batch: "2022",
    category: "Component B",
    idNumber: "67890",
    name: "Jane Smith",
    branch: "Electronics",
    mobile: "9876543211",
    components: "Inductor, Transformer",
    status: "Returned",
    remark: "All good",
  },
];

export default function QuickFilteringGrid() {
  const [rows, setRows] = useState([]);
  // ---- now not use start
  const data = useMovieData();

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns1 = React.useMemo(
    () =>
      data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [data.columns]
  );
  // ---- not use end

  const fetchTableData = async () => {
    const baseUrl = "http://localhost:5000";
    const url = `${baseUrl}/api/forms`;

    try {
      const response = await axios.get(url);
      console.log("response---", response?.data);
      // const formattedData = response.data.map((item) => ({
      //   id: item._id, // Use MongoDB _id as unique id
      //   email: item.email,
      //   batch: item.batch,
      //   category: item.category,
      //   idNumber: item.idNumber,
      //   name: item.name,
      //   branch: item.branch,
      //   mobile: item.mobile,
      //   components: item.components,
      //   status: item.status,
      //   remark: item.remark,
      // }));
      const filteredData = response.data
        .filter((item) => item.status === "Issued") // Only keep rows with status "Issued"
        .map((item, index) => ({
          id: index + 1, // Ensure unique row id
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
    <>
      {/* <Box sx={{ height: 400, width: 1 }}> */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          // {...data}
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
              // backgroundColor: theme.palette.background.paper,
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
          // initialState={{
          //   sorting: {
          //     sortModel: [{ field: "master_category", sort: "asc" }],
          //   },
          // }}
        />
        {/* <DataGrid
        {...data}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
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
            // backgroundColor: theme.palette.background.paper,
            backgroundColor: "red",
            zIndex: 1,
          },
        }}
      /> */}
      </Box>
    </>
  );
}
