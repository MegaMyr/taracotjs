var express = require('express');
var router = express.Router();
var renderer = require('../../core/renderer');
var auth = require('../../core/auth');
var config = require('../../config');
var path = require('path');
var crypto = require('crypto');
var cp = require('./cp');

var i18nm = new (require('i18n-2'))({    
    locales: config.locales,
    directory: path.join(__dirname, 'lang'),
    extension: '.js'
});

router.get('/', function(req, res) {
	// Check authorization
	if (!auth.check(req)) {
		res.redirect(303, "/auth?rnd=" + Math.random().toString().replace('.', ''));
		return;
	}
	i18nm.setLocale(req.i18n.getLocale());
	var body = i18nm.__("taracot_dashboard");
	cp.render(req, res, { body: body }, i18nm, 'dashboard' );
});

module.exports = router; 