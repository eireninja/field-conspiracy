import { html } from 'https://unpkg.com/lit-html?module';
import { getArtistById } from '../api/data.js';
import { deleteArtist } from '../api/data.js';

const detailsTemplate = (data, onDelete, ctx) => html `
<section id="artistDetails">
    <div class="imgAndName">
        <h1>${data.name}</h1>
        <img src=${data.img} alt="artistImg" />
    </div>
    <article class="artistDescription">
        <textarea readonly id = 'descToPass'>
            ${data.description}
        </textarea>

        <div class="artistSocial">
            ${data.bandcamp ? html`<a href=${data.bandcamp} target="_blank"><i class="fab fa-bandcamp"></i></a>` : html``}
            ${data.soundcloud ? html`<a href=${data.soundcloud} target="_blank"><i
                    class="fab fa-soundcloud"></i></a>` : html``}
            ${data.spotify ? html`<a href=${data.spotify} target="_blank"><i class="fab fa-spotify"></i></a>` : html``}
            ${data.youtube ? html`<a href=${data.youtube} target="_blank"><i class="fab fa-youtube"></i></a>` : html``}
            ${data.facebook ? html`<a href=${data.facebook} target="_blank"><i class="fab fa-facebook"></i></a>` : html``}
            ${data.instagram ? html`<a href=${data.instagram} target="_blank"><i
                    class="fab fa-instagram"></i></a>` : html``}
            ${data.resident ? html`<a href=${data.resident} target="_blank"><img class="fab" src="/assets/raIcon.png"
                    alt=""></a>` : html``}
        </div>

        ${data.embed1 ? html`
        <iframe
            width="100%"
            height="266px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed1}
        >
        </iframe>
        ` : ""}
    
        ${data.embed2 ? html`
        <iframe
            style = "margin-top:20px;"
            width="100%"
            height="120px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed2}
        ></iframe>
         ` : ""}

         ${data.embed3 ? html`
         <iframe
            style = "margin-top:20px;"
            width="100%"
            height="120px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed3}
        ></iframe>
         ` : ""}

         ${data.embed4 ? html`
         <iframe
            style = "margin-top:20px;"
            width="100%"
            height="120px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed4}
        ></iframe>
         ` : ""}

         ${data.embed5 ? html`
         <iframe
            style = "margin-top:20px;"
            width="100%"
            height="120px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed5}
        ></iframe>
         ` : ""}

         ${data.embed6 ? html`
         <iframe
            style = "margin-top:20px;"
            width="100%"
            height="120px"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src=${data.embed6}
        ></iframe>
         ` : ""}


        

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        <div class="adminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="editButton" href="/edit/${ctx.params.id}">Edit</a>
            <button @click=${onDelete} href='javascript:void(0)' class="deleteButton">Delete</button>`
            : 
            html``}
        </div>
    </article>
</section>
`;

export async function detailsPage(ctx) {
    
    const data = await getArtistById(ctx.params.id);
    ctx.render(detailsTemplate(data, onDelete,ctx));
    

    async function onDelete() {
        const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteArtist(ctx.params.id);
            ctx.page.redirect('/artists');
        }
    }
}