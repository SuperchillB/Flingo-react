# React Project Architecture

Inside /src

.
├── _components/
│   ├── _Component1/
│   │   ├── _tests_/
│   │   │   └── Component1.js
│   │   ├── Component1.js
│   │   ├── Component1.scss
│   │   └── package.json (==> contains: { "main": "Component1.js" })
│   └── ...
│
├── _views/
│   ├── _home/
│   │   ├── _tests_/
│   │   │   └── Home.js
│   │   ├── Home.js
│   │   ├── Home.scss
│   │   └── package.json (==> contains: { "main": "Home.js" })
│   ├── _page2/
│   │   └── ...
│   ├── _page3/
│   │   └── ...
│   ├── ...
│   └── App.js
│
├── _router/
│   └── index.js
│
├── _store/
│   ├── _actions/
│   ├── _reducers/
│   └── index.js
│
├── _constants/
│   ├── apiConstants.js
│   ├── styleConstants.js
│   ├── actionTypes.js
│   └── ...
│
├── _utils/
│   ├── ApiUtils.js
│   ├── StringUtils.js
│   ├── DateTimeUtils.js
│   └── ...
│
├── _styles/
│   ├── _core/
│   │   ├── _colors.scss
│   │   ├── _fonts.scss
│   │   ├── _mixins.scss
│   │   ├── _functions.scss
│   │   └── _variables.scss
│   ├── base.scss
│   └── main.scss
│
├── _config/
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   ├── apiBase.js
│   ├── env.js
│   └── ...
│
├── index.js
├── package.json
├── README.md
└── ...