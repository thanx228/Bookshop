const router = require("express").Router();
const fileHandler = require('../lib/fileHandler');
const dao = require('../dao/main_dao');

function initQuantity(products) {
    const result = []

    products.forEach(product => {
        product['quantity'] = 1;
        result.push(product)
    })

    return result;
}

router.get("/api/all-books", async (req, res) => {
    const allBooks = await dao.getAllBooks();
    const result = initQuantity(allBooks);

    return res.status(200).send(result);
});

router.get("/api/test", async (req, res) => {
    const result = await dao.getAllBooks();

    return res.status(200).send(result);
});

router.post('/api/signin', async (req, res) => {
    const username = req.body.userData.name;
    const password = req.body.userData.password;
    const user = fileHandler.getUser(username, password)

    if (user) {
        console.log(`[SIGN-IN] Welcome ${username}!`)
        return res.status(200).send({user, isAuthenticated: user});
    } else {
        return res.status(404).send(`[SIGN-IN] Wrong Username || Password!`);
    }

});

router.post('/api/registration', async (req, res) =>{
    const userData = req.body;

    try {
        const result = await dao.registerUser(userData);
        return res.status(200).send(result);
    } catch (error) {
        console.log(`[ROUTER-REGISTER] Error!`);
        console.log(error);
        return res.status(400);
    }
})


// Basket

router.post('/api/checkout', async (req, res) =>{
    const username = req.body.username;
    const products = req.body.products;

    try {
        const result = await dao.checkout(username, products);
        return res.status(200).send(result);
    } catch (error) {
        console.log(`[ROUTER-REGISTER] Error!`);
        console.log(error);
        return res.status(400);
    }
})


// Wishlist

router.post("/api/wishlist", async (req, res) => {
    const username = req.body.username;

    try {
        const products = await dao.getWishlistProducts(username);
        const result = initQuantity(products);
        return res.status(200).send(result);
    } catch (e) {
        console.log(e)
    }
});

router.post("/api/wishlist/add", async (req, res) => {
    const username = req.body.username;
    const product = req.body.product;

    try {
        const result = await dao.addProductIDToWishlist(username, product);
        return res.status(200).send(result);
    } catch (error) {
        console.log(`[ROUTER-WISHLIST-ADD] Error!`);
        console.log(error);
        return res.status(400);
    }
});

router.post("/api/wishlist/remove", async (req, res) => {
    const username = req.body.username;
    const product = req.body.product;

    fileHandler.removeProductFromWishlist(username, product);

    return res.status(200).send(`[DB-WISHLIST] Removed '${product.title}'`);
});



router.get('/api/product/:productTitle', async (req, res) => {
    const productTitle = req.params.productTitle;
    const product = fileHandler.getProductByTitle(productTitle)

    return res.status(200).send(product);
});

router.get('/api/profile', (req, res) => {
    return res.status(200).send("Working properly")
})

module.exports = router;
