
const reg_content = /^(.+?)\s/; // md标记外的所有内容
const reg_sharp = /^\#/; // #
const reg_line = /^\-/; // -
const reg_number = /^\d/; //有序列表

interface IMdContent {
  [key: string]: {
    type: 'single' | 'wrap',
    tagContents: string[]
  };
}

const randomNum = () => {
  return new Date().getTime() + Math.random();
}

const createHtmlTree = (mdArr: string[]) => {
  let lastMark = '';
  let htmlObj = {} as IMdContent;
  let _key = 0; // 标签唯一键
  mdArr.forEach(mdElement => {
    const matched = mdElement.match(reg_content);
    console.log('matched: ', matched);
    if(matched){
      const mark = matched[1];
      const input = matched['input'];
      if(reg_sharp.test(mark)){ // 匹配 #
        const tag: string = `h${mark.length}`;
        const content = input.replace(reg_content, '');
        if(reg_sharp.test(lastMark)){
          if(!htmlObj[tag]){
            htmlObj[`${tag}-${_key}`] = {
              type: 'single',
              tagContents: [`<${tag}>${content}</${tag}>`],
            }
          }else{
            htmlObj[`${tag}-${_key}`].tagContents = [...htmlObj[`${tag}-${_key}`].tagContents, `<${tag}>${content}</${tag}>`];
          }
        }else{
          lastMark = mark;
          _key = randomNum();
          htmlObj[`${tag}-${_key}`] = {
            type: 'single',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else if(reg_line.test(mark)){ // 无序列表
        const tag = 'li';
        const content = input.replace(reg_content, '');
        if(reg_line.test(lastMark)){
          htmlObj[`ul-${_key}`].tagContents = [...htmlObj[`ul-${_key}`].tagContents, `<${tag}>${content}</${tag}>`];
        }else{
          lastMark = mark;
          _key = randomNum();
          htmlObj[`ul-${_key}`] = {
            type: 'wrap',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else if(reg_number.test(mark)){ // 有序列表
        const tag = 'li';
        const content = input.replace(reg_content, '');
        if(reg_number.test(lastMark)){
          htmlObj[`ol-${_key}`].tagContents = [...htmlObj[`ol-${_key}`].tagContents, `<${tag}>${content}</${tag}>`];
        }else{
          lastMark = mark;
          _key = randomNum();
          htmlObj[`ol-${_key}`] = {
            type: 'wrap',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else {
        const tag = 'p';
        _key = randomNum();
        const content = input.replace(reg_content, '');
        htmlObj[`p-${_key}`] = {
          type: 'single',
          tagContents: [`<${tag}>${content}</${tag}>`],
        }
      }
    }
  });

  console.log('html object: ', htmlObj);

  return htmlObj;
}

const mdToHtml = () => {
  const mdContent = `{{mdContent}}`;

  const mdContentArr = mdContent.split('\n');

  const htmlPool = createHtmlTree(mdContentArr);
  let htmlStr: string = '';
  for(let k in htmlPool){
    let item = htmlPool[k];
    let htmlTag = k.split('-')[0];
    if(item.type === 'single'){
      item.tagContents.forEach((tag: string) => {
        htmlStr += tag;
      })
    }else if(item.type === 'wrap'){
      let list = `<${htmlTag}>`;
      item.tagContents.forEach((tag: string) => {
        list += tag;
      });
      list += `</${htmlTag}>`;
      htmlStr += list;
    }
  }

  return htmlStr;

};

export {mdToHtml};
