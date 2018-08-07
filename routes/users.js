var express = require('express');
var router = express.Router();

var UsersModel = require('../schema/user');
var Response = require('../response');

router.get('/get-all-users-api', function(req, res, next) {
    UsersModel.find({}, function(err, posts) {
        if (err) {
            Response.errorResponse(err, res);
        } else {
            Response.successResponse('User Listing!', res, posts);
        }
    });

});

router.post('/add-users-api', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile
    }
    var data = UsersModel(mybodydata);
    //var data = UsersModel(req.body);
    data.save(function(err) {
        if (err) {
            Response.errorResponse(err, res);
           
        } else {

            Response.successResponse('User Added!', res, {});
        }
    })
});


/* GET SINGLE POST BY ID */
router.get('/get-users-details-api/:id', function(req, res, next) {
  UsersModel.findById(req.params.id, function (err, post) {
    if(err){
      Response.errorResponse(err,res);
  }else{
      Response.successResponse('User Detail!',res,post);
  }
  });
});

/* DELETE POST BY ID */
router.delete('/delete-users-api', function(req, res, next) {
  UsersModel.findByIdAndRemove(req.body._id, function (err, post) {
    if (err) {
      Response.errorResponse(err,res);
    } else {
      Response.successResponse('User deleted!',res,{});
    }
  });
});

/* UPDATE POST */
router.post('/update-users-api', function(req, res, next) {
  console.log(req.body._id);
  UsersModel.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
  if (err) {
    Response.errorResponse(err,res);
  } else {
    Response.successResponse('User updated!',res,{});
  }
});
});









//List Table Data
router.get('/display', function(req, res) {
    UsersModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('display-table', { users: users });
            console.log(users);
        }
    });
});


//Display Form 
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


/* POST Data. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_mobile: req.body.user_mobile
    }
    var data = UsersModel(mybodydata);
    //var data = UsersModel(req.body);
    data.save(function(err) {
        if (err) {

            res.render('add-form', { message: 'User registered not successfully!' });
        } else {

            res.render('add-form', { message: 'User registered successfully!' });
        }
    })
});

/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
    UsersModel.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {

            req.flash('error_msg', 'Record Not Deleted');
            res.redirect('../display');
        } else {

            req.flash('success_msg', 'Record Deleted');
            res.redirect('../display');
        }
    });
});


/* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    UsersModel.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { userDetail: user });
        }
    });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
    UsersModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            req.flash('error_msg', 'Something went wrong! User could not updated.');
            res.redirect('edit/' + req.params.id);
        } else {
            req.flash('success_msg', 'Record Updated');
            res.redirect('../display');
        }
    });
});

module.exports = router;
