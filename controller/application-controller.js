const applicationSchema = require('../schema/application-schema');
const userSchema = require('../schema/user-schema');
const applicationJSON = require('../default-data/application');

(async () => {
    let total = await applicationSchema.countDocuments().exec();
    if (!total) {
        applicationSchema.insertMany(applicationJSON).then(()=>{
            console.log("application inserted");
        }).catch((err)=>{
            console.loog("error", err);
        })
    }
  
  })().catch(err => {
    console.error(err);
  });


exports.updateApplicationStatus = async (req, res, next)=>{
    try{
        const { date, request_id, status, recieved_from } = req.body;
        const applicationData = await applicationSchema.findOne({'_id':request_id}).lean().exec();
        if(applicationData){

            const userData = await setUser(recieved_from);
            console.log('userData',userData);

            const data = {
                status : !status,
                recieved_from: userData._id
            }

            if(!status){
                data['outage_end_time'] = date;
            }else{
                data['outage_start_time']= date;
            }

            const result = await applicationSchema.updateOne({'_id': request_id},{$set: data}).exec();
            if(result){
                return res.status(200).success(result, `Application outage ${status ? 'started' : 'stopped'}`);
            }else{
                return res.status(400).error('Something went wrong!');
            }
        }else{
            return res.status(404).error('Application not found!');
        }

    }catch(error){
        return next(error);
    }
};

exports.getApplications = async (req, res, next)=>{
    try{
        const applications = await applicationSchema.find({})
        .populate('recieved_from')
        .lean().exec();
        console.log("application list", applications)
        return res.status(200).success(applications.length ? applications : [], 'Application list');
    }catch(error){
        return next(error);
    }
}

async function setUser(user_name){
    try{
        const userData = await userSchema.findOne({'user_name':user_name}).lean().exec();
        if(!userData){
            const data = new userSchema({
                user_name: user_name
            });

            const result = await data.save();
            if(result){
                const updatedUserData = await userSchema.findOne({'user_name': user_name}).lean().exec();
                return updatedUserData;
            }
        }else{
            return userData;
        }
    }catch(error){
        return next(error);
    }
} 