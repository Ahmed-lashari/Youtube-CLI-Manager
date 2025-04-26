import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import * as os from 'os';

export function playMediaFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {

    //resolving the path to handle different OS path formats
    const normalizedPath = path.resolve(filePath);
    
    // Check if the file exists before attempting to open
    if (!fs.existsSync(normalizedPath)) {
      reject(new Error(`File does not exist at path: ${normalizedPath}`));
      return;
    }
    
    // check th device os here (mac in my case)
    const platform = os.platform();
    let command: string;
    
    
    if (platform === 'win32') {
      // Windows - use start command
      command = `start "" "${normalizedPath}"`;
    } else if (platform === 'darwin') {
      // macOS - use open command
      command = `open "${normalizedPath}"`;
    } else if (platform === 'linux') {
      // Linux - use xdg-open command
      command = `xdg-open "${normalizedPath}"`;
    } else {
      reject(new Error(`Unsupported platform: ${platform}`));
      return;
    }
    
   //open file
    exec(command, (error) => {
      if (error) {
        reject(new Error(`Failed to open media file: ${error.message}`));
        return;
      }
      
      console.log(`Media file opened successfully: ${normalizedPath}`);
      resolve();
    });
  });
}