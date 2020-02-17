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
let filterList = [];

/**
 * 
 * @param {*} list 
 * @param {*} page 
 */

let page = {
   ul: document.querySelector('.student-list'),
   show: (list, pageNumber) => {
      const startIndex = (pageNumber * maxPerPage) - maxPerPage;
      const endIndex = (pageNumber * maxPerPage);
   
      for (let i = 0; i < list.length; i++) {
         if (i >= startIndex && i < endIndex) {
            list[i].style.display = "block";
         } else {
            list[i].style.display = "none";
         }
      }
   },
   removeAll: () => {
      page.ul.innerHTML = '';
   },
   appendList: (list) => {
      list.forEach(item => {
         page.ul.appendChild(item);
      });
   },
   filter: (list, pageNumber) => {
      page.removeAll();
      page.appendList(list);
      page.show(list, pageNumber);
   },
   showEmpty: () => {
      page.removeAll();
      let h1 = document.createElement('h1');
      h1.textContent = "We're sorry!!";
      let h2 = document.createElement('h2');
      h2.textContent = "There are no results for your filter";
      let h3 = document.createElement('h3');
      h3.textContent = "Please try with another name";
      page.ul.appendChild(h1);
      page.ul.appendChild(h2);
      page.ul.appendChild(h3);
   }
}


/**
 * Object that will represent the Pagination section
 */
let pageLinks = {
   ul: '',
   create: (list) => {
      // Create the container DIV
      let div = createHTMLElement('div' , 'className', 'pagination');
      let ul = createHTMLElement('ul');
      pageLinks.ul = ul;
      div.appendChild(ul);

      // append and init all buttons
      pageLinks.appendPages(list);
      pageLinks.init();
      return div;
   },
   appendPages: (list) => {
      let amountOfPages = Math.ceil(list.length/maxPerPage);
      for(let i = 1; i <= amountOfPages; i++){
         pageLinks.ul.appendChild(createLi(i));
      }
   },
   init: () => {
      let firstPage = pageLinks.ul.firstElementChild;
      let pageDiv = document.querySelector('.page');
      firstPage.querySelector('a').classList.add('active');
      page.show(studentList, 1);
   }, 
   removeAll: () => {
      pageLinks.ul.innerHTML = '';
   },
   filter: (list) => {
      pageLinks.removeAll();
      pageLinks.appendPages(list);
      pageLinks.init();
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

const createHTMLElement = (tag, attribute = '', value = '') => {
   let element = document.createElement(tag);
   if(attribute) {
      element[attribute] = value;
   }
   return element;
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

window.addEventListener('DOMContentLoaded', (e) => {
   let pageDiv =  document.querySelector('.page');
   pageDiv.appendChild(pageLinks.create(studentList));
})


window.addEventListener('load', (e) => {
   // Add click listener to my pagination buttons
   let ul = document.querySelector('.pagination ul');
   ul.addEventListener('click', (e) => {
      if(e.target.tagName === 'A'){
         let pageAnchor = e.target;
         if(pageAnchor.className !== 'active'){
            let activeAnchor = document.querySelector('.pagination .active');
            activeAnchor.classList.remove('active');
            pageAnchor.classList.add('active');
            page.show(studentList, pageAnchor.textContent);
         }
      }
   });

   // Add click listener to my search bar
   let searchBar = document.querySelector('.student-search');
   searchBar.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         let filter = searchBar.querySelector('input').value;
         // case where filter is empty
         if (filter === ''){
            pageLinks.filter(studentList);
            page.filter(studentList, 1);
         } else {
            filterList = [];
               for (let i = 0; i < studentList.length; i++) {     
                  let student = studentList[i];
                  let studentName = student.querySelector('h3').textContent;
                  if (studentName.includes(filter)) {
                     filterList.push(student);      
                  }
               }
            // if result is empty
            if(filterList.length === 0) {
               pageLinks.removeAll();
               page.showEmpty();
            } else {
               pageLinks.filter(filterList);
               page.filter(filterList, 1);
            }
            
         }
      }
   });
 });

pageLinks.create(studentList);
searchBar.create();


// Remember to delete the comments that came with this file, and replace them with your own code comments.