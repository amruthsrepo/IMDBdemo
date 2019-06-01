import request from 'request';

class acck {
    getAccessKey(req, response) {
        let ack;
        let usnam;
        let purl;
        request.post({
            uri: 'https://rest.tsheets.com/api/v1/grant',
            formData:
            {
                grant_type: 'authorization_code',
                client_id: '937492b91fa24cd2b5af8bc147e05950',
                client_secret: 'b58d4d8b6a7643ddabda811bb660c2aa',
                code: req.params.id,
                redirect_uri: 'http://www.mydope.work:3000/home'
            }
        }, function (err, res) {
            ack = JSON.parse(res.body);
            ack = ack.access_token;
            // console.log(ack);
            var options = {
                method: 'GET',
                url: 'https://rest.tsheets.com/api/v1/current_user',
                headers:
                    { 'Authorization': 'Bearer '+ack }
            };
    
            request(options, function (error, res, body) {
                if (error) throw new Error(error);
                body = JSON.parse(body);
                if(body.results === undefined)    return;
                for(let i in body.results.users){
					if(body.results.users[i]["company_name"] !== "Doppio Group")	response.json({error :"error"});
                    usnam = body.results.users[i].first_name + ' ' + ((body.results.users[i].last_name==='Unknown')?'':body.results.users[i].last_name);
                    purl = body.results.users[i].profile_image_url;
                }
                let resjson = {
                    acck : ack,
                    name : usnam,
                    img : purl
                }
        
                console.log(resjson);
                response.json(resjson);
            });
        });

        
    }
}

const ack = new acck();

export default ack;