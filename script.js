  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });
let datadiv = document.getElementById("data");

let types={deity:"purple",person:"blue",place:"green"}

for (let [index, i] of data.entries()) {
	nameclean = i.Name_clean;
	newname = document.createElement("a");
	newname.id = "name-" + index;
	newname.className = `btn col s3 ${types[i.Type]} ${i.Type} ${i.Writing_clean} ${i.Completeness} lighten-2 white-text`;
	newname.innerHTML = `${nameclean}`;
	newname.addEventListener("click", (e) => {
		let index = e.currentTarget.id.split("-")[1];
		detail(data[index]);
	});
	datadiv.append(newname);
}

let search = document.getElementById("search");

search.addEventListener("input", searchTags);

function searchTags (e){
	for (i of datadiv.children) {
		let index = i.id.split("-")[1];
		let obj = data[index];
		if (obj.Tags_clean.includes(search.value)) {
			i.style.display=""
		} else {
			i.style.display="none"
		}
	}
	filterNames()
}

let modal = document.getElementById("modal1");
let modalContent = document.getElementById("modal-content");
function detail(obj) {
	var instance = M.Modal.getInstance(modal);
	attes=obj["Attestation"].split(";")
	modalContent.innerHTML = `
	<ul class="collection with-header">
	<li class="collection-header"><h4><sup>${obj["Det_1"]}</sup>${obj["Name_clean"]} (${obj["Type"]})</h4></li>
	${CuneiformMaker(obj)}
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

function CuneiformMaker(obj){
	try {

	let shaped = shaper(obj.Name_clean)
	let text = ""
	for (i of shaped){
		text+=convertCuneiform(i)
	}
	if (text){
		return `<li class="collection-header cuneiform"> ${text}</li>`	
	}else{
	return ""
	}
	}catch{
		return ""
	}

}


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

let type_all = document.getElementById("type_all")
let type_dn= document.getElementById("type_dn")
let type_pn= document.getElementById("type_pn")
let type_gn= document.getElementById("type_gn")
let spel_all= document.getElementById("spel_all")
let spel_phon= document.getElementById("spel_phon")
let spel_logo= document.getElementById("spel_logo")
let spel_akk= document.getElementById("spel_akk")
let comp_all= document.getElementById("comp_all")
let comp_acep= document.getElementById("comp_acep")
let comp_incomp= document.getElementById("comp_incomp")

let tips= [type_pn,type_dn,type_gn,type_all]
let spels = [spel_phon,spel_akk,spel_logo,spel_all]
let comps = [comp_all,comp_acep,comp_incomp]

let filterArray = ["btn"]


function filterNames(){
	let elements = document.getElementsByClassName(filterArray.join(" "))
	elements= Array.from(elements)
	for (i of datadiv.children) {
		if (elements.indexOf(i)==-1) {
			i.style.display="none"
		}

	}
}



function filters(index,key,e,arr){
	arr.forEach(e=>{e.classList.remove("disabled")})
	filterArray[index]=key
	e.currentTarget.classList.add("disabled")
	searchTags()
}


type_dn.addEventListener("click",e=>{
	filters(1,"deity",e,tips)
})

type_pn.addEventListener("click",e=>{
	filters(1,"person",e,tips)
})

type_gn.addEventListener("click",e=>{
	filters(1,"place",e,tips)
})

type_all.addEventListener("click",e=>{
	filters(1,"",e,tips)
})

spel_all.addEventListener("click",e=>{
	filters(2,"",e,spels)
})

spel_logo.addEventListener("click",e=>{
	filters(2,"logographic",e,spels)
})

spel_phon.addEventListener("click",e=>{
	filters(2,"phonetic",e,spels)
})
spel_akk.addEventListener("click",e=>{
	filters(2,"akkadographic",e,spels)
})
comp_all.addEventListener("click",e=>{
	filters(3,"",e,comps)
})
comp_acep.addEventListener("click",e=>{
	filters(3,"acephalous",e,comps)
})
comp_incomp.addEventListener("click",e=>{
	filters(3,"incomplete",e,comps)
})
