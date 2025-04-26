import { coloredText , colorPlate} from "./colors"
class ErrorTexts{
       invalidUrl:string = coloredText('Invalid YouTube URL', colorPlate.errorRedBold)
}


 const errorInstance = new ErrorTexts()
 export default errorInstance