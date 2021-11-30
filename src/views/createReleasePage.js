import { html } from "https://unpkg.com/lit-html?module";
import { createRelease } from "../api/data.js";

const createReleaseTemplate = (onSubmit) => html`
    <section id="editArtistSection">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Create Release</h1>
            <div class="editContainer">
                <div>
                    <label for="name">Artist:</label>
                    <input id="artist" type="text" value="" name="artist" />
                </div>

                <div>
                    <label for="track">Track:</label>
                    <input id="track" name="track" value="" name="track" />
                </div>

                <div>
                    <label for="URL">Image:</label>
                    <input id="URL" name="URL" value="" name="URL" />
                </div>

                <div>
                    <label for="bandCamp">Bandcamp:</label>
                    <input
                        type="text"
                        name="bandCamp"
                        value=""
                        id="bandcampEdit"
                    />
                </div>

                <div>
                    <label for="embed1">Embed</label>
                    <input type="text" name="embed1" value="" />
                </div>
                <div>
                    <label for="embed2">Embed</label>
                    <input type="text" name="embed2" value="" />
                </div>
                <div>
                    <label for="embed3">Embed</label>
                    <input type="text" name="embed3" value="" />
                </div>
                <div>
                    <label for="embed4">Embed</label>
                    <input type="text" name="embed4" value="" />
                </div>
                <div>
                    <label for="embed5">Embed</label>
                    <input type="text" name="embed5" value="" />
                </div>
                <div>
                    <label for="embed6">Embed</label>
                    <input type="text" name="embed6" value="" />
                </div>
                <input
                    type="submit"
                    class="editArtistButton"
                    value="Create Release"
                />
            </div>
        </form>
    </section>
`;

export async function createReleasePage(ctx) {
    ctx.render(createReleaseTemplate(onSubmit));

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
        let id = (Math.random() + 1).toString(36).substring(2);
        console.log(id);

        const body = {
            artist,
            track,
            URL,
            bandCamp,
            id,
            embed1,
            embed2,
            embed3,
            embed4,
            embed5,
            embed6,
        };
        await createRelease(body);
        ctx.setUserNav();
        ctx.page.redirect("/releases");
    }
}
