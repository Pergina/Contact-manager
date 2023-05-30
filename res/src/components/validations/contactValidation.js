import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    photo: Yup.string().url("Photo adderss is not valid").required("Photo is required"),
    email: Yup.string().required("Email is required"),
    mobile: Yup.number().required("Mobile is required"),
    job: Yup.string().nullable(),
    group: Yup.string().required("group is required")
})