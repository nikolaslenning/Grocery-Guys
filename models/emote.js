
module.exports = function (sequelize, DataTypes) {
  var Emote = sequelize.define("Emote", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    anger: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    contempt: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    disgust: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    fear: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    happiness: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    neutral: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    sadness: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    surprise: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    deleteHash: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }

  });

  Emote.associate = function (models) {
    // We're saying that a Emote should belong to an User
    // A Emote can't be created without an User due to the foreign key constraint
    Emote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Emote.sync();
  return Emote;
};
