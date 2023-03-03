import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();

  const [checkvalue, setCheckvalue] = useState({ authorize: false });
  const handlechange = (e) => {
    setCheckvalue({ [e.target.name]: e.target.checked });
  };
  const validate = Yup.object({
    name: Yup.string()
      .min(2, "must be 2 character or upp")
      .max(15, "must be 15 character or less")
      .required("required"),
    email: Yup.string().email("email is invalid").required("Email is Required"),
    password: Yup.string()
      .min(4, "must be 4 character add")
      .required("password is required"),
  });

  const Rclick = async (values) => {
    let USERVALUE = { ...values, authorize: checkvalue.authorize };

    await axios
      .post("http://localhost:4200/register ", USERVALUE, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);
        let msg = res.data.message;
        let type = res.data.type;
        props.showalert(msg, type);
        navigate("/login");
      })
      .catch((err) => {
        let msg = err.response.data.message;
        let type = err.response.data.type;
        props.showalert(msg, type);
      });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validate}
      onSubmit={(values) => {
        Rclick(values);
      }}
    >
      {(formik) => (
        <div>
          <div className="">
            <div className="container top">
              <div>
                <div className="row">
                  <div className="col d-flex justify-content-center item-center pt-4">
                    <h2>Sign-Up</h2>
                  </div>
                </div>
              </div>
              <div className="row  justify-content-center  pb-5">
                <div className="col-sm-10 col-md-9 col-xl-9">
                  <Form>
                    <div className="mb-3">
                      <TextField lable="Name" name="name" type="text" />
                    </div>
                    <div className="mb-3">
                      <TextField lable="Email" name="email" type="email" />
                    </div>
                    <div className="mb-3">
                      <TextField
                        lable="Password"
                        name="password"
                        type="password"
                      />
                    </div>
                    <div>
                      <div className="d-flex">
                        <lable htmlFor="auth" className="me-3">
                          Authorise :
                        </lable>
                        <td className="me-2">True</td>
                        <input
                          type="checkbox"
                          name="authorize"
                          value="false"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="mb-3">
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          onClick={Rclick}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}
