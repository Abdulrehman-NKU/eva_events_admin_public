//@ts-nocheck

import React, { useState } from 'react';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from 'rizzui';

import { CiEdit } from 'react-icons/ci';

import styles from './EventInviteTemplateBodyEditor.module.scss';

const EventInviteTemplateBodyEditor = (props: {
  templateData: any;
  editorState: {
    editorState: any;
  };
  onEditingHandler: () => any;
  onEditorStateChange: (data: any) => any;
  editing: boolean;
}) => {
  let editorState = props.editorState?.editorState;
  let initialEditorState = EditorState.createEmpty();

  console.log('templateData', props.templateData);

  const html =
    props.templateData?.metadata?.body_content?.trim() ??
    '<p>Please update this content here</p>';

  const contentBlock = htmlToDraft(html);

  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    initialEditorState = EditorState.createWithContent(contentState);
  }

  // const [state, setState] = useState({
  //   editing: false,
  // });

  const onEditorStateChange = (data: any) => {
    props.onEditorStateChange(data);
  };

  const handleCancelButton = () => {
    props?.onEditingHandler();
  };

  const handlePreviewButton = () => {
    props?.onEditingHandler();
  };

  const handleEditButton = () => {
    props?.onEditingHandler();
  };

  const renderEditor = () => {
    if (props.editing) {
      return (
        <div className="editor--container">
          <div className={styles['action-buttons-container']}>
            <button
              className={styles['preview-button']}
              onClick={handlePreviewButton}
            >
              Preview
            </button>
            <button
              className={styles['cancel-button']}
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </div>

          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            editorClassName={styles.editorClassName}
          />
        </div>
      );
    }

    return <></>;
  };

  const renderReadOnlyEditor = () => {
    if (!props.editing) {
      return (
        <div className="readonly-editor-container" onClick={handleEditButton}>
          <Button
            variant="text"
            onClick={handleEditButton}
            className={`h-auto px-1 py-1 ${styles.edit_icon} toggle-editor-button`}
          >
            <CiEdit className="h-5 w-5 text-base" />
          </Button>
          <Editor
            editorState={editorState}
            readOnly={true}
            toolbarHidden={true}
          />
        </div>
      );
    }

    return <></>;
  };

  return (
    <div
      className={`${styles['event-invite-template-editor']} event-invite-template-body-editor`}
    >
      {renderEditor()}
      {renderReadOnlyEditor()}
    </div>
  );
};

export default EventInviteTemplateBodyEditor;
