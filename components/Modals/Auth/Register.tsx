import ApplicationLogo from "@/components/ApplicationLogo"
import Modal from "../Modal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/redux/store"
import Button from "@/components/Button"
import { hide, showLogin } from "@/lib/redux/slices/authModalSlice"
import * as yup from 'yup';
import { Formik } from "formik"
import { useState } from "react"

const Register = () => {

  const [registerError, setRegisterError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);

  const openModal = useSelector((state: RootState) => state.authModal)
  const dispatch = useDispatch()

  const validationSchema = yup.object().shape({
    name: yup.string().required('Your name please').min(2, 'Use a real name'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password should be at least 8 characters'),
    confirm_password: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });

  const handleRegister = () => {
    requestClose()
  }

  const requestClose = () => dispatch(hide())

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <Modal open={openModal == 'register'} onClose={() => console.log('Onclose: ')} >
      <Modal.Content useClose className={'py-12 w-md-32'} requestClose={requestClose}>
        <ApplicationLogo />

        <Formik
          initialValues={{ name: '', email: '', password: '', confirm_password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleRegister} >
          {({ handleChange, handleBlur, handleSubmit, errors, values }: any) => (
            <div className="pt-8">

              <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Name"
                  name="name"
                  aria-label="Name"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && <p className='form-error'>{errors.name}</p>}
              </div>

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

              <div className="form-group">
                <input
                  className="form-input"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  type='password'
                  name="confirm_password"
                  value={values.confirm_password}
                  onBlur={handleBlur('confirm_password')}
                  onChange={handleChange('confirm_password')}
                />
                {errors.confirm_password && <p className='form-error'>{errors.confirm_password}</p>}
              </div>

              <p className='form-error pt-8 h6'>{registerError}</p>

              <div className="pt-2 flex align-center">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="auth-btn">
                  Register
                </Button>

                <Button
                  onClick={() => dispatch(showLogin())}
                  className="underline">
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  )
}

export default Register