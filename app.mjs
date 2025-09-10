import { v4 as uuidv4 } from "uuid";
import fs from "fs";

export class OrgCreator {
  credGenerator = (className, start, end, groupName) => {
    const groupId = uuidv4();
    const credentials = [];
    for (let i = start; i <= end; i++) {
      credentials.push({
        Name: `ARC101-${i}`,
        SfName: `admin@${className}.${i}.com`,
        Password: "password@1234",
        GroupId: groupId,
        Type: {
          Id: "Production",
          Domain: "https://login.salesforce.com/",
          LP: "HOME",
          landingPageOtherUrl: "",
        },
      });
    }
    return {
      groups: [
        {
          Name: groupName,
          isOpen: true,
          credentials: credentials,
        },
      ],
    };
  };
}

const orgs = new OrgCreator();
const result = orgs.credGenerator("arc101", 15780, 15802, "ARC101 Sep. 8th");
fs.writeFileSync("output.json", JSON.stringify(result, null, 2), "utf-8");
