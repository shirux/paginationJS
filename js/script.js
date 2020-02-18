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
 * Object that represents the page list element
 * show: it will display only the elements for the indicated Page
 * removeAll: remove all elements inside this html section
 * appendList: append a new list to this html section
 * filter: filter the list by the search result on the html section
 * showEmpty: show a message if there is no filter on this html section
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
   filter: (list) => {
      page.removeAll();
      page.appendList(list);
      page.show(list, 1);
   },
   showEmpty: () => {
      page.removeAll();
      let h1 = createHTMLElement('h1', 'textContent', "We're Sorry!!");
      let h2 = createHTMLElement('h2', 'textContent', 'There are no results for your filter');
      let p = createHTMLElement('p', 'textContent', 'Please try with anoter name');
      page.ul.appendChild(h1);
      page.ul.appendChild(h2);
      page.ul.appendChild(p);
   }
}


/**
 * Object that will represent the Pagination section
 * create: Create and return the container div for pagination buttons
 * appendPages: It will append the right mount of pages according to the length of the parameter
 * init: Activate and select the first page
 * removeAll: remove all the html content from this section
 * filter: resize the pagination buttons to the new search result
 */
let paginationSection = {
   ul: '',
   create: (list) => {
      // Create the container DIV
      let div = createHTMLElement('div' , 'className', 'pagination');
      let ul = createHTMLElement('ul');
      paginationSection.ul = ul;
      div.appendChild(ul);

      // append and init all buttons
      paginationSection.appendPages(list);
      paginationSection.init(list);
      return div;
   },
   appendPages: (list) => {
      let amountOfPages = Math.ceil(list.length/maxPerPage);
      for(let i = 1; i <= amountOfPages; i++){
         paginationSection.ul.appendChild(createLi(i));
      }
   },
   init: (list) => {
      let firstPage = paginationSection.ul.firstElementChild;
      firstPage.querySelector('a').classList.add('active');
   }, 
   removeAll: () => {
      paginationSection.ul.innerHTML = '';
   },
   filter: (list) => {
      paginationSection.removeAll();
      paginationSection.appendPages(list);
      paginationSection.init(list);
   }
}

/**
 * Object representing the search Bar
 * create: Return the elements to append a search bar
 */
let searchBar = {
   create: () => {
      let searchDiv = createHTMLElement('div', 'className', 'student-search')
      let input = createHTMLElement('input', 'placeholder', 'Search for students...');
      let searchButton = createHTMLElement('button', 'textContent', 'Search');
      searchDiv.appendChild(input);
      searchDiv.appendChild(searchButton);
      return searchDiv;
   }
}

/**
 * Function that returns a new HTML element, and append a new attribute with a value to it (if it is passed as an argument)
 * @param {*} tag the tag that will define the HTML Element
 * @param {*} attribute the attribute for the HTML Element
 * @param {*} value the value for the attribute 
 */
const createHTMLElement = (tag, attribute = '', value = '') => {
   let element = document.createElement(tag);
   if(attribute) {
      element[attribute] = value;
   }
   return element;
}


/**
 * Funtion that will return a new LI Element with an anchor tag 
 * @param {*} text the inner text contained in the anchor tag
 */
const createLi = text => {
   let li = createHTMLElement('li');
   let a = createHTMLElement('a', 'href', '#');
   a.textContent = text;
   li.appendChild(a);
   return li;
}

/**
 * Once document is ready, append new sections to it
 */
window.addEventListener('DOMContentLoaded', (e) => {
   //create the pagination Section
   let pageDiv =  document.querySelector('.page');
   pageDiv.appendChild(paginationSection.create(studentList));

   //create the search bar
   let pageHeader = document.querySelector('.page-header');
   pageHeader.appendChild(searchBar.create())
})

/**
 * Once document is loaded, add the functionalities to all the sections
 */
window.addEventListener('load', (e) => {
   // Add click listener to my pagination buttons
   // on click, refresh student list and pagination section
   let ul = document.querySelector('.pagination ul');
   ul.addEventListener('click', (e) => {
      if(e.target.tagName === 'A'){
         let pageAnchor = e.target;
         if(pageAnchor.className !== 'active'){
            let activeAnchor = document.querySelector('.pagination .active');
            activeAnchor.classList.remove('active');
            pageAnchor.classList.add('active');
            if(filterList.length > 0) {
               page.show(filterList, pageAncho.textContent)
            } else {
               page.show(studentList, pageAnchor.textContent);
            }
         }
      }
   });

   // Add keyup listener to my search bar
   // on input, update student list and pagination section
   let inputSearch = document.querySelector('.student-search input');
   inputSearch.addEventListener('keyup', (e) => {
      let filter = inputSearch.value;
      if (filter === ''){
         paginationSection.filter(studentList);
         page.filter(studentList);
         filterList = [];
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
            paginationSection.removeAll();
            page.showEmpty();
         } else {
            paginationSection.filter(filterList);
            page.filter(filterList);
         }
      }
   });
 });


 // Initialize the js app
paginationSection.create(studentList);
page.show(studentList, 1);
searchBar.create();