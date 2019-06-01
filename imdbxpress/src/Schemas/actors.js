import { Schema, model } from 'mongoose';

const actorSchema = Schema({
    "name" : String,
    "sex" : String,
    "dob" : String,
    "bio" : String
});

export default model('actor',actorSchema,'actors');