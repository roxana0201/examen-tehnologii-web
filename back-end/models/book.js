module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        genre:DataTypes.STRING,
        virtualshelfId:DataTypes.INTEGER
    });

    Book.associate = models => {
        Book.belongsTo(models.virtualshelf, {
            as: 'playlist',
            foreignKey: "virtualshelfId"
        });

    }

    return Book;
}