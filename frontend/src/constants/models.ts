// 만약 파일명 바뀌면 여기서 변경
const fileNames0 = ["0000", "a000", "d8b1", "3c38", "c9d4"];
const fileNames1 = ["0001", "a001", "bd47", "be9e", "46cf"];
const fileNames2 = ["0002", "a002", "3bdd", "b7aa", "4b32"];
const fileNames3 = ["0003", "a003", "25a1", "e628", "d349"];
const fileNames4 = ["0004", "a004", "5c2d", "a958", "320e"];
const fileNames5 = ["0005", "a005", "85f0", "1dff", "f977"];
const fileNames6 = ["0006", "a006", "5272", "74c9", "740c"];
const fileNames7 = ["0007", "a007", "e1d7", "709f", "0b9d"];
const fileNames8 = ["0008", "a008", "1bfe", "97ce", "b92f"];
const fileNames9 = ["0009", "a009", "f44f", "0110", "6cd0"];

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
        (fileName) => import(`./data/${forgetClass}/${fileName}.json`)
      )
    );

    return dataArray.reduce(
      (acc, data) => ({
        ...acc,
        [data.ID]: data,
      }),
      {}
    );
  } catch (error) {
    console.error(`Error loading data for forget class ${forgetClass}:`, error);
    throw error;
  }
}
