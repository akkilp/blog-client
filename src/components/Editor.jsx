/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import {
  EditorState, convertToRaw, ContentState, convertFromHTML,
} from 'draft-js';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);

    const content = ContentState.createFromText(props.editorState);

    this.state = {
      editorState: EditorState.createWithContent(content),
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

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
        onEditorStateChange={this.onChange}
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
