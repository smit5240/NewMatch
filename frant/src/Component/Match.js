import React, { useEffect } from "react";
import { TextField } from "./TextField";
import * as yup from "yup";
import { Formik } from "formik";
import { Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Alert from "./Alert";
export default function Match(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const athorize = localStorage.getItem("userdata");
    if (!athorize) {
      navigate("/cancel");
    }
  });
  const validation = yup.object({
    name: yup
      .string()
      .min(2, "must be 2 character add and upp")
      .required("name is Required"),
    email: yup.string().email("email is invalid").required("email is required"),
    contact: yup
      .string()
      .min(10, "10 character add")
      .max(10, "10 character add ")
      .required("Contact no is required"),
    address: yup
      .string()
      .min(5, "minimum 5 character add")
      .max(30, "maximum 30 character add")
      .required("address is required"),
  });

  const Mclick = async (values) => {
    await axios
      .post("http://localhost:4200/addmatch", values, {
        Headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        let msg = res.data.message;
        let type = res.data.type;
        props.showalert(msg, type);
        navigate("/allmatch");
      })
      .catch((err) => {
        let msg = err.response.data.message;
        let type = err.response.data.type;
        props.showalert(msg, type);
      });
  };
  const showall = () => {
    navigate("/allmatch");
  };
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <h2>Match table</h2>
        </div>
        <Formik
          initialValues={{ name: "", email: "", contact: "", address: "" }}
          validationSchema={validation}
          onSubmit={(values) => {
            // console.log(values);
            Mclick(values);
          }}
        >
          {(Formik) => (
            <div className="row justify-content-center mt-5 mb-5">
              <div className="col-sm-10 col-md-9 col-xl-8 pt-5 pb-4">
                <Form>
                  <div className="mb-3">
                    <TextField lable="Name" name="name" type="text" />
                  </div>
                  <div className="mb-3">
                    <TextField lable="Email" name="email" type="email" />
                  </div>
                  <div className="mb-3">
                    <TextField lable="Contact" name="contact" type="number" />
                  </div>
                  <div className="mb-3">
                    <TextField lable="Address" name="address" type="text" />
                  </div>
                  <div className="d-flex justify-content-around mt-5">
                    <button className="btn btn-primary " type="sumbit">
                      Submit
                    </button>
                    <button className="btn btn-success" onClick={showall}>
                      Show All Match
                    </button>
                    <button className="btn btn-danger" type="reset">
                      Cancel
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
