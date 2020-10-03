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
  Textarea,
  Box,
  Tooltip
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
  // const [data, setData] = React.useState<string>(dataString);
  const [text, setText] = React.useState<string>(dataString);

  const onClickAdd = () => {
    try {
      const dataJson = JSON.parse(text);
      if (dataJson?.events) {
        dataJson.events.push({
          type: 1,
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

  const onClickShare = () => {
    const base64DataString = btoa(unescape(encodeURIComponent(text)));
    window.open(`${window.location.origin}/?data=${base64DataString}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Events</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>"type" can have -3, -2, -1, 0, 1, 2 or 3 (sad-to-happy point)</Box>
            <Textarea rows={20} onChange={(ev: any) => setText(ev.target.value)} value={text} />
          </ModalBody>

          <ModalFooter>
            <Box>
              <Button colorScheme="gray" onClick={onClickAdd}>
                ＋ Add Event
              </Button>
            </Box>
            <Box width="100%" textAlign="right">
              <Tooltip label="Create a 'shareable URL' and open it">
                <Button colorScheme="gray" onClick={onClickShare} mr={3}>
                  Share
                </Button>
              </Tooltip>
              <Button colorScheme="teal" onClick={onClickApply}>
                Apply
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}
