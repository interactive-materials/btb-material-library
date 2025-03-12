window.onload = () => {
    console.log(data);

    data.sort((a, b) => {
        return((a.week - b.week) * 100 + (a.team - b.team));
    });

    // Get the container element
    const container = document.getElementById("container");

    const weeks = Math.max(...data.map(d => (d.week)));
    const teams = Math.max(...data.map(d => (d.team)));

    let dataArray = [];

    for (let i=0; i<weeks; i++) {
        dataArray.push([]);
        for (let j=0; j<teams; j++) {
            dataArray[i].push([]);
        }
    }

    // Iterate through the array
    data.forEach(item => {
        // Create a div element
        const div = document.createElement("div");
        div.classList.add("item"); // Add a class for styling

        // Create an img element
        const img = document.createElement("img");
        img.src = `assets/img/${item.filename}`;

        // Append the img to the div
        div.appendChild(img);

        dataArray[item.week - 1][item.team - 1].push(
            {
                item: {...item},
                element: div,
            }
        );
    });

    for (let i=0; i<weeks; i++) {
        const weekDiv = document.createElement("div");
        weekDiv.classList.add("week"); // Add a class for styling
        weekDiv.classList.add(`week-${i+1}`);
        weekDiv.innerHTML = `<div class="header">Week ${i + 1}</div>`
        
        for (let j=0; j<teams; j++) {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team"); // Add a class for styling
            teamDiv.classList.add(`team-${j+1}`);
            teamDiv.innerHTML = `<div class="header">Team ${j + 1}</div>`

            dataArray[i][j].forEach((d, index) => {
                d.element.classList.add(`item-${index}`);
                d.element.addEventListener("click", (e) => {
                    openItem(d.item.week, d.item.team, index);
                });
                teamDiv.append(d.element);
            });

            weekDiv.append(teamDiv);
        }

        container.append(weekDiv);
    }

    document.querySelector("#modal-container").addEventListener("click", (e) => {
        e.target.classList.remove("active");
    });
}

const openItem = (w, t, i) => {
    const img = document.querySelector(`.week-${w} .team-${t} .item-${i} img`);
    document.querySelector("#modal img").src = img.src;
    document.querySelector("#modal-container").classList.add("active");
}
