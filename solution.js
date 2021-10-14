const util = require("util");
const readLineSync = require("readline-sync");
const data = require("./data.json");

// console.log(util.inspect(data, false, null, true));

const allCourses = ["Medical", "Dental", "Ayurveda"];
const allLevels = ["UG", "PG", "DIPLOMA", "Ph.D"];

const exceptKeyForCourse = "ALL_COURSES​";
const exceptKeyForLevel = "ALL_LEVEL​";

const isInputValid = (key, referenceObj, exceptKey) => {
    return key == exceptKey || referenceObj[key];
};

const printOptionsFromKeys = (obj, keyValueSet, exceptKey, placeholderArr) => {
    let keys = Object.keys(obj);
    keys.forEach((item, idx) => {
        if (item == exceptKey) {
            keys.splice(idx, 1, placeholderArr[0]);
            for (let i = 1; i < placeholderArr.length; i++) {
                keys.splice(idx + 1, 0, placeholderArr[i]);
            }
        }
    });
    keys.forEach((key, idx) => {
        keyValueSet[idx + 1] = key;
        console.log(`${idx + 1}. ${key}`);
    });
};

const getUserInput = (field, keySet, exceptKey) => {
    let inp = readLineSync.question(
        `Select the number corresponding to the desired ${field} from the above list\n`
    );
    while (!isInputValid(inp, keySet, exceptKey)) {
        console.log("Invalid option selected! Please try again");
        inp = readLineSync.question("Select fee type from the above list\n");
    }
    return keySet[inp];
};

const calculateTotalFee = (detailsObj) => {
    let totalFee = 0;
    totalFee = detailsObj.amount;
    console.log(totalFee);
};

const main = () => {
    var keyValueSet = {};
    let refinedData = data;

    printOptionsFromKeys(data, keyValueSet);

    let feeType = getUserInput("fee type", keyValueSet);

    refinedData = refinedData[feeType];

    printOptionsFromKeys(refinedData, keyValueSet);

    let nationality = getUserInput("nationality", keyValueSet);

    refinedData = refinedData[nationality];

    printOptionsFromKeys(
        refinedData,
        keyValueSet,
        exceptKeyForCourse,
        allCourses
    );

    let course = getUserInput("course", keyValueSet, exceptKeyForCourse);

    refinedData = refinedData[course] ? {...refinedData[course], ...refinedData[exceptKeyForCourse] } :
        refinedData[exceptKeyForCourse];

    printOptionsFromKeys(refinedData, keyValueSet, exceptKeyForLevel, allLevels);

    let level = getUserInput("level", keyValueSet, exceptKeyForLevel);

    refinedData = refinedData[level] ? {...refinedData[level], ...refinedData[exceptKeyForLevel] } :
        refinedData[exceptKeyForLevel];

    calculateTotalFee(refinedData);
};

main();