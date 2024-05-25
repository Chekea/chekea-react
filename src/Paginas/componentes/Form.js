import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const Form = () => {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        ADD ITEMS
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Field 1"
              variant="outlined"
              name="field1"
              value={formData.field1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Field 2"
              variant="outlined"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Field 3"
              variant="outlined"
              name="field3"
              value={formData.field3}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Field 4"
              variant="outlined"
              name="field4"
              value={formData.field4}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
