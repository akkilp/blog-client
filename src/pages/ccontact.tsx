/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import axios from 'axios';
import {
  Formik, Field, Form, ErrorMessage, useField,
} from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import TextArea from '../components/TextArea';
import TextInput from '../components/TextInput';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

export interface FormProps {
  title:string;
  email: string;
  message: string;
}

const defaultValues: FormProps = {
  title: '', email: '', message: '',
};

const validationOptions = Yup.object({
  title: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  message: Yup.string()
    .required('Required'),
});

const Input = (props:any) => {
  const [field, meta] = useField(props);

  return (
    <div className="max-w-xl">
      <label
        htmlFor={props.name}
        className="block uppercase tracking-wide text-gray-700  text-xs font-bold mb-2"
      >
        {props.name}

        {props.type === 'textarea'
          ? (
            <textarea
              {...field}
              {...props}
              className="appearance-none block w-full h-48 bg-gray-200 text-gray-700 text-lg border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-100"
            />
          )
          : (
            <input
              {...field}
              {...props}
              className="appearance-none block w-full bg-gray-200 text-gray-700 text-lg border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-gray-100"
            />
          ) }
        {meta.error && meta.touched && <div className="text-red-500 text-xs italic float-right">{meta.error}</div>}
      </label>
    </div>
  );
};

const Contact = () => (
  <Main meta={<Meta title="Contact" description="Contact description" />}>
    <section className="content-wrapper">
      <h2 className="text-3xl p-3 border-l-4 border-gray-700 text-gray-700 font-medium">Contact</h2>

      <p className="text-lg py-8 px-4">A question raised? Let's get in touch.</p>

      <Formik
        initialValues={defaultValues}
        validationSchema={validationOptions}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            console.log(values);
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Input
              label="email"
              name="email"
              type="email"
            />
            <Input
              label="title"
              name="title"
              type="text"
            />
            <Input
              label="message"
              name="message"
              type="textarea"
            />
            <Button type="submit" label="Send" />
          </Form>
        )}
      </Formik>
    </section>
  </Main>
);

export default Contact;
