import React from 'react';

import axios from 'axios';

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

  const validValues = () => {
    let valid = true;

    if (state.title === '') {
      setErrors({ ...errors, title: true });
      valid = false;
    }

    if (state.message === '') {
      setErrors({ ...errors, message: true });
      valid = false;
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (state.email === '' || state.email.match(emailRegex)) {
      setErrors({ ...errors, email: true });
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async () => {
    setErrors(noErrors);
    const valid = validValues();
    console.log(errors);
    console.log(state);

    if (!valid) return;

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
        <TextInput
          name="title"
          styles="max-w-lg"
          onChange={handleInputs}
          initValue={state.title}
          error={errors.title}
        />
        <TextInput
          name="email"
          styles="max-w-lg"
          onChange={handleInputs}
          initValue={state.email}
          error={errors.email}
        />
        <TextArea
          name="message"
          styles="max-w-lg"
          onChange={handleInputs}
          initValue={state.message}
          error={errors.message}
        />
        <Button label="send" onClick={handleSubmit} className="ml-3 mt-2 w-32" />
      </section>
    </Main>
  );
};

export default Contact;
