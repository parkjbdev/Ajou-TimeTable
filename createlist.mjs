import fs from 'fs';

import u01 from './results_2023_fall/u01.json' assert{ type: "json" };
import u02 from './results_2023_fall/u02.json' assert{ type: "json" };
import u03 from './results_2023_fall/u03.json' assert{ type: "json" };
import u04 from './results_2023_fall/u04.json' assert{ type: "json" };
import u05 from './results_2023_fall/u05.json' assert{ type: "json" };
import u06 from './results_2023_fall/u06.json' assert{ type: "json" };
import u07 from './results_2023_fall/u07.json' assert{ type: "json" };
import u29 from './results_2023_fall/u29.json' assert{ type: "json" };

const jsons = [u01, u02, u03, u04, u05, u06, u07, u29];
let result = [];

for (const json of jsons) {
  if (json["DatasetList"]["DS_COUR120"].length != 0)
    console.log(json["DatasetList"]["DS_COUR120"][0]["submattFgNm"] + " " + json["DatasetList"]["DS_COUR120"].length + "개");
  result.push.apply(result, json["DatasetList"]["DS_COUR120"]);
}

fs.writeFileSync('list.json', JSON.stringify(result));
