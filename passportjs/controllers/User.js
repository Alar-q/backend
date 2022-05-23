exports.login_form = (req, res) => {
	res.render('auth/login_form');
};

exports.register_form = (req, res) => {
	res.render('auth/register_form');
};

exports.patch_form = (req, res) => {
	res.render('auth/patch_form');
};

exports.delete_form = (req, res) => {
	res.render('auth/delete_form');
};

exports.logout = (req, res) => {
	req.logout(()=>{});
	res.redirect('/');
};
