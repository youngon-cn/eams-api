const cheerio = require('cheerio');
const request = require('superagent');
const charset = require('superagent-charset');
charset(request);

const base_url = 'http://j.tjcu.edu.cn';
const getText = (index, el) => cheerio(el).text().replace(/[\s]/g, '');
const format = data => data.map((course, index) => {
  let curCourse = course.slice();
  if (course.length <= 16) {
    const preCourse = data[index - 1].slice();
    preCourse.splice(18 - course.length, 17);
    curCourse = [...preCourse, ...course];
  }
  return {
    program: curCourse[0], // 培养方案
    id: curCourse[1], // 课程号
    name: curCourse[2], // 课程名
    order: curCourse[3], // 课序号
    credit: curCourse[4], // 学分
    property: curCourse[5], // 课程属性
    examine: curCourse[6], // 考试类型
    teacher: curCourse[7].replace(/\*$/, '').split('*'), // 教师
    way: curCourse[9], // 修读方式
    status: curCourse[10], // 选课状态
    week: curCourse[11].replace(/周上/, ''), // 周次
    day: curCourse[12], // 星期
    section: curCourse[13], // 节次
    num: curCourse[14], // 节数
    campus: curCourse[15], // 校区
    building: curCourse[16], // 教学楼
    classroom: curCourse[17], // 教室
  };
});

exports.show = async (ctx) => {
  const url = `${base_url}/xkAction.do?actionType=6`;
  const response = await request.get(url)
    .charset('gb2312')
    .set("Cookie", ctx.user.cookies);
  const courses = cheerio('.displayTag .odd', response.text)
    .map((index, el) => el).get()
    .map(course => cheerio('td', course).map(getText).get());
  ctx.body = format(courses);
};