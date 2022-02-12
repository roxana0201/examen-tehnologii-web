module.exports = (sequelize, DataTypes) => {
    const VirtualShelf = sequelize.define('virtualshelf', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        description: DataTypes.STRING,
        date:DataTypes.STRING
    });

    VirtualShelf.associate = models => {
        VirtualShelf.hasMany(models.book, {
            onDelete: "cascade"
        });
    }
    return VirtualShelf;

}