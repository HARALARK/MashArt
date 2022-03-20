USER.JS
TEST DATA

[
  '{{repeat(12, 7)}}',
  {
    _id: '{{objectId()}}',
    isActive: '{{bool()}}',
    age: '{{integer(20, 40)}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    email: '{{email()}}',
    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    blockusers: '{{firstName()}} {{objectId()}}',
    
    following: [
    '{{repeat(2)}}',
 		 {
  
   			id:'{{index()}}',
           name: '{{firstName()}} {{surname()}}'
  }
  ],
  
    followers: [
      '{{repeat(3)}}',
      {
        id: '{{objectId()}}',
        name: '{{firstName()}} {{surname()}}'
      }
     
  ]


    
  }
]


[
  {
    "_id": "6233706cb0739cc7faf2c8f2",
    "isActive": true,
    "age": 40,
    "name": "Mcpherson Bright",
    "gender": "male",
    "email": "mcphersonbright@pholio.com",
    "registered": "2020-11-27T09:41:40 -04:00",
    "blockusers": "Howard 6233706ca34555ad12e3c3df",
    "following": [
      {
        "id": 0,
        "name": "Margaret Mcdonald"
      },
      {
        "id": 1,
        "name": "Serena Sanford"
      }
    ],
    "followers": [
      {
        "id": "6233706cee0bb9c3d0433565",
        "name": "Selena Gomez"
      },
      {
        "id": "6233706c5790f4a314373e09",
        "name": "Allison Garner"
      },
      {
        "id": "6233706cb27fda998dc411c4",
        "name": "Lucy Bell"
      }
    ]
  },
  {
    "_id": "6233706c33dd0cc958517639",
    "isActive": false,
    "age": 40,
    "name": "Stevenson Meyers",
    "gender": "male",
    "email": "stevensonmeyers@pholio.com",
    "registered": "2017-09-02T12:48:49 -04:00",
    "blockusers": "Jeannie 6233706cf810820d9ffc8f08",
    "following": [
      {
        "id": 0,
        "name": "Lorie Glover"
      },
      {
        "id": 1,
        "name": "Howell Middleton"
      }
    ],
    "followers": [
      {
        "id": "6233706c5e28c549bbce674e",
        "name": "Francine Booth"
      },
      {
        "id": "6233706c3e4aa13db1a9d168",
        "name": "Pansy Klein"
      },
      {
        "id": "6233706c204e3644ae30a6f5",
        "name": "Tanya Pacheco"
      }
    ]
  },
  {
    "_id": "6233706cc8abcebea87dd7cf",
    "isActive": false,
    "age": 37,
    "name": "Latisha Deleon",
    "gender": "female",
    "email": "latishadeleon@pholio.com",
    "registered": "2021-10-07T05:23:11 -04:00",
    "blockusers": "Marina 6233706ca2be0083976dc7f0",
    "following": [
      {
        "id": 0,
        "name": "Susanne Noble"
      },
      {
        "id": 1,
        "name": "Rosa Clayton"
      }
    ],
    "followers": [
      {
        "id": "6233706ca6af49206b42bbca",
        "name": "Cohen Cooper"
      },
      {
        "id": "6233706c11a827d278147034",
        "name": "Rich Nielsen"
      },
      {
        "id": "6233706c7d263e4a84e9d376",
        "name": "Franklin Mcfadden"
      }
    ]
  },
  {
    "_id": "6233706c09ad2c58547d42a0",
    "isActive": false,
    "age": 21,
    "name": "Tiffany Jefferson",
    "gender": "female",
    "email": "tiffanyjefferson@pholio.com",
    "registered": "2019-07-09T09:49:24 -04:00",
    "blockusers": "Harrell 6233706cb86f079dab8fb9d7",
    "following": [
      {
        "id": 0,
        "name": "Wright Grimes"
      },
      {
        "id": 1,
        "name": "Dollie Lee"
      }
    ],
    "followers": [
      {
        "id": "6233706c154e3b06e6bafaae",
        "name": "Watson Kidd"
      },
      {
        "id": "6233706ccd66663ca7a7629d",
        "name": "Myers Delgado"
      },
      {
        "id": "6233706c71d247dffe428ce4",
        "name": "Margery Melendez"
      }
    ]
  },
  {
    "_id": "6233706cee1a4e93bf25113e",
    "isActive": false,
    "age": 35,
    "name": "Odom Perez",
    "gender": "male",
    "email": "odomperez@pholio.com",
    "registered": "2018-11-30T06:26:52 -04:00",
    "blockusers": "Flores 6233706c2c33f376e2c341b6",
    "following": [
      {
        "id": 0,
        "name": "Agnes Goff"
      },
      {
        "id": 1,
        "name": "Kris Higgins"
      }
    ],
    "followers": [
      {
        "id": "6233706c9611cc54cedc0135",
        "name": "Kristine Osborne"
      },
      {
        "id": "6233706c0871df1a4d96e8c9",
        "name": "Mckee Gaines"
      },
      {
        "id": "6233706c66acce4a4dfe5890",
        "name": "Mcneil Morris"
      }
    ]
  },
  {
    "_id": "6233706ca82638e8e31275cb",
    "isActive": false,
    "age": 40,
    "name": "Beulah Dyer",
    "gender": "female",
    "email": "beulahdyer@pholio.com",
    "registered": "2017-08-04T07:41:13 -04:00",
    "blockusers": "Mary 6233706cd969d9e559fca477",
    "following": [
      {
        "id": 0,
        "name": "Lott Michael"
      },
      {
        "id": 1,
        "name": "Zimmerman Cline"
      }
    ],
    "followers": [
      {
        "id": "6233706c6398fb5477138ad2",
        "name": "Everett Butler"
      },
      {
        "id": "6233706c52ebc268cfd922ed",
        "name": "Goodwin Roach"
      },
      {
        "id": "6233706c70720846858374ae",
        "name": "Kaitlin Tate"
      }
    ]
  },
  {
    "_id": "6233706cfb509f3f5bc7c5fa",
    "isActive": true,
    "age": 31,
    "name": "Lilia Glenn",
    "gender": "female",
    "email": "liliaglenn@pholio.com",
    "registered": "2018-03-21T06:48:06 -04:00",
    "blockusers": "Sims 6233706c7aeae3546d92247a",
    "following": [
      {
        "id": 0,
        "name": "Cooper Bryant"
      },
      {
        "id": 1,
        "name": "Baird Schwartz"
      }
    ],
    "followers": [
      {
        "id": "6233706c8c34196374fc4ea5",
        "name": "Walker Wooten"
      },
      {
        "id": "6233706c264ffa129476fcef",
        "name": "Davenport Cantu"
      },
      {
        "id": "6233706ce179fde0c64aee5b",
        "name": "Doyle Preston"
      }
    ]
  },
  {
    "_id": "6233706c9dd0943f9ea03bc6",
    "isActive": false,
    "age": 32,
    "name": "Osborne Riley",
    "gender": "male",
    "email": "osborneriley@pholio.com",
    "registered": "2021-02-27T01:21:45 -04:00",
    "blockusers": "Vasquez 6233706ca65aa44b0329910e",
    "following": [
      {
        "id": 0,
        "name": "Morton Schultz"
      },
      {
        "id": 1,
        "name": "Horn Bates"
      }
    ],
    "followers": [
      {
        "id": "6233706cb383ab82d2b8544f",
        "name": "Patel Hobbs"
      },
      {
        "id": "6233706cac6778a44cdf6192",
        "name": "Kathrine Sellers"
      },
      {
        "id": "6233706c32de4d1f08f6ccbd",
        "name": "Maryellen Richardson"
      }
    ]
  },
  {
    "_id": "6233706c11492422b4093246",
    "isActive": true,
    "age": 30,
    "name": "Wilkinson Ratliff",
    "gender": "male",
    "email": "wilkinsonratliff@pholio.com",
    "registered": "2018-08-24T08:13:38 -04:00",
    "blockusers": "Shelby 6233706c0bdfc0be4a4574ad",
    "following": [
      {
        "id": 0,
        "name": "Snyder William"
      },
      {
        "id": 1,
        "name": "Celia Chapman"
      }
    ],
    "followers": [
      {
        "id": "6233706cc58a7b38a4555d87",
        "name": "Ruby Buckner"
      },
      {
        "id": "6233706c5a46bcf426dbf2cd",
        "name": "Young Bennett"
      },
      {
        "id": "6233706cbcc58c400deb68e6",
        "name": "Brittney Gilmore"
      }
    ]
  },
  {
    "_id": "6233706cf8ba6b3b31014510",
    "isActive": true,
    "age": 27,
    "name": "Hooper Workman",
    "gender": "male",
    "email": "hooperworkman@pholio.com",
    "registered": "2018-12-07T09:12:15 -04:00",
    "blockusers": "Celina 6233706cacda171b353a0969",
    "following": [
      {
        "id": 0,
        "name": "Mullen Chaney"
      },
      {
        "id": 1,
        "name": "Katrina Farley"
      }
    ],
    "followers": [
      {
        "id": "6233706c7f28408b701704a1",
        "name": "Gates Wong"
      },
      {
        "id": "6233706c1b5bd2f85a66059b",
        "name": "Melanie Stone"
      },
      {
        "id": "6233706c4217d4b39b0d9cd2",
        "name": "Estrada Pickett"
      }
    ]
  }
]