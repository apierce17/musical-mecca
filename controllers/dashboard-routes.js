const router = require('express').Router();

// route for user's dashboard
router.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = true;
        hbsContent.userName = req.session.user.username;
        hbsContent.title = "You are loggen in";
        //res.sendFile(__dirname + '/public/dashboard.html');
        res.render('index', hbsContent);
    } else {
        res.redirect('/login');
    }
})

// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        hbsContent.loggedin = false;
        hbsContent.title = "You are logged out!";
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;