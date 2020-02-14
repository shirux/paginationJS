/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   



/*** 
 Global variables to work this project
 studentList: All the elements LI on the student List UL
 maxPerPage:  constant that defines how many students will be displayed per page
***/
let studentList = document.querySelectorAll('ul.student-list li');
const maxPerPage = 10;

/*** 
   Function that will display the elements from the page you 
   pass as a parameter. 
   List: The list containing the elements you want to hide and display on your pagination
   Page: The actual page
***/
/**
 * 
 * @param {*} list 
 * @param {*} page 
 */
const showPage = (list, page) => {
   const startIndex = (page * maxPerPage) - maxPerPage;
   const endIndex = (page * maxPerPage);

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = "block";
      } else {
         list[i].style.display = "none";
      }
   }
}

/**
 * Object that will represent the Pagination section
 */
let pageLinks = {
   create: (list) => {
      // Create the container DIV
      let paginationDiv = document.createElement('div');
      paginationDiv.classList.add('pagination');

      // Append the right amount of pages
      let ul = document.createElement('ul');
      pageLinks.appendPages(ul, list);
      
      // First item class active and filter
      pageLinks.init(ul, paginationDiv);
   },
   appendPages: (ul, list) => {
      let amountOfPages = Math.ceil(list.length/maxPerPage);
      for(let i = 1; i <= amountOfPages; i++){
         ul.appendChild(createLi(i));
      }
   },
   init: (ul, div) => {
      let firstPage = ul.firstElementChild;
      let pageDiv = document.querySelector('.page');
      firstPage.querySelector('a').classList.add('active');
      div.appendChild(ul);
      showPage(studentList, 1);
      pageDiv.appendChild(div);
   }
}

let searchBar = {
   create: () => {
      let pageHeader = document.querySelector('.page-header');
      let searchDiv = document.createElement('div');
      searchDiv.classList.add('student-search');
      let input = document.createElement('input');
      input.placeholder = 'Search for students...';
      searchDiv.appendChild(input);
      let searchButton = document.createElement('button');
      searchButton.textContent = 'Search';
      searchDiv.appendChild(searchButton);
      pageHeader.appendChild(searchDiv);
   }
}


/**
 * 
 * @param {*} text 
 */
const createLi = text => {
   let li = document.createElement('li');
   let a = document.createElement('a');
   a.setAttribute('href', '#');
   a.textContent = text;
   li.appendChild(a);
   return li;
}

window.addEventListener('load', (e) => {
   let ul = document.querySelector('.pagination ul');
   ul.addEventListener('click', (e) => {
      if(e.target.tagName === 'A'){
         let pageAnchor = e.target;
         if(pageAnchor.className !== 'active'){
            let activeAnchor = document.querySelector('.pagination .active');
            activeAnchor.classList.remove('active');
            pageAnchor.classList.add('active');
            showPage(studentList, pageAnchor.textContent);
         }
      }
   });
 });


pageLinks.create(studentList);
searchBar.create();


// Remember to delete the comments that came with this file, and replace them with your own code comments.