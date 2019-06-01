import Prj from '../Schemas/actors';
import request from 'request';
var rp = require('request-promise');

class Projinit {
    getuninit(req, res) {
        // console.log(Prj.db.collection('projects'));
        var options = {
            method: 'GET',
            url: 'https://rest.tsheets.com/api/v1/jobcodes',
            qs: { active: 'true' },
            headers:
            {
                Authorization: 'Bearer ' + req.params.acc
            }
        };

        var resjson = {};
        let lent=1;


        rp(options, function (error, response, body) {
            // console.log(response.body);
            body = JSON.parse(body);
            var loc = [];
            var jobcodes = JSON.parse(JSON.stringify(body.results.jobcodes));
            lent = Object.keys(jobcodes).length;
            for (let jc in jobcodes) {
                // console.log(jc);
                Prj.findOne({
                    "Job Code": jc
                }).then(function (doc) {
                    if (doc !== null) {
                        // console.log('fin', jc);
                    }
                    else {
                        resjson[jc] = {
                            id: jobcodes[jc].id,
                            name: jobcodes[jc].name
                        };
                    }
                    lent-=1;
                    if(lent===0){
                        res.json(resjson);
                    }
                });
            }
        });
    }
}

export default new Projinit();