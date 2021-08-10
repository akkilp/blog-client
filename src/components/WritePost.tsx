import { pid } from 'process';

import React from 'react';

import axios from 'axios';
import {
  EditorState, convertToRaw, convertFromHTML, ContentState,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import dynamic from 'next/dynamic';
import router, { useRouter } from 'next/router';

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
  update: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WritePost: React.FC<FormProps> = ({
  content = '', title = '', categories = [], isDraft = true, update = false,
}: FormProps) => {
  const [state, setState] = React.useState<FormProps>({
    content, title, categories, isDraft, update,
  });

  const url = useRouter();
  const { id } = url.query;
  console.log(id, url.query);

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

  const createPost = async (payload: any) => {
    try {
      const response = await axios.post('http://localhost:3050/posts', payload, { withCredentials: true });
      console.log('Post created succesfully', response.data.id);
      router.push(`/posts/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (payload: any, pid: int) => {
    console.log(pid, 'päi');
    try {
      const response = await axios.patch(`http://localhost:3050/posts/${pid}`, payload, { withCredentials: true });
      console.log('Post updated succesfully', response.data.id);
      router.push(`/posts/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (event:any) => {
    event.preventDefault();
    const rawEditorData = convertToRaw(state.content?.getCurrentContent());

    const payload = {
      title: state.title,
      categories: state.categories,
      content: draftToHtml(rawEditorData),
    };

    if (update) {
      console.log('Updating post', id);
      // eslint-disable-next-line radix
      const toInt = parseInt(id);
      await updatePost(payload, toInt);
    } else {
      await createPost(payload);
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
