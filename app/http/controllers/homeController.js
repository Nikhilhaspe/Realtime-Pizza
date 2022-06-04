function homeController() {
    return {
        index(req, res) {
            res.render('home.ejs');
        }
    }
};

module.exports = homeController;