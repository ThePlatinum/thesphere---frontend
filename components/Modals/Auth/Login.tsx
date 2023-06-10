import ApplicationLogo from "@/components/ApplicationLogo"
import Modal from "../Modal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import { useEffect, useState } from "react"
import Button from "@/components/Button"
import { hide, showRegister } from "@/lib/redux/slices/authModalSlice"
import * as yup from 'yup';
import { Formik } from "formik"
import { LoginAuthProps, useLazyInitCsrfQuery, useLoginMutation } from "@/lib/redux/apis/endpoints/auth"

const Login = () => {

  const [loginError, setLoginError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = useSelector((state: RootState) => state.authModal)
  const dispatch = useDispatch()

  const [useLogin, { isLoading }] = useLoginMutation()
  const [useCsrf] = useLazyInitCsrfQuery()

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleLogin = async (values: LoginAuthProps) => {
    setLoginError('')

    await useCsrf()

    await useLogin(values)
      .unwrap()
      .then()
      .catch((e: any) => {
        setLoginError(e.data.message);
      })
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const requestClose = () => dispatch(hide())

  return (
    <Modal open={openModal == 'login'} >
      <Modal.Content useClose className={'py-12 w-md-32'} requestClose={requestClose}>
        <ApplicationLogo />

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin} >
          {({ handleChange, handleBlur, handleSubmit, errors, values }: any) => (
            <div className="pt-8">
              <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  aria-label="Email"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                />
                {errors.email && <p className='form-error'>{errors.email}</p>}
              </div>

              <div className="form-group">
                <div className="form-append">
                  <input
                    className="form-input border-none"
                    placeholder="Password"
                    aria-label="Password"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur('password')}
                    onChange={handleChange('password')}
                  />
                  <Button className="appended capitalize p-0" onClick={togglePasswordVisibility}>
                    {passwordVisible ? 'hide' : 'show'}
                  </Button>
                </div>
                {errors.password && <p className='form-error'>{errors.password}</p>}
              </div>

              <p className='form-error pt-8 h6'>{loginError}</p>

              <div className="pt-2 flex align-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="auth-btn"
                  processing={isLoading}>
                  Login
                </Button>

                <Button
                  onClick={() => dispatch(showRegister())}
                  className="underline"
                  processing={isLoading}>
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  )
}

export default Login