import React from "react";
import {
  Popover,
  PopoverCloseButton,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
} from "@chakra-ui/core";
import { useAppContext } from "../../utils/AppContext";
import { useRecoilState } from "recoil";
import { appState } from "../../utils/AppState";

export default function OptionModal() {
  const initialFocusRef = React.useRef();
  // const [appContext, setAppContext] = useAppContext();

  const [state, setState] = useRecoilState<any>(appState);
  console.log("state", state);

  // const onClickSave = () => {
  //   const _state = { ...state };
  //   _state.options = { highlightYears: true };
  //   setState(_state);
  // };

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom"
      closeOnBlur={false}
    >
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
          <Checkbox
            onChange={(e) => {
              const _state = { ...state };
              _state.options = { ..._state.options, highlightYears: e.target.checked };
              setState(_state);
            }}
            value={state.highlightYears}
          >
            Highlight every year
          </Checkbox>
          <Checkbox
            onChange={(e) => {
              const _state = { ...state };
              _state.options = { ..._state.options, showEveryYears: e.target.checked ? 5 : 0 };
              setState(_state);
            }}
          >
            Show year numbers
          </Checkbox>
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          {/* <Box fontSize="sm">Step 2 of 4</Box> */}
          {/* <ButtonGroup size="sm">
            <Button colorScheme="teal" onClick={onClickSave}>
              Save
            </Button>
          </ButtonGroup> */}
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
