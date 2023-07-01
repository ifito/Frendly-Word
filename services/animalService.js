const Animal = require('../models/Animal');

exports.getAll = () => Animal.find({}).lean();

exports.getOne = (animalId) => Animal.findById(animalId).lean();

exports.buy = async (userId, animalId) => {
    const animal = await Animal.findById(animalId);
    animal.buyers.push(userId);
    
    return animal.save();
}

exports.create = (ownerId, animalData) => Animal.create({ ...animalData, owner: ownerId });

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);