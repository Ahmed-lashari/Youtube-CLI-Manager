import fs from 'fs';
import ytdl from '@distube/ytdl-core';
import errorInstance from '../constants/proj-texts';
import promptInstance from '../utils/prompts';
import { coloredText, colorPlate } from '../constants/colors';
import path from 'path';
import { outputPath } from '../config/env-variables';
import { addJsonMethod } from '../utils/add-to-json';

export async function downloadYouTubeVideo(): Promise<boolean> {
       try {
              const url: string = await promptInstance.getDownloadFilePath();
              const isValid = ytdl.validateURL(url);
              if (!isValid) {
                     console.log('URL Validation faield')
                     throw errorInstance.invalidUrl;
              }
              console.log('URL Validated')
              console.log(coloredText('Please wait. Getting Info....', colorPlate.infoBlud))
              const videoInfo = await ytdl.getInfo(url);
              console.log(`File preparing for download: ${videoInfo.videoDetails.title}`);

              if (!fs.existsSync(outputPath)) {
                     fs.mkdirSync(outputPath, { recursive: true });
                     console.log(coloredText(`creating output file path, i-s: ${outputPath}`, colorPlate.infoBlud))
              }

              // NOT REALLY NEEDED BUT I NEEDED SMALLER SIMPLE VIDEO TITLES
              const outputJsonKey = await promptInstance.downloadingFileNameChange()
              const safeTitle = videoInfo.videoDetails.title.replace(/[\/\\?%*:|"<>]/g, '-');
              const outputFile = path.join(outputPath, `${safeTitle}.mp4`);


              await donwloadingStream(url,outputFile,outputJsonKey)

              return true;
       } catch (error) {
              console.log(
                     coloredText(`Failed to download video: ${error}`, colorPlate.errorRedBold)
              );
              return false;
       }
}


async function donwloadingStream(url:string,outputFile:string, outputJsonKey:string){
       await new Promise<void>((resolve, reject) => {
              const videoStream = ytdl(url, { 
                  quality: 'highest',
                  filter: 'audioandvideo',
                  requestOptions: {
                      headers: {
                          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                          'Cookie': 'CONSENT=YES+; '
                      }
                  }
              });
              
              console.log('Almost there...\n');
              
              const writeStream = fs.createWriteStream(outputFile);
              videoStream.pipe(writeStream);
              
              console.log('Starting download...\n');
              //whows the downloading indicator
              videoStream.on('progress', (downloaded, total) => {
                     const percent = (downloaded / total) * 100;

                     // cleares the console
                     promptInstance.clearScreen()
                     
                     // moves cursot to top
                     process.stdout.cursorTo(0);  // not needed but i was getting unexpected out, suggested by claude ai

                     // shows the progss
                     
                     process.stdout.write(coloredText(`Downloading: ${percent.toFixed(2)}%`, colorPlate.infoBlud));
              });
          
              videoStream.on('end', () => {
                  console.log(coloredText('\n\nDownload completed.', colorPlate.successGreen));
                  addJsonMethod(outputJsonKey.toString(), outputFile);
                  resolve();
              });
          
              videoStream.on('error', (error) => {
                  console.error('Stream error details:', error);
                  reject(error);
              });
          
              writeStream.on('error', (error) => {
                  console.error('Write stream error:', error);
                  reject(error);
              });
          });
}



