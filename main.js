class View {
    constructor() {

        this.app = document.getElementById('app');

        this.title = this.createElement('h1', 'title');
        this.title.textContent = 'Github Search Repositories';

        this.searchLine = this.createElement('div', 'search__line');
        this.searchInput = this.createElement('input', 'search__input');
        this.searchCounter = this.createElement('span', 'search__counter');
        this.searchButton = this.createElement('button', 'search__button');
        this.searchButton.textContent = 'Search';
        this.searchInput.onkeypress = submitName('key');


        this.repWrapper = this.createElement('div', 'reps__wrapper');
        this.repList = this.createElement('ul', 'reps');
        this.repWrapper.append(this.repList);

        this.main = this.createElement('div', 'main');
        this.main.append(this.repWrapper);



        this.app.append(this.title);
        this.app.append(this.searchLine);
        this.app.append(this.searchInput);
        this.app.append(this.searchButton);
        this.app.append(this.searchCounter);
        this.app.append(this.main);
    }

    createElement(elementTag, elementClass) {
        const element = document.createElement(elementTag);
        if (elementClass) {
            element.classList.add(elementClass);
        }
        return element;
    }



    createReposit(temp, repData = 1) {

        const repElement = this.createElement('li', 'reps__prev');

        if (temp == true) {
            repElement.innerHTML = `<h2><a onclick="{window.open('${repData.html_url}'
        )}" class="reps__prev-link" >${repData.name}</a></h2><span><h3>ID:</h3> ${repData.id}  </span></br><span class="reps__prev-lang"><h3>language:</h3> ${repData.language}</span>`;

        } else {

            repElement.innerHTML = '<h2>Nothing found</h2>'
        };
        this.repList.append(repElement);


    }
}

const REP_PER_PAGE = 20;

function submitName(e) {
    if (e.code === 'Enter') {
        document.getElementByClass('input').click();
    }
}

class Search {
    constructor(view) {
        this.view = view;

        let searchByEnter = this.searchReps.bind(this)

        this.view.searchInput.addEventListener("keypress", function(event) {

            if (event.key === "Enter") {

                searchByEnter();


            }
        })
        this.view.searchButton.addEventListener('click', this.searchReps.bind(this));

    }

    async searchReps() {
        const searchValue = this.view.searchInput.value;
        if (searchValue.length >= 3) {
            return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=${REP_PER_PAGE}`).then((res) => {
                if (res.ok) {
                    res.json().then(res => {
                        let temp = false;
                        if (res.total_count > 0) {
                            temp = true;
                            res.items.forEach(reps => this.view.createReposit(temp, reps));
                        } else {

                            this.view.createReposit(temp);
                        }
                    })
                }
            })
        } else { alert('Недостаточно символов, введите больше') }

    }



    loadReps() {

    }

}

new Search(new View());