export const ParticipantTemplate = (db, DataTypes) => {
    return db.define("participants", {
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
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        joined_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true,
        indexes: [
            {
                unique: true,
                fields: ['activity_id', 'student_id']
            }
        ]
    });
};
