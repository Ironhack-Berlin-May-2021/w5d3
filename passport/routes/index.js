const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// create a middleware to check if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    // is there a logged in user - using passport you can use req.isAuthenticated()
    if (req.isAuthenticated()) {
      // proceed as intended
      next();
    } else {
      // there is no user logged in
      // we redirect to /login
      res.redirect('/login');
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  console.log(req.user);
  res.render("index", { user: req.user });
});

router.get('/profile', loginCheck(), (req, res, next) => {

  // using passport the user is now in : req.user
  const loggedInUser = req.user
  res.render('profile', { user: loggedInUser });
});

module.exports = router;
