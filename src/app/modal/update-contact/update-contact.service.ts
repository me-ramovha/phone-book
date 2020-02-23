import { Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhoneBook } from 'src/app/model/phone-book';

@Injectable({
  providedIn: 'root'
})
export class UpdateContactService {

  // constructor( public dialogRef: MatDialogRef<UpdateContactService>,
  //   @Inject(MAT_DIALOG_DATA) public data: PhoneBook) { }

  //   onNoClick(): void {
  //     this.dialogRef.close();
  //   }
}
