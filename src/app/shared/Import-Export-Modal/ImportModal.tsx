import React, { useEffect, useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import ModalButton from '../modal-button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  importFunction: any;
  exportFunction: any;
  downloadFunction: any;
}

const ImportExportModal: React.FC<ModalProps> = ({ open, onClose, importFunction, exportFunction, downloadFunction }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importActive, setImportActive] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      importFunction(selectedFile);
      setSelectedFile(null); // Clear selected file after import
      setImportActive(false)
    }
  };

  useEffect(() => {
    return () => {
      setSelectedFile(null);
      setImportActive(false)
    };
  }, []);

  return (
    <Modal className='pd-12 m-4' isOpen={open} onClose={() => { setSelectedFile(null); setImportActive(false); onClose(); }} size='xl' customSize='500px'>

      {importActive ? (
        <SelectButton handleFileChange={handleFileChange} selectedFile={selectedFile} downloadFunction={downloadFunction} handleImport={handleImport} />

      ) : (
        <div className="gap-2 items-center dark:bg-black-100 w-full p-2">
          <div className="flex gap-4">
            <Button
              tag="span"
              className="flex-1 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 cursor-pointer"
              onClick={() => setImportActive(true)}
              disabled={importActive}
            >

              Import
            </Button>
            <Button
              tag="span"
              className="flex-1 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 cursor-pointer"
              onClick={exportFunction}
            >

              Export
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

const SelectButton: React.FC<{ handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void, selectedFile: File | null, downloadFunction: () => void, handleImport: () => void }> = ({ handleFileChange, selectedFile, downloadFunction, handleImport }) => {
  return (
    <div className="gap-4 p-5">
      <div className="grid gap-2 w-full mb-2">
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <Button
          tag="span"
          className="dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 gap-3 cursor-pointer"
          onClick={() => document.getElementById('file-input')?.click()}
        >

          Select File
        </Button>
        {selectedFile && (
          <span className="text-sm dark:text-white text-center">{selectedFile.name}</span>
        )}
      </div>
      <div className='gap-4 grid justify-items w-full'>
        <Button
          tag="span"
          className="flex-1 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 cursor-pointer"
          onClick={handleImport}
          disabled={!selectedFile}
        >

          Import
        </Button>
        <Button
          tag="span"
          className="flex-1 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100 cursor-pointer"
          onClick={downloadFunction}
        >

          Download Sample File
        </Button>
      </div>
    </div>
  );
};

export default ImportExportModal;
