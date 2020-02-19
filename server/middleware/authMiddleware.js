module.exports = {

  usersOnly: (req, res, next) => {
    if(req.session.user) {
      next()
    } else {
      res.status(401).send('Please log in')
    }
  },

  adminsOnly: (req, res, next) => {
    if(!req.session.user.isAdmin) {
      res.status(403).send('You do not have admin access')
    } else {
      next()
    }
  }
  
}