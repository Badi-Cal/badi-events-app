```typescript
{
    byAllDayStartDate: {
        [key:date string YYYY-MM-DD]: ID[]
    },
    byAllDayObject: {
        [key:date string YYYY-MM-DD]: ID[]
    },
    byStartDate: {
        [key:date string YYYY-MM-DD]: ID[]
    },
    byId: {
        [key: ID]: Event // !!!!
    },
    byMultiDay: {
        [key:date string YYYY-MM-DD]: ID[]
    },
    byNextDay: {
        [key:date string YYYY-MM-DD]: ID[]
    },
    byContinuedMultiDay: {
        [key:date string YYYY-MM-DDTHH:mm:ss.sssZ]: ID[]
    },
    byContinuedNextDay: {
        [key:date string YYYY-MM-DDTHH:mm:ss.sssZ]: ID[]
    }
}
```
ID
"1vpdbkdorogc37dbrshsqfsf5h_20220120T170000Z"
```
Event
{
    "created":"2022-01-19T02:06:28.000Z",
    "creator":{"email":"monti@crab.net"},
    "end":{"dateTime":"2022-01-31T15:00:00-03:00","timeZone":"America/Argentina/Buenos_Aires"},
    "etag":"\"3285116233130000\"",
    "htmlLink":"https://www.google.com/calendar/event?eid=N3N1bGw1OTVydjVhcG…zMGhfMjAyMjAxMzFUMTcwMDAwWiBtb250aUB4bi0tcG9ydGVvLTB3YS5jb20",
    "iCalUID":"7sull595rv5apd9mr77a6g0s0h@google.com",
    "id":"7sull595rv5apd9mr77a6g0s0h_20220131T170000Z",
    "kind":"calendar#event",
    "organizer":{
        "email":"monti@xn--porteo-0wa.com",
        "self":true
    },
    "originalStartTime":{
        "dateTime":"2022-01-31T14:00:00-03:00",
        "timeZone":"America/Argentina/Buenos_Aires"
    },
    "recurringEventId":"7sull595rv5apd9mr77a6g0s0h",
    "reminders":{
        "useDefault":true
    },
    "start":{
        "dateTime":"2022-01-31T14:00:00-03:00",
        "timeZone":"America/Argentina/Buenos_Aires"
    },
    "status":"confirmed",
    "summary":"test meeting",
    "updated":"2022-01-19T02:08:36.565Z"
}
```



this.addToParsedList(
          'byAllDayObject',
          innerStartDate,
          {
            id: event.id,
            hasPrev: (dayAdd > 0),
            hasNext: (dayAdd < (event.durationDays - 1)),
            hasPreviousDay: (dayAdd > 0),
            hasNextDay: (dayAdd < (event.durationDays - 1)),
            durationDays: event.durationDays,
            startDate: event.start.dateObject,
            daysFromStart: dayAdd
          }
        )


https://developers.google.com/calendar/api/v3/reference/events#resource

https://www.rfc-editor.org/rfc/rfc2938#section-3.1.2
