class CRUDRepository {

    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        return await this.model.findOne({where: {id: id}});
    }

    async findAllByUserId(userId) {
        return await this.model.findAll({where: {userId: userId}});
    }

    async saveNew(object) {
        let objectToSave = new this.model(object);
        return await objectToSave.save();
    }

    async destroy(object) {
        return await object.destroy();
    }

    async destroyById(id) {
        let objectToDestroy = await this.findById(id);
        return await objectToDestroy.destroy();
    }

    async update(object) {
        return await object.save();
    }
}

export {CRUDRepository};