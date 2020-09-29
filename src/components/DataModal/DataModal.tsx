import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea
} from '@chakra-ui/core';
import { format } from 'date-fns';

export default function DataModal({
  dataString,
  isOpen,
  onClose,
  onSubmit
}: {
  dataString: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}) {
  const [data, setData] = React.useState<string>(dataString);
  const [text, setText] = React.useState<string>(dataString);

  const onClickAdd = () => {
    try {
      const dataJson = JSON.parse(text);
      if (dataJson?.events) {
        dataJson.events.push({
          type: 0,
          date: format(new Date(), 'yyyy-MM-dd'),
          title: 'New'
        });
        setText(JSON.stringify(dataJson, null, 4));
      }
    } catch {
      // Error handling: TBD
    }
  };

  const onClickApply = () => {
    try {
      const dataJson = JSON.parse(text);
      onSubmit && onSubmit(dataJson);

      localStorage.setItem('data', text);
    } catch {
      // Error handling: TBD
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea rows={20} onChange={(ev: any) => setText(ev.target.value)} value={text} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClickApply}>
              Apply
            </Button>
            <Button variant="ghost" onClick={onClickAdd}>
              Add Event
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
