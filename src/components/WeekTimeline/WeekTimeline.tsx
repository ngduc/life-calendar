import React from "react";
import { Flex, Grid, Box, Tooltip } from "@chakra-ui/core";
import { getISOWeek, parse, differenceInWeeks, format } from 'date-fns'
import { useRecoilState } from "recoil";
import { appState } from "../../utils/AppState";

const DefaultData = {
  events: [{ type: 1, date: "1982-01-01", title: "My birthday" }]
};

const transformData = (data: any = { events: [] }) => {
  const _data = { ...data }

  let firstEvent: any = {}
  let weekIndex = 0
  
  _data.events = (data.events || []).map((item: any, idx: number) => {
    item._date = parse(item.date, 'yyyy-MM-dd', new Date())
    if (idx === 0) {
      firstEvent = { ...item }
      item._weekNum = 0
    } else {
      item._weekNum = differenceInWeeks(item._date, firstEvent._date)
    }
    return item
  })
  const now = new Date()
  if (_data.events && _data.events.length > 0) {
    _data.events.push({
      title: `Today: ${format(now, 'yyyy-MM-dd')}`,
      type: 1,
      date: format(now, 'yyyy-MM-dd'),
      _date: now,
      _weekNum: differenceInWeeks(now, firstEvent._date)
    })
  }
  return _data;
}

export default function WeekTimeline({ data = DefaultData }: { data: any }) {
  const [state, setState] = useRecoilState<any>(appState);

  const dt = Array.from(Array(4681).keys());
  const _data = transformData(data)
  console.log(_data);
  return (
    <Flex gridGap={1} width="95vw" flexWrap="wrap">
      {dt.map((item, idx) => {
        let bgColor = "#333";

        if (idx < 2340) {
          bgColor = "#222";
        }
        if (state.options.highlightYears) {
          bgColor = item % 52 === 0 ? "#335" : bgColor; // highlight every year 
        }

        const obj: any = _data.events.find((d: any) => d._weekNum === idx);
        if (obj) {
          console.log('obj', obj);
          bgColor = "gray";

          if (obj.type === -3) {
            bgColor = 'darkred'
          } else if (obj.type === -2 || obj.type === -1) {
            bgColor = 'darkred'
          }
          else if (obj.type === 1 || obj.type === 2) {
            bgColor = '#353'
          }
          else if (obj.type === 3) {
            bgColor = 'pink'
          }
        }
        let yearNum = ''
        if (state.options.showEveryYears) {
          yearNum = '' + (item % 260 === 0 ? (item / 260) * 5 : ""); // show year number ever N years
        }
        // yearNum = obj ? obj.title : yearNum; // item % 52 === 0 ? item / 52 : ''

        const boxEl = (
          <Box
            key={`key_${idx}`}
            rounded={2}
            w={3}
            h={3}
            style={{ backgroundColor: bgColor, fontSize: 8 }}
          >
            {yearNum}
          </Box>
        );

        if (obj && obj.title) {
        return <Tooltip label={obj.title}>{boxEl}</Tooltip>;
        } else {
          return boxEl;
        }
        
      })}
    </Flex>
  );
}
