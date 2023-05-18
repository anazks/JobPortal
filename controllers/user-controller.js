const JobModel = require("../models/job-model")
const bcrypt = require("bcrypt")
const UserModel = require("../models/user-model")
const ApplicationModel = require("../models/application-model")


//signup
const getUserSignup = (req, res) => {
  let alertMessage = req.session.alertMessage
  res.render('user/signup', { title: "signup", alertMessage });
  delete req.session.alertMessage;
}
const createNewUser = async (req, res) => {
  // console.log(req.body)
  try {
    let oldpassword = req.body.password;
    req.body.password = await bcrypt.hash(oldpassword, 10); //encrypting the password from user and adding it to the req.body object
    console.log(req.body);
    const user = await UserModel.create(req.body);
    req.session.alertMessage = "Signup Comlpleted successfully"
    res.status(201).redirect("/login")
  } catch (error) {
    console.log(error);
    req.session.alertMessage = "Error in creating New User. Retry !!!!!";
    res.redirect('/signup')
  }
}
//login
const getUserLogin = (req, res) => {
  if (req.session.user) {
    res.redirect('/')
  } else {
    let alertMessage = req.session.alertMessage
    res.render('user/login', { title: "login", alertMessage });
    delete req.session.alertMessage;
  }
}
const doUserLogin = async (req, res) => {
  try {
    // console.log(req.body, req.body.password);
    let { password } = req.body;
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      const exist = await bcrypt.compare(password, user.password);
      if (exist) {
        req.session.user = user;
        req.session.alertMessage = "Logged In successfully";
        return res.redirect("/")
      }
    }
    req.session.alertMessage = "Invalid User Credentials";
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.session.alertMessage = "Error Occured. Please Retry !!!";
    res.redirect("/login")
  }
}
//home page
const getHomePage = function (req, res, next) {
  let { alertMessage } = req.session;
  if (req.session.user) {
    let { user } = req.session; //fetching user and alert message stored inn session
    res.render('user/home-page', { title: 'Job Portal', user, alertMessage });
    delete req.session.alertMessage;
  } else {
    res.render('user/home-page', { title: 'Job Portal', alertMessage });
    delete req.session.alertMessage;
  }
}
//logout
const logout = (req, res) => {
  req.session.user = null;
  req.session.alertMessage = "Logged Out Successfully!!!"
  res.redirect("/")
}
//profile
const getProfilePage = (req, res) => {
  let { user } = req.session
  res.render("user/profile", { user })
}
const getUpdateUserForm = (req, res) => {
  let { user } = req.session;
  res.render("user/update-profile", { id: req.params.id, user })
};
const updateUserProfile = async (req, res) => {
  // console.log(req.body);
  // console.log(req.files);
  try {
    let { id } = req.params;
    req.body.completed = true;
    const user = await UserModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if (user) {
      let { image, resume } = req.files;
      await image.mv("./public/images/users/profile/" + id + ".jpg");
      await resume.mv("./public/images/users/resume/" + id + ".pdf");
      req.session.user = user;
      req.session.alertMessage = "Updated Profile successfully"
      return res.redirect("/");
    }
    req.session.alertMessage = "Couldn't Update Retry"
    res.redirect("/")
  } catch (error) {
    console.log(error);
    req.session.alertMessage = "Couldn't Update Retry"
    res.redirect("/")
  }
};

const getJobsPage = async (req, res) => {
  const jobs = await JobModel.find({});
  //to calculate how many days ago the job was posted
  jobs.forEach((singleJob) => {
    // console.log(singleJob.datePosted);
    const posted = new Date(singleJob.datePosted)
    const today = new Date();
    const difference_in_time = today.getTime() - posted.getTime();
    singleJob.days_ago = Math.floor(difference_in_time / (1000 * 3600 * 24));
  });
  res.render("user/job-list", { jobs });
}
const getAllCompanies = (req, res) => {
};

const applyJob = async (req, res) => {
  console.log(req.body)
  let { _id: user_id,
    name: username,
    email: user_mail,
    phone_no: user_mobile
  } = req.session.user;
  const applicationObj = {
    job_id: req.params.id,
    company_id: req.body.company_id,
    user_id,
    username,
    user_mobile,
    user_mail,
    applyDate: new Date().toLocaleDateString()
  };
  console.log(applicationObj)
  try {
    const application = await ApplicationModel.create(applicationObj);
    req.session.alertMessage = "Applied To Job successfully !!!!"
    res.redirect("/")
  } catch (error) {
    console.log(error);
    req.session.alertMessage = "Couldn't apply !!! Please Retry."
    res.status(500).redirect("/user-jobs")
  }


};
// const getUserNotifications = (req, res) => {
// };
const getUserApplications = (req, res) => {
};
module.exports = {
  getHomePage,
  getUserLogin,
  getUserSignup,
  createNewUser,
  doUserLogin,
  getProfilePage,
  getUpdateUserForm,
  updateUserProfile,
  getJobsPage,
  getAllCompanies,
  applyJob,
  getUserApplications,
  logout
}
