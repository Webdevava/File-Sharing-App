const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid',async(req,res)=>{
    try {
        const file = await File.findOne({uuid:req.params.uuid});
        if(!file){
            return res.render('download', {error:'Link Expired'})
        }else{
            return res.render('download', {
                uuid:file.uuid,
                fileName:file.name,
                fileSize:file.size,
                downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            })
        }
    } catch (error) {
        return res.render('download', {error:'something gichid-michid happened'})
    }
    
})

module.exports = router;