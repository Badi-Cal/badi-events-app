# Google Event Payload

## Example
```json
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

## From Google's Docs
[Link](https://developers.google.com/calendar/api/v3/reference/events#resource)

```
{
  "kind": "calendar#event",
  "etag": etag,
  "id": string,
  "status": string,
  "htmlLink": string,
  "created": datetime,
  "updated": datetime,
  "summary": string,
  "description": string,
  "location": string,
  "colorId": string,
  "creator": {
    "id": string,
    "email": string,
    "displayName": string,
    "self": boolean


  },
  "organizer": {
    "id": string,
    "email": string,
    "displayName": string,
    "self": boolean


  },
  "start": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string


  },
  "end": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string


  },
  "endTimeUnspecified": boolean,
  "recurrence": [
    string


  ],
  "recurringEventId": string,
  "originalStartTime": {
    "date": date,
    "dateTime": datetime,
    "timeZone": string


  },
  "transparency": string,
  "visibility": string,
  "iCalUID": string,
  "sequence": integer,
  "attendees": [
    {
      "id": string,
      "email": string,
      "displayName": string,
      "organizer": boolean,
      "self": boolean,
      "resource": boolean,
      "optional": boolean,
      "responseStatus": string,
      "comment": string,
      "additionalGuests": integer


    }
  ],
  "attendeesOmitted": boolean,
  "extendedProperties": {
    "private": {
      (key)

: string


    },
    "shared": {
      (key)

: string


    }
  },
  "hangoutLink": string,
  "conferenceData": {
    "createRequest": {
      "requestId": string,
      "conferenceSolutionKey": {
        "type": string


      },
      "status": {
        "statusCode": string


      }
    },
    "entryPoints": [
      {
        "entryPointType": string,
        "uri": string,
        "label": string,
        "pin": string,
        "accessCode": string,
        "meetingCode": string,
        "passcode": string,
        "password": string


      }
    ],
    "conferenceSolution": {
      "key": {
        "type": string


      },
      "name": string,
      "iconUri": string


    },
    "conferenceId": string,
    "signature": string,
    "notes": string,
  },
  "gadget": {
    "type": string,
    "title": string,
    "link": string,
    "iconLink": string,
    "width": integer,
    "height": integer,
    "display": string,
    "preferences": {
      (key)

: string


    }
  },
  "anyoneCanAddSelf": boolean,
  "guestsCanInviteOthers": boolean,
  "guestsCanModify": boolean,
  "guestsCanSeeOtherGuests": boolean,
  "privateCopy": boolean,
  "locked": boolean,
  "reminders": {
    "useDefault": boolean,
    "overrides": [
      {
        "method": string,
        "minutes": integer


      }
    ]
  },
  "source": {
    "url": string,
    "title": string


  },
  "attachments": [
    {
      "fileUrl": string,
      "title": string,
      "mimeType": string,
      "iconLink": string,
      "fileId": string


    }
  ],
  "eventType": string


}
```
