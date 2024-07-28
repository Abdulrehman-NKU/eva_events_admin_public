import FormGroup from '@/app/shared/form-group';
import PencilIcon from '@/components/icons/pencil';
import { FAQsListType } from '@/eva-components/type/propsType';
import Link from 'next/link';
import React, { useState } from 'react';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { ActionIcon, Text, Tooltip } from 'rizzui';
import DeleteFaq from './DeleteFaq';
import EditFaq from './EditFaq';
import { eventAction } from '../../../../../redux/slice/event';

const FaqsList = ({ faqsList }: { faqsList: FAQsListType[] }) => {
  const [state, setState] = useState<any>({
    toggleAns: '',
    editData: {
      _id: '',
      question: '',
      answer: '',
      event_id: [],
      __v: 0,
      id: '',
    },
  });
  const dispatch = useDispatch();

  const onClickToggleAns = (id: string) => {
    if (state?.toggleAns === id) {
      setState({
        ...state,
        toggleAns: '',
      });
    } else {
      setState({
        ...state,
        toggleAns: id,
      });
    }
  };

  const onClickEdit = (listData: FAQsListType) => {
    setState({
      ...state,
      editData: listData,
    });
    dispatch(eventAction?.setEditFAQModal());
  };
  return (
    <>
      <FormGroup
        title=""
        description={``}
        className={'whitespace-pre-line pt-2 @2xl:pt-9 @3xl:pt-9'}
      >
        {faqsList.map((list) => (
          <div
            className={`flex w-full flex-grow flex-col items-center justify-between rounded border px-3 py-3 text-black  dark:bg-red-50 ${
              list?._id === state?.toggleAns ? 'border-black' : ''
            }`}
            key={list?._id}
          >
            <div className="min-h-25 flex w-full justify-between">
              <div
                className="flex w-11/12 cursor-pointer"
                onClick={() => onClickToggleAns(list?._id)}
              >
                <p className="mr-1 text-base text-sky-700">Q.</p>
                <Text
                  className={`text-base ${
                    list?._id === state?.toggleAns ? '' : 'line-clamp-2'
                  }`}
                >
                  {list?.question}
                </Text>
              </div>

              <div className="ml-2 ml-3 flex gap-2">
                <Tooltip
                  size="sm"
                  content={() => 'Edit FAQ'}
                  placement="top"
                  color="invert"
                >
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Edit FAQ'}
                    onClick={() => onClickEdit(list)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </ActionIcon>
                </Tooltip>

                <DeleteFaq
                  title={`Delete the question`}
                  description={`Are you sure you want to delete this question ?`}
                  id={list?._id}
                />

                <Tooltip
                  size="sm"
                  content={() => 'Show answer'}
                  placement="top"
                  color="invert"
                >
                  <ActionIcon
                    size="sm"
                    variant="outline"
                    aria-label={'Edit FAQ'}
                    onClick={() => onClickToggleAns(list?._id)}
                  >
                    {list?._id === state?.toggleAns ? (
                      <PiCaretUpBold className="h-3.5 w-3.5" />
                    ) : (
                      <PiCaretDownBold className="h-3.5 w-3.5" />
                    )}
                  </ActionIcon>
                </Tooltip>
              </div>
            </div>
            {list?.id === state?.toggleAns && (
              <div className="mt-3 flex w-full border-t border-dashed pt-3">
                <p className="mr-1 text-base text-sky-700">A.</p>
                <Text className="">{list?.answer}</Text>
              </div>
            )}
          </div>
        ))}
      </FormGroup>
      <EditFaq editData={state?.editData} />
    </>
  );
};

export default FaqsList;
