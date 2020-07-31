class Database{
    constructor(db){
        this.db = db;
    }

    all(){
        // Returns all items in the DB as an array
        return Object.values(this.db)
    }

    get(id){
        // Returns an item in DB by id 
        try{
            return this.db[id]
        }catch{
            return null;
        }
    }

    get_by_artist(artist_id){
        // Returns all items by artist_id 
        let result = this.all().filter(item => item.Artist==artist_id)
        return result
    }

    get_all_artists(returnval='id'){
        // Returns a list of all artists in the DB, 

        let unique;
        if (returnval==='id'){
            unique = [...new Set(this.all().map(item => item.Artist))]; // [ 'A', 'B']
        }else if (returnval==='both') {

            let ids   =[...new Set(this.all().map(item => item.Artist))]; // [ 'A', 'B']
            let names =[...new Set(this.all().map(item => item.Artist_name))]; // [ 'A', 'B']
            unique = ids.map( (id,index) => {
                return [id,names[index]];    
            });
        }else{
            unique = [...new Set(this.all().map(item => item.Artist_name))]; // [ 'A', 'B']
        }

        return unique;

    }
}
