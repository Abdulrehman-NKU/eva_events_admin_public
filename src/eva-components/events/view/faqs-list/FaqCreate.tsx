'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { ActionIcon } from '@/components/ui/action-icon';
import { Title } from '@/components/ui/text';
import { Textarea } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { messages } from '@/config/messages';
import ResponseCodes from 'utils/response-codes';
import toast from 'react-hot-toast';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import { getEventParamsDetails } from '../all/getData';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { eventAction } from '../../../../../redux/slice/event';
import { Modal } from '@/components/ui/modal';

const initialValues = {
  question: '',
  answere: '',
};

const validationSchema = Yup.object({
  question: Yup.string().required(messages?.questionIsRequired),
  answere: Yup.string().required(messages?.answereIsRequired),
});
export default function FaqCreate() {
  let createFAQModal = useSelector(
    (state: any) => state?.event?.createFAQModal
  );

  const dispatch = useDispatch();
  const pathname = usePathname();

  const [state, setState] = useState({
    isLoading: false,
  });

  const onSubmitHandler = async (values: any) => {
    let { event_id } = getEventParamsDetails(pathname);
    setState({
      ...state,
      isLoading: true,
    });

    let faqData = {
      question: values.question,
      answer: values?.answere,
      event_id: [event_id],
    };

    let res = await EventsApiServices.createFAQ(faqData);

    if (res?.response_code === ResponseCodes.CREATE_SUCCESS) {
      formik.resetForm();
      toast.success('FAQS created successfully');
      toast.success('FAQs list reload in 1 sec.');
      // closeModal();
      onClose();
      setTimeout(() => {
        dispatch(eventAction?.setResetFAQsList());
      }, 1000);
    } else {
      toast.error('Internal server error');
    }

    setState({
      ...state,
      isLoading: false,
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onSubmitHandler,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const onClose = () => {
    dispatch(eventAction?.setCreateFAQModal());
  };

  console.log('createFAQModal>>>', createFAQModal);

  return (
    <>
      <Modal
        isOpen={createFAQModal}
        onClose={onClose}
        overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      >
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-grow flex-col gap-6 p-6 @container [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900"
        >
          <div className="flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Create FAQ
            </Title>
            <ActionIcon size="sm" variant="text" onClick={onClose}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          <Textarea
            label="Question"
            placeholder="Enter your question"
            name="question"
            error={formik?.errors?.question}
            value={formik?.values?.question}
            onChange={formik.handleChange}
          />

          <Textarea
            label="Answer"
            placeholder="Enter your answer"
            name="answere"
            error={formik?.errors?.answere}
            value={formik?.values?.answere}
            onChange={formik.handleChange}
          />

          <div className="flex items-center justify-end gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full @xl:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={state?.isLoading}
              className="w-full @xl:w-auto"
            >
              Create FAQ
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
