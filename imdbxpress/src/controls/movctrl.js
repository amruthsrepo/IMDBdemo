import mov from '../Schemas/movies'
import act from '../Schemas/actors'
import pro from '../Schemas/producers'
var fs = require('fs')
import pos from '../Schemas/posters'
var formidable = require('formidable')


class movctrl {
    getmovs(req, res) {
        mov.find(
            async function (err, doc1) {
                if (doc1 === null || doc1 === undefined) {
                    res.json({ error: 'No Entries' })
                    return
                }
                let doc = JSON.parse(JSON.stringify(doc1))
                doc.push({})
                let lent = Object.keys(doc).length
                for (let item in doc) {

                    if(doc[item]['name']===undefined)   {
                        setTimeout(() => {
                            doc.pop()
                            res.json(doc)

                        }, 500);
                    }

                    else {let actors = doc[item]['actrs']
                    doc[item]['act'] = []
                    for (let ar of actors) {
                        await act.findOne({
                            _id: ar
                        }, function (err, res) {
                            if(res !== null)
                                doc[item]['act'].push(res)
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
                        let nt = post
                        await pos.findOne({
                            _id: post
                        }, await function (err, res) {
                            doc[item]['post'] = res['img']
                        })
                    }}

                }
            })
    }


    addmov(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
            let f = files[Object.keys(files)[0]]
            // console.log(fs.readFileSync(f.path))
            // console.log(fields)
            // console.log(f.name)

            mov.find({
                'name': fields['name'],
                'yor': parseInt(fields['yor'])
                }).then(async function (doc) {
                // console.log(doc)
                if (doc.length > 0) {
                    // console.log(doc)
                    res.json({ err: 'Redundant mov' })
                } else {
                    var newimg = new pos
                    newimg.img.data = await fs.readFileSync(f.path)
                    newimg.img.contentType = 'image/jpeg'
                    newimg.save(function(err,cre) {
                        // console.log(cre.id)
                        mov.create({
                            name : fields.name,
                            yor : fields.yor,
                            plot : fields.plot,
                            poster : cre.id,
                            prod : fields.prod,
                            actrs : fields.actors.split(',')
                        }).then(res.json({msg : 'Success'}))
                    })
                }
            })
        })
    }
}

export default new movctrl()