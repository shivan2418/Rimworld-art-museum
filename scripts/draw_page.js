function draw_all_art(db,first,last){
    let sliced_db = db.slice(first,last);
    sliced_db.forEach(item => {
        render_art_list(item)
    });
}
function render_art_list(art){
    // Renders an piece of art in a list with link to the detailed view
    $('.col').append(`<a href=art.html?art_id=${art.id}><img id="${art.id}" class="mx-1 my-1 px-3 py-3 img-thumbnail art-thumbnail" width="400" height="400" src="images/${art.file_name}" /></a>`);
  
}

function render_art_detailed(art){
    // Renders a piece of art for the detail view
    $('.art_title').first().html(art.title);
    $('.art_image').first().attr('src',`images/${art.file_name}`)
    $('.art_details').first().html(`
    <ul>
        <li class=mr-2>
            <a href=http://reddit.com/user/${art.Artist_name}>${art.Artist_name}</a>  
        </li>
        <li class=mr-2>
            <a href=http://reddit.com${art.permalink}>Original Post (${art.upvotes} upvotes)</a>
        </li>
        <li class=mr-2>
            <a href=artist.html?artist_id=${art.Artist}>All by ${art.Artist_name}</a>
        </li>
    </ul>`)

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
