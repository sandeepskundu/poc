import schema from './schema';
import updateDatabase from './update-collection';
import createDatabase from './create-database';
import createCollection from './create-collection';
import dbListByMarchent from './database-list-by-marchent';
import collectionListByDbId from './collection-list-by-db-id';

export default {
    schema:schema,
    updateDatabase:updateDatabase,
    createDatabase:createDatabase,
    dbListByMarchent:dbListByMarchent,
    createCollection:createCollection,
    collectionListByDbId:collectionListByDbId
}