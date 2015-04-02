# Calendar

A simple calendar to render months with events.

![](http://f.cl.ly/items/0J3l3X2J3n3825403M38/demo.mov.gif)

## Basic usage

```javascript
var calendar = new Calendar(document.getElementById('calendar'));
calendar.render();
```

## Rendering events

```javascript
var calendar = new Calendar(document.getElementById('calendar'));
calendar.render(new Date(), [
  {
    title: 'Today!',
    start_date: new Date(),
    end_date: new Date()
  },
  {
    title: "Beer O'clock",
    start_date: new Date('April 3, 2015'),
    end_date: new Date('April 6, 2015')
  }
]);
```

## Development

`npm install`
`npm run` to list available tasks

In development probably run `npm run watch`

## Specs

`karma start`
