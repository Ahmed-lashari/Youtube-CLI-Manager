import promptInstance from './utils/prompts';
import { deleteDownloadedVideos } from './modules/delete-saved-files';
import { downloadYouTubeVideo} from './modules/download-yt-files';
import { playMediaFile } from './modules/open-media';
import { coloredText, colorPlate } from './constants/colors';
import { jsonFilePath } from './config/env-variables';
import { jsonFileExist } from './modules/delete-saved-files';
import fs from 'fs';


export async function YoutubeCli() {

       promptInstance.handleMenuPrompt();

       const userOption: string = await promptInstance.getMenuPromptValue();
       
       // clears the console
       promptInstance.clearScreen()

       await _conditionalLogic(userOption)



       promptInstance.closeCli();

}

async function _conditionalLogic(selectedoption: string) {
       switch (selectedoption) {
              // OPTION: 1, DOWNLOADING VIDEO FROM YOUTUBE
              case '1':
                     await _downloadVideo()
                     break;
              case '2':
                     await _openMediaFile()
                     break;
              case '3':
                     await _removeDownloadedVideos()
                     break;
              case '4':
                     return ;
       }
       await YoutubeCli()
}

async function _downloadVideo() {
       if (!(await downloadYouTubeVideo())) {
              let tryAgin: string = await promptInstance.downloadFailedTryAgain();

              while (!['y', 'Y', 'n', 'N'].includes(tryAgin)) {
                     promptInstance.clearScreen()
                     console.log(
                            coloredText('Invalid Option Selected.\n\nPlease try again (y/N): ', colorPlate.warningRed)
                     );

              // re-prompt the user
              tryAgin = await promptInstance.downloadFailedTryAgain(); 
              }
              promptInstance.clearScreen();

              (tryAgin === 'y' || tryAgin === "Y")? await _downloadVideo():
              await YoutubeCli()
       }
}


async function _removeDownloadedVideos(){
       if (jsonFileExist()) {
           const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
           const jsonData = JSON.parse(fileContent);
       
           const keys = Object.keys(jsonData);
       
           if (keys.length === 0) {
             console.log(coloredText('No videos found in JSON file.', colorPlate.warningRed));
             return;
           }
       
           console.log(coloredText('\nAvailable videos:', colorPlate.titleYellow));
           keys.forEach((key, index) => {
             console.log(`${index + 1}.   ${key}`);
           });
       
           let userInput = await promptInstance.getDeletFileNAme();
       
           while (userInput === null || userInput.trim() === '') {
             promptInstance.clearScreen();
       
             const retryChoice = await promptInstance.askQuestion(
               coloredText('Path cannot be empty.\n\nDo you want to try again (y/N)? ', colorPlate.warningRed)
             );
       
             if (retryChoice.toLowerCase() === 'y') {
               userInput = await promptInstance.getDeletFileNAme();
             } else {
               console.log(coloredText('\nNo video deleted.', colorPlate.successGreen));
               return;
             }
           }
       
           userInput = userInput.trim();
       
           if (!jsonData[userInput]) {
             console.log(coloredText('\nInvalid key entered. No such video.', colorPlate.dimGrey));
             return;
           }
       
           
       
       await deleteDownloadedVideos(userInput, jsonData)
}
}

async function _openMediaFile() {

  if (!jsonFileExist()) {
    console.log(coloredText('No videos found.', colorPlate.dimGrey));
    return;
  }

  const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
  const jsonData = JSON.parse(fileContent);
  const keys = Object.keys(jsonData);

  if (keys.length === 0) {
    console.log(coloredText('No videos available in the list.', colorPlate.titleYellow));
    return;
  }

  console.log(coloredText('\nAvailable videos:', colorPlate.successGreen));
  keys.forEach((key, index) => {
    console.log(`${index + 1}. ${key}`);
  });

  let userInput = await promptInstance.getFileOpenPrompt();

  while (userInput === null || userInput.trim() === '') {
    promptInstance.clearScreen();

    const retryChoice = await promptInstance.askQuestion(
      coloredText('Path cannot be empty.\n\nDo you want to try again (y/N)? ', colorPlate.warningRed)
    );

    if (retryChoice.toLowerCase() === 'y') {
      userInput = await promptInstance.getFileOpenPrompt();
    } else {
      console.log(coloredText('\nNo video selected.', colorPlate.warningRed));
      return;
    }
  }

  userInput = userInput.trim();

  if (!jsonData[userInput]) {
    console.log(coloredText('\nInvalid key entered. No such video.', colorPlate.warningRed));
    return;
  }

  const filePathToPlay = jsonData[userInput];

  try {
    await playMediaFile(filePathToPlay);
  } catch (error) {
    console.log(coloredText(`\nError playing media: ${(error as Error).message}`, colorPlate.warningRed));
  }
}
