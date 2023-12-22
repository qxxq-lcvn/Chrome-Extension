
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

// localStorage.setItem("name", "Jk");
// console.log(localStorage.getItem("name"));
// localStorage.clear();

// let myLead = `["JK"]`;
// myLead = JSON.parse(myLead);
// myLead.push("V");
// myLead = JSON.stringify(myLead);
// console.log( typeof myLead);

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let list = "";

    //DOM manipulation has a cause
    for(let i=0; i<leads.length; i++) {
        // list += "<li><a target='_blank' href='"+ leads[i] + "'>" + leads[i] + "</a></li>";
        list += 
            `<li>
                <a target='_blank' href='${leads[i]}'>${leads[i]}</a> 
            </li>`;

        // ulEl.innerHTML += "<li>" + leads[i] + "</li>";
        //or
        // const li = document.createElement("li");
        // li.textContent = leads[i];
        // ulEl.append(li);
    }

    ulEl.innerHTML = list;
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));

    render(myLeads);
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));

        render(myLeads);
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads = [];

    render(myLeads);
})