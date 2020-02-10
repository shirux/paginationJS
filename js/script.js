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
 * Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
 * @param {*} list 
 */
const appendPageLinks = (list) => {
   //create div where the pagination buttons are located
   let paginationDiv = document.createElement('div');
   paginationDiv.classList.add('pagination');

   //create every button for every page inside an UL
   let ul = document.createElement('ul');
   let amountOfPages = Math.ceil(list.length/maxPerPage);
   
   appendList(ul, list);
   for(let i = 1; i <= amountOfPages; i++){
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }
   let firstPage = ul.firstElementChild;
   firstPage.querySelector('a').classList.add('active');
   paginationDiv.appendChild(ul);

   let pageDiv = document.querySelector('.page');
   pageDiv.appendChild(paginationDiv);
}

/**
 * 
 * @param {*} ul 
 * @param {*} list 
 */
const appendList = (ul, list) => {

}


appendPageLinks(studentList);


// Remember to delete the comments that came with this file, and replace them with your own code comments.