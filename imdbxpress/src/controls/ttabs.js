import request from 'request';

class ttabs {
    getTtable(req, res) {
        // console.log(req.body);
        var options = {
            method: 'GET',
            url: 'https://rest.tsheets.com/api/v1/timesheets',
            qs:
            {
                modified_since: req.body.from
            },
            headers:
            {
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + req.params.acc
            }
        };

        request(options, function (error, response) {
            let body = JSON.parse(response.body);
            // for(let tem in body.re)
            //     console.log(tem + 'nana ' + body[tem]);
            var resjson = {};
            var usrs = [];
            Object.keys(body.supplemental_data.users).forEach(function (key) {
                usrs.push(body.supplemental_data.users[key]);
            });
            // console.log(usrs);
            var emps = JSON.parse(JSON.stringify(body.results.timesheets));
            for (let entry in emps) {
                let namval = '';
                namval = usrs.find((e) => e.id === emps[entry].user_id);
                // console.log(namval + ' ' + emps[entry].group_id);
                if (namval === undefined) {
                    namval = 'NA';
                } else {
                    namval = namval.first_name + ' ' + namval.last_name;
                }
                // console.log("coc :"+namval);
                let locdur='';
                if(parseInt(emps[entry].duration/3600) !== 0){
                    locdur += parseInt(emps[entry].duration/3600)+(parseInt(emps[entry].duration/3600)>1?' hrs':' hr');
                }
                if(emps[entry].duration%3600 !== 0){
                    locdur += ' ' + ((emps[entry].duration%3600)/60) + (((emps[entry].duration%3600)/60)>9?' mins':' min');
                }
                resjson[entry] = {
                    id: emps[entry].id,
                    name: namval,
                    note : emps[entry].notes,
                    dur : locdur,
                    date : emps[entry].date
                };
            }
            // console.log(JSON.stringify(resjson));
            res.json(resjson);
        });

    }
}

const ttab = new ttabs();
export default ttab;