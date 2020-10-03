import React from 'react';
import { Flex, Box, Tooltip, useToast } from '@chakra-ui/core';
import EventModal from '../EventModal/EventModal';

import { getYear, isLeapYear, parse, differenceInWeeks, format, addWeeks } from 'date-fns';
import { useRecoilState } from 'recoil';
import { appState } from '../../utils/AppState';
import css from './WeekTimeline.module.css';

const DefaultData = {
  events: [{ type: 1, date: '1982-01-01', title: 'My birthday' }]
};

const parseDate = (dateStr: string) => parse(dateStr, 'yyyy-MM-dd', new Date());

// transform "data" object to add more information like: _date, _weeknum, etc.
const transformData = (data: any = { events: [] }) => {
  const _data = JSON.parse(JSON.stringify(data));

  let firstEvent: any = {
    ...DefaultData.events[0],
    _date: parseDate(DefaultData.events[0].date)
  }; // default 1st event (as the "base" event)
  _data.events = _data.events || [];

  // for each item, calculate and append more properties:
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

  const firstYear = getYear(firstEvent._date);
  let markedWeeks = []; // highlighted boxes - [0, 52, 104, ...] for 90 years
  let weeks = 0;
  for (let i = 0; i < 90; i += 1) {
    const year = firstYear + i;
    weeks = weeks + (isLeapYear(year) ? 52.28571 : 52.14286);

    let markedWeek = Math.round(weeks);
    // adjust for better alignment (because of Math.round and leap years)
    markedWeek++;
    if (
      [
        4,
        5,
        6,
        11,
        12,
        13,
        18,
        19,
        20,
        25,
        26,
        27,
        32,
        33,
        34,
        39,
        40,
        41,
        46,
        47,
        48,
        53,
        54,
        55,
        60,
        61,
        62,
        67,
        68,
        69,
        74,
        75,
        76,
        81,
        82,
        83,
        88,
        89,
        90
      ].indexOf(i + 1) >= 0
    ) {
      markedWeek = markedWeek - 1;
    }
    markedWeeks.push(markedWeek); // TODO: rounding leads to inaccurate box position
  }
  // console.log('markedWeeks', markedWeeks);

  return [_data, markedWeeks];
};

export default function WeekTimeline({ data }: { data: any }) {
  const toast = useToast();
  const [mainKey, setMainKey] = React.useState(Math.random());
  const [eventModalOpen, setEventModalOpen] = React.useState(-1);
  const [state, setState] = useRecoilState<any>(appState);

  const dt = Array.from(Array(4681).keys());
  const [_data, markedWeeks] = transformData(data);

  const _todayItem = _data && _data.events.length > 0 ? _data.events[_data.events.length - 1] : { _weekNum: 2000 };
  const years = Array.from(Array(90).keys()); // [0, 1, 2, ...] as 90 years

  const renderBoxes = (yearIdx = -1) => {
    return (
      <>
        {dt.map((_, idx) => {
          if (yearIdx >= 0) {
            if (idx < yearIdx * 52.143 || idx > yearIdx * 52.143 + 52.143) {
              return null;
            }
          }
          let bgColor = '#333'; // default

          if (idx < _todayItem._weekNum) {
            bgColor = '#222'; // passed weeks
          }

          let yearTooltip = '';
          const markedWeeksIdx = markedWeeks.indexOf(idx);

          if (state.options.highlightYears) {
            // bgColor = item % 261 === 0 ? '#335' : bgColor; // highlight every year
            bgColor = markedWeeksIdx >= 0 ? '#224' : bgColor;
            yearTooltip = markedWeeksIdx >= 0 ? `${markedWeeksIdx + 1} years old` : yearTooltip;
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
            // 52.143 * 5 ~ 260.7 ~ 261
            // boxContent = '' + (item % 261 === 0 ? (item / 261) * 5 : ''); // show year number ever N years
            boxContent = '' + (markedWeeksIdx > 1 && (markedWeeksIdx + 1) % 5 === 0 ? markedWeeksIdx + 1 : '');
            yearTooltip = boxContent ? `${boxContent} years old` : yearTooltip;
          }

          // boxContent = obj ? obj.title : boxContent; // item % 52 === 0 ? item / 52 : ''
          // if first character is Emoji, show it in the box:
          boxContent = obj && obj.title && obj.title.trim().charCodeAt(0) > 255 ? [...obj.title.trim()][0] : boxContent;

          let boxStartTime = +addWeeks(_data.events[0]._date, idx);
          const boxEl = (
            <Box
              key={`box_${yearIdx}_${idx}`}
              className={css.box}
              onClick={() => setEventModalOpen(boxStartTime)}
              rounded={2}
              w={3}
              h={3}
              style={{ backgroundColor: bgColor, fontSize: 8, cursor: 'default' }}
            >
              {boxContent}
            </Box>
          );

          if ((obj && obj.title) || yearTooltip) {
            const tooltipLabel = obj && obj.title ? `${obj.date} - ${obj.title}` : yearTooltip;
            return (
              <Tooltip key={`tt_${idx}`} label={tooltipLabel}>
                {boxEl}
              </Tooltip>
            );
          } else {
            return boxEl;
          }
        })}
      </>
    );
  };
  return (
    <Flex key={mainKey} gridGap={1} width="95vw" flexWrap="wrap">
      {state.options.oneRowOneYear === true
        ? years.map((_, yearIdx) => {
            return (
              <Flex key={`flex_${yearIdx}`} gridGap={1} width="95vw" flexWrap="wrap">
                {renderBoxes(yearIdx)}
              </Flex>
            );
          })
        : renderBoxes()}

      {eventModalOpen >= 0 && (
        <EventModal
          startTime={eventModalOpen}
          isOpen={true}
          onClose={() => setEventModalOpen(-1)}
          onSubmit={(event) => {
            data.events.push(event);
            setEventModalOpen(-1);
            setMainKey(Math.random());
            toast({
              title: 'Added',
              description: `You have total ${data.events.length} events (boxes) now.`,
              status: 'success',
              duration: 9000,
              isClosable: true
            });
            localStorage.setItem('data', JSON.stringify(data));
          }}
        />
      )}
    </Flex>
  );
}
