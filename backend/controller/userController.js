

const home=async(req,res)=>{
    try{
        res.render('index',{data:''})
    } catch (error) {
        console.log('Hey i am midhun')
    }
}

const extractText=async(req,res)=>{
    try{

      const extractedText=req.extractData 
      if(extractText) {
        res.render('index',{data:extractedText})
      }else{
        res.redirect('/')
      }

    } catch (error) {
      console.log('Hey i am extractText')
    }
}



const userController = {
    extractText,
    home
  }
  
export default userController