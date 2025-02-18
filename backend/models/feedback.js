export const FeedbackTemplate = (db, DataTypes) => {
    return db.define("feedback", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "activities",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        emoji: {
            type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true,
        indexes: [
            {
                fields: ['activity_id']
            },
            {
                fields: ['emoji']
            },
            {
                fields: ['timestamp']
            }
        ]
    });
};