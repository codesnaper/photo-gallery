import { Configuration } from "../conf";
import { User } from "../modal/user";

export class UserService{

    constructor(){
        this.users = [];
    }

    loadData(){
        let data;
        if(Configuration.profile === 'local') {
            data = fetch('mock/user.json'
                ,{
                  headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
                }
              );
        }
        return data;
    }

    findUserByIDs(userId=[]){
        if(Configuration.profile === 'local'){
            return new Promise((resolve,reject) => {
                this.loadData().then(response => {
                    return response.json();
                })
                .then((responses) => {
                    this.users = responses.filter(res => userId.includes(res.id))
                    .map(userData => {
                        let user = new User();
                        user.id = userData.id;
                        user.lastname = userData.lastname;
                        user.name = userData.name;
                        user.username = userData.username;
                        return user;
                    })
                    resolve(this.users);
                })
                .catch(err => reject(err));
            });
        }
    }

}