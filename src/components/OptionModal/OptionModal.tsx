import React from 'react';
import {
  Popover,
  PopoverCloseButton,
  PopoverTrigger,
  // PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Box,
  Button,
  // ButtonGroup,
  Checkbox
} from '@chakra-ui/core';
import { useRecoilState } from 'recoil';
import { appState } from '../../utils/AppState';

export default function OptionModal() {
  const initialFocusRef = React.useRef();
  const [state, setState] = useRecoilState<any>(appState);
  return (
    <Popover initialFocusRef={initialFocusRef} placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button size="sm" colorScheme="black" mr={3}>
          Options
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        {/* <PopoverHeader pt={4} fontWeight="bold" border="0" fontSize="sm">
          Options
        </PopoverHeader> */}
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody fontSize="sm">
          <Box mt={4} textAlign="left">
            <Checkbox
              defaultIsChecked={!!state.options.highlightYears}
              onChange={(e) => {
                const _state = { ...state };
                _state.options = { ..._state.options, highlightYears: e.target.checked };
                setState(_state);
              }}
            >
              Highlight every year
            </Checkbox>
            <Checkbox
              defaultIsChecked={!!state.options.showEveryYears}
              onChange={(e) => {
                const _state = { ...state };
                _state.options = { ..._state.options, showEveryYears: e.target.checked ? 5 : 0 };
                setState(_state);
              }}
            >
              Show year numbers
            </Checkbox>
          </Box>
        </PopoverBody>
        <PopoverFooter border="0" d="flex" alignItems="center" justifyContent="space-between" pb={4}></PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
