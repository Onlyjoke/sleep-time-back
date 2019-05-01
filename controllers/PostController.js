const PostModel = require('../models/PostModel');

class PostController {
    index(req, res) {
        PostModel.find()
            .then((err, data) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(data);
            })
            .catch((err) => res.json(err));
    }

    create(req, res) {
        const data = req.body;

        const time = new PostModel({
            action: data.action
        });

        time.save()
            .then(() => {
                res.json({status: 'ok'});
            })
            .catch((err) => res.json(err));
    }

    read(req, res) {
        PostModel.findOne({_id: req.params.id})
            .then(item => {
                if (!item) {
                    res.send({error: 'not found'});
                } else {
                    res.json(item);
                }
            })
            .catch((err) => res.json(err));
    }

    update(req, res) {
        PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, result) => {
            if (err) {
                res.send(err);
            }

            result.createdAt = req.body.createdAt;
            result.markModified('createdAt');
            result.save();

            res.json({status: 'updated'});
        });
    }

    delete(req, res) {
        PostModel.remove({_id: req.params.id})
            .then(item => {
                if (item) {
                    res.json({status: 'deleted'});
                } else {
                    res.json({status: 'error'});
                }
            })
            .catch((err) => res.json(err));
    }
}

module.exports = PostController;
