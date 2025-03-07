import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const ComponentForm = () => {
  const [formData, setFormData] = useState({
    component: "",
    specification: "",
    quantity: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOpenSnackbar(true);
  //   console.log("Form Submitted:", formData);
  //   setFormData({
  //     ...formData,
  //     component: "",
  //     specification: "",
  //     quantity: "",
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/form/inventory-form",
        formData, // <-- Send formData directly
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(response?.data);

      if (response?.data?.success === true) {
        setOpenSnackbar(true);
        setFormData({
          ...formData,
          component: "",
          specification: "",
          quantity: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100%",
        display: "flex",
        // alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={3}
          sx={{
            backdropFilter: "blur(10px)",
            borderRadius: "15px 5px",
            padding: "20px",
            color: "#fff",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              align="center"
              sx={{
                color: "#075985",
                marginBottom: 4,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              🏷️ Inventory Entry
            </Typography>

            {/* <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            > */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Component Name */}
              <TextField
                fullWidth
                label="Component Name"
                name="component"
                value={formData.component}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{ style: { color: "#075985" } }}
                InputLabelProps={{ style: { color: "#075985" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#075985" },
                    "&:hover fieldset": { borderColor: "#075985" },
                    "&.Mui-focused fieldset": { borderColor: "#075985" },
                  },
                }}
              />

              {/* Specification */}
              <TextField
                fullWidth
                label="Specification"
                name="specification"
                value={formData.specification}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{ style: { color: "#075985" } }}
                InputLabelProps={{ style: { color: "#075985" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#075985" },
                    "&:hover fieldset": { borderColor: "#075985" },
                    "&.Mui-focused fieldset": { borderColor: "#075985" },
                  },
                }}
              />

              {/* Quantity */}
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{
                  style: { color: "#075985" },
                  inputProps: { min: 1 },
                }}
                InputLabelProps={{ style: { color: "#075985" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#075985" },
                    "&:hover fieldset": { borderColor: "#075985" },
                    "&.Mui-focused fieldset": { borderColor: "#075985" },
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#043c5a",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  boxShadow: "0px 4px 15px rgba(31, 13, 94, 0.4)",
                  "&:hover": { backgroundColor: "#03283d" },
                }}
              >
                🚀 Submit
              </Button>
            </Box>
            {/* </form> */}
          </CardContent>
        </Card>
      </Container>

      {/* Snackbar for Success & Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          // severity={errorMessage ? "error" : "success"}
          severity="success"
          sx={{ width: "100%" }}
        >
          Inventory Entry Submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComponentForm;
