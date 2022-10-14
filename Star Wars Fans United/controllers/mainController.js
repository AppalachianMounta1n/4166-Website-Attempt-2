exports.home = (req, res) => {
    res.render('index.ejs');
};

exports.contact = (req, res) => {
    res.render('contact.ejs');
};

exports.about = (req, res) => {
    res.render('about.ejs');
};