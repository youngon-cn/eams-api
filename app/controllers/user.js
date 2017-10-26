const cheerio = require('cheerio');
const request = require('superagent');
const charset = require('superagent-charset');
charset(request);

const base_url = 'http://j.tjcu.edu.cn';
const getText = (index, el) => cheerio(el).text().replace(/[\s]/g, '');
const format = data => {
  return {
    stuid: data[0], //学号
    name: data[1], //姓名
    ID_number: data[5], //身份证号
    sex: data[6], //性别
    minorities: data[10], //民族
    hometown: data[11], //籍贯
    politics: data[13], //政治面貌
    middle_school: data[15], //毕业中学
    candidate_number: data[18], //高考考生号
    foreign_language: data[19], //外语语种
    enrollment_date: data[23], //入学日期
    college: data[24], //系所
    major: data[25], //专业
    grade: data[27], // 年级
    class: data[28], //班级
    graduation_date: data[47], //毕业日期
    type: data[48], //培养层次
  };
};

exports.show = async (ctx) => {
  const url = `${base_url}/xjInfoAction.do?oper=xjxx`;
  const response = await request.get(url)
    .charset('gb2312')
    .set("Cookie", ctx.user.cookies);
  const infos = cheerio('.fieldName+td', response.text).map(getText).get();
  ctx.body = format(infos);
}