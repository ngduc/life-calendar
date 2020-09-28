import React from 'react';
import { Button, Flex, Box, useDisclosure } from '@chakra-ui/core';

import WeekTimeline from './components/WeekTimeline/WeekTimeline';
import DataModal from './components/DataModal/DataModal';
import OptionModal from './components/OptionModal/OptionModal';

// import logo from './logo.svg';
import './App.css';

function App({ dataString }: { dataString: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState(JSON.parse(dataString));

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Flex m={2} ml={20} justifyContent="space-between" w="100%">
          <h1>
            Life Calendar: Your Life in Weeks{' '}
            <a href="http://b.link/ghub" target="_blank" style={{ fontSize: '0.6em', color: '#555' }}>
              - Github
            </a>
          </h1>

          <Box mr={20}>
            <OptionModal />
            <Button size="sm" colorScheme="teal" onClick={onOpen}>
              Events
            </Button>
          </Box>
        </Flex>

        <Box>
          <WeekTimeline data={data} />
        </Box>

        <DataModal
          dataString={dataString}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={(data: any) => {
            console.log('onSubmit - data', data);
            onClose();
            setData(data);
          }}
        />
      </header>
    </div>
  );
}

export default App;
