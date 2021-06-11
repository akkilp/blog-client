import React from 'react';

import axios from 'axios';
import cookieCutter from 'cookie-cutter';
import draftToHtml from 'draftjs-to-html';

import { Category } from '../interfaces/BlogData.interface';
import CategoryInput from './CategoryInput';

// @ts-ignore
import EditorComponent from './Editor';
import TextInput from './TextInput';

interface WritePostProps{

}

interface FormProps {
  body: string;
  title: string;
  categories: [] | Category[];
  isDraft: boolean;
}

const WritePost: React.FC<WritePostProps> = () => {
  const [state, setState] = React.useState<FormProps>({
    body: '', title: '', categories: [], isDraft: true,
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

  const handleEditorContent = (content: any) => {
    setState({ ...state, body: content });
  };

  const handleAdd = (category:any) => {
    const updatedCategories = [...state.categories, { name: category }];
    setState({ ...state, categories: updatedCategories });
  };

  const handleDelete = (category:any) => {
    const updatedCategories = state.categories.filter((current) => current.name !== category);
    if (updatedCategories.length === 0) {
      setState({ ...state, categories: [] });
    } else {
      setState({ ...state, categories: updatedCategories });
    }
  };

  const submitForm = async (event:any) => {
    event.preventDefault();
    const load = {
      title: state.title,
      categories: state.categories,
      content: draftToHtml(state.body),
    };

    try {
      const response = await axios.post('http://localhost:3050/posts', load, { withCredentials: true });
      console.log('Success', response.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <TextInput name="title" onChange={handleInputs} />
      <CategoryInput name="categories" categories={state.categories} handleAdd={handleAdd} handleDelete={handleDelete} />
      <EditorComponent handleContent={handleEditorContent} />

      <button type="submit">Create post</button>
    </form>
  );
};

export default WritePost;
