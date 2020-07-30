//load images
async function load_json(){
    return fetch('./poor_mans_db.json')
        .then(res => res.json())
}

load_json()
    .then(res => {
        db = res;
        draw_all_art(res,0,25);
        pagination()
    });

function draw_all_art(db,first,last){
    let sliced_db = db.slice(first,last);
    sliced_db.forEach(item => {
        add_art(item)
    });
}

function add_art(item){
    // Add a single piece of art to the main body
    $('.col').append(`<img id="${item.id}" class="px-4 py-4 img-fluid" src="images/${item.file_name}" />`);
    $(`#${item.id}`).on('click',(e)=> {
        var id = this.event.target.id
        show_single_art(id)
    });

}

function show_single_art(item){
    // Empty the whole canvas
    $('.col').empty();
    add_art(item);
}

function pagination() {
    // calculate how many nav buttons are needed, use the rounded up number.
    const num_navbuttons = Math.ceil(db.length / 10);

    //  iteate and create buttons as needed.
    for (let i = 0; i < num_navbuttons; i++) {

        let pagebox = $('.pagination').append(`<button class="btn btn-primary">${i+1}</button>`);

        // Add event listener to the button as we create it.
        pagebox.on('click', function(event) {
            // when this button is clicked call the display page with the number written on this button as the argument to the function.
            let page = event.target.textContent;
            let list = db
            showPage(list, page);
        });
    }
}
