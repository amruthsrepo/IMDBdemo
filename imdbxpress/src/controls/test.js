import Prj from '../Schemas/Project';

class Tests{
    runm(req,res){
        // console.log('Here');
        // console.log(DB.listCollections().toArray());
        console.log(Prj.db.name);
        
        let tm;
        Prj.find(function(err,doc){
            console.log(JSON.stringify(doc));
            res.json(doc);
        });

        // for(let item in tm) {
        //   console.log(item);
        // }
        // console.log(tm)
    }
}

export default new Tests();