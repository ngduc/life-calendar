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

export default function DataModal({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}) {
  const dataStr = `{
    "events": [{ "type": "1", "date": "1982-01-01", "title": "I was born" }, { "type": "1", "date": "1983-01-01", "title": "My 1st birthday" }]
  }`;
  const [data, setData] = React.useState(dataStr);

  const onClickSubmit = () => {
    // TODO:
    // - on load, read from localStorage, remove weekNum
    // - for each item, calculate weekNum, set to localStorage
    onSubmit && onSubmit(JSON.parse(data));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Enter Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea rows={20} onChange={(ev: any) => setData(ev.target.value)} value={data} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClickSubmit}>
              Submit
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
