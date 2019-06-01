import express from 'express';
var app = express();
import multer from 'multer';
import formidable from 'formidable'
var http = require('http');
var XLSX = require('xlsx');
import invoice from '../Schemas/movies'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Invoices')
    },
    filename: function (req, file, cb) {
        cb(null, (Date.now() + '-' + file.originalname))
    }
})

var upload = multer({ storage: storage }).single('file')

class InvoiceUpd {
    newinvoices(req, res) {
        // console.log('called')
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
        })

        var form = new formidable.IncomingForm();
        form.parse(req,async function (err, fields, files) {
            var f = files[Object.keys(files)[0]];
            var wb = XLSX.readFile(f.path);
            // console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1}))
            let xljson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:2})
            let numc = 0;
            for(let row of xljson) {
                // numc += 1;
                // if(row.Name === 'IP Corporation')  console.log(row)
                if((row['Project ID'] === undefined))     {
                    // console.log(row);
                }
                await invoice.findOne({
                    Num : row.Num
                }).then(function(doc){
                    // console.log(doc);
                    if((doc === undefined)||(doc === null)){
                        invoice.create(row)
                        numc += 1;
                        console.log(numc,'c')
                    } else if (doc.length === 0) {
                        invoice.create(row)
                        numc += 1;
                        console.log(numc,'c')
                    } else {
                        invoice.findOneAndUpdate({
                            Num : row.Num
                        },{
                            Date: row.Date,
                            'Transaction Type': row['Transaction Type'],
                            Name: row.Name,
                            'Due Date': row['Due Date'],
                            Amount: row.Amount,
                            'Open Balance': row['Open Balance'],
                            'Project ID': row['Project ID']
                        },function(err,doc){
                            if(err) console.log(err)
                        })
                        // numc += 1;
                        // if(row.Name === 'IP Corporation')  {
                        //     numc += 1;
                        //     console.log(row)
                        //     console.log(numc,'u')}
                    }
                })
            }

        })
    }
}

export default new InvoiceUpd()