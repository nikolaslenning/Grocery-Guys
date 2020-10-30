
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
      type: DataTypes.DECIMAL(10,3),
      allowNull: false,
    },
    contempt: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    disgust: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    fear: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    happiness: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    neutral: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false,
    },
    sadness: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    surprise: {
      type: DataTypes.DECIMAL(10,6),
      allowNull: false,
    },

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
  Emote.sync();
  return Emote;
};
