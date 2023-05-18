var express = require('express');
var router = express.Router();

const {
    getCompanyLogin,
    doCompanyLogin,
    getCompanySignup,
    createNewCompany,
    logout,
    geCompanytHomePage,
    getProfilePage,
    getCompanyUpdateForm,
    updateCompanyProfile,
    getNewJobForm,
    createNewJob,
    getCompanyJobsPage,
    getCompanyApplications,
    shortListApplication,
    acceptApplication,
    rejectApplication,

} = require("../controllers/company-controller")

//middleware for authentication
const checkCompany = require('../middleware/checkCompany')

router.route('/login').get(getCompanyLogin).post(doCompanyLogin)
router.route('/signup').get(getCompanySignup).post(createNewCompany);
router.route('/').get(geCompanytHomePage);
router.route("/logout").get(logout);
router.route("/profile").get(checkCompany, getProfilePage)
router.route("/update-company/:id").get(checkCompany, getCompanyUpdateForm).post(checkCompany, updateCompanyProfile);
router.route("/add-new-job").get(checkCompany, getNewJobForm).post(checkCompany, createNewJob)
router.route('/company-jobs/:id').get(checkCompany, getCompanyJobsPage);
router.route('/company-applications').get(checkCompany, getCompanyApplications);
router.route("/short-list/:id").get(checkCompany, shortListApplication);
router.route("/accept-application/:id").get(checkCompany, acceptApplication);
router.route("/reject-application/:id").get(checkCompany, rejectApplication);


module.exports = router;