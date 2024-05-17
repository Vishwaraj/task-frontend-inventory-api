import React from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";

function Form({ formik }) {
  Form.propTypes = {
    formik: PropTypes.object.isRequired,
  };

  return (
    <>
      <Container data-testid="form" maxWidth="md" sx={{ marginTop: 5 }}>
        <form onSubmit={(e) => formik.handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                fullWidth
                name="name"
                label="Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                fullWidth
                name="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                onChange={formik.handleChange}
                value={formik.values.address}
                fullWidth
                name="address"
                label="Address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                onChange={formik.handleChange}
                value={formik.values.hp}
                fullWidth
                name="hp"
                label="HP"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default Form;
