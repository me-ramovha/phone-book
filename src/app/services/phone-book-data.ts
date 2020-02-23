import {InMemoryDbService} from 'angular-in-memory-web-api'
import { PhoneBook } from '../model/phone-book'


export class PhoneBookData implements InMemoryDbService {
createDb(){
    const phoneBooks: PhoneBook[]=[
        {id:1,name:'Jamie',number:'0123456789'},         
        {id:2,name:'Queen',number:'999999999'},         
        {id:3,name:'Ellah',number:'8888888888'},         
        {id:4,name:'Rohan',number:'6666666666'},         
        {id:5,name:'Gohan',number:'1112223333'},         
        {id:6,name:'David',number:'4446764582'},         
        {id:7,name:'John',number:'0728465798'},         
        {id:8,name:'Jessica',number:'0864128793'},         
    ];
    return {phoneBooks}
}

}
