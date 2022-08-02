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

  await page.goto("https://sugang.skhu.ac.kr/");

  // iframe이라 써야함
  let frame = await iframe(page, "Main");
  await frame.type("#txtUserID", process.env.ID);
  await frame.type("#txtPwd", process.env.PW);
  await frame.click("#btn-login");

  // 신청버튼누르기
  frame = await iframe(page, "Main");
  await frame.click("span.main-menu");
  await frame.click("li[onclick=\"fnMenuLoad('/core/coreNotice1')\"]");

  // 수강신청시작버튼
  frame = await iframe(page, "Main");
  await frame.click(".btn-lg");

  // 조회버튼
  frame = await iframe(page, "Main");
  await frame.click("li[data-id='tab_02']");

  // 과목 조회
  frame = await iframe(page, "Main");
  await frame.type("#pSearchNm", process.env.SUBJECT);
  await frame.click("#btnSearch");

  frame = await iframe(page, "Main");
  // const button = await frame.$("button[class='btn-refresh']");
  const button = await frame.$("td[aria-describedby='GridLecture_mode']");
  while (true) {
    await page.waitForTimeout(500);
    await button.click();
  }
})();
