import React, { Component } from 'react';

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

export default class ArticleEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    // eslint-disable-next-line react/prop-types
  };

  uploadImageCallBack = async (_file) => {
    console.log('huutista');
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        onEditorStateChange={this.onEditorStateChange}
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
            uploadEnabled: true,
            uploadCallback: this.uploadImageCallBack,
            previewImage: true,
            alt: { present: false, mandatory: false },
          },
        }}
      />
    );
  }
}
