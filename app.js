
var list = document.getElementById("list");
firebase.database().ref('todos').on('child_added',function(data){
    var li = document.createElement("li");
    var litext = document.createTextNode(data.val().value);
    li.appendChild(litext)
    //console.log(data.val().value)
    var del = document.createElement("delete");

    var deltext = document.createTextNode("DELETE");
    del.setAttribute("class","btn");
    del.setAttribute("id",data.val().key);
    del.setAttribute("onclick","deleteItem(this)");
    del.appendChild(deltext);

    var edit = document.createElement("edit");

    var editText = document.createTextNode("EDIT");
    edit.setAttribute("class","btn");
    edit.setAttribute('id',data.val().key);
    edit.setAttribute("onclick","editItem(this)");
    edit.appendChild(editText);

    li.appendChild(del);
    li.appendChild(edit);
    list.appendChild(li);
})

function addItem(){
    var item = document.getElementById("todoitem");
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    var todo = {
        value : item.value,
        key: key

    }
    database.child(key).set(todo);

    
    item.value = " ";
    

}



function deleteItem(e)
{
    firebase.database().ref('todos').child(e.id).remove();
   e.parentNode.remove();
}

function deleteAll()

{
    firebase.database().ref('todos').remove();
    list.innerHTML="";
}

function editItem(e)
{    
    var editValue= prompt("Enter updated value",e.parentNode.firstChild.nodeValue);
    var edittodo ={
        value: editValue,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(edittodo)
    e.parentNode.firstChild.nodeValue = editValue;
}