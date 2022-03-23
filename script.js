let datadiv = document.getElementById("data");

for (let [index, i] of data.entries()) {
	nameclean = i.Name_clean;
	newname = document.createElement("a");
	newname.id = "name-" + index;
	newname.className = "btn col s3 blue lighten-4 black-text";
	newname.innerHTML = `${nameclean}`;
	newname.addEventListener("click", (e) => {
		let index = e.currentTarget.id.split("-")[1];
		detail(data[index]);
	});
	datadiv.append(newname);
}

let search = document.getElementById("search");

search.addEventListener("input", (e) => {
	for (i of datadiv.children) {
		let index = i.id.split("-")[1];
		let obj = data[index];
		if (obj.Tags_clean.includes(search.value)) {
			i.style.display = "";
		} else {
			i.style.display = "none";
		}
	}
});

let modal = document.getElementById("modal1");
let modalContent = document.getElementById("modal-content");
function detail(obj) {
	var instance = M.Modal.getInstance(modal);
	attes=obj["Attestation"].split(";")
	modalContent.innerHTML = `
	<ul class="collection with-header">
	<li class="collection-header"><h4><sup>${obj["Det_1"]}</sup>${obj["Name_clean"]} (${obj["Type"]})</h4>
	</ul>
	<h5>Spelling: ${obj["Writing_clean"]}</h5>
	<ul class="collection" ></ul>
	${corresMaker(obj)}
	${LiteratureMaker(obj)}
	${attesmaker(attes)}
	`
	instance.open();
}

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".modal");
	var instances = M.Modal.init(elems);
});

function attesmaker(attes){
	let text=""
	text+=`
	<h5>Attestation</h5>
	<ul class="collection">`
	let exists=false;
	for (i of attes){
		if (i!=""){
			exists=true
			text+=`<li class="collection-item">${i}</li>`
		}
	}
	text+=`</ul>`

	if (exists){

		return text
	}else{
		return ""
	}
}

function LiteratureMaker(obj){
	if (obj["Literature"]){
		text=`<h5>Literature</h5>
	<ul class="collection" ></ul>
	<span>${obj["Literature"]}</span>`
		return	text}
	else{
		return ""
	}
}

function corresMaker(obj){
	if(obj["Correspondence"]){
		let text =`<h5>Correspondence</h5>
	<ul class="collection" ></ul>
	<span>${obj["Correspondence"]}</span>`
		return text

	}
	else{
		return ""}
}
