import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendEmail from '../utils/email.js';

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

export const acceptApplication = async (req, res) => {
    try {
      const { applicantId, jobId } = req.body;
  
      // Find applicant and job details (populate them if needed)
      const applicant = await User.findById(applicantId);
      const job = await Job.findById(jobId);
  
      // Send email notification
      const emailSubject = `Your application for ${job.title} was accepted`;
      const emailBody = `Hi ${applicant.name},\n\nThe recruiter has accepted your application for the position of ${job.title}. Please join the chat for further discussion.`;
  
      await sendEmail(applicant.email, emailSubject, emailBody);
  
      // Respond back
      res.status(200).json({ message: 'Applicant notified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error notifying applicant' });
    }
  };


// export const updateStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const applicationId = req.params.id;

//         if (!status) {
//             return res.status(400).json({
//                 message: 'Status is required',
//                 success: false
//             });
//         }

//         // Find the application by applicantion id
//         const application = await Application.findOne({ _id: applicationId });
//         if (!application) {
//             return res.status(404).json({
//                 message: 'Application not found.',
//                 success: false
//             });
//         }

//         // Save the previous status before updating
//         const previousStatus = application.status;

//         // Update the status
//         application.status = status.toLowerCase();
//         await application.save();

//         // Send email notification if the status has been updated to Accepted or Rejected
//         if (status.toLowerCase() === 'accepted' || status.toLowerCase() === 'rejected') {
//             await sendEmail(application.applicantEmail, status);
//         }

//         return res.status(200).json({
//             message: 'Status updated successfully.',
//             success: true
//         });

//     } catch (error) {
//         console.error('Error updating status:', error);
//         return res.status(500).json({
//             message: 'An error occurred while updating the status.',
//             success: false
//         });
//     }
// };
  