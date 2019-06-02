import mov from '../Schemas/movies'
import act from '../Schemas/actors'
import pro from '../Schemas/producers'
import pos from '../Schemas/posters'


class proctrl {
    getpros(req, res) {
        pro.find(
            async function (err, doc) {
                if (doc === null || doc === undefined) {
                    res.json({ error: 'No Entries' })
                    return
                }
                res.json(doc)
            })
    }

    addpro(req, res) {
        pro.find({
            'name': req.body.name,
            'dob': req.body.dob,
        }).then(async function (doc) {
            // console.log(doc)
            if (doc.length > 0) {
                // console.log(doc)
                res.json({ err: 'Redundant' })
            } else {
                pro.create(req.body)
                    .then(res.json({msg: 'Success'}))
            }
        })
    }
}

export default new proctrl()