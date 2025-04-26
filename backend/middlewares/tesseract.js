
import tesseract from 'node-tesseract-ocr';


const tesseractMiddleware=async(req,res,next)=>{
    try {
        
        const config = {
            lang: "eng",
            oem: 1,
            psm: 3,
          }
          
          if (!req.file) {
            return res.status(400).send("No file uploaded.");
          }
          let text= await tesseract.recognize(req.file.path, config)
        
          req.extractData=text
           next()
           
    } catch (error) {
        console.log(error.message)
        next(error)

    }
}


export default tesseractMiddleware
