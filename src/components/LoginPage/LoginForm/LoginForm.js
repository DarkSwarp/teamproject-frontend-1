import { Formik } from "formik";
import * as yup from "yup";
import { FormWrapper, FormTitle, Form, FieldWrapper, FormLabel, Field, FormButton } from "components/RegisterPage/RegisterForm/RegisterForm.styled";
import icon from "assets/icons/symbol-defs.svg";

const schema = yup.object().shape({
  email: yup.string().email("This is an ERROR email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <FormWrapper>
      <FormTitle>Log In</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off">
          <FieldWrapper>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field id="email" name="email" type="email" placeholder="Enter email" />
          </FieldWrapper>
          <FieldWrapper>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field id="password" name="password" type="password" placeholder="Enter password" />
          </FieldWrapper>
          <FormButton type="submit">
            <span>Log In</span>
            <svg width="20" height="20">
              <use href={icon + "#icon-login"}></use>
            </svg>
          </FormButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};
export default LoginForm;
