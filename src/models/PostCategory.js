module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory',
    {
        postId: { type: DataTypes.INTEGER,
            primaryKey: true,
        field: 'post_id' },
        categoryId: { type: DataTypes.INTEGER,
            primaryKey: true,
        field: 'category_id' },
    },
        {
            timestamps: false,
            underscored: true,
            tableName: 'posts_categories',
        },
    
    );
    PostCategory.associate = (models) => {

        models.BlogPost.belongsToMany(models.Category, {
            foreignKey: 'postId',
            as: 'categories',
            otherKey: 'categoryId',
            through: PostCategory,
        });

        models.Category.belongsToMany(models.BlogPost, {
            foreignKey: 'categoryId',
            as: 'blogPosts',
            otherKey: 'postId',
            through: PostCategory,
        });


    };

    return PostCategory;

};

