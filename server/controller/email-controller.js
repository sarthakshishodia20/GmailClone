import email from "../model/email.js";

export const saveSentEmail = async (req, res) => {
    try {
        const emailData = new email(req.body);
        await emailData.save();
        res.status(200).json("Email saved successfully");
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getEmails = async (req, res) => {
    try {
        let emails;
        let type = decodeURIComponent(req.params.type);

        if (type.toLowerCase() === "all mails") {
            emails = await email.find({ bin: false });
        } else if (type.toLowerCase() === "bin") {
            emails = await email.find({ bin: true });
        } else if(type.toLowerCase()==='starred'){
            emails=await email.find({starred:true,bin:false})
        }
        else {
            emails = await email.find({ type, bin: false });
        }

        return res.status(200).json(emails);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
};

export const moveEmailsToBin = async (req, res) => {
    try {
        if (req.body.permanent) {
            await email.deleteMany({ _id: { $in: req.body.emails } });
            return res.status(200).json("Emails permanently deleted");
        } else {
            await email.updateMany(
                { _id: { $in: req.body.emails } },
                { $set: { bin: true, starred: false, type: "" } }
            );
            return res.status(200).json("Emails moved to bin");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
};


export const toggleStarredEmails=async(req,res)=>{
    try{
        await email.updateOne({_id:req.body.id},{$set:{starred:req.body.value}})
        return res.status(200).json('email is marked');
    }
    catch(err){
        res.status(500).json(err.message);
    }
}


export const deleteEmail=async(req,res)=>{
    try{
        await email.deleteMany({_id:{$in:req.body}});
        return res.status(200).json('email is deleted');
        }
        catch(err){
            res.status(500).json(err.message);
            }
}