import { client } from '../../server'

var db = client.db('todo');

export function addElemenet(){
    db.collection('boards').insertOne({name: 'test'})
}