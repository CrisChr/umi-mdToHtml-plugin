
const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#/; // #
const reg_line = /^\-/; // -
const reg_number = /^\d/;

interface IMdContent {
  [key: string]: {
    type: 'single' | 'wrap',
    tagContents: any
  };
}

const createHtmlTree = (mdArr: string[]) => {
  let lastMark = '';
  let htmlObj = {} as IMdContent;
  mdArr.forEach(mdElement => {
    const matched = mdElement.match(reg_mark);
    if(matched){
      const mark = matched[1];
      const input = matched['input'];
      if(reg_sharp.test(mark)){ // 匹配 #
        const tag: string = `h${mark.length}`;
        const content = input.replace(reg_mark, '');
        if(reg_sharp.test(lastMark)){
          if(!htmlObj[tag]){
            htmlObj[tag] = {
              type: 'single',
              tagContents: [`<${tag}>${content}</${tag}>`],
            }
          }else{
            htmlObj[tag].tagContents = [...htmlObj[tag].tagContents, `<${tag}>${content}</${tag}>`];
          }
        }else{
          lastMark = mark;
          htmlObj[tag] = {
            type: 'single',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else if(reg_line.test(mark)){ // 无序列表
        const tag = 'li';
        const content = input.replace(reg_mark, '');
        if(reg_line.test(lastMark)){
          htmlObj['ul'].tagContents = [...htmlObj['ul'].tagContents, `<${tag}>${content}</${tag}>`];
        }else{
          lastMark = mark;
          htmlObj['ul'] = {
            type: 'wrap',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else if(reg_number.test(mark)){ // 有序列表
        const tag = 'li';
        const content = input.replace(reg_mark, '');
        if(reg_number.test(lastMark)){
          htmlObj['ol'].tagContents = [...htmlObj['ol'].tagContents, `<${tag}>${content}</${tag}>`];
        }else{
          lastMark = mark;
          htmlObj['ol'] = {
            type: 'wrap',
            tagContents: [`<${tag}>${content}</${tag}>`],
          }
        }
      }else {
        const tag = 'div';
        const content = input.replace(reg_mark, '');
        htmlObj[tag] = {
          type: 'single',
          tagContents: [`<${tag}>${content}</${tag}>`],
        }
      }
    }
  });
  return htmlObj;
}

const mdToHtml = () => {
  const mdContent = `{{mdContent}}`;

  const mdContentArr = mdContent.split('\n');

  const htmlPool = createHtmlTree(mdContentArr);
  let htmlStr: string = '';
  for(let k in htmlPool){
    let item = htmlPool[k];
    if(item.type === 'single'){
      item.tagContents.forEach((tag: string) => {
        htmlStr += tag;
      })
    }else if(item.type === 'wrap'){
      let list = `<${k}>`;
      item.tagContents.forEach((tag: string) => {
        list += tag;
      });
      list += `</${k}>`;
      htmlStr += list;
    }
  }

  return htmlStr;

};

export {mdToHtml};
