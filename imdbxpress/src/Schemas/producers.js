import { Schema, model } from 'mongoose';

const producerSchema = Schema({
    "name" : String,
    "sex" : String,
    "dob" : String,
    "bio" : String
});

export default model('producer',producerSchema,'producers');