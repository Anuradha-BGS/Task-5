import "./App.scss";

import * as yup from "yup";

import { Button, Column, DatePicker, DatePickerInput, Grid, Modal, TextInput } from "carbon-components-react";
import { useState } from "react";

import ActionDataTable from "./components/ActionDataTable";
import ExpansionDataTable from "./components/ExpansionDataTable";
import { useFormik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  email: "",
  verifyEmail: "",
  lastSSN: "",
  verifyLastSSN: "",
  dob: "",
  hireDate: "",
};

const App = () => {
  const [formData, setFormData] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const onSubmit = (values) => {
    setFormData(values);
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: formData,
    onSubmit,
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      middleName: yup.string(),
      email: yup.string().required("Email address is required").email("Please add valid email address"),
      verifyEmail: yup
        .string()
        .required("required")
        .email("Please add valid email address")
        .oneOf([yup.ref("email")], "Email address not matched"),
      lastSSN: yup.string().required("required").length(5, "Length should be 5"),
      verifyLastSSN: yup
        .string()
        .required("required")
        .length(5, "Length should be 5")
        .oneOf([yup.ref("lastSSN")], "SSN not matching"),
      dob: yup.string().required("Date of birth is required"),
      hireDate: yup.string().required("hire date is required"),
    }),
  });

  const onDateChange = (field) => (value) => {
    let str = "";
    if (value.length > 0) {
      const dt = value[0];
      formik.setFieldValue(field, `${dt.getMonth() + 1}/${dt.getDate()}`);
      if (field === "dob") {
        str = `${dt.getMonth() + 1}/${dt.getDate()}`;
      } else {
        str = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
      }
    }
    formik.setFieldValue(field, str);
  };

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Grid>
          <Column lg={16} md={8} sm={4} className="title">
            <h1>REQUEST FOR ACCESS</h1>
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="first-name"
              labelText="First name"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              invalid={!!formik.errors.firstName}
              invalidText={formik.errors.firstName}
            />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="last-name"
              labelText="Last name"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              invalid={!!formik.errors.lastName}
              invalidText={formik.errors.lastName}
            />
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="middle-name"
              name="middleName"
              labelText="Middle Initial (optional)"
              onChange={formik.handleChange}
              value={formik.values.middleName}
              invalid={!!formik.errors.middleName}
              invalidText={formik.errors.middleName}
            />
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="email"
              type="email"
              name="email"
              labelText="Email address"
              onChange={formik.handleChange}
              value={formik.values.email}
              invalid={!!formik.errors.email}
              invalidText={formik.errors.email}
            />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="verify-email"
              type="password"
              name="verifyEmail"
              labelText="Verify email address"
              onChange={formik.handleChange}
              value={formik.values.verifyEmail}
              invalid={!!formik.errors.verifyEmail}
              invalidText={formik.errors.verifyEmail}
            />
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="last-ssn"
              labelText="Last 5 of SSN"
              name="lastSSN"
              onChange={formik.handleChange}
              value={formik.values.lastSSN}
              invalid={!!formik.errors.lastSSN}
              invalidText={formik.errors.lastSSN}
            />
          </Column>
          <Column lg={8} md={4} sm={4}>
            <TextInput
              id="verify-last-ssn"
              name="verifyLastSSN"
              type="password"
              labelText="Verify Last 5 of SSN"
              onChange={formik.handleChange}
              value={formik.values.verifyLastSSN}
              invalid={!!formik.errors.verifyLastSSN}
              invalidText={formik.errors.verifyLastSSN}
            />
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <DatePicker
              datePickerType="single"
              dateFormat="m/d"
              name="dob"
              value={formik.values.dob}
              onChange={onDateChange("dob")}
            >
              <DatePickerInput
                id="dob"
                placeholder="mm/dd"
                labelText="Month/Date of birth"
                size="md"
                name="dob"
                value={formik.values.dob}
                onChange={onDateChange("dob")}
                invalid={!!formik.errors.dob}
                invalidText={formik.errors.dob}
              />
            </DatePicker>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <DatePicker
              datePickerType="single"
              dateFormat="m/d/Y"
              name="hireDate"
              onChange={onDateChange("hireDate")}
              value={formik.values.hireDate}
            >
              <DatePickerInput
                id="hire-date"
                placeholder="mm/dd/yyyy"
                labelText="Hire Date"
                size="md"
                onChange={onDateChange("hireDate")}
                value={formik.values.hireDate}
                invalid={!!formik.errors.hireDate}
                invalidText={formik.errors.hireDate}
              />
            </DatePicker>
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <Button onClick={formik.resetForm}>Cancel</Button>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <Button onClick={formik.handleSubmit} disabled={formik.dirty && !formik.isValid}>
              Next
            </Button>
          </Column>
        </Grid>
        <Grid style={{ paddingTop: 10 }}>
          <Column lg={16} md={8} sm={4}>
            <ActionDataTable />
          </Column>
        </Grid>
        <Grid style={{ paddingTop: 10 }}>
          <Column lg={16} md={8} sm={4}>
            <ExpansionDataTable />
          </Column>
        </Grid>
      </Column>
      <Modal
        open={open}
        passiveModal
        modalHeading="Your Form has been validated successfully!"
        onRequestClose={() => setOpen(false)}
      >
        <p> Here is your values</p>
        <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      </Modal>
    </Grid>
  );
};

export default App;
