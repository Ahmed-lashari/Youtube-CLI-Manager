import * as fs from 'fs';
import { jsonFilePath } from '../config/env-variables';
import promptInstance from '../utils/prompts';
import { coloredText, colorPlate } from '../constants/colors';
import { YoutubeCli } from '../app';

export async function deleteDownloadedVideos(userInput:string, jsonData:any ) {

  const filePathToDelete = jsonData[userInput];
  
    if (fs.existsSync(filePathToDelete)) {
      fs.unlinkSync(filePathToDelete);
      console.log(coloredText(`\nVideo at path "${filePathToDelete}" deleted successfully.`, colorPlate.successGreen));




    } else {
      console.log(coloredText(`\nFile at path "${filePathToDelete}" does not exist.`, colorPlate.infoBlud));
    }


    // remoing from the json
    delete jsonData[userInput];
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  
}


// HELPER FUNCTION ============


export function jsonFileExist(): boolean {
  if (!fs.existsSync(jsonFilePath)) {
    return false;
  }

  const fileContent = fs.readFileSync(jsonFilePath, 'utf-8').trim();

  if (fileContent.length === 0) {
    return false;
  }



  return true;
}