document.addEventListener('DOMContentLoaded', function() {

    const CODE = "Code";
    const ARCH = "Architecture";
    const URBAN = "Urban planning";

    let activeTypes = [URBAN, ARCH, CODE];

    let portfolioDiv = document.querySelector('#portfolio-grid');
    let portfolioEmpty = document.querySelector("#error-msg");

    let activeTypeBtnGroup = document.querySelectorAll('.btn-check');
    let reloadLink = document.querySelector('#reload');

    let searchForm = document.querySelector('form');


    loadProjectsData().then(data => {
      console.log("init portfolio...")
      console.log(data)

      // Initialize the portfolio
      let filteredData = filterData(data, filterByType, activeTypes);
      console.log(filteredData);
      updatePortfolio(filteredData);


      // adds filter by type to the buttons
      activeTypeBtnGroup.forEach((btn) => {
        btn.addEventListener('change', function() {
          console.log("type btn clicked...")
          console.log(filteredData)
          if (this.checked) {
            activeTypes.push(btn.value);
          } else {
            activeTypes = activeTypes.filter(value => value !== btn.value)
          }
          console.log(activeTypes);

          filteredData = filterData(data, filterByType, activeTypes);
          console.log(filteredData);
          let resultCount = filteredData.length;
          toggleNoResultMsg(portfolioEmpty, resultCount);
          updatePortfolio(filteredData);
        })
      });

      searchForm.addEventListener('submit', (event) => {
        let searchQuery = document.querySelector('#search').value;
        if (searchQuery != "") {
          filteredData = filterData(data, searchKeyword, searchQuery);
          console.log(filteredData);
          let resultCount = filteredData.length;
          updatePortfolio(filteredData);
          toggleNoResultMsg(portfolioEmpty, resultCount);
        }
        event.preventDefault();
      })

      reloadLink.addEventListener('click', function(event) {
        activeTypes = [URBAN, ARCH, CODE];
        activeTypeBtnGroup.forEach((btn) => {
          btn.checked = true;
        });
        filteredData = filterData(data, filterByType, activeTypes);
        let resultCount = filteredData.length;
        toggleNoResultMsg(portfolioEmpty, resultCount);
        updatePortfolio(filteredData);
      });


    })


    function refreshPortfolio(data, filterFunction) {
      let updatedData = filterData(data, filterFunction);
      updatePortfolio(updatedData);
    }

    function filterByType(data, activeTypes) {
      return data.filter((obj) => {
        return activeTypes.some(r => obj.Type.includes(r));
      });
    }

    // TODO: complete the sort function
    function sortByDate(data) {
      return data.sort((obj) => {

      })
    }

    // Search by keyword
    function searchKeyword(data, searchArg) {
      return data.filter((obj) => {
        let keywords = obj.Keywords.map(element =>
          element.toLowerCase()
        );
        // use a separate array for text fields
        let stringFields = [obj.Description, obj.Name, obj.Language];

        let result = keywords.includes(searchArg.toLowerCase())
          || stringFields.some(p => p.toLowerCase().includes(searchArg.toLowerCase()));

        return result;
      });
    }

    /**
     * Missing params are undefined and handled safely by javascript
     * TODO: use varargs for multiple filter and sort functions
     * Usage: let filteredData = filterData(data, searchKeyword, "Airport");
     */
    function filterData(data, filterFunction, param) {
      return filterFunction(data, param);
    }

    function updatePortfolio(data) {
      portfolioDiv.innerHTML = "";
      data.forEach(obj => {
        portfolioDiv.innerHTML += makeCardFromObject(obj)
      });
    }

    function toggleNoResultMsg(htmlDiv, resultCount) {
      if (resultCount > 0) {
        htmlDiv.style.display = "none";
      } else {
        htmlDiv.style.display = "block";
      }
    }


    function makeCardFromObject(obj) {
        return `<div class="col pt-2 pb-2">
                  <div class="card" style="width: 18rem;">
                    <img src="images/${obj.ImgUrl}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${obj.Name}</h5>
                        <p class="card-text">${obj.Description}<p>
                        <small>${obj.Year}</small>
                      </div>
                  </div>
              </div>`
    }

    async function
    loadProjectsData() {
      let response = await fetch('resources/projects.json');
      let data = await response.json();
      return data;
    }
  });
