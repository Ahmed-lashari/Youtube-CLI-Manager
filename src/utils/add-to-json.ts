import * as fs from 'fs';
import { jsonFilePath, forderPath } from '../config/env-variables';
import { coloredText, colorPlate } from '../constants/colors';

export async function addJsonMethod(key: string, value: string) {
  const folderPath = forderPath;
  const filePath = jsonFilePath;

  const newKey = key;
  const newValue = value;
  try {


    // if the folder path exsts, if not then create it
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // checkis if the file exists, if not hren creates it
    if (!fs.existsSync(filePath)) {

      const initialData = { [newKey]: newValue };

      // inserting into the json
      fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));

      console.log(coloredText(`File created with ${newKey}: ${newValue}`, colorPlate.successGreen));
    }
    // if file extsts then the only write in it
    else {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = fileContent ? JSON.parse(fileContent) : {};

      jsonData[newKey] = newValue;

      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      console.log(coloredText(`Added ${newKey}: ${newValue} to existing file.`, colorPlate.successGreen));
    }
  } catch (e) {
    console.log(coloredText(`Error While json check: ${e}.`, colorPlate.errorRedBold));

  }
}