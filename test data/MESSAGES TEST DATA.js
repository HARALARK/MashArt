//MESSAGES TEST DATA

[
  '{{repeat(12, 7)}}',
  {
    _id: '{{objectId()}}',
    senderid: '{{objectId()}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
     registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
     updated: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    //comment: '{{lorem(1, "paragraphs")}}',
    // chat: '{{lorem(1, "paragraphs")}}',
    
     comment: function(tags) {
      return 'great work ' + this.name;
    },
    
    text: function(tags) {
      return 'hello ' + this.name;
  }
    
  }
  
  
  ]
  

[
  {
    "_id": "6237864b7589bca6a79c34ce",
    "senderid": "6237864b5609dad807f6f553",
    "name": "Frye Golden",
    "gender": "male",
    "registered": "2018-02-20T09:21:42 -04:00",
    "updated": "2014-07-23T09:02:52 -04:00",
    "comment": "great work Frye Golden",
    "text": "hello Frye Golden"
  },
  {
    "_id": "6237864b7e1d12dc76321173",
    "senderid": "6237864bce3d8cc4a64b1f47",
    "name": "Sherman Beach",
    "gender": "male",
    "registered": "2016-07-03T12:36:22 -04:00",
    "updated": "2022-02-21T04:41:16 -04:00",
    "comment": "great work Sherman Beach",
    "text": "hello Sherman Beach"
  },
  {
    "_id": "6237864b961830a7aa0cff78",
    "senderid": "6237864b4a2bc90a3aebff26",
    "name": "Summers Simpson",
    "gender": "male",
    "registered": "2017-01-03T06:45:57 -04:00",
    "updated": "2015-04-12T01:00:32 -04:00",
    "comment": "great work Summers Simpson",
    "text": "hello Summers Simpson"
  },
  {
    "_id": "6237864b605bfca7e40db565",
    "senderid": "6237864bc2c148af3b94327c",
    "name": "Dean Whitaker",
    "gender": "male",
    "registered": "2015-05-31T11:06:25 -04:00",
    "updated": "2017-09-20T12:40:17 -04:00",
    "comment": "great work Dean Whitaker",
    "text": "hello Dean Whitaker"
  },
  {
    "_id": "6237864bce26620671d6c018",
    "senderid": "6237864bb077b6fac6145519",
    "name": "Ford Rodgers",
    "gender": "male",
    "registered": "2018-03-16T06:42:28 -04:00",
    "updated": "2015-04-07T03:36:39 -04:00",
    "comment": "great work Ford Rodgers",
    "text": "hello Ford Rodgers"
  },
  {
    "_id": "6237864bacd14867f5e98dec",
    "senderid": "6237864ba5256c3214a80e1f",
    "name": "Watts Wiley",
    "gender": "male",
    "registered": "2018-07-07T06:13:30 -04:00",
    "updated": "2015-12-05T06:27:47 -04:00",
    "comment": "great work Watts Wiley",
    "text": "hello Watts Wiley"
  },
  {
    "_id": "6237864bf5e4d1ccf57817ff",
    "senderid": "6237864b4b954d38ddf4f931",
    "name": "Irene Sparks",
    "gender": "female",
    "registered": "2014-08-06T07:37:31 -04:00",
    "updated": "2021-03-24T02:02:50 -04:00",
    "comment": "great work Irene Sparks",
    "text": "hello Irene Sparks"
  },
  {
    "_id": "6237864b1c241788a1298bcc",
    "senderid": "6237864b23212f83e316bea9",
    "name": "Whitfield Mcbride",
    "gender": "male",
    "registered": "2021-10-01T09:00:13 -04:00",
    "updated": "2020-10-14T04:50:04 -04:00",
    "comment": "great work Whitfield Mcbride",
    "text": "hello Whitfield Mcbride"
  },
  {
    "_id": "6237864b812a58bf2b57f23f",
    "senderid": "6237864b550c0adec8235586",
    "name": "Ingrid Kemp",
    "gender": "female",
    "registered": "2019-10-24T03:22:49 -04:00",
    "updated": "2017-10-19T11:32:18 -04:00",
    "comment": "great work Ingrid Kemp",
    "text": "hello Ingrid Kemp"
  },
  {
    "_id": "6237864b2df52ba612cb10a8",
    "senderid": "6237864b08d2468c90c2eaa4",
    "name": "Janice Barry",
    "gender": "female",
    "registered": "2015-01-08T05:15:11 -04:00",
    "updated": "2019-09-21T05:27:06 -04:00",
    "comment": "great work Janice Barry",
    "text": "hello Janice Barry"
  }
]