import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import * as Yup from "yup";
import { Divider, FormGroup, Grid } from "@mui/material";
import { FastField, Field, Form, Formik } from "formik";
import SelectField from "@/components/custom-fields/SelectField/SelectField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DatePickerField from "@/components/custom-fields/DatePickerField/DatePickerField";
import { Link, useNavigate } from "react-router-dom";
import InputField from "@/components/custom-fields/InputField";
import SwitchField from "@/components/custom-fields/SwitchField/SwitchField";
import UploadAndDisplayImage from "@/components/Upload";
import { useState } from "react";
import TextAreaField from "@/components/custom-fields/TextAreaField/TextAreaField";
import { toast } from "react-toastify";
const options = [
  { id: "1", value: "Trà sữa" },
  { id: "2", value: "Cà phê" },
  { id: "2", value: "Nước ép" },
];
const initialValues = {
  id: "123",
  name: "do uong",
  description: "des",
  price: "40000",
  discount: "45",
  sale_on_days: "",
  image: "",
  active: true,
  type: "2",
};
const validationShema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .required("This field is required"),
  description: Yup.string().min(
    15,
    "Description must be at least 15 characters"
  ),
  "identity-card-number": Yup.string().matches(/^[0-9]+$/, "Number only"),
  price: Yup.string()
    .required("This field is required")
    .matches(/^[0-9]+$/, "Number only"),
  discount: Yup.string().matches(/^[0-9]+$/, "Number only"),
  sale_on_days: Yup.string(),
  image: Yup.string().required("This field is required"),
  active: Yup.boolean(),
  type: Yup.string().required("This field is required"),
});
function DrinksEdit() {
  const [imgLink, setImgLink] = useState();
  const [needValidate, setNeedValidate] = useState(true);
  const nav = useNavigate();
  const handleSubmit = (value) => {
    toast.success("🦄 Edit success!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12 ">
      <Formik
        initialValues={initialValues}
        validationSchema={needValidate && validationShema}
        onSubmit={handleSubmit}
        validateOnBlur={true}
      >
        {({ values }) => {
          return (
            <Grid container spacing={2}>
              <Grid item md={6} sm={12}>
                <Card>
                  <CardBody>
                    <Grid item xs={12} md={12}>
                      <div className="h-[300px] w-full">
                        <img
                          alt="image not found"
                          src={values.image || "/img/no-image.png"}
                          className="h-full w-full rounded-lg object-contain"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Field
                            name="image"
                            component={InputField}
                            label="Image"
                          />
                        </LocalizationProvider>
                      </FormGroup>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <FormGroup>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Field
                            name="description"
                            component={TextAreaField}
                            label="Description"
                          />
                        </LocalizationProvider>
                      </FormGroup>
                    </Grid>
                  </CardBody>
                </Card>
              </Grid>
              <Grid item md={6} sm={12}>
                <Card>
                  <CardBody>
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                          <FormGroup>
                            <FastField
                              name="name"
                              component={InputField}
                              label="Name"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormGroup>
                            <Field
                              name="discount"
                              component={InputField}
                              label="Discount"
                            />
                          </FormGroup>
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <FormGroup>
                            <Field
                              name="sale_on_days"
                              component={DatePickerField}
                              label="Sale on day"
                            />
                          </FormGroup>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <FormGroup>
                            <Field
                              name="type"
                              component={SelectField}
                              label="Type"
                              options={options}
                              defaultOp="Choose drink's type"
                            />
                          </FormGroup>
                        </Grid>
                        <Divider className="!mt-4 w-full" />
                        <Grid item xs={12} md={12}>
                          <div className="flex items-center justify-between">
                            {/* <Typography className=""> */}
                            <div className="mr-auto"> Status Available</div>
                            {/* </Typography> */}
                            <FormGroup>
                              <Field
                                name="active"
                                component={SwitchField}
                                confirm={"Deactive this drink ?"}
                                setNeedValidate={setNeedValidate}
                              />
                            </FormGroup>
                          </div>
                        </Grid>
                        <Divider className="!my-5 w-full" />
                      </Grid>
                      <div className="flex">
                        <Button
                          variant={"gradient"}
                          color={"blue"}
                          className="mt-4 mr-6 flex items-center py-1 px-6 capitalize"
                          type="button"
                          onClick={() => nav("/dashboard/drinks")}
                        >
                          <Typography
                            color="inherit"
                            className=" font-medium capitalize"
                          >
                            Back
                          </Typography>
                        </Button>
                        <Button
                          variant={"gradient"}
                          color={"red"}
                          className="mt-4 flex items-center py-1 px-6 capitalize"
                          type="submit"
                        >
                          <Typography
                            color="inherit"
                            className=" font-medium capitalize"
                          >
                            Save
                          </Typography>
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>
          );
        }}
      </Formik>
    </div>
  );
}

export default DrinksEdit;
