import mov from '../Schemas/movies'
import act from '../Schemas/actors'
import pro from '../Schemas/producers'
var request = require("request")
var fs = require('fs')
import pos from '../Schemas/posters'


class movctrl {
    getmovs(req, res) {
        mov.find(
            async function (err, doc1) {
                if (doc1 === null || doc1 === undefined) {
                    res.json({ error: 'No Entries' })
                    return
                }
                let doc = JSON.parse(JSON.stringify(doc1))
                let lent = Object.keys(doc).length
                for (let item in doc) {

                    let actors = doc[item]['actrs']
                    doc[item]['act'] = []
                    for (let ar of actors) {
                        await act.findOne({
                            _id: ar
                        }, function (err, res) {
                            doc[item]['act'].push(res['name'])
                        })
                    }

                    let prod = doc[item]['prod']
                    if (prod !== undefined) {
                        await pro.findOne({
                            _id: prod
                        }, function (err, res) {
                            doc[item]['pro'] = res['name']
                        })
                    }

                    let post = doc[item]['poster']
                    if (post !== undefined) {
                        console.log('')
                        await pos.findOne({
                            _id: post
                        }, function (err, res) {
                            doc[item]['post'] = res['buf']
                        })
                    }

                    lent -= 1
                    if (lent === 0) res.json(doc)
                }
            })
    }


    updateproj(req, res) {
        Prj.findOneAndUpdate({
            'Project ID': req.body.pid
        }, req.body).then(function () {
            res.json({ msg: 'Success' })
        })
    }

    addmov(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            let f = files[Object.keys(files)[0]]
            // console.log(fs.readFileSync(f.path))
            console.log(fields)

            mov.find({
                'name': fields['name'],
                'yor': parseInt(fields['yor'])
            }).then(async function (doc) {
                // console.log(doc)
                if (doc.length > 0) {
                    // console.log(doc)
                    res.json({ err: 'Redundant mov' })
                } else {
                    pos.create({buf: fs.readFileSync(f.path)})
                    .then(cre => {
                        console.log(cre['_id'].toString())
                        mov.create({
                            name : fields.name,
                            yor : fields.yor,
                            plot : fields.plot,
                            poster : cre['_id'].toString(),
                            prod : fields.prod,
                            actrs : fields.actors.split(',')
                        })
                    })
                }
            })
        })
    }
}

export default new movctrl()