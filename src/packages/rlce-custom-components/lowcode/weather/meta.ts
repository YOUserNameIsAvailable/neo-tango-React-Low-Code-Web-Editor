
import { IPublicTypeComponentMetadata, IPublicTypeSnippet } from '@alilc/lowcode-types';

const WeatherMeta: IPublicTypeComponentMetadata = {
  "componentName": "Weather",
  "title": "Weather",
  "docUrl": "",
  "screenshot": "",
  "devMode": "proCode",
  "npm": {
    "package": "rlce-custom-components",
    "version": "0.1.11",
    "exportName": "Weather",
    "main": "src\\index.tsx",
    "destructuring": true,
    "subName": ""
  },
  "configure": {
    "props": [
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "lat",
            "zh-CN": "Latitude"
          },
          "tip": "lat | Latitude"
        },
        "name": "lat",
        "description": "Latitude",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "lon",
            "zh-CN": "Longitude"
          },
          "tip": "lon | Longitude"
        },
        "name": "lon",
        "description": "Longitude",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "lang",
            "zh-CN": "Language"
          },
          "tip": "lang | Language"
        },
        "name": "lang",
        "description": "Language",
        "setter": {
          "componentName": "RadioGroupSetter",
          "props": {
            "dataSource": [
              {
                "label": "en",
                "value": "en"
              },
              {
                "label": "de",
                "value": "de"
              },
              {
                "label": "es",
                "value": "es"
              }
            ],
            "options": [
              {
                "label": "en",
                "value": "en"
              },
              {
                "label": "de",
                "value": "de"
              },
              {
                "label": "es",
                "value": "es"
              }
            ]
          },
          "isRequired": true,
          "initialValue": "en"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "unit",
            "zh-CN": "Unit"
          },
          "tip": "unit | Unit"
        },
        "name": "unit",
        "description": "Unit",
        "setter": {
          "componentName": "RadioGroupSetter",
          "props": {
            "dataSource": [
              {
                "label": "M",
                "value": "M"
              },
              {
                "label": "S",
                "value": "S"
              },
              {
                "label": "I",
                "value": "I"
              }
            ],
            "options": [
              {
                "label": "M",
                "value": "M"
              },
              {
                "label": "S",
                "value": "S"
              },
              {
                "label": "I",
                "value": "I"
              }
            ]
          },
          "isRequired": true,
          "initialValue": "M"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "locationLabel",
            "zh-CN": "Location l"
          },
          "tip": "locationLabel | Location label"
        },
        "name": "locationLabel",
        "description": "Location label",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "temperature",
            "zh-CN": "Temp unit"
          },
          "tip": "temperature | Temp unit"
        },
        "name": "temperature",
        "description": "Temp unit",
        "setter": {
          "componentName": "RadioGroupSetter",
          "props": {
            "dataSource": [
              {
                "label": "C",
                "value": "C"
              },
              {
                "label": "F",
                "value": "F"
              }
            ],
            "options": [
              {
                "label": "C",
                "value": "C"
              },
              {
                "label": "F",
                "value": "F"
              }
            ]
          },
          "isRequired": true,
          "initialValue": "C"
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "windSpeed",
            "zh-CN": "Wind speed"
          },
          "tip": "windSpeed | Wind speed unit"
        },
        "name": "windSpeed",
        "description": "Wind speed unit",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": ""
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "showForecast",
            "zh-CN": "Forecast"
          },
          "tip": "showForecast | Forecast"
        },
        "name": "showForecast",
        "description": "Forecast",
        "setter": {
          "componentName": "BoolSetter",
          "isRequired": true,
          "initialValue": false
        }
      },
      {
        "title": {
          "label": {
            "type": "i18n",
            "en-US": "apiKey",
            "zh-CN": "API key"
          },
          "tip": "apiKey | API key"
        },
        "name": "apiKey",
        "description": "API key",
        "setter": {
          "componentName": "StringSetter",
          "isRequired": true,
          "initialValue": ""
        }
      }
    ],
    "supports": {
      "style": true
    },
    "component": {}
  }
};
const snippets: IPublicTypeSnippet[] = [
  {
    "title": "Weather",
    "screenshot": "",
    "schema": {
      "componentName": "Weather",
      "props": {}
    }
  }
];

export default {
  ...WeatherMeta,
  snippets
};
