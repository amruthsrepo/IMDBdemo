import { Schema, model } from 'mongoose';

const movieSchema = Schema({
    name : String,
    yor : Number,
    plot : String,
    poster : {type : Schema.Types.ObjectId, ref : 'posters'},
    prod : {type : Schema.Types.ObjectId, ref : 'producers'},
    actrs : [{type : Schema.Types.ObjectId, ref : 'actors'}]
});

export default model('movie', movieSchema, 'movies');