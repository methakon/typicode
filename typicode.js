if(typeof this.NodeList.prototype.forEach != undefined )
{
    this.NodeList.prototype.forEach = Array.prototype.forEach;
}
class crud_tbl
{
     constructor() {  
         this.otable=document.getElementById('operating_table');
         this.btn={};
         this.check={};
         this.btn.add=document.getElementById('add_btn');
         this.btn.edit=document.getElementById('edit_btn');
         this.btn.save=document.getElementById('btn_save');
         
         this.check.all=document.getElementById('all_selector');
         this.omodal=document.getElementById('add_edit_from');
         this.auther="SWARNA SEKHAR DHAR";
         document.crud=this;
         document.crud.initialise();
         $(this.btn.save ).on( "click", function() {
                  document.crud.save_user();
           });
     }
     initialise()
     {
         
         fetch('https://my-json-server.typicode.com/methakon/typicode/users')
         .then((response) => response.json())
         .then((json) => document.crud.list_table(json));
     }
     list_table(data)
     {
         if(data.length > 0)
         {
             $(document.crud.otable).children('tbody').empty();
              data.forEach(function(ro){
                  var row="<tr><th scope='row'><input type='checkbox' class='check_operator' id='user_id' name='user_id[]' value='"+ro.id +"' ></th><td>"+ro.id +"</td><td>"+ro.name +"</td><td>"+ro.email +"</td></tr>";
                   $(document.crud.otable).children('tbody').append(row);
                  
              });
         }
          
     }
     save_user()
     {
         var id = parseInt(entry_from.id.value);
         if(id > 0)
         {
             fetch('https://my-json-server.typicode.com/methakon/typicode/users/'+id, {
                method: 'PUT',
                body: JSON.stringify({
                  id: id,
                   name: entry_from.user_name.value,
                   email: entry_from.user_email.value,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((json) => console.log(json));
             alert("Updated");

         }
         else
         {
            fetch('https://my-json-server.typicode.com/methakon/typicode/users', {
            method: 'POST',
            body: JSON.stringify({
              name: entry_from.user_name.value,
              email: entry_from.user_email.value,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => function(json){
                console.log(json)
          }) 
            .then((json) => document.crud.initialise()) ; 
              alert("added");
         }
          
         $('#add_edit_from').modal('hide');

     }
}