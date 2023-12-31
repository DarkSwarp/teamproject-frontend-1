import React, { useState } from 'react';
import icon from 'assets/icons/symbol-defs.svg';
import { Button, Icon } from './AddTaskBtn.styled';
import TaskModal from '../../../Common/TaskModal/TaskModal';
import { useTranslation } from 'react-i18next';

const AddTaskBtn = ({ column }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState('add');

  const openModal = () => {
    setIsModalOpen(true);
    setAction('add');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>
        <Icon width="24" height="24">
          <use href={icon + '#icon-plus'}></use>
        </Icon>
        <span>{t('add_task')}</span>
      </Button>
      {isModalOpen && (
        <TaskModal onClose={closeModal} action={action} column={column} />
      )}
    </div>
  );
};

export default AddTaskBtn;
