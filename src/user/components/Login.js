/* Packages */
import React, { useContext, useState } from "react";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../shared/context/auth-context";
import { useHistory } from "react-router-dom";

/* CSS */
import "./Login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [failRes, setFailRes] = useState(false);
  const [failResMsg, setFailResMsg] = useState(
    "Login failed ,please try again"
  );
  const initialValues = {
    email: "",
    password: "",
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email(".invalid email").required(".required"),

    password: Yup.string()
      .required(".required")
      .min(6, ".minimum 6 chars")
      .matches(
        /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        ".must contain uppercase & 1 special char"
      ),
  });

  const submitHandler = async (values) => {
    try {
      const response = await fetch("https://internship-backend-5jsj.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        setFailRes(true);
        setFailResMsg(responseData.msg);
        throw new Error(responseData);
      }
      console.log(responseData);
      auth.login(auth.isLoggedIn, responseData.name, responseData.email);
      console.log(auth.isLoggedIn);
      setFailRes(false);
      history.push("/");
    } catch (err) {
      console.log(err);
      setFailRes(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        submitHandler(values);
        console.log(values);
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <div className="container">
            {failRes && <span className="error">{failResMsg}</span>}
            <Form>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email && touched.email ? "input-error" : null
                  }
                />
                <span className={formik.errors.email ? "error" : "no-error"}>
                  {touched.email &&
                    (formik.errors.email ? formik.errors.email : "✓")}
                </span>
              </div>

              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className={
                    errors.password && touched.password ? "input-error" : null
                  }
                />
                <span className={formik.errors.password ? "error" : "no-error"}>
                  {touched.password &&
                    (formik.errors.password ? formik.errors.password : "✓")}
                </span>
              </div>
              <div className="submit-btn-wrap">
                <button
                  type="submit"
                  className={
                    !(dirty && isValid) ? "disabled-btn" : "enabled-btn"
                  }
                  disabled={!(dirty && isValid)}
                >
                  Log In
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
