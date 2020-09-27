# Life Calendar: Your Life in Weeks

[Live website](https://life-calendar-in-weeks.vercel.app/)

Inspired by [this article](https://waitbutwhy.com/2014/05/life-weeks.html)

### Techs

- React, CRA
- Recoil
- Chakra-ui
- Date-fns

<img src="./docs/demo-01.png" />

### Event Data

```
{
    "options": {},
    "events": [
        {
            "type": 3,
            "date": "1982-01-01",
            "title": "I was born"
        },
        {
            "type": 1,
            "date": "1983-01-01",
            "title": "My 1st birthday"
        }
    ]
}
```
- type: event type values: -3, -2, -1, 0, 1, 2, 3 - each has different color.
- date: format: yyyy-mm-dd
- title: event title

### Roadmap - Todo

[Roadmap - Todo](./TODO.md)