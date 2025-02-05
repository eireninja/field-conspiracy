import { html } from "https://unpkg.com/lit-html?module";
import { getShows } from "../api/data.js";
import { deleteShow } from "../api/data.js";

const showsTemplate = (data) => html `
  <div class="allShowsWrapper">${data.length !==0 ? data.map(showsCard):'No Shows Currently'}</div>
`;

const showsCard = (item) => html `
  <article class="showWrapper">
    <section class="imgAndDesc">
      <div>
        <img src=${item[1].img} alt="showImg" />
      </div>

      <div class="showDesc">
        <h1>${item[1].title}</h1>
        <textarea readonly id="descToPass">${item[1].description}</textarea>
        
        <p>${item[1].date}</p>
      </div>
    </section>
    <div class="embedOptions">
      <p>Listen to the show here:</p>
      <p>
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameborder="no"
          allow="autoplay"
          src=${item[1].embed}
        >
        </iframe>
      </p>
    </div>
    <div class="creativesAdminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="creativesEditButton" id ='${item[0]}' href="#">Edit</a>
            <button  href='javascript:void(0)' class="creativesDeleteButton">Delete</button>`
            : 
            html``}
        </div>
  </article>
`;

export async function showsPage(ctx) {
    let dataObj = await getShows();
    
    let data;
    if(dataObj===null){
        data = [];
    }else{
        data = Object.entries(dataObj);
        data.sort((a,b)=>a[1].createDate-b[1].createDate).reverse();
    console.log(data[0][1].description);
    
  }
    ctx.render(showsTemplate(data, showsCard));

    const delButton = document.getElementsByClassName('allShowsWrapper')[0];
    delButton.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.textContent === 'Delete'){
            const id = e.target.previousElementSibling.id;
            onDelete(id);
        }else if(e.target.textContent === 'Edit'){
           const id = e.target.id;
            ctx.page.redirect(`/shows/${id}`)
        }
    })

    async function onDelete(id) {
            const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteShow(id);
            ctx.page.redirect('/shows');
        }
        
        
    }
    
}