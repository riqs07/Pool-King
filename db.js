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
		autoIncrement: true,
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
		autoIncrement: true,
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
	// Model attributes are defined here
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	size: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

const Chemicals = db.define("chemical", {
	// Model attributes are defined here
	userID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
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
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	Chlorine: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	Alkalinity: DataTypes.INTEGER,
	Calcium: DataTypes.INTEGER,

	Cynuaric: DataTypes.INTEGER,
    Tempature: DataTypes.INTEGER,
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        primaryKey:true
      },
     
});
