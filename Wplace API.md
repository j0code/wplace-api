# Wplace API

Ver: 250921

## Endpoints

### Tiles

#### Route
> **GET** https://backend.wplace.live/files/s0/tiles/{TX}/{TY}.png

#### Response
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

#### Route
> **GET** https://backend.wplace.live/{type}/leaderboard/{timeframe}

Requires Authentication

#### URL Parameters

> {type} = alliance, region/{countryID}, country, player, alliance
> 
> {timeframe} = today, week, month or all-time
> 
> {countryID} can be 0 to show all

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

#### Banned response

> **451** Unavailable For Legal Reasons
> ```json
> {
>     "durationMs": ...,
>     "err": "griefing",
>     "suspension": "timeout"
> }
> ```

### Logout

#### Route
> **POST** https://backend.wplace.live/auth/logout

Requires Authentication

#### Response
> ```json
> {
>     "success": true
> }
> ```
The j cookie is removed via HTTP Response Header (and the session is invalidated on the server).

### Map

#### Route
> **GET** https://maps.wplace.live/styles/{style}

#### URL Parameters

> {style} = liberty (used in wplace), bright, positron, dark, fiord

#### Response
> [MapLibre Style](https://maplibre.org/maplibre-style-spec/)
> 
> Natural Earth Source: https://maps.wplace.live/natural_earth/ne2sr/{z}/{x}/{y}.png
> 
> OpenMapTiles Vector Source: described at https://maps.wplace.live/planet

### Shared Location

#### Route
> **GET** https://wplace.live/

#### Query Parameters
> |Parameter| Description |
> |---------|-------------|
> | lat     | Latitude    |
> | lng     | Longitude   |
> | zoom    | Zoom level  |
> | select  | If 1, selects the pixel at that location |

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

```json
["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Indian Ocean Territory","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Caribbean Netherlands","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo - Brazzaville","Congo - Kinshasa","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czechia","Côte d’Ivoire","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong SAR China","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao SAR China","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar (Burma)","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","North Korea","North Macedonia","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territories","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Réunion","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St. Barthélemy","St. Helena","St. Kitts & Nevis","St. Lucia","St. Martin","St. Pierre & Miquelon","St. Vincent & Grenadines","Sudan","Suriname","Svalbard & Jan Mayen","Sweden","Switzerland","Syria","São Tomé & Príncipe","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos Islands","Tuvalu","U.S. Virgin Islands","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Wallis & Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","Åland Islands"]
```

### Extra Colors

???

### Colors

0: Transparent

1-31: Free Colors* (in order as shown in the place menu)

32+: Extra Colors (in order as shown in the place menu)

*with some exceptions

Extracted list from code (note that transparent has RGB 0,0,0 listed):
```json
[{"name":"Transparent","rgb":[0,0,0]},{"name":"Black","rgb":[0,0,0]},{"name":"Dark Gray","rgb":[60,60,60]},{"name":"Gray","rgb":[120,120,120]},{"name":"Light Gray","rgb":[210,210,210]},{"name":"White","rgb":[255,255,255]},{"name":"Deep Red","rgb":[96,0,24]},{"name":"Red","rgb":[237,28,36]},{"name":"Orange","rgb":[255,127,39]},{"name":"Gold","rgb":[246,170,9]},{"name":"Yellow","rgb":[249,221,59]},{"name":"Light Yellow","rgb":[255,250,188]},{"name":"Dark Green","rgb":[14,185,104]},{"name":"Green","rgb":[19,230,123]},{"name":"Light Green","rgb":[135,255,94]},{"name":"Dark Teal","rgb":[12,129,110]},{"name":"Teal","rgb":[16,174,166]},{"name":"Light Teal","rgb":[19,225,190]},{"name":"Dark Blue","rgb":[40,80,158]},{"name":"Blue","rgb":[64,147,228]},{"name":"Cyan","rgb":[96,247,242]},{"name":"Indigo","rgb":[107,80,246]},{"name":"Light Indigo","rgb":[153,177,251]},{"name":"Dark Purple","rgb":[120,12,153]},{"name":"Purple","rgb":[170,56,185]},{"name":"Light Purple","rgb":[224,159,249]},{"name":"Dark Pink","rgb":[203,0,122]},{"name":"Pink","rgb":[236,31,128]},{"name":"Light Pink","rgb":[243,141,169]},{"name":"Dark Brown","rgb":[104,70,52]},{"name":"Brown","rgb":[149,104,42]},{"name":"Beige","rgb":[248,178,119]},{"name":"Medium Gray","rgb":[170,170,170]},{"name":"Dark Red","rgb":[165,14,30]},{"name":"Light Red","rgb":[250,128,114]},{"name":"Dark Orange","rgb":[228,92,26]},{"name":"Light Tan","rgb":[214,181,148]},{"name":"Dark Goldenrod","rgb":[156,132,49]},{"name":"Goldenrod","rgb":[197,173,49]},{"name":"Light Goldenrod","rgb":[232,212,95]},{"name":"Dark Olive","rgb":[74,107,58]},{"name":"Olive","rgb":[90,148,74]},{"name":"Light Olive","rgb":[132,197,115]},{"name":"Dark Cyan","rgb":[15,121,159]},{"name":"Light Cyan","rgb":[187,250,242]},{"name":"Light Blue","rgb":[125,199,255]},{"name":"Dark Indigo","rgb":[77,49,184]},{"name":"Dark Slate Blue","rgb":[74,66,132]},{"name":"Slate Blue","rgb":[122,113,196]},{"name":"Light Slate Blue","rgb":[181,174,241]},{"name":"Light Brown","rgb":[219,164,99]},{"name":"Dark Beige","rgb":[209,128,81]},{"name":"Light Beige","rgb":[255,197,165]},{"name":"Dark Peach","rgb":[155,82,73]},{"name":"Peach","rgb":[209,128,120]},{"name":"Light Peach","rgb":[250,182,164]},{"name":"Dark Tan","rgb":[123,99,82]},{"name":"Tan","rgb":[156,132,107]},{"name":"Dark Slate","rgb":[51,57,65]},{"name":"Slate","rgb":[109,117,141]},{"name":"Light Slate","rgb":[179,185,209]},{"name":"Dark Stone","rgb":[109,100,63]},{"name":"Stone","rgb":[148,140,107]},{"name":"Light Stone","rgb":[205,197,158]}]
```

## Experiments

### 2025-09_pawtect

variants: koala, disabled

DRM for anti-bot measures using WASM code. Throws error if disabled.

## Authors of this document
### cfp
  - GitHub: [cfpwastaken](https://github.com/cfpwastaken)
  - Discord: [@cfp](https://discord.com/users/318394797822050315)
### j0code
  - GitHub: [j0code](https://github.com/j0code)
  - Discord: [@j0code](https://discord.com/users/418109742183874560)
