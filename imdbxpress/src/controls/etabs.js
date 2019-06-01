import request from 'request';

class ptabs {
    getEtable(req, res) {
        var options = {
            method: 'GET',
            url: 'https://rest.tsheets.com/api/v1/users',
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
            var etyp = [];
            Object.keys(body.supplemental_data.groups).forEach(function (key) {
                etyp.push(body.supplemental_data.groups[key]);
            });
            // console.log(etyp);
            var emps = JSON.parse(JSON.stringify(body.results.users));
            for (let usr in emps) {
                let typval ='';
                if (usr.group_id === '0') {
                    typval = 'NA';
                } else {
                    typval = etyp.find((e) => e.id === emps[usr].group_id);
                    // console.log(typval + ' ' + emps[usr].group_id);
                    if (typval === undefined) {
                        typval = 'NA';
                    } else {
                        typval = typval.name;
                    }
                }
                let namvar;
                if(emps[usr].last_name === 'Unknown'){
                    namvar = emps[usr].first_name;
                }   else {
                    namvar = emps[usr].first_name + ' ' + emps[usr].last_name;
                }
                // console.log("coc :"+typval);
                resjson[usr] = {
                    id: emps[usr].id,
                    name: namvar,
                    type : typval
                };
            }
            // console.log(JSON.stringify(resjson));
            res.json(resjson);
        });

    }
}

const ptab = new ptabs();
export default ptab;