const checkCompany = function (req, res, next) {
    if (!req.session.company) {
        res.redirect('/company/login');
    } else {
        next();
    }
}

module.exports = checkCompany;