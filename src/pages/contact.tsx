/* eslint-disable react/jsx-props-no-spreading */

import process from 'process';

import React from 'react';

import axios from 'axios';
import {
  Formik, Form,
} from 'formik';
import * as Yup from 'yup';

import Button from '../components/Button';
import Input from '../components/Input';
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
    .max(40, 'Must be 40 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  message: Yup.string()
    .required('Required'),
});

const Contact = () => {
  const [alert, setAlert] = React.useState<'' | string>('');

  const handleAlert = (message:string) => {
    setAlert(message);

    setTimeout(() => {
      setAlert('');
    }, 5000);
  };

  return (
    <Main meta={<Meta title="Contact" description="Contact description" />}>
      <section className="content-wrapper">
        <h2 className="text-3xl p-3 border-l-4 border-gray-700 text-gray-700 font-medium">Contact</h2>

        <p className="text-lg py-8 px-4">A question raised? Let´s get in touch.</p>
        <Formik
          initialValues={defaultValues}
          validationSchema={validationOptions}
          onSubmit={async (values) => {
            try {
              await axios.post(`${process.env.NEXT_PUBLIC_API}/mail`, values);
              handleAlert('Message succesfully sent. I will be in touch.');
            } catch (err) {
              handleAlert('Error occurred in sending message. Try again.');
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <fieldset disabled={isSubmitting}>
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
              </fieldset>
              {/* Wrapping container fixes visual error that comes without absoluting */}
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full">
                  <div className="flex justify-center">
                    <Button type="submit" label={isSubmitting ? 'Sending ...' : 'Send'} className="mt-6 w-48" />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {alert
          ? (
            <div className="fixed w-full h-16 bottom-0 left-0 bg-gray-600 alert-footer">
              <p className="lg:ml-80 p-5 top-1/2 text-lg font-semibold">Message succesfully sent. I will be in touch.</p>
            </div>
          )
          : null}
      </section>
    </Main>
  );
};

export default Contact;
