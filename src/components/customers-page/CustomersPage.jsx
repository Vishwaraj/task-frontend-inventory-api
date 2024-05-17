import React from "react";
import { useEffect, useState } from "react";
import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";
import ResponsiveTable from "./components/table/Table";
import { useFormik } from "formik";
import { CustomerService } from "../../services/customerService";
import { AuthService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function CustomersPage() {
  const [values, setValues] = useState({
    id: 0,
    name: "",
    email: "",
    address: "",
    hp: "",
  });

  const navigate = useNavigate();

  const [refreshList, setRefresh] = useState(false);

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const list = await CustomerService.getCustomers();

      if (list && list.length) {
        setCustomers(list);
      }
    };

    fetchCustomers();
  }, [refreshList]);

  const handleEdit = async (id) => {
    const response = await CustomerService.getSingleCustomer(id);

    console.log(response);
    if (response) {
      setValues(response);
    }
  };

  const handleDelete = async (id) => {
    const response = await CustomerService.deleteCustomer(id);
    console.log("from function", response);

    setRefresh(!refreshList);
  };

  const handleLogout = () => {
    const response = AuthService.logout();
    if (response) {
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: values,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      if (values?.id !== 0) {
        let response = await CustomerService.updateCustomer(values, values.id);
        if (response) {
          setRefresh(!refreshList);
        }
        setValues({
          id: 0,
          name: "",
          email: "",
          address: "",
          hp: "",
        });
      } else {
        delete values.id;
        let response = await CustomerService.addCustomer(values);
        if (response) {
          setRefresh(!refreshList);
        }
      }
      resetForm();
    },
  });

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <Form formik={formik} />
      <ResponsiveTable
        customers={customers}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default CustomersPage;
