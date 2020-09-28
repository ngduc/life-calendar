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
  const [data, setData] = React.useState(dataString);

  const onClickSubmit = () => {
    try {
      const dataJson = JSON.parse(data);
      onSubmit && onSubmit(dataJson);
      localStorage.setItem('data', data);
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
