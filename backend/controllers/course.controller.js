import Course from '../models/course.model.js';

export const getCourse = async (req,res)=>{
    try{
        const course = await Course.find({})
            .populate('category','name')
            .populate('instructor','name');
        return res.status(200).json(course);
    }
    catch(error)
    {
        return res.status(400).json({message:"course not found"});
    }
}

export const getCourseById = async(req,res) => {
    try{
        const course = await Course.findById(req.params.id)
            .populate('category','name')
            .populate('instructor','name');
        if(!course)
        {
            return res.status(404).json({message:"Course Not Found"});
        }
        return res.status(200).json(course);

    }
    catch(error)
    {
        return res.status(500).json({message:"course Not Cound"});
    }
}