import * as readline from 'readline';
import { printColor, coloredText, colorPlate } from '../constants/colors';

// ========================================================================

const promptCli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class CliPrompts {

  async askQuestion(
    query: string,
    colorKey: keyof typeof printColor = 'info' // is-default color
  ): Promise<string> {
    return new Promise(resolve => {
      const coloredQuery = coloredText(query, colorKey);
      promptCli.question(coloredQuery, answer => {
        resolve(answer);
      });
    });
  }

  async closeCli() {
    promptCli.close()
  }

  clearScreen() {
    console.clear();
  }

  async handleMenuPrompt(): Promise<void> {
    console.log(coloredText(
      '1 =>  Download Youtube Video\n2 =>  Open Downloaded Videos\n3 =>  Remove Video From Downloads\n4 =>  Exit\n\n',
      colorPlate.titleYellow
    ));
  }

  async getMenuPromptValue(): Promise<string> {
    return await this.askQuestion(
      'Select your options: ',
      colorPlate.successGreen
    );
  }
  async getDownloadFileOutputPath(): Promise<string> {
    return await this.askQuestion(
      'File Location to save after Downloading: \n\n',
      colorPlate.infoBlud
    );
  }
  async getDownloadFilePath(): Promise<string> {
    return await this.askQuestion(
      'Paste Yutube Video complete url: \n\n',
      colorPlate.dimGrey
    );
  }

  async downloadFailedTryAgain(): Promise<string> {
    return await this.askQuestion(
      'Yor download link corrupted\n\nWant to try again (y/N)? \n\n',
      colorPlate.dimGrey
    );
  }
  
  async downloadingFileNameChange(): Promise<string> {
    return await this.askQuestion(
      'Insert name for the downloading file: ',
      colorPlate.successGreen
    );
  }
  
  async getDeletFileNAme(): Promise<string> {
    return await this.askQuestion(
      'Insert saved file name for deleting: ',
      colorPlate.warningRed
    );
  }
  
  async getFileOpenPrompt(): Promise<string> {
    return await this.askQuestion(
      'Input File name to Open: ',
      colorPlate.warningRed
    );
  }

}


const promptInstance = new CliPrompts()
export default promptInstance