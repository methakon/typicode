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
         this.btn.del=document.getElementById('del_btn');
         this.check.all=document.getElementById('all_selector');
         this.omodal=document.getElementById('add_edit_from');
         this.auther="SWARNA SEKHAR DHAR";
         document.crud=this;
         document.crud.initialise();
         $(this.btn.save ).on( "click", function() {
                  document.crud.save_user();
           });
           $(this.btn.add ).on( "click", function() {
                $("#entry_from")[0].reset() ;
                $('#add_edit_from').modal('show');
                $('.check_operator').prop('checked', false);
                $(this.btn.edit).addClass("d-none");
                 $(this.btn.del).addClass("d-none");
                
           });
           $(this.btn.del ).on( "click", function() {
                $("#entry_from")[0].reset() ;
                document.crud.delete_record(); 
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
               $('.check_operator').change(function() {
                  document.crud.check_checks(this);
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
              $('.check_operator').prop('checked', false);

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
            .then((json) => console.log(json)) 
            .then((json) => document.crud.initialise()) ; 
              alert("added");
         }
          
         $('#add_edit_from').modal('hide');

     }
     check_checks(elem)
     {
        var checked= this.otable.querySelectorAll('.check_operator:checked');
        if(checked.length > 0){
            
             $(this.btn.del).removeClass("d-none");
        }
        else
        {
            $(this.btn.del).addClass("d-none");
             
        }
        if(checked.length == 1){
               
            fetch('https://my-json-server.typicode.com/methakon/typicode/users/'+checked[0].value)
            .then((response) => response.json())
            .then((json) => document.crud.set_from(json));

            
                $(this.btn.edit).removeClass("d-none");
            }
            else
            {
                $(this.btn.edit).addClass("d-none");
            }
         
     }
     delete_record()
     {
          
          var checked= this.otable.querySelectorAll('.check_operator:checked');
          if(checked.length > 0){
              checked.forEach(function(ent){
                  fetch('https://my-json-server.typicode.com/methakon/typicode/users/'+ent.value, {
                        method: 'DELETE',
                    }) ;
              });
              $('.check_operator').prop('checked', false);
          }
         

     }
     set_from(data)
     {    
          entry_from.id.value =data.id;
          entry_from.user_name.value =data.name;
          entry_from.user_email.value =data.email;
     }
}
