import UploadIcon from '@/components/shape/upload';
import Spinner from '@/components/ui/spinner';
import PageHeader from '@/eva-components/page-header';
import { getImageUrl } from '@/eva-components/userDetails/userDetails';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PiPlusBold } from 'react-icons/pi';
import { Button, cn, Text, Title } from 'rizzui';
import { VenueMapApi } from 'utils/api/VenueMap';
import ResponseCodes from 'utils/response-codes';
import Fancybox from '../Fancybox';

interface stateType {
  isLoadingFetch: boolean;
  isLoadingUpload: boolean;
  venueMapFile: any;
  drag: boolean;
  isLoadingDelete: boolean;
}

const VenueMap = () => {
  const [state, setState] = useState<stateType>({
    isLoadingFetch: false,
    isLoadingUpload: false,
    venueMapFile: null,
    drag: false,
    isLoadingDelete: false,
  });
  const pathname = usePathname();
  let pathnameArray = pathname.split('/');
  let eventId = pathnameArray[2];

  function getFileType(url: string) {
    const extension: any = url?.split('.')?.pop()?.toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'avif'];
    const applicationExtensions = [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
    ];

    if (imageExtensions.includes(extension)) {
      return 'image';
    } else if (applicationExtensions.includes(extension)) {
      return 'application';
    } else {
      return 'unknown';
    }
  }

  let getDataApi = async () => {
    setState({
      ...state,
      isLoadingFetch: true,
    });
    let res = await VenueMapApi.getVenueMap(eventId);

    console.log('res>>>', res);

    switch (res?.response_code) {
      case ResponseCodes.GET_SUCCESS:
        setState({
          ...state,
          isLoadingFetch: false,
          venueMapFile: res?.data?.data?.venue_map_id,
          drag: false,
        });
        break;
      case ResponseCodes.NOT_FOUND:
        toast.error('Event not found!');
        break;
      default:
        toast.error('Internal server error!');
    }
  };

  let uploadImageApi = async (file: any) => {
    let formData = new FormData();
    setState({
      ...state,
      isLoadingUpload: true,
    });

    formData.append(`venue_map`, file);
    let res = await VenueMapApi.uploadVenueMap(formData, eventId);

    switch (res?.response_code) {
      case ResponseCodes.UPLOAD_SUCCESS:
        setState({
          ...state,
          isLoadingUpload: false,
          drag: false,
        });
        toast.success('Venue map uploaded successfully.');
        getDataApi();
        break;
      default:
        toast.error('Internal server error please reload!');
    }
  };

  const onChangeFileUpload = (e: any) => {
    const selectedFile = e?.target?.files[0];

    uploadImageApi(selectedFile as any);
    (e.target as HTMLInputElement).value = '';
  };

  const onDropfileUploadHandler = (e: any) => {
    e.preventDefault();
    let dropFiles = e?.dataTransfer?.files[0];

    uploadImageApi(dropFiles as any);

    (e.target as HTMLInputElement).value = '';
  };
  const onDragOverfileUploadHandler = (e: any) => {
    e.preventDefault();
  };

  const onDragEnterfileUploadHandler = () => {
    setState({
      ...state,
      drag: true,
    });
  };

  // VenueMapApi

  const onClickDelete = async () => {
    setState({
      ...state,
      isLoadingDelete: true,
    });

    let res = await VenueMapApi?.deleteVenueMap(eventId);

    switch (res?.response_code) {
      case ResponseCodes.DELETE_SUCCESS:
        toast.success('Venue map delete successfully.');
        // getDataApi();
        setState({
          ...state,
          isLoadingDelete: false,
          venueMapFile: null,
        });
        break;
      default:
        setState({
          ...state,
          isLoadingDelete: false,
        });
        toast.error('Internal server error please reload!');
    }
  };

  useEffect(() => {
    getDataApi();
  }, []);

  return (
    <>
      {state?.isLoadingFetch ? (
        <div className="grid h-96	 flex-grow place-content-center items-center justify-center">
          <Spinner size="xl" />
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        </div>
      ) : (
        <div
          onDrop={onDropfileUploadHandler}
          onDragOver={onDragOverfileUploadHandler}
          onDragEnter={onDragEnterfileUploadHandler}
        >
          <PageHeader title="Venue Map">
            <div className="flex items-center gap-3 ">
              {/* <Link href={routes.event.createNetworkingEvent(event_id)}> */}
              <Button
                tag="span"
                className="relative w-full cursor-pointer overflow-hidden @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
                // onClick={onClickCreate}
              >
                <input
                  type="file"
                  className="absolute  h-10	w-full cursor-pointer opacity-0"
                  onChange={onChangeFileUpload}
                />
                <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                Upload Venue Map
              </Button>
              {/* </Link> */}
            </div>
          </PageHeader>

          {state?.isLoadingUpload ? (
            <div className="grid  h-96 flex-grow place-content-center items-center justify-center">
              <Spinner size="xl" />
              <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
                Uploading please wait...
              </Title>
            </div>
          ) : (
            <div className="body_container">
              {state?.venueMapFile === null && (
                <div className="drag_drop_file_container flex items-center	justify-center	">
                  <div
                    className={cn(
                      'relative mt-20  w-9/12 rounded-md border	border-dashed	 border-gray-500		'
                    )}
                    style={{ background: state.drag ? 'lightGray' : '' }}
                  >
                    <div
                      className={cn(
                        ' flex h-64 cursor-pointer items-center justify-center gap-4 px-6 py-5 transition-all duration-300'
                      )}
                      style={{ height: '40vh' }}
                    >
                      {/* <input {...getInputProps()} /> */}
                      <div className="">
                        <input
                          type="file"
                          className="absolute left-0 top-0 min-h-full min-w-full cursor-pointer opacity-0 outline-none"
                          // accept="image/*"
                          onChange={onChangeFileUpload}
                          //   value={selectFiles}
                          value=""
                        />
                      </div>
                      <div className="flex flex-col	items-center	justify-center	">
                        <UploadIcon className="mb-2 h-12 w-12" />
                        <Text className="text-center text-xs font-medium">
                          {state?.drag ? (
                            'Drop Map file here...'
                          ) : (
                            <span>
                              Drag & Drop Map file here
                              <br />
                              (JPG, PDF, PNG, WEBP)
                            </span>
                          )}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {state?.venueMapFile !== null && (
                <>
                  <div className="vanue_map_show_container">
                    {getFileType(state?.venueMapFile?.file_name) === 'image' ? (
                      <div className="image_container">
                        <div
                          className="mx-auto w-full cursor-pointer overflow-hidden rounded bg-gray-100 @xl:rounded-md "
                          
                          //   onClick={handleImageClick}
                        >
                        <Fancybox
					        options={{
					          Carousel: {
					            infinite: false,
					          },
					        }}
					     >
					     <a data-fancybox="gallery" href={getImageUrl(state?.venueMapFile?.file_url)}>
                          <Image
                            layout="fill"
                            objectFit="contain"
                            priority
                            src={getImageUrl(state?.venueMapFile?.file_url)}
                            alt={'Product Gallery'}
                            className="object-cover venue-image-object-fit"
                          />
                          </a>
                          </Fancybox>
                        </div>
                      </div>
                    ) : (
                      <div className="document_container">
                        <div className="flex h-20	 w-full flex-grow items-center justify-between rounded border px-5 py-3 text-black dark:bg-red-50">
                          {state?.venueMapFile?.file_name}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-10 flex">
                    <a
                      href={getImageUrl(state?.venueMapFile?.file_url)}
                      target={'_blank'}
                    >
                      <Button
                        tag="span"
                        className="relative w-52 cursor-pointer overflow-hidden hover:bg-gray-500 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100	"
                        // onClick={onClickCreate}
                      >
                        Download
                      </Button>
                    </a>

                    <Button
                      tag="span"
                      className="relative ml-5 w-52 cursor-pointer overflow-hidden hover:bg-gray-500 @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100	"
                      onClick={onClickDelete}
                      isLoading={state?.isLoadingDelete}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VenueMap;
