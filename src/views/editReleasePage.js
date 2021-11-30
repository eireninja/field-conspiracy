import { html } from "https://unpkg.com/lit-html?module";
import { getReleaseById } from "../api/data.js";
import { editRelease } from "../api/data.js";

const editReleaseTemplate = (data, onSubmit) => html`
    <section id="editArtistSection">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Release</h1>
            <div class="editContainer">
                <div>
                    <label for="artist">Artist:</label>
                    <input
                        id="artist"
                        type="text"
                        value=${data.artist}
                        name="artist"
                    />
                </div>

                <div>
                    <label for="track">Track:</label>
                    <input
                        id="track"
                        type="text"
                        name="track"
                        value=${data.track}
                    />
                </div>
                <div>
                    <label for="bandCamp">BandCamp</label>
                    <input
                        id="bandCamp"
                        type="text"
                        value=${data.bandCamp}
                        name="bandCamp"
                    />
                </div>

                <div>
                    <label for="URL">Image URL</label>
                    <input id="URL" type="text" value=${data.URL} name="URL" />
                </div>
            
                <div>
                    <label for="embed1">Embed</label>
                    <input type="text" name="embed1" value=${data.embed1} />
                </div>

                <div>
                    <label for="embed2">Embed</label>
                    <input type="text" name="embed2" value=${data.embed2} />
                </div>

                <div>
                    <label for="embed3">Embed</label>
                    <input type="text" name="embed3" value=${data.embed3} />
                </div>

                <div>
                    <label for="embed4">Embed</label>
                    <input type="text" name="embed4" value=${data.embed4} />
                </div>

                <div>
                    <label for="embed5">Embed</label>
                    <input type="text" name="embed5" value=${data.embed5} />
                </div>

                <div>
                    <label for="embed6">Embed</label>
                    <input type="text" name="embed6" value=${data.embed6} />
                </div>

                <input
                    type="submit"
                    class="editArtistButton"
                    value="Edit Release"
                />

                
            </div>
        </form>
    </section>
`;

export async function editReleasePage(ctx) {
    const data = await getReleaseById(ctx.params.id);
    ctx.render(editReleaseTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById("edit-form");
        let formData = new FormData(editForm);

        let artist = formData.get("artist");
        let track = formData.get("track");
        let URL = formData.get("URL");
        let bandCamp = formData.get("bandCamp");
        let embed1 = formData.get('embed1');
        let embed2 = formData.get('embed2');
        let embed3 = formData.get('embed3');
        let embed4 = formData.get('embed4');
        let embed5 = formData.get('embed5');
        let embed6 = formData.get('embed6');

        const body = {
            artist,
            track,
            URL,
            bandCamp,
            embed1,
            embed2,
            embed3,
            embed4,
            embed5,
            embed6,
        };
        await editRelease(ctx.params.id, body);
        ctx.setUserNav();
        ctx.page.redirect("/releases");
    }
}
