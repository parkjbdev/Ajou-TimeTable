const convert = (lect_list) => {
  const interests_keys = [
    "rcomShyrCdNm",
    "sustLsnFgNm",
    "maLecturerEmplNm",
    "submattFgNm",
    "sustCdNm",
    "sbjtCd",
    "sbjtKorNm",
    "ltRoomNm",
    "ltTmNm",
    "tlsnNo",
  ];

  const dayDict = ["일", "월", "화", "수", "목", "금", "토"];

  const results = [];

  for (const lect of lect_list) {
    const keys = Object.keys(lect);
    const result = {};
    for (const key of keys) {
      if (key === "ltTmNm") {
        const ltTmNms = lect[key]
          .replace(/\([^\(\)]+\)/g, "")
          .replace("  ", " ")
          .split(" ")
          .filter((val) => val !== "");

        const times = [];

        for (const ltTmNm of ltTmNms) {
          const day = dayDict.indexOf(ltTmNm.charAt(0));
          const timeStr = ltTmNm.substring(1);
          const regex_ABC = /^[A-Z]$/;
          const regex_num = /^\d+\.?\d*$/;
          const regex_time = /^\d{2}:\d{2}~\d{2}:\d{2}$/;

          let startTime, endTime;

          if (regex_ABC.test(timeStr)) {
            startTime = (timeStr.charCodeAt(0) - "A".charCodeAt()) * 1.5 + 9;
            endTime = startTime + 1.25;
          } else if (regex_num.test(timeStr)) {
            startTime = Number(timeStr) + 8;
            endTime = Number(timeStr) + 9;
          } else if (regex_time.test(timeStr)) {
            const split = timeStr.split(/:|~/).map((val) => Number(val));
            startTime = split[0] + split[1] / 60;
            endTime = split[2] + split[3] / 60;
          } else console.error(timeStr);

          if (
            times.length !== 0 &&
            times.at(-1).day === day &&
            startTime - times.at(-1).endTime <= 0.25
          )
            times.at(-1).endTime = endTime;
          else times.push({ day, startTime, endTime });
        }
        result["ltTmNm"] = lect[key]
          .replace(/\([^\(\)]+\)/g, "")
          .replace("  ", " ")
          .split(" ")
          .filter((val) => val !== "")
          .toString();
        result["ltTmNmConv"] = times;
      } else if (interests_keys.includes(key)) result[key] = lect[key];
    }
    results.push(result);
  }
  return results
};
// import lect_list from "./list.json" assert { type: "json" };
// import fs from "fs";
// fs.writeFileSync("new_list.json", JSON.stringify(convert(lect_list)));
