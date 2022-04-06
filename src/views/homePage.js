import { html } from "https://unpkg.com/lit-html?module";
import {
    getInstaVideos,
    updateHomeDesc,
    getCredit,
    updateCredit,
} from "../api/data.js";
import { getHomeDesc } from "../api/data.js";

const homeTemplate = (data, homePageDesc, credit, onsubmit) => html `
${
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        ? html`
              <video type="video/m4v" playsinline autoplay loop muted>
                  <source src="../../assets/landingVideo.m4v" />
              </video>

              <!-- edit credits for video here for MOBILE -->
              <!-- you can change the text color in homePage.css file - line 217 -->

              <div class="description">
                  <p class = 'creditDescription'>
                      Video by Hyusfall see website
                      >>>
                      <a
                          class = 'text-flicker-in-glow'
                          target="_blank"
                          href="https://www.hyusfall.com/"
                          >HERE</a
                      >
                  </p>
          `
        : html`
              <video type="video/webm" autoplay loop muted>
                  <source src="../../assets/landingVideo.webm" />
              </video>

              <!-- edit credits for video here -->
              <!-- you can change the text color in homePage.css file - line 217 -->
              <div class="description">
                  <p class = 'creditDescription'>
                      Video by Hyusfall see website
                      >>>
                      <a
                      class = 'text-flicker-in-glow'
                          target="_blank"
                          href="https://www.hyusfall.com/"
                          >HERE</a
                      >
                  </p>

              </div>
          `
}
<div class="description">
    

          <!-- edit the home page description here -->
    <p id = 'editableHomePageDesc'>
        Field Conspiracy is a social experiment
         & a record label, which nurtures community 
         and creativity. It aims to be a playground 
         of creative space for musicians, where the 
         inspiration and courage to be free in a 
         community are leading the life we want to 
         live – so that we can live the life we want
          to lead. Together we imagine a reality where
           the “human management systems” are defined 
           by the interest of communities to live a life
            that provides them with the security and a 
            space to be free in the creation of their 
            own reality. When we realize that more can 
            be achieved through the force of creative 
            love than destructive fear and fight, 
            then we open the door to collective humanity. 
            The choice lies within all of us, here and now
             and it is what has brought us together in this
              experiment of positive radicalism in a form of
               co-operation over competition.</p>

               

</div>
<div class="instaDescription">instagram @fieldconspiracy</div>
<section class="instaVideos">
    <!-- instagram video links goes here dynamicaly -->
    ${data.map(cardTemplate)}
</section>
<section class="newstlerWrapper">
    <article class="newstler">Subscribe to Newsletter</article>
    <p class="newstlerDesc">Subscribe to Our Newstler to recieve occasional news and updates. We do not share your email
        to any third
        parties. For more information, please view our Privacy Policy.</p>

    <!-- newstler form -->
    <div id="newstlerForm" class="newstlerForm">

        <form @submit=${onsubmit} id="newstler-Form">
            <div id="mc_embed_signup_scroll">
                <h2>Subscribe</h2>
                
                <div class="mc-field-group">
                    <label for="mce-EMAIL">Email Address <span>*</span>
                    </label>
                    <input type="email" value = '' name="EMAIL" class="required email" id="mce-EMAIL">
                </div>
                <div class="mc-field-group">
                    <label for="mce-FNAME">First Name 
                    </label>
                    <input type="text" value = '' name="FNAME"  id="mce-FNAME">
                </div>
                <div class="clear">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                </div>
            </div>
        </form>
        <i class="fas fa-times-circle"></i>
    </div>
    <!-- end of newstler form -->
    <!-- thanks msg -->
    <div class="newstlerThanks">
        <p>Thanks for Subscribing</p>
        <i class="fas fa-times-circle"></i>
    </div>
    
    </div>

</section>
`;

const cardTemplate = (item) => html`
    <a class="instaLink" href=${item.instaLink} target="blank">
        <article class="instaVideosFetched">
            <img src=${item.URL} alt="" />
            <p class="instaVideosPlay">
                ${item.artist} - ${item.track}
                <i class="fas fa-play"></i>
            </p>
        </article>
    </a>
`;

export async function homePage(ctx) {
    let data = await getInstaVideos();
    let homePageDesc = await getHomeDesc();
    let credit = await getCredit();
    ctx.render(homeTemplate(data, homePageDesc, credit, onsubmit));
    async function onsubmit(e) {
        e.preventDefault();
        const form = document.getElementById("newstler-Form");
        let formData = new FormData(form);

        let email = formData.get("EMAIL");
        let fName = formData.get("FNAME");

        if (email === "") {
            window.alert(`The Email field must be filled`);
        }
        if (!email.includes("@") || !email.includes(".")) {
            window.alert("The email is not correct");
        }
        let data = {
            email_address: email,
            name: fName,
        };
        fetch("/.netlify/functions/subscribe", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((responce) => responce.json())
            .then((data) => console.log(data));

        form.reset();
    }

    const button = document.getElementById("mc-embedded-subscribe");
    const newstler = document.getElementsByClassName("newstler")[0];
    const newstlerWrapper = document.getElementById("newstlerForm");
    const newstlerThanks = document.getElementsByClassName("newstlerThanks")[0];
    const closeThanks = document.getElementsByClassName("fa-times-circle")[0];

    closeThanks.addEventListener("click", () => {
        if ((newstlerThanks.style.display = "flex")) {
            newstlerThanks.style.display = "none";
        }
        if ((newstlerWrapper.style.display = "flex")) {
            newstlerWrapper.style.display = "none";
        }
    });

    newstler.addEventListener("click", () => {
        newstlerWrapper.style.display = "flex";
    });

    button.addEventListener("click", () => {
        newstlerWrapper.style.display = "none";
        newstlerThanks.style.display = "flex";
        setInterval(function () {
            newstlerThanks.style.display = "none";
        }, 3000);
    });

    const editableHomePageDesc = document.getElementById(
        "editableHomePageDesc"
    );
    const editHomePageDescButton =
        document.getElementsByClassName("editHomePageDesc")[0];

    editHomePageDescButton?.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === "Edit") {
            editableHomePageDesc.contentEditable = true;
            editableHomePageDesc.focus();
            editHomePageDescButton.textContent = "Save";
        } else if (e.target.textContent === "Save") {
            editableHomePageDesc.contentEditable = false;
            editableHomePageDesc.blur();
            editHomePageDescButton.textContent = "Edit";
            updateHomeDesc(editableHomePageDesc.textContent);
        }
    });

    const editableCredit = document.getElementById("editableCredit");
    const editCreditButton =
        document.getElementsByClassName("editCreditButton")[0];

    editCreditButton?.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        if (e.target.textContent === "Edit") {
            editableCredit.contentEditable = true;
            editableCredit.focus();
            editCreditButton.textContent = "Save";
        } else if (e.target.textContent === "Save") {
            editableCredit.contentEditable = false;
            editableCredit.blur();
            editCreditButton.textContent = "Edit";
            updateCredit(editableCredit.textContent);
        }
    });
}
