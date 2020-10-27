
module.exports = function(sequelize, DataTypes) {
  var Emote = sequelize.define("Emote", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    anger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contempt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disgust: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    happiness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    neutral: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sadness: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    surprise: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Emote.associate = function(models) {
    // We're saying that a Emote should belong to an User
    // A Emote can't be created without an User due to the foreign key constraint
    Emote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Emote;
};
