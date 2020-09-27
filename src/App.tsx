import React from 'react';
import { Button, Flex, Box, useDisclosure } from '@chakra-ui/core';
import WeekTimeline from './components/WeekTimeline/WeekTimeline';
import DataModal from './components/DataModal/DataModal';
import OptionModal from './components/OptionModal/OptionModal';

import logo from './logo.svg';
import './App.css';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState<any>([]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Flex m={2} ml={20} justifyContent="space-between" w="100%">
          <h1>Life Calendar: Your Life in Weeks</h1>

          <Box mr={20}>
            <OptionModal />
            <Button size="sm" colorScheme="teal" onClick={onOpen}>
              Enter Data
            </Button>
          </Box>
        </Flex>

        <Box>
          <WeekTimeline data={data} />
        </Box>

        <DataModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={(data: string) => {
            console.log('data', data);
            onClose();
            setData(data);
          }}
        />
      </header>
    </div>
  );
}

export default App;
