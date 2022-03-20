//COMICS TEST DATA
[
  '{{repeat(12, 7)}}',
  {
    _id: '{{objectId()}}',
    isActive: '{{bool()}}',
    age: '{{integer(20, 40)}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
     registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
     updated: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    //comment: '{{lorem(1, "paragraphs")}}',
    // chat: '{{lorem(1, "paragraphs")}}',
    
     comment: function(tags) {
      return 'great work ' + this.name;
    },
   
    tags: [
      '{{repeat(4)}}',
      '{{firstName()}}'
      ],
    
      likes: [
        '{{repeat(4)}}',
         '{{firstName()}}'
         
        ]
      
      
    }
    ]


[
  {
    "_id": "6237851d8f3a2ac7f0237920",
    "isActive": false,
    "age": 36,
    "name": "Yang Shields",
    "gender": "male",
    "registered": "2014-04-02T07:19:32 -04:00",
    "updated": "2018-12-15T11:05:11 -04:00",
    "comment": "great work Yang Shields",
    "tags": [
      "Mejia",
      "Daniels",
      "Janell",
      "Wong"
    ],
    "likes": [
      "Stacey",
      "Sonia",
      "Diaz",
      "Noel"
    ]
  },
  {
    "_id": "6237851d28bd5e2b503c8862",
    "isActive": false,
    "age": 37,
    "name": "Stewart Patrick",
    "gender": "male",
    "registered": "2015-06-30T01:05:50 -04:00",
    "updated": "2021-05-16T01:26:47 -04:00",
    "comment": "great work Stewart Patrick",
    "tags": [
      "Huffman",
      "Riddle",
      "Anastasia",
      "Roberta"
    ],
    "likes": [
      "Brennan",
      "Lena",
      "Conrad",
      "Morales"
    ]
  },
  {
    "_id": "6237851d54f75c75d1881d8a",
    "isActive": true,
    "age": 27,
    "name": "Marcella Acosta",
    "gender": "female",
    "registered": "2014-02-04T08:26:55 -04:00",
    "updated": "2018-10-05T01:30:58 -04:00",
    "comment": "great work Marcella Acosta",
    "tags": [
      "Wyatt",
      "Carrie",
      "Rose",
      "Mcfarland"
    ],
    "likes": [
      "Hazel",
      "Edna",
      "Delacruz",
      "Gallegos"
    ]
  },
  {
    "_id": "6237851d01d578020a521911",
    "isActive": false,
    "age": 30,
    "name": "Francis Padilla",
    "gender": "male",
    "registered": "2021-07-25T10:26:55 -04:00",
    "updated": "2021-02-12T04:12:26 -04:00",
    "comment": "great work Francis Padilla",
    "tags": [
      "Odessa",
      "Collier",
      "Marsha",
      "Love"
    ],
    "likes": [
      "Rios",
      "Battle",
      "Strickland",
      "Vivian"
    ]
  },
  {
    "_id": "6237851de14f06913d2a64a4",
    "isActive": false,
    "age": 30,
    "name": "Riley Gentry",
    "gender": "male",
    "registered": "2020-02-26T08:59:59 -04:00",
    "updated": "2020-05-23T10:07:35 -04:00",
    "comment": "great work Riley Gentry",
    "tags": [
      "Moore",
      "Bryant",
      "Cotton",
      "Castro"
    ],
    "likes": [
      "Mclean",
      "Tameka",
      "Rice",
      "Mcdaniel"
    ]
  },
  {
    "_id": "6237851d2402b10b4c18112e",
    "isActive": true,
    "age": 38,
    "name": "Renee Wood",
    "gender": "female",
    "registered": "2017-11-20T12:42:51 -04:00",
    "updated": "2021-03-07T05:41:56 -04:00",
    "comment": "great work Renee Wood",
    "tags": [
      "Saundra",
      "Kane",
      "Juliette",
      "Solomon"
    ],
    "likes": [
      "Corine",
      "Krystal",
      "Gomez",
      "Herring"
    ]
  },
  {
    "_id": "6237851d1ef94eae9e7b5fb5",
    "isActive": true,
    "age": 22,
    "name": "Trujillo Singleton",
    "gender": "male",
    "registered": "2019-12-03T05:58:57 -04:00",
    "updated": "2016-09-29T04:25:15 -04:00",
    "comment": "great work Trujillo Singleton",
    "tags": [
      "Wood",
      "Dean",
      "Barry",
      "Arlene"
    ],
    "likes": [
      "Booth",
      "Sabrina",
      "Fuller",
      "Massey"
    ]
  },
  {
    "_id": "6237851d4a53de405f581138",
    "isActive": false,
    "age": 20,
    "name": "Howell Fischer",
    "gender": "male",
    "registered": "2017-04-14T09:54:23 -04:00",
    "updated": "2021-08-10T01:02:15 -04:00",
    "comment": "great work Howell Fischer",
    "tags": [
      "Earline",
      "Eliza",
      "Emerson",
      "Berry"
    ],
    "likes": [
      "Matilda",
      "Garner",
      "Virginia",
      "Reese"
    ]
  },
  {
    "_id": "6237851d40ab01ffdaf4e4fa",
    "isActive": false,
    "age": 25,
    "name": "Blair Compton",
    "gender": "male",
    "registered": "2018-12-12T05:30:13 -04:00",
    "updated": "2018-11-10T08:19:22 -04:00",
    "comment": "great work Blair Compton",
    "tags": [
      "Camille",
      "Beverley",
      "Bridgette",
      "Norris"
    ],
    "likes": [
      "Robbie",
      "Herminia",
      "Lynn",
      "Jana"
    ]
  },
  {
    "_id": "6237851de993702d71d11d26",
    "isActive": true,
    "age": 21,
    "name": "Greer Spencer",
    "gender": "male",
    "registered": "2015-05-26T12:33:24 -04:00",
    "updated": "2017-11-23T05:12:30 -04:00",
    "comment": "great work Greer Spencer",
    "tags": [
      "Vicky",
      "Carly",
      "Ursula",
      "Crosby"
    ],
    "likes": [
      "Teri",
      "Baldwin",
      "Noreen",
      "Sykes"
    ]
  }
]
  
  