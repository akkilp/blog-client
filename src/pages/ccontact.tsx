import React from 'react';

import axios from 'axios';
import { Formik, Field, Form } from 'formik';

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

const defaultValues = {
  title: '', email: '', message: '',
};

const noErrors = {
  title: false, email: false, message: false,
};

const Contact = () => {
  const [state, setState] = React.useState<FormProps>(defaultValues);

  const [errors, setErrors] = React.useState<any>(noErrors);

  const handleInputs = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async ({ values, actions }) => {
    try {
      const response = await axios.post('http://localhost:3050/mail', state);
      if (response.status === 200) {
        setState(defaultValues);
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main meta={<Meta title="Contact" description="Contact description" />}>
      <section className="content-wrapper">
        <h2 className="text-3xl p-3 border-l-4 border-gray-700 text-gray-700 font-medium">Contact</h2>

        <p className="text-lg py-8 px-4">A question raised? Let's get in touch.</p>

        <Formik
          initialValues={defaultValues}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ isSubmitting }) => (
            <Form />
          )}
        </Formik>
      </section>
    </Main>
  );
};

export default Contact;
