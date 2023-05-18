const checkUser = function (req, res, next) {
    if (!req.session.user) {
        req.session.alertMessage = "Please Login to Continue"
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = checkUser;