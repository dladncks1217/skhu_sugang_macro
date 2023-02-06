// ./macro.js
const puppeteer = require("puppeteer");
const iframe = require("puppeteer-get-iframe").iframeAttached;

require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(100000000);

  await page.goto("https://sugang.skhu.ac.kr/");
  page.waitForNavigation({ timeout: 100000000 });
  // iframe이라 써야함
  let frame = await iframe(page, "Main");
  await frame.type("#txtUserID", process.env.ID);
  await frame.type("#txtPwd", process.env.PW);
  await frame.click("#btn-login");

  // 신청버튼누르기
  frame = await iframe(page, "Main");
  await frame.waitForSelector("span.main-menu");
  await frame.click("span.main-menu");
  await frame.click("li[onclick=\"fnMenuLoad('/core/coreNotice1')\"]");

  // 수강신청시작버튼
  frame = await iframe(page, "Main");
  await frame.waitForSelector(".btn-lg");
  await frame.click(".btn-lg");

  // 조회버튼
  frame = await iframe(page, "Main");
  await frame.waitForSelector("li[data-id='tab_02']");
  await frame.click("li[data-id='tab_02']");

  // 과목 조회
  frame = await iframe(page, "Main");
  await frame.waitForSelector("#btnSearch");
  await frame.waitForSelector("#pSearchNm");
  await frame.type("#pSearchNm", process.env.SUBJECT);
  await frame.click("#btnSearch");

  frame = await iframe(page, "Main");
  await frame.waitForSelector("button[class='btn-refresh']");
  // const button = await frame.$("button[class='btn-refresh']");
  let button = await frame.$("td[aria-describedby='GridLecture_mode']");

  while (true) {
    // await frame.waitForSelector("td[aria-describedby='GridLecture_mode']");
    await page.waitForTimeout(1000);
    // let button = await frame.$x("button[class='btn-refresh']/parent::td");
    await frame.waitForSelector("td[aria-describedby='GridLecture_mode']");
    let button = await frame.$("td[aria-describedby='GridLecture_mode']");

    await button.click();
  }
})();
