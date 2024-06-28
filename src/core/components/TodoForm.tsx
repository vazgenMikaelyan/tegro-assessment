import React from "react";
import { useFormik } from 'formik';

type FormProps = {
  submitText
  initialValues: string
  onSubmit: (values) => Promise<void>
}

export function TodoForm(props: FormProps) {

  const formik = useFormik({
    initialValues: {
      name: props.initialValues
    },
    onSubmit: values => {
      props.onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-xl">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
          <input
            name="name"
            type="text"
            placeholder="Add Todo"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
        </div>
        <div className="w-full md:w-1/4 px-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {props.submitText}
          </button>
        </div>
      </div>
    </form>
  );
}
