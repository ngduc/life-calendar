import React from 'react';
import { format } from 'date-fns';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
  Input
} from '@chakra-ui/core';
type Props = {
  startTime: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
};

export default function EventModal(props: Props) {
  const { startTime, isOpen, onClose, onSubmit } = props;
  // console.log('startTime', new Date(startTime), startTime);
  const startDateStr = format(startTime, 'yyyy-MM-dd');

  const [selectedDateValue, setSelectedDateValue] = React.useState(startDateStr);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, setType] = React.useState('');

  const onClickSubmit = () => {
    const event = {
      title: title || 'New Event',
      date: selectedDateValue,
      type: parseInt(type || '1')
    };
    // console.log('event', event);
    onSubmit && onSubmit(event);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Date"
              type="date"
              defaultValue={startDateStr}
              onChange={(ev: any) => setSelectedDateValue(ev.target.value)}
            />
            <Input placeholder="Title" mt={2} onChange={(ev: any) => setTitle(ev.target.value)} />
            <Textarea
              placeholder="Description"
              mt={2}
              rows={4}
              onChange={(ev: any) => setDescription(ev.target.value)}
            />
            <Input placeholder="Type (-3, -2, -1, 0, 1, 2, or 3)" onChange={(ev: any) => setType(ev.target.value)} />
          </ModalBody>

          <ModalFooter>
            {/* <Button variant="ghost" onClick={onClose}>
              Close
            </Button> */}
            <Button colorScheme="teal" onClick={onClickSubmit}>
              Add Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
