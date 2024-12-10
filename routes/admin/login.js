var express = require ('express');
var router = express.Router();

router.get('/', function (req, res, next){
    res.render ('admin/login', {
        layout: 'admi/layaout'
    });
});

module.exports = router;