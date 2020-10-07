import * as Yup from 'yup';


export const yupRegObj = Yup.object({
    name: Yup.string()
        .required('* Required'),
    lastname: Yup.string()
        .required('* Required'),
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Required'),
    password: Yup.string()
        .min(8, '* must be more than 8 characters')
        .required('* Required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('* Required'),
    termsAndConditions: Yup.bool().oneOf([true], '* Acceptance of Terms & Conditions is required')
    })

export const yupLoginObj = Yup.object({
    email: Yup.string()
        .email('* Invalid email address')
        .required('* Email Required'),
    password: Yup.string()
        .required('* Password Required'),
    })
export const yupForgotPasswordObj = Yup.object({
        email: Yup.string()
            .email('* Invalid email address')
            .required('* Email Required'),
        })

export const yupResetPasswordObj = Yup.object({
    password: Yup.string()
        .min(8, '* must be more than 8 characters')
        .required('* Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('* Required'),
    })