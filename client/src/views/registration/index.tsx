import {useFormik} from "formik";
import * as Yup from 'yup';
import {api} from "../../api/instance.ts";
import {useNavigate, useParams} from "react-router-dom";
import  {useState} from "react";
import BackButton from "../../components/BackButton/BackButton.tsx";


const Option = [
    {value: 'socialMedia', label: 'Social Media'},
    {value: 'friend', label: 'Friend'},
    {value: 'email', label: 'Email'},
    {value: 'myself', label: 'Fount myself'},
];
const Registration = () => {
    const navigate = useNavigate();
    const {eventId} = useParams();
    const [error, setError] = useState(null)
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            dateOfBirth: '',
            heardAbout: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().trim()
                .required('Required')
                .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, 'Enter both first and last name'),
            email: Yup.string().email('Invalid email address').required('Required'),
            dateOfBirth: Yup.date().max(new Date(), 'Date must be before today').required('Required'),
            heardAbout: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            api.post('/participants', {eventId, ...values})
                .then(() => {
                    navigate(`/participants/${eventId}`)
                })
                .catch((err) => {
                    console.log(err.response.data.message)
                    setError(err.response.data.message)
                })

        }
    });

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-8">
                    <BackButton onClick={()=>navigate(-1)}/>
                    <h2 className="text-2xl font-bold text-center">Registration form</h2>
                    <div className="w-10"></div>
                </div>
                <form onSubmit={formik.handleSubmit}
                      className="space-y-4"
                >
                    <div>
                        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name
                            (EN)</label>
                        <input type="text"
                               id="full-name"
                               name="fullName"
                               onChange={formik.handleChange}
                               value={formik.values.fullName}
                               className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                        {formik.touched.fullName && formik.errors.fullName ? (
                            <div className="text-red-600 text-sm">{formik.errors.fullName}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-600 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth"
                               className="block text-sm font-medium text-gray-700"
                        >
                            Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dateOfBirth}
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        />
                        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                            <div className="text-red-600 text-sm">{formik.errors.dateOfBirth}</div>
                        ) : null}
                    </div>
                    <div>
                        <label htmlFor="heardAbout"
                               className="block text-sm font-medium text-gray-700"
                        >
                            Where did you hear about this event?
                        </label>
                        <select
                            id="heardAbout"
                            name="heardAbout"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.heardAbout}
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                        >
                            <option value="" label="Select an option"/>
                            {Option.map((option) =>
                                <option key={option.value} value={option.value}>{option.label}</option>
                            )}
                        </select>
                        {formik.touched.heardAbout && formik.errors.heardAbout ? (
                            <div className="text-red-600 text-sm">{formik.errors.heardAbout}</div>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit"
                                className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                        <button type="reset"
                                className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Reset
                        </button>
                    </div>
                    {error && <div className="text-red-600 ">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Registration;