# Life Calendar: Your Life in Weeks

[Live Website](https://life-calendar-in-weeks.vercel.app/)

### Techs

- React, CRA 4.0.0-next
- Recoil
- Chakra-ui
- Date-fns

Inspired by [Tim Urban's article](https://waitbutwhy.com/2014/05/life-weeks.html)

<img src="./docs/demo-01.png" />

### Event Data

```json
{
    "options": {},
    "events": [
        {
            "type": 3,
            "date": "1982-01-01",
            "title": "👶 I was born"
        },
        {
            "type": 1,
            "date": "1983-01-01",
            "title": "🎂 My 1st birthday"
        }
    ]
}
```
- type: event type values: -3, -2, -1, 0, 1, 2, 3 (sad-to-happy point) - each has different color.
- date: format: yyyy-mm-dd
- title: event title - it can start with an Emoji like these [Emojis](http://b.link/emojis)

### Roadmap - Todo

- [Roadmap - Todo](./TODO.md) Kanban Board

### Other Projects:

- [React-tabulator](https://github.com/ngduc/react-tabulator) - a react table component with many advanced features.
- VSCode extension: [TODO.md Kanban Board](https://github.com/todomd/todo.md) - use kanban to manage your project's todo list.