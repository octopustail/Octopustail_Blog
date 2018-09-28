module.exports = {
    host:process.env.HOST || '127.0.0.2',
    port:process.env.PORT ||(process.env.NODE_ENV === 'production'?8082:3001),
    apiHost:process.env.APIHOST || '127.0.0.2',
    apiPort:process.env.APIPORT || '3031',
    dbHost:"localhost",
    dbPort:"27017",
    app:{
        title:"personal blog",
        description:'Nealyang\'s personal blog demo',
        head:{
            titleTemplate:'blog',
            meta:[
                {
                    name:"description",
                    content:"react express demo"
                },
                {charset:"utf-8"}
            ]
        }
    }
};