const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const animalService = require('../services/animalService');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/catalog', async (req, res) => {
    const animal = await animalService.getAll();

    res.render('animal/catalog', { animal });
});

router.get('/search', async(req, res) => {
    res.render('animal/search');
});

router.get('/:animalId/details', async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId);

    const isOwner = animal.owner == req.user?._id;
    const isBuyer = animal.buyers.some(id => id == req.user?._id);

    res.render('animal/details', { animal, isOwner, isBuyer });
});

router.get('/:animalId/buy', isAuth, async (req, res) => {
    await animalService.buy(req.user._id, req.params.animalId);

    res.redirect(`/animal/${req.params.animalId}/details`);
});

router.get('/:animalId/edit', isAuth, async (req, res) => {
    const animal = await animalService.getOne(req.params.animalId);

    res.render('animal/edit', { animal });
});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalData = req.body;

    await animalService.edit(req.params.animalId, animalData);

    res.redirect(`/animal/${req.params.animalId}/details`);
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    await animalService.delete(req.params.animalId); 

    res.redirect('/animal/catalog');
});

router.get('/create', isAuth, (req, res) => {
    res.render('animal/create');
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = req.body;

    try {
        await animalService.create(req.user._id, animalData);
    } catch (error) {
        return res.status(400).render('animal/create', { error: getErrorMessage(error) });
    }



    res.redirect('/animal/catalog');
});

module.exports = router;