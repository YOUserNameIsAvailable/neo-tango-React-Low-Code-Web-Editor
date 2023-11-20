import React from 'react';

interface i18nItem {
  key: string;
  value: {
    originalText: string;
    translatedText: string;
    detectedLanguage: string;
    key: string;
  };
}

const customTranslations = new Map<string, string>([
  ['输入图片url', 'Input image url'],
]);

export async function translator() {
  const mapList = await getFilteredi18nList();

  const originalReactCreateElement: typeof React.createElement = React.createElement;

  // @ts-ignore
  React.createElement = (type: any, props: any, ...children: any[]) => {
    // modify the children as needed
    const newChildren = children.map((child) => {
      if (canTranslate(child)) {
        return translateText(child, mapList);
      }

      return child;
    });

    // translate placeholders
    if (canTranslate(props?.placeholder)) {
      props.placeholder = translateText(props.placeholder, mapList);
    }

    // translate values
    if (canTranslate(props?.value)) {
      props.value = translateText(props.value, mapList);
    }

    return originalReactCreateElement(type, props, ...newChildren);
  };
}

// async function getFilteredi18nList() {
//   const response = await fetch('/i18n/en.json');
//   const data: i18nItem[] = await response.json();

//   const filtered = data.filter((item) => isChinese(removeHtmlTags(item.value.originalText)));

//   return new Map(
//     filtered.map((obj) => {
//       return [removeHtmlTags(obj.value.originalText), removeHtmlTags(obj.value.translatedText)];
//     }),
//   );
// }

async function getFilteredi18nList() {
  const response = await fetch('/i18n/en.json');
  const data: i18nItem[] = await response.json();

  const filtered = data
    .filter((item) => isChinese(item.value.originalText))
    .flatMap((obj) => {
      const originalText = obj.value.originalText;
      const translatedText = obj.value.translatedText;

      const originalArray = originalText
        .split('<a i=')
        .filter(Boolean)
        .map((fragment) => fragment.match(/>(.*?)<\/a>/)?.[1] as string)
        .filter(Boolean)
        .map((fragment) => fragment.trim())
        .filter(Boolean);

      if (!originalArray?.length) {
        return [
          {
            original: obj.value.originalText,
            translated: obj.value.translatedText,
          },
        ];
      }

      const translatedArray = translatedText
        .split('<a i=')
        .filter(Boolean)
        .map((fragment) => fragment.match(/>(.*?)<\/a>/)?.[1] as string)
        .filter(Boolean)
        .map((fragment) => fragment.trim())
        .filter(Boolean);

      return originalArray.map((original, index) => ({
        original: original,
        translated: translatedArray[index],
      }));
    })
    .map((obj) => [removeHtmlTags(obj.original), removeHtmlTags(obj.translated)] as const)
    .filter((entry) => entry[0] && entry[1]);

  return new Map<string, string>(filtered);
}

function translateText(text: string, list: Map<string, string>): string {
  const translatedText = list.get(text) || customTranslations.get(text);
  return translatedText !== undefined ? translatedText : text;
}

function canTranslate(text: string) {
  return text && typeof text === 'string' && isChinese(text);
}

function isChinese(text: string) {
  const chinesePattern = /[\u4E00-\u9FFF]/; // Regular expression to match Chinese characters
  return chinesePattern.test(text);
}

function removeHtmlTags(str: string) {
  if (str === null || str === '') return str;

  // Regular expression to identify HTML tags in the input string.
  // This will match any text between < and > characters and replace it with an empty string.
  return str.replace(/(<([^>]+)>)/gi, '').trim();
}
