# Calendar

A simple calendar to render months with events.

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
    date: new Date()
  },
  {
    title: 'A date probably in the future',
    date: new Date('July 4, 2016')
  }
]);
```

## Development

`npm install`
`npm run` to list available tasks

In development probably run `npm run watch`
