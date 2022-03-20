//COMMENTS TEST DATA

//Comments

[
  '{{repeat(12, 7)}}',
  {
    _id: '{{objectId()}}',
    isActive: '{{bool()}}',
    age: '{{integer(20, 40)}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
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
    "_id": "6233a3b85096af79b5d49ee8",
    "isActive": true,
    "age": 36,
    "name": "Sophie Nunez",
    "gender": "female",
    "comment": "great work Sophie Nunez",
    "tags": [
      "Elva",
      "Aguilar",
      "Avila",
      "Butler"
    ],
    "likes": [
      "Townsend",
      "Willis",
      "Wilson",
      "Carney"
    ]
  },
  {
    "_id": "6233a3b82496a182a9ecae0d",
    "isActive": false,
    "age": 37,
    "name": "Lupe Bowers",
    "gender": "female",
    "comment": "great work Lupe Bowers",
    "tags": [
      "Craig",
      "Schneider",
      "Rosie",
      "Virginia"
    ],
    "likes": [
      "Evangeline",
      "Stephanie",
      "Nicole",
      "Trina"
    ]
  },
  {
    "_id": "6233a3b8b89c194f4f783beb",
    "isActive": false,
    "age": 22,
    "name": "Corinne Green",
    "gender": "female",
    "comment": "great work Corinne Green",
    "tags": [
      "Jane",
      "Kristy",
      "Caitlin",
      "Banks"
    ],
    "likes": [
      "Juanita",
      "Gena",
      "Merritt",
      "Hayes"
    ]
  },
  {
    "_id": "6233a3b8e7983ab643c659f4",
    "isActive": false,
    "age": 36,
    "name": "Cooke Griffith",
    "gender": "male",
    "comment": "great work Cooke Griffith",
    "tags": [
      "Neva",
      "Kari",
      "Estelle",
      "Sosa"
    ],
    "likes": [
      "Karen",
      "Lynn",
      "Gayle",
      "Leanne"
    ]
  },
  {
    "_id": "6233a3b826793f43874b09df",
    "isActive": true,
    "age": 22,
    "name": "Sasha York",
    "gender": "female",
    "comment": "great work Sasha York",
    "tags": [
      "Harriet",
      "Tania",
      "Virgie",
      "Helene"
    ],
    "likes": [
      "Barry",
      "Josie",
      "Chambers",
      "Carey"
    ]
  },
  {
    "_id": "6233a3b80f9bf4cd2bbe199f",
    "isActive": true,
    "age": 27,
    "name": "Rivera Rasmussen",
    "gender": "male",
    "comment": "great work Rivera Rasmussen",
    "tags": [
      "Stacey",
      "Stella",
      "Nielsen",
      "Gonzales"
    ],
    "likes": [
      "Latoya",
      "Larsen",
      "Mcleod",
      "Guadalupe"
    ]
  },
  {
    "_id": "6233a3b8cf815323744f52b2",
    "isActive": false,
    "age": 27,
    "name": "Bullock Rhodes",
    "gender": "male",
    "comment": "great work Bullock Rhodes",
    "tags": [
      "Ferguson",
      "Eugenia",
      "Arline",
      "Alisha"
    ],
    "likes": [
      "King",
      "Kirkland",
      "Donovan",
      "Yates"
    ]
  },
  {
    "_id": "6233a3b85053898e68a57549",
    "isActive": false,
    "age": 20,
    "name": "Jerry Calderon",
    "gender": "female",
    "comment": "great work Jerry Calderon",
    "tags": [
      "Sampson",
      "Adele",
      "Rosario",
      "Natalia"
    ],
    "likes": [
      "Bertha",
      "Michael",
      "Swanson",
      "Tanisha"
    ]
  },
  {
    "_id": "6233a3b88d4c1b4cd6d9f421",
    "isActive": true,
    "age": 21,
    "name": "Leann Acosta",
    "gender": "female",
    "comment": "great work Leann Acosta",
    "tags": [
      "Wendi",
      "Corina",
      "Moon",
      "Martha"
    ],
    "likes": [
      "Cruz",
      "Ines",
      "Griffin",
      "Alana"
    ]
  },
  {
    "_id": "6233a3b832e3b03394a1a8af",
    "isActive": true,
    "age": 24,
    "name": "Gwen Williamson",
    "gender": "female",
    "comment": "great work Gwen Williamson",
    "tags": [
      "Knowles",
      "Vanessa",
      "Bernadine",
      "Annmarie"
    ],
    "likes": [
      "Taylor",
      "Adrienne",
      "Ramsey",
      "Yvette"
    ]
  },
  {
    "_id": "6233a3b8bc66bb597bcd2db2",
    "isActive": true,
    "age": 20,
    "name": "Mclaughlin Knight",
    "gender": "male",
    "comment": "great work Mclaughlin Knight",
    "tags": [
      "Claudette",
      "Brock",
      "Dunn",
      "Earlene"
    ],
    "likes": [
      "Lauren",
      "Britt",
      "Bryant",
      "Bernice"
    ]
  }
]

