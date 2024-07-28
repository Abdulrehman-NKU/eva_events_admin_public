import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { industryAction } from '../../../../redux/slice/industry';
import { Modal } from 'rizzui';
import IndustriesEditForm from './IndustriesEditForm';

const IndustriesEditModal = () => {
  const dispatch = useDispatch();

  let industryEditModal = useSelector(
    (state: any) => state.industry.industryEditModal
  );

  const onClose = () => {
    dispatch(industryAction.setIndustryEditModal());
    dispatch(
      industryAction.setIndustryEditData({
        category_name: '',
        description: '',
        _id: '',
      })
    );
  };
  return (
    <Modal
      isOpen={industryEditModal}
      onClose={() => onClose()}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      customSize="800px"
    >
      <IndustriesEditForm />
    </Modal>
  );
};

export default IndustriesEditModal;
