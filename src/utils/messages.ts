import {printColor} from '../constants/colors';

export const cliMessages = {
  successMessage: (message: string) => printColor.success(message),
  errorMessage: (message: string) => printColor.error(message),
  infoMessage: (message: string) => printColor.info(message),
  warningMessage: (message: string) => printColor.warning(message),
  sectionTitle: (message: string) => printColor.title(message),
  menuPrompt: (index: number, message: string) =>
    printColor.dim(`${index}. ${message}`),
  divider: () => console.log(printColor.dim('-------------------')),
};
