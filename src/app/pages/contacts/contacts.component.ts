import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { PhoneBook } from 'src/app/model/phone-book';
import { PhoneBookData } from 'src/app/services/phone-book-data';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UpdateContactComponent } from 'src/app/modal/update-contact/update-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  form: FormGroup;
  updateform: FormGroup;
  isAddContact: boolean = false;
  isUpdateContact: boolean = false;
  contact: PhoneBook = new PhoneBook();
  displayedColumns: string[] = ['name', 'number','edit','delete'];
  contacts: PhoneBook[];
  constructor(private contactsService: ContactsService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private toastr: ToastrService) { }
  filterName:string;
  dataSource = new MatTableDataSource<PhoneBook>();
  namesFiltered = [];
  ngOnInit() {

    this.form = this.fb.group({     // {5}
      _name: ['', Validators.required],
      _number: ['', Validators.required]
    });
    this.updateform = this.fb.group({     // {5}
      _name: ['',Validators.required],
      _number: ['',Validators.required]
    });
    this.getPhoneBooks();
    
  }
  private formSubmitAttempt: boolean;

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    get ff() { return this.updateform.controls; }

    isFieldInvalid(field: string) { // {6}
      return (
        (!this.form.get(field).valid && this.form.get(field).touched) ||
        (this.form.get(field).untouched && this.formSubmitAttempt)
      );
    }

    isFieldInvalid1(field: string) { // {6}
      return (
        (!this.updateform.get(field).valid && this.updateform.get(field).touched) ||
        (this.updateform.get(field).untouched && this.formSubmitAttempt)
      );
    }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    this.isAddContact = true;
    this.isUpdateContact = false;
  }

  delete(contact: PhoneBook) {
    this.contact = contact;
    this.contactsService.deletePhoneBook(this.contact.id).subscribe(data => {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      this.toastr.success(this.contact.name + ' deleted','');
      this.dataSource = new MatTableDataSource<PhoneBook>(this.contacts);
    },error =>{
      this.toastr.error('failed to delete contact','',{ positionClass: 'toast-top-center'});
    })
    
  }

  update(contact: PhoneBook){ 
    this.dialog.open(UpdateContactComponent, {

      data: {
       id: contact.id,
       name: contact.name,
       number: contact.number
      }
    });
    
  this.isAddContact = false;
  }

  getPhoneBooks(){    
    this.contactsService.getPhoneBooks().subscribe(data => {
      this.contacts = data;
      this.dataSource = new MatTableDataSource<PhoneBook>(data);
    },error =>{
      this.toastr.error('failed to load phone book','',{ positionClass: 'toast-top-center'});
    }
    )
  }

  addClick(){    
    this.contact.name = this.form.value['_name'];
    this.contact.number = this.form.value['_number'];
    if(this.contact.number == ''|| this.contact.name == '' || isNaN(+this.contact.number)){
     
      this.toastr.warning('Please verify your contact','',{ positionClass: 'toast-top-center'});
    }
    else{
      this.contactsService.addPhoneBook(this.contact).subscribe(data =>{      
        // this.contacts.(this.contact);
        this.toastr.success('Contact successfully added','',{ positionClass: 'toast-top-center'});
        this.getPhoneBooks();
        this.dataSource = new MatTableDataSource<PhoneBook>(this.contacts);
        this.form.reset();
        this.isAddContact = false;
      },error =>{
        this.toastr.error('failed to add phone number','',{ positionClass: 'toast-top-center'});
      })
    }
    
  }
}
