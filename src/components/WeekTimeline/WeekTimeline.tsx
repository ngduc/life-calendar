import React from 'react';
import { Flex, Box, Tooltip } from '@chakra-ui/core';
import { parse, differenceInWeeks, format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { appState } from '../../utils/AppState';

const DefaultData = {
  events: [{ type: 1, date: '1982-01-01', title: 'My birthday' }]
};

const parseDate = (dateStr: string) => parse(dateStr, 'yyyy-MM-dd', new Date());

const transformData = (data: any = { events: [] }) => {
  const _data = { ...data };

  let firstEvent: any = {
    ...DefaultData.events[0],
    _date: parseDate(DefaultData.events[0].date)
  }; // default
  _data.events = data.events || [];

  _data.events = _data.events.map((item: any, idx: number) => {
    item._date = parseDate(item.date);
    if (idx === 0) {
      firstEvent = { ...item };
      item._weekNum = 0;
    } else {
      item._weekNum = differenceInWeeks(item._date, firstEvent._date);
    }
    return item;
  });
  // append "Today" to the _data.events (as the last event)
  const now = new Date();
  _data.events.push({
    title: `Today`,
    type: 0,
    date: format(now, 'yyyy-MM-dd'),
    _date: now,
    _weekNum: differenceInWeeks(now, firstEvent._date)
  });
  return _data;
};

export default function WeekTimeline({ data = DefaultData }: { data: any }) {
  const [state, setState] = useRecoilState<any>(appState);

  const dt = Array.from(Array(4681).keys());
  const _data = transformData(data);
  const _todayItem = _data && _data.events.length > 0 ? _data.events[_data.events.length - 1] : { _weekNum: 2000 };

  console.log('_data', _data);
  return (
    <Flex gridGap={1} width="95vw" flexWrap="wrap">
      {dt.map((item, idx) => {
        let bgColor = '#333';

        if (idx < _todayItem._weekNum) {
          bgColor = '#222';
        }
        if (state.options.highlightYears) {
          bgColor = item % 52 === 0 ? '#335' : bgColor; // highlight every year
        }

        const obj: any = _data.events.find((d: any) => d._weekNum === idx);
        if (obj) {
          bgColor = 'gray';

          if (obj.type === -3) {
            bgColor = 'darkred';
          } else if (obj.type === -2 || obj.type === -1) {
            bgColor = 'darkred';
          } else if (obj.type === 1 || obj.type === 2) {
            bgColor = '#353';
          } else if (obj.type === 3) {
            bgColor = 'pink';
          }
        }
        let boxContent = '';
        if (state.options.showEveryYears) {
          boxContent = '' + (item % 260 === 0 ? (item / 260) * 5 : ''); // show year number ever N years
        }
        // boxContent = obj ? obj.title : boxContent; // item % 52 === 0 ? item / 52 : ''
        // if first character is Emoji, show it in the box:
        boxContent = obj && obj.title && obj.title.charCodeAt(0) > 255 ? [...obj.title][0] : boxContent;

        const boxEl = (
          <Box key={`box_${idx}`} rounded={2} w={3} h={3} style={{ backgroundColor: bgColor, fontSize: 8 }}>
            {boxContent}
          </Box>
        );

        if (obj && obj.title) {
          const tooltipLabel = `${obj.date} - ${obj.title}`;
          return (
            <Tooltip key={`tt_${idx}`} label={tooltipLabel}>
              {boxEl}
            </Tooltip>
          );
        } else {
          return boxEl;
        }
      })}
    </Flex>
  );
}
