export interface IEnrolledUsers{
    enrolledSportsId:number;
    userId:any;
    sportsId:any;
    batchId:any;
    fees:number;
    enrolledTimestamp:string;
    enrolledStatus:number;
    paymentStatus:number;

}

/* "fees": 200.0,
        "enrolledTimestamp": "2021-11-18",
        "enrolledStatus": 0,
        "paymentStatus": 0
 {
        "enrolledSportsId": 1,
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
        },
        "sportsId": {
            "sportsId": 5,
            "sportsName": "Badminton",
            "sportsCategory": "OUTDOOR",
            "imagePath": "/private/var/folders/wp/74rqzr_n2y39lxdvxgszycbc0000gn/T/tomcat-docbase.8080.2775758364404658487/resources/images/prodImage/Badminton.jpeg",
            "sportsTimestamp": "2021-11-18",
            "managerId": {
                "userId": 2,
                "userName": "bravo",
                "password": "bravo123",
                "name": "Bravo Havoc",
                "email": "bravo@gmail.com",
                "mobile": "123456788",
                "userRole": "MANAGER",
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
        },
        "batchId": {
            "batchId": 1,
            "batchName": "MORNING",
            "timings": "7am-10am",
            "days": "Mon,Wed",
            "coachName": "XYZ",
            "batchTimestamp": "2021-11-18",
            "intake": 20,
            "offerValues": 30.0,
            "sportsId": {
                "sportsId": 5,
                "sportsName": "Badminton",
                "sportsCategory": "OUTDOOR",
                "imagePath": "/private/var/folders/wp/74rqzr_n2y39lxdvxgszycbc0000gn/T/tomcat-docbase.8080.2775758364404658487/resources/images/prodImage/Badminton.jpeg",
                "sportsTimestamp": "2021-11-18",
                "managerId": {
                    "userId": 2,
                    "userName": "bravo",
                    "password": "bravo123",
                    "name": "Bravo Havoc",
                    "email": "bravo@gmail.com",
                    "mobile": "123456788",
                    "userRole": "MANAGER",
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
            },
            "likes": [],
            "comments": []
        },
        "fees": 200.0,
        "enrolledTimestamp": "2021-11-18",
        "enrolledStatus": 0,
        "paymentStatus": 0
    }



*/