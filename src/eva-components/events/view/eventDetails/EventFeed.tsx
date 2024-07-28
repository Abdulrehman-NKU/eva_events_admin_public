'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import hasSearchedParams from '@/utils/has-searched-params';
import { filterProductsData } from '@/data/filter-products-data';
import shuffle from 'lodash/shuffle';
import ListingCard from './product-modern-card-fancybox';
import { Title } from '@/components/ui/text';
import { usePathname } from 'next/navigation';
import axios, { CancelTokenSource } from 'axios';
import { EventsApiServices } from 'utils/api/EventsApiServices';
import ResponseCodes from 'utils/response-codes';
import Spinner from '@/components/ui/spinner';
import PageHeader from '@/eva-components/page-header';
import { eventAction } from '../../../../../redux/slice/event';
import { useDispatch, useSelector } from 'react-redux';
import UploadNewImageModal from './UploadNewImageModal';
import Fancybox from '../Fancybox';

let cancelToken: CancelTokenSource;
export default function EventFeed() {
  const pageHeader = {
    title: 'Event Galleries',
  };

  const dispatch = useDispatch();

  const [state, setState] = useState({
    isLoading: false,
    imageListData: [],
    totalImages: '',
    imageCount: 0,
    isLoadingLoadMore: false,
    isModalOpen: false,
  });

  function handleLoadMore() {
    getImagesListApi(state?.imageCount + 9);
  }

  let resetImagesList = useSelector(
    (state: any) => state?.event?.resetImagesList
  );

  const pathname = usePathname();

  const filteredData = hasSearchedParams()
    ? shuffle(filterProductsData)
    : filterProductsData;

  const getImagesListApi = async (limit: number) => {
    let pathnameArray = pathname.split('/');
    let eventId = pathnameArray[2];

    if (state?.imageListData.length === 0) {
      setState({
        ...state,
        isLoading: true,
      });
    } else {
      setState({
        ...state,
        isLoadingLoadMore: true,
      });
    }

    cancelToken = axios.CancelToken.source();
    let res = await EventsApiServices.getEventImages(
      eventId,
      limit,
      cancelToken
    );
    if (res?.response_code === ResponseCodes.GET_SUCCESS) {
      setState({
        ...state,
        isLoading: false,
        isLoadingLoadMore: false,
        imageListData: res?.data?.data?.docs,
        totalImages: res?.data?.data?.totalDocs,
        imageCount: state?.imageCount + 9,
      });
    }
  };

  const onClickCreate = () => {
    dispatch(eventAction?.setCreateEventGalleriesModal());
  };

  useEffect(() => {
    getImagesListApi(9);
  }, [resetImagesList]);

  return (
    <>
      {state?.isLoading ? (
        <div
          className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center"
          style={{ height: '76vh' }}
        >
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div className="@container">
          <PageHeader title={pageHeader.title}>
            <div className="mt-4 flex items-center gap-3 @lg:mt-0">
              <Button
                tag="span"
                className="w-full cursor-pointer @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                onClick={onClickCreate}
              >
                Upload New Image
              </Button>
            </div>
          </PageHeader>
          <Fancybox options={{ Carousel: { infinite: false, }, }} >
          <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-6 @md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] @xl:gap-x-7 @xl:gap-y-9 @4xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] @6xl:grid-cols-[repeat(auto-fill,minmax(364px,1fr))]">
            {state?.imageListData?.map((thumbnail, index) => (
              <ListingCard
                key={`filterProduct-${index}`}
                imageData={thumbnail}
              />
            ))}
          </div>
          </Fancybox>

          {state?.totalImages > `${state?.imageCount}` && (
            <div className="mb-4 mt-5 flex flex-col items-center xs:pt-6 sm:pt-8">
              <Button
                isLoading={state?.isLoadingLoadMore}
                onClick={() => handleLoadMore()}
                className="dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}

      <UploadNewImageModal data={state.imageListData} />
    </>
  );
}
