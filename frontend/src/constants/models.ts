// 만약 파일명 바뀌면 여기서 변경
const fileNames0 = ["0000", "285d", "62da", "a000", "ac47"];
const fileNames1 = ["0001", "11c1", "61f4", "8d0d", "a001"];
const fileNames2 = ["0002", "7454", "a002", "bbd8", "be2d"];
const fileNames3 = ["0003", "0e42", "231e", "a003", "f2da"];
const fileNames4 = ["0004", "0b8c", "7166", "7b49", "a004"];
const fileNames5 = ["0005", "56b4", "997e", "a005", "fc2f"];
const fileNames6 = ["0006", "1995", "a006", "d088", "db73"];
const fileNames7 = ["0007", "1786", "39d0", "a007", "c180"];
const fileNames8 = ["0008", "5dd2", "a008", "c285", "cb8d"];
const fileNames9 = ["0009", "0b7d", "5126", "96a2", "a009"];

const fileNames = [
  fileNames0,
  fileNames1,
  fileNames2,
  fileNames3,
  fileNames4,
  fileNames5,
  fileNames6,
  fileNames7,
  fileNames8,
  fileNames9,
];

export async function loadExperimentData(forgetClass: number) {
  try {
    const dataArray = await Promise.all(
      fileNames[forgetClass].map(
        (fileName) => import(`./data/${forgetClass}/${fileName}.json`),
      ),
    );

    return dataArray.reduce(
      (acc, data) => ({
        ...acc,
        [data.ID]: data,
      }),
      {},
    );
  } catch (error) {
    console.error(`Error loading data for forget class ${forgetClass}:`, error);
    throw error;
  }
}
