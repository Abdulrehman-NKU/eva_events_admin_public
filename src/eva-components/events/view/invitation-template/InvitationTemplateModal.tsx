"use client"
//@ts-nocheck

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { followersData } from '@/data/profile-data';
import { Title } from '@/components/ui/text';

import { EventsApiServices } from 'utils/api/EventsApiServices';
import { usePathname, useRouter } from 'next/navigation';
import ResponseCodes from 'utils/response-codes';
import axios, { CancelTokenSource } from 'axios';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import { getEventParamsDetails } from '../all/getData';
import styles from './InvitationTemplateModal.module.scss';
import Logo from '@/eva-components/logo';
import Spinner from '@/components/ui/spinner';
import EventInviteTemplateBodyEditor from './EventInviteTemplateBodyEditor';
import { CommonUtils } from 'utils/common.utils';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { CommonEnums } from '@/enums/common.enums';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';

const pageHeader = {
  title: 'Event Exhibitors',
};
const tabs = [{ id: 'followers', count: followersData.length }];

let cancelToken: CancelTokenSource;

const InvitationTemplateModal = () => {
  const pathname = usePathname();
  const pathParams = getEventParamsDetails(pathname);
  const router = useRouter();
  const eventId = pathParams.event_id;
  let userType = pathParams.user_type;

  let initialEditorState = EditorState.createEmpty();
  const html = '<p>Please update this content here</p>';

  const contentBlock = htmlToDraft(html);

  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    initialEditorState = EditorState.createWithContent(contentState);
  }

  const [state, setState] = useState<any>({
    isLoading: false,
    listData: [],
    isLoadingSave: false,
    addUserListData: [],
    isLoadingAddUser: false,
    editing: false,
    templateData: {},
  });

  const [updateState, setUpdateState] = useState({
    loading: false,
  });

  const [editorState, setEditorState] = useState({
    editing: false,
    editorState: initialEditorState,
  });

  const getEmailTemplateData = async () => {
    setState({
      ...state,
      isLoading: true,
    });

    let user_type = pathParams?.user_type;

    if (user_type === CommonEnums?.users?.mediaPartner) {
      user_type = CommonEnums?.users?.media_partner;
    }

    let res = await EventsApiServices.getInviteEmailTemplate({
      event_id: eventId,
      user_type: user_type,
    });

    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        templateData: res?.data,
        isLoading: false,
      });
      return;
    } else {
      toast.error(
        res?.message ??
          'Something went wrong while fetching template date, please try to refresh the page!'
      );
    }

    setState({
      ...state,
      isLoading: true,
    });
  };

  const updateTemplateData = async () => {
    setState({
      ...state,
      isLoadingSave: true,
    });

    const formData = new FormData();

    let editorData = convertToRaw(editorState.editorState.getCurrentContent());

    let htmlData = draftToHtml(editorData)?.replace(/(\r\n|\n|\r|\\n)/gm, '');

    let user_type = pathParams?.user_type;
    if (user_type === CommonEnums?.users?.mediaPartner) {
      user_type = CommonEnums?.users?.media_partner;
    }

    formData.append('event_id', eventId);
    formData.append('body_content', htmlData);
    formData.append('user_type', user_type ?? '');
    formData.append(
      'template_type',
      CommonEnums.emailTemplateTypes.event_invite_to_user
    );

    let res = await EventsApiServices.updateInviteEmailTemplate({
      formdata: formData,
    });

    if (res?.response_code === ResponseCodes.UPDATE_SUCCESS) {
      toast.success('Email template is updated successfully');
      const eventUsersPage = CommonUtils.getEventUsersPageRoute({
        event_id: eventId,
        user_type: pathParams.users_type,
      });

      router.push(eventUsersPage);
      return;
    } else {
      toast.error(
        res?.message ??
          'Something went wrong while fetching template date, please try to refresh the page!'
      );
    }

    setState({
      ...state,
      isLoadingSave: false,
      editing: false,
    });
  };

  useEffect(() => {
    getEmailTemplateData();
  }, []);

  useEffect(() => {
    const _html =
      (state.templateData as any)?.metadata?.body_content?.replace(
        /(\r\n|\n|\r|\\n)/gm,
        ''
      ) ?? '<p>Please update this content here</p>';

    const contentBlock = htmlToDraft(_html);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      initialEditorState = EditorState.createWithContent(contentState);
    }

    setEditorState({
      ...editorState,
      editorState: initialEditorState,
    });
  }, [state.templateData]);

  const onEditingHandler = (data: any) => {
    console.log('data', data);
    setState({
      ...state,
      editing: !state.editing,
    });
  };

  const onEditorStateChange = (data: any) => {
    console.log('data', data);
    setEditorState({
      ...editorState,
      editorState: data,
    });
  };

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      {state?.isLoading ? (
        <div
          className={`grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center ${styles.loading}`}
        >
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <>
          <div className={styles.body_main_container}>
            <div className={styles.tamplate_body}>
              <div className={styles.tamplate_logo}>
                {state.templateData?.event?.event_logo ? (
                  <div className={styles.tamplate_live_logo}>
                    <img
                      src={getImageUrl(state.templateData?.event?.event_logo)}
                      alt=""
                    />
                  </div>
                ) : (
                  <Logo iconOnly={false} width="140" height="30" />
                )}
              </div>
              <div className={styles.tamplate_head}>
                <p>{state.templateData?.event?.name}</p>
              </div>
              <div className={styles.tamplate_img}>
                <img
                  src={getImageUrl(state.templateData?.event?.featured_image)}
                  alt=""
                />
              </div>

              <div className={styles.body_head}>
                <p>You’re invited!</p>
              </div>
              <div className={styles.text_contain}>
                <p className={styles.text_contain_head}>Dear User Name</p>
                <p className={styles.event_name}>
                  You have been invited to the
                  <span>&nbsp;{state.templateData?.event?.name}</span>
                </p>
                <p className={styles.event_date}>
                  event which will be held on
                  <span>
                    &nbsp;
                    {CommonUtils.formatEventDates({
                      endDate: state.templateData?.event?.end_date,
                      startDate: state.templateData?.event?.start_date,
                    })}
                  </span>
                </p>
              </div>

              <div className={styles.edit_body_container}>
                <EventInviteTemplateBodyEditor
                  templateData={state.templateData}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  onEditingHandler={onEditingHandler as any}
                  editing={state?.editing}
                />
              </div>

              <div className={styles.user_auth_text}>
                <p>
                  User Id: <span>Login email</span>
                </p>
                <p>
                  Password: <span>Login password</span>
                </p>
              </div>
              <button className={styles.login_btn}>Login and Explore</button>
              <div className={styles.bottom_text}>
                <p className={styles.event_info}>
                  We look forward to engaging with you online and in person at
                  the event!
                </p>
                <p>Kind Regards,</p>
                <p> Events Team</p>
              </div>
              <div className={styles.bottom_logo}>
                <Logo iconOnly={false} width="70" height="20" />
              </div>
              <div className={styles.bottom_eva_info_text}>
                <p>
                  You were sent this invitation as you were previously an
                  attendee or associated with a company at one of our past
                  events. If you do not wish to receive notifications then
                  <a href="" target="_blank">
                    please click here to unsubscribe
                  </a>
                  and we will remove you from our database.
                </p>
                <p>
                  EVA CRM is a subsidiary of Eva International Media Ltd. Based
                  in England and Wales. Register Company No. 2323023. For more
                  information, visit
                  <a href="" target="_blank">
                    www.evacrm.com/about
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`sticky bottom-0 left-0 right-0 -mb-8 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50 ${styles.bottom_buton_footer}`}
          >
            <Button
              variant="outline"
              className="w-28 @xl:w-auto "
              onClick={onClickBack}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={updateTemplateData}
              isLoading={state?.isLoadingSave}
              className="w-28 @xl:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
            >
              Save
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default InvitationTemplateModal;
