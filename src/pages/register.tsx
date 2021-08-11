import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';

import TextInput from '../components/TextInput';
import { Main } from '../templates/Main';

interface RegisterProps{

}

const Register: React.FC<RegisterProps> = () => {
  const [state, setState] = React.useState<any>({
    username: '', password: '', admin: '', email: '',
  });

  const router = useRouter();

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
    const url = `${process.env.NEXT_PUBLIC_API}/authentication/register`;
    const load = {
      name: state.username,
      password: state.password,
      adminPassword: state.admin,
      email: state.email,
    };
    try {
      const response = await axios.post(url, load, { withCredentials: true });
      console.log('Success!', response.data, response.status);
      setTimeout(() => router.push('/login'), 1500);
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  return (

    <Main>
      <section className="w-full h-full min-h-screen p-10 flex-row justify-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col max-w-md ml-auto mr-auto">
            <h2 className="text-4xl self-center p-20">Register</h2>
            <TextInput name="username" onChange={handleInputs} />
            <TextInput name="email" onChange={handleInputs} />
            <TextInput name="password" type="password" onChange={handleInputs} />
            <TextInput name="admin" type="password" onChange={handleInputs} />
            <button
              className="bg-blue-500 mx-3 hover:bg-blue-700 text-white mt-3 font-bold py-3 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

      </section>
    </Main>
  );
};

export default Register;
