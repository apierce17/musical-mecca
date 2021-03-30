const router = require('express').Router();

// route for home-page
router.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});

//route for signup
router.route('/signup')
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/signup.html');
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        User.create ({
            username: req.body.username,
            password: req.body.password,
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

// route for user login
router.route('/login')
    .get((req, res) => {
        //res.sendFile(__dirname + '/public/login.html');
        res.render('login', hbsContent);
    })
    .post((req, res) => {
        var username = req.body.username;
        var password = req.body.password;

        User.findOne({ where: {username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login');
            } else if (!user.validPassword(password)) {
                res.redirect('/login');
            } else {
                req.session.user = user.dataValues;
                res.redirect('/dashboard');
            }
        });
    });

module.exports = router;
