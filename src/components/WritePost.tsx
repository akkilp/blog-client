import React from 'react';

import axios from 'axios';
import {
  EditorState, convertToRaw, convertFromHTML, ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import router from 'next/router';

import { Category } from '../interfaces/BlogData.interface';
import CategoryInput from './CategoryInput';
import TextInput from './TextInput';

const Editor = dynamic(
  // @ts-ignore
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

export interface FormProps {
  content?: any;
  title?: string;
  categories?: [] | Category[];
  isDraft?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WritePost: React.FC<FormProps> = ({
  content = '', title = '', categories = [], isDraft = true,
}: FormProps) => {
  const [state, setState] = React.useState<FormProps>({
    content, title, categories, isDraft,
  });

  /*   React.useEffect(() => {
    console.log(state);
  }, [state]); */

  React.useEffect(() => {
    // Creating
    if (state.content === '') {
      setState({ ...state, content: EditorState.createEmpty() });
    }

    // Editing
    else {
      /*
        Post is saved as markdown.
        Hence blocks must be first tranformed to raw JS, blocks and
        finally into editor state

        https://draftjs.org/docs/api-reference-data-conversion/#convertfromhtml
      */
      const blocksFromHTML = convertFromHTML(state.content);

      const contentBlocks = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );

      setState({ ...state, content: EditorState.createWithContent(contentBlocks) });
    }
  }, []);

  const handleInputs = (event: any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onEditorChange = (editorState:any) => setState({ ...state, content: editorState });

  const handleCategoryAdd = (category:any) => {
    const updatedCategories = [...state.categories, { name: category }];
    setState({ ...state, categories: updatedCategories });
  };

  const handleCategoryDelete = (category:any) => {
    const updatedCategories = state.categories?.filter((current) => current.name !== category);
    if (updatedCategories?.length === 0) {
      setState({ ...state, categories: [] });
    } else {
      setState({ ...state, categories: updatedCategories });
    }
  };

  const uploadImageCallBack = async (file: any) => {
    const targetUrl = `${process.env.NEXT_PUBLIC_IMG_HOST_IP}?key=${process.env.NEXT_PUBLIC_IMG_HOST_KEY}`;

    const getBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject('Error: ', error);
    });

    const base64File = await getBase64(file);

    const response = await axios.post(targetUrl, base64File, {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      },
    });
    console.log('RESPONSE:', response);
    console.log(base64File);
    console.log(targetUrl);
    console.log(file);
  };

  const submitForm = async (event:any) => {
    event.preventDefault();
    const rawEditorData = convertToRaw(state.content?.getCurrentContent());

    const payload = {
      title: state.title,
      categories: state.categories,
      content: draftToHtml(rawEditorData),
    };

    console.log(payload);

    try {
      const response = await axios.post('http://localhost:3050/posts', payload, { withCredentials: true });
      console.log('Success', response.data.id);
      router.push(`/posts/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <TextInput name="title" initValue={state.title} onChange={handleInputs} />
      <CategoryInput name="categories" categories={state.categories} handleAdd={handleCategoryAdd} handleDelete={handleCategoryDelete} />
      <Editor
        editorState={state.content}
        onEditorStateChange={onEditorChange}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        // toolbarOnFocus
        toolbar={{
          options: ['inline', 'blockType', 'list', 'link', 'embedded', 'image', 'history'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: {
            urlEnabled: true,
            previewImage: true,
            alt: { present: false, mandatory: false },
          },
        }}
      />

      <button
        className="bg-blue-500 mx-3 hover:bg-blue-700 text-white mt-3 font-bold py-3 px-4 rounded"
        type="submit"
      >
        Submit

      </button>
    </form>
  );
};

export default WritePost;
