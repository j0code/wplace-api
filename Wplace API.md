# Wplace API

Ver: 250921

## Endpoints

### Tiles

**GET** https://backend.wplace.live/files/s0/tiles/{TX}/{TY}.png

=> 1.000x1.000px PNG

### Pixel

#### Route
> **GET** https://backend.wplace.live/s0/pixel/{TX}/{TY}?x={PX}&y={PY}

#### Response
> ```json
> {
>   "paintedBy": {
>     "id": 1228,
>     "name": "cfp",
>     "allianceId": 20,
>     "allianceName": "Deutschland",
>     "equippedFlag": 82,
>     "discord": "cfp"
>   },
>   "region": {
>     "id": 83211,
>     "cityId": 4562,
>     "name": "Bremerhaven",
>     "number": 2,
>     "countryId": 82
>   }
> }
> ```

### Me

#### Route
> **GET** https://backend.wplace.live/me

#### Headers
> Cookies: j={JWT}

#### Response
> ```json
> {
>   "allianceId": 20,
>   "allianceRole": "member",
>   "banned": false,
>   "charges": {
>     "cooldownMs": 30000,
>     "count": 586.6159666666667,
>     "max": 943
>   },
>   "country": "DE",
>   "discord": "cfp",
>   "droplets": 120487,
>   "equippedFlag": 82,
>   "experiments": {
>     "2025-09_pawtect": {
>       "variant": "koala"
>     }
>   },
>   "extraColorsBitmap": 16386,
>   "favoriteLocations": [
>     {
>       "id": 476,
>       "name": "",
>       "latitude": 52.02291697078119,
>       "longitude": 8.531278965527331
>     }
>   ],
>   "flagsBitmap": "BAAAAAAAAAAAAAA=",
>   "id": 1228,
>   "isCustomer": false,
>   "level": 204.67435082794208,
>   "maxFavoriteLocations": 15,
>   "name": "cfp",
>   "needsPhoneVerification": false,
>   "picture": "",
>   "pixelsPainted": 106987,
>   "showLastPixel": true,
>   "timeoutUntil": "1970-01-01T00:00:00Z"
> }
> ```

### Alliance

#### Route
> **GET** https://backend.wplace.live/alliance

Requires Authentication

#### Response
> ```json
> {
>   "description": "blah blah",
>   "hq": {
>     "latitude": 52.50578309156546,
>     "longitude": 13.254085018237959
>   },
>   "id": 20,
>   "members": 205,
>   "name": "Deutschland",
>   "pixelsPainted": 4943064,
>   "role": "member"
> }
> ```

### Leaderboard

type = alliance, region/{countryID}, country, player, alliance

timeframe = today, week, month or all-time

countryID can be 0 to show all

#### Route
> **GET** https://backend.wplace.live/alliance/leaderboard/{timeframe}

Requires Authentication

#### Response
> ```jsonc
> [
>   {
>     "userId": 795000,
>     "name": "Pit",
>     "equippedFlag": 40,
>     "pixelsPainted": 430,
>     "lastLatitude": 38.15757373215312,
>     "lastLongitude": -41.46600585937502,
>     "picture": "data:image/png;base64,<image data>",
>     "discord": "pitdlm"
>   },
>   {
>     "userId": 1228,
>     "name": "cfp",
>     "equippedFlag": 82,
>     "pixelsPainted": 396,
>     "lastLatitude": 54.759779839703604,
>     "lastLongitude": 7.8680566406249985,
>     "discord": "cfp"
>   },
>   // ...
> ]
> ```

### Explore

#### Route
> **GET** https://backend.wplace.live/s0/tile/random

#### Response
> ```json
> {
>     "pixel": {
>         "x": 134,
>         "y": 302
>     },
>     "tile": {
>         "x": 1439,
>         "y": 836
>     }
> }
> ```

### Report

TODO

### Profile Pictures

TODO

### Purchase

TODO

### Place

Requires Authentication

> **Note:** Not included to not make botting easier.
> 
> Pixels **have** to be placed by humans. Botting is against Wplace's offical rules.

### Logout

#### Route
> **POST** https://backend.wplace.live/auth/logout

Requires Authentication

#### Response
```json
{
    "success": true
}
```
The j cookie is removed via HTTP Response Header (and the session is invalidated on the server).

### Map

style = liberty (used in wplace), bright, positron, dark, fiord

#### Route
> **GET** https://maps.wplace.live/styles/{style}

#### Response
[MapLibre Style](https://maplibre.org/maplibre-style-spec/)

Natural Earth Source: https://maps.wplace.live/natural_earth/ne2sr/{z}/{x}/{y}.png
OpenMapTiles Vector Source: described at https://maps.wplace.live/planet

## JWT

### Header

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### Payload

```json
{
  "userId": 1228,
  "sessionId": "<random base64 encoded bytes>",
  "iss": "wplace",
  "exp": 1759744211,
  "iat": 1758448211
}
```

## Bitmasks & other magic numbers

### Flag + Equipped Flag

???

### Region

???

### City IDs

???

### Country IDs

Extracted from code:
```js
let countries = {ad: 'Andorra', ae: 'United Arab Emirates', ...}
Object.values(countries).sort()
```

`["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Caribbean Netherlands","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo - Brazzaville","Congo - Kinshasa","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czechia","Côte d’Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong SAR China","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao SAR China","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","North Macedonia","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territories","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St. Barthélemy","St. Helena","St. Kitts & Nevis","St. Lucia","St. Martin","St. Pierre & Miquelon","St. Vincent & Grenadines","Sudan","Suriname","Svalbard & Jan Mayen","Sweden","Switzerland","Syria","São Tomé & Príncipe","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos Islands","Tuvalu","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis & Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"]`

### Extra Colors

???

### Colors

???

## Experiments

### 2025-09_pawtect

variants: koala

???

## Authors of this document
### cfp
  - GitHub: [cfpwastaken](https://github.com/cfpwastaken)
  - Discord: [@cfp](https://discord.com/users/318394797822050315)
### j0code
  - GitHub: [j0code](https://github.com/j0code)
  - Discord: [@j0code](https://discord.com/users/418109742183874560)
