import process from 'process';

import React from 'react';

import axios from 'axios';
import router from 'next/router';

import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { Main } from '../templates/Main';
import { Config } from '../utils/Config';

interface LoginProps{

}

const Login: React.FC<LoginProps> = () => {
  const [state, setState] = React.useState<any>({
    email: '', password: '',
  });

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  const handleInputs = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API}/authentication/login`;
    const load = {
      password: state.password,
      email: state.email,
    };
    try {
      const response = await axios.post(url, load, { withCredentials: true });
      console.log('Logged in succesfully!', response.data, response.status);
      router.push('/');
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  return (

    <Main>
      <section className="w-full h-full min-h-screen p-10 flex-row justify-center">
        <div className="flex flex-col max-w-md ml-auto mr-auto">
          <h2 className="text-4xl self-center p-20">Login</h2>
          <TextInput name="email" onChange={handleInputs} />
          <TextInput name="password" type="password" onChange={handleInputs} />
          <button
            className="bg-blue-500 mx-3 hover:bg-blue-700 text-white mt-3 font-bold py-3 px-4 rounded"
            type="button"
            onClick={handleSubmit}
          >
            Log In
          </button>

          <a className="py-4 px-3 te" href="/register">Register admin account</a>
        </div>
      </section>
    </Main>
  );
};

export default Login;
