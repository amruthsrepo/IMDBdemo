import request from 'request';

class ptabs {
    getPtable(req, res) {
        var options = {
            method: 'GET',
            url: 'https://rest.tsheets.com/api/v1/jobcodes',
            qs: { active: 'true' },
            headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + req.params.acc
            }
        };

        request(options, function (error, response, body) {
            // console.log(response.body);
            body = JSON.parse(body);
            var resjson = {};
            var loc = [];
            Object.keys(body.supplemental_data.locations).forEach(function (key) {
                loc.push(body.supplemental_data.locations[key]);
            });
            var jobcodes = JSON.parse(JSON.stringify(body.results.jobcodes));
            for (let jc in jobcodes) {
                let locval = jobcodes[jc].locations.map((item) => loc.find((e) => e.id === item));
                if(locval[0] === undefined){
                    locval = 'NA';
                }else{
                    let finloc ='';
                    for(let lc in locval){
                        finloc = finloc+locval[lc].city+', '+locval[lc].country;
                    }
                    locval = finloc;
                }
                // console.log("coc :"+locval);
                resjson[jc] = {
                    id: jobcodes[jc].id,
                    name: jobcodes[jc].name,
                    location: locval
                };
            }
            // console.log(JSON.stringify(resjson));
            res.json(resjson);
        });
    }
}

const ptab = new ptabs();
export default ptab;