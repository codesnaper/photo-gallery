import { Group } from '../modal/group';
import {Configuration} from './../conf';

export class GroupService{

    constructor(){
        this.groups = [];
        this.data = [];
    }

    loadData(){
        let data ;
        if(Configuration.profile === 'local') {
            data = fetch('mock/group.json'
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

    getGroups(){
        return new Promise((resolve,reject) => {
            this.loadData().then(response => {
                return response.json();
            })
            .then((responses) => {
                this.groups = responses.map((response) => {
                    let group = new Group();
                    group.member = response.member;
                    group.name = response.name;
                    group.password = response.password;
                    group.userid = response.userid;
                    group.users = [];
                    return group;
                } );
                resolve(this.groups);
            })
            .catch(err => reject(err));
        });
    }

}