export interface IMembership{
    membershipId:number;
    membershipType:string;
    startDate:string;
    endDate:string;
    costPaid:number;
    userId:any;
}

/*

{
    "membershipId": 1,
    "membershipType": "MONTHLY",
    "startDate": "2021-11-19",
    "endDate": "2021-11-19",
    "costPaid": 10000.0,
    "userId": {
        "userId": 3,
        "userName": "charlie",
        "password": "charlie123",
        "name": "Charlie Havoc",
        "email": "charlie@gmail.com",
        "mobile": "123456788",
        "userRole": "USER",
        "address": "Mumbai",
        "bloodGrp": "AB+ve",
        "age": 24,
        "gender": "MALE",
        "userTimestamp": "2021-11-17",
        "sportsName": null,
        "loginAttempt": 0,
        "likes": [],
        "comments": []
    }
}


*/