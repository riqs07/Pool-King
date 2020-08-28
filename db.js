const { Sequelize, DataTypes, QueryTypes } = require("sequelize");

/////////// DB CONNECTION

var db = new Sequelize("pool_king", "root", "wolvesCDQ49!", {
	host: "localhost",
	dialect: "mysql",

	pool: {
		max: 5,
		min: 0,
		idle: 10000,
	},
});

db.authenticate();

const Organization = db.define("organization", {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [6, 90],
		},
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			isEmail: true,
		},
	},
});
const User = db.define("user", {
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},

	organizationID: {
		type: DataTypes.INTEGER,
		references: {
			model: "organizations",
			key: "id",
		},
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
const Pool = db.define("pool", {
	// size in gallons 	
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
	},
	organizationID:{
		type:DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: "organizations",
			key: "id",
		},

	},

	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gallons: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
});

const Chemicals = db.define("chemicals", {
	//free chlorin ppm

	userID: {
		type: DataTypes.INTEGER,
		references: {
			model: "users",
			key: "id",
		},
	},

	poolID: {
		type: DataTypes.INTEGER,
		allowNull: false,
        primaryKey:true,
        references: {
			model: "pools",
			key: "id",
		},
	},

	pH: {
		type: DataTypes.DECIMAL(10,1),
		allowNull: false,
	},
	Chlorine: {
		type: DataTypes.DECIMAL(10,1),
		allowNull: false,
	},
	Alkalinity: DataTypes.INTEGER,
	Calcium: DataTypes.INTEGER,

	Cynuaric: DataTypes.INTEGER,
	Tempature: DataTypes.DECIMAL(10,1),
	
	createdAt:{
		type:DataTypes.DATE,
		primaryKey:true,
		defaultValue: Sequelize.NOW(),
		allowNull: false
	},
		
},{timestamps: false});

// intehrate weather api to always get weather as well 


const bulkOrgs = [
	{id:1,name:'YMCA',email:'ymca@gmail.com',password:'FAKEPASS'},
	{id:2,name:'City Aquaitcs',email:'aqua@gmail.com',password:'FAKEPASS'}
]

const bulkUsers = [
	{id:1,organization:1,name:'Terriq'},
	{id:2,organizationID:1,name:'Tom'},
	{id:3,organizationID:2,name:'Sarah'},
	{id:4,organizationID:2,name:'Tom'},
]

const bulkPool = [
	{organizationID:1,id:1,name:'Play',gallons:30000},
	{organizationID:1,id:2,name:'Outdoor',gallons:100000},
	{organizationID:1,id:3,name:'Indoor',gallons:60000},
	{organizationID:2,id:4,name:'Olymic',gallons:660000 },
]


const bulkChems = [
	{id:1,userID:1,poolID:1,pH:7.3,Chlorine:3,Alkalinity:60,Calcium:300,Tempature:86,createdAt:'2020-08-27 14:41:33'},
	{id:2,userID:1,poolID:1,pH:7.5,Chlorine:2,Tempature:85,createdAt:'2020-08-27 15:41:33'},
	{id:3,userID:1,poolID:1,pH:7.6,Chlorine:1,Tempature:86,createdAt:'2020-08-27 16:41:33'},
	{id:4,userID:1,poolID:1,pH:7.5,Chlorine:3,Tempature:85,createdAt:'2020-08-27 17:41:33'},
]
// Organization.bulkCreate(bulkOrgs)

// User.bulkCreate(bulkUsers)
// Pool.bulkCreate(bulkPool)
// Chemicals.bulkCreate(bulkChems)


exports.Chemicals = Chemicals