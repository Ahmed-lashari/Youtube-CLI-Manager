import chalk from 'chalk';

export const printColor = {
  success: (message: string) => console.log(chalk.green(message)),
  error: (message: string) =>
    console.log(chalk.red.bold(message)),
  info: (message: string) => console.log(chalk.blue(message)),
  warning: (message: string) => console.log(chalk.bgRedBright(message)),
  title: (message: string) =>
    console.log(chalk.bold.underline.yellow(message)),
  dim: (message: string) => console.log(chalk.gray(message)),
};


export function coloredText(text: string, colorKey: keyof typeof printColor): string {
  switch (colorKey) {
    case 'success': return chalk.green(text);
    case 'error': return chalk.red.bold(text);
    case 'info': return chalk.blue(text);
    case 'warning': return chalk.bgRedBright(text);
    case 'title': return chalk.bold.underline.yellow(text);
    case 'dim': return chalk.gray(text);
    default: return text;
  }
}


export enum colorPlate{
  successGreen ='success',
  errorRedBold ='error',
  infoBlud ='info',
  warningRed ='warning',
  titleYellow ='title',
  dimGrey ='dim',
}