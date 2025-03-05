import { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

export default function IssuanceForm() {
  const [formData, setFormData] = useState({
    email: "",
    batch: "",
    category: "",
    idNumber: "",
    name: "",
    branch: "",
    mobile: "",
    components: "",
    status: "",
    remark: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          email: "",
          batch: "",
          category: "",
          idNumber: "",
          name: "",
          branch: "",
          mobile: "",
          components: "",
          status: "",
          remark: "",
        });
      } else {
        alert(result.message || "Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderTop: "8px solid #1E40AF", borderRadius: 2 }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Electrical Engineering Department Issuance Record Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Batch (Year of Joining)</InputLabel>
                <Select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2022">2022</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose</MenuItem>
                  <MenuItem value="Component A">Component A</MenuItem>
                  <MenuItem value="Component B">Component B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ID Number"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Components"
                name="components"
                value={formData.components}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="">Choose</MenuItem>
                  <MenuItem value="Issued">Issued</MenuItem>
                  <MenuItem value="Returned">Returned</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Remark"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                // color="primary"
                sx={{
                  boxShadow: "0px 4px 15px rgba(31, 13, 94, 0.4)",
                  backgroundColor: "#043c5a",
                  "&:hover": { backgroundColor: "#03283d" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
