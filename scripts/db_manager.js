class Database{
    constructor(db){
        this.db = db;
    }

    all(){
        return Object.values(this.db)
    }

    get(id){
        try{
            return this.db[id]
        }catch{
            return null;
        }
    }

    get_by_artist(artist_id){
        let result = this.all().filter(item => item.Artist===artist_id)
        return result
    }

    get_all_artists(by='id'){

        let unique;
        if (by==='id'){
            unique = [...new Set(this.all().map(item => item.Artist))]; // [ 'A', 'B']
        }else{
            unique = [...new Set(this.all().map(item => item.Artist_name))]; // [ 'A', 'B']
        }

        return unique;

    }
}

