'use client';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const PreviewInfo = ({ previewValue }: { previewValue: string }) => {

    console.log("previewValue>>>",previewValue);
    
  return (
    <div className="border-1px mt-5  rounded-lg bg-gray-50 p-5	">
      {ReactHtmlParser(previewValue || '')}
    </div>
  );
};

export default PreviewInfo;
