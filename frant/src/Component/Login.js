import axios from "axios";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { TextField } from "./TextField";
import { useEffect } from "react";

export default function Login(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/logout");
    }
  }, []);

  const validation = yup.object({
    email: yup
      .string()
      .email("email is Invlaide")
      .required("Email is Required"),
    password: yup.string().min(4, "Must be 4 character add "),
  });
  const Rclick = async (values) => {
    await axios
      .post("http://localhost:4200/login", values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        let msg = res.data.message;
        let type = res.data.type;
        props.showalert(msg, type);
        localStorage.setItem("token", res.data.token);
        const userdata = res.data.userdata;
        if (userdata.authorize === true) {
          localStorage.setItem("userdata", userdata);
          navigate("/match");
        } else {
          navigate("/cancel");
        }
      })
      .catch((err) => {
        let msg = err.response.data.message;
        let type = err.response.data.type;
        props.showalert(msg, type);
      });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validation}
      onSubmit={(values) => {
        Rclick(values);
      }}
    >
      {(formik) => (
        <div>
          <div className="mt-5 ">
            <div className="container top">
              <div>
                <div className="row">
                  <div className="col d-flex justify-content-center item-center pt-4">
                    <h2>Sign-in</h2>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center pb-5">
                <div className="col-sm-10 col-md-9 col-xl-9">
                  <Form>
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
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
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
