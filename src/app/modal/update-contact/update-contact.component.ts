import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhoneBook } from 'src/app/model/phone-book';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {

   constructor( public dialogRef: MatDialogRef<UpdateContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhoneBook, 
    private toastr:ToastrService,
    private contactsService:ContactsService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  }

  updateClick(contact: PhoneBook){
    if(contact.number == ''|| contact.name == '' || isNaN(+contact.number)){
    
      this.toastr.warning('Please verify your contact','',{ positionClass: 'toast-top-center'});
    }
    else{
      this.contactsService.updatePhoneBook(contact).subscribe(data =>{ 
        this.onNoClick(); 
        this.dialogRef.afterClosed().subscribe((contact: PhoneBook) => {
          if (contact) {
            this.contactsService.getPhoneBooks().subscribe(data1 => {

            }, error =>{})
          }
        });
        
        
      },error =>{
        this.toastr.error('failed to update phone book','',{ positionClass: 'toast-top-center'});
      })
    }    
  }

}
