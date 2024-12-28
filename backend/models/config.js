import { DataTypes, Sequelize } from "sequelize";
import { UserTemplate } from "./user.js";
import { ActivityTemplate } from "./activity.js";
import { FeedbackTemplate } from "./feedback.js";
import { ParticipantTemplate } from "./participant.js";

export const db = new Sequelize({
    dialect: "sqlite",
    storage: "continuous_feedback.db"
});

export const synchronizeDatabase = async () => {
    await db.authenticate();
    await db.sync();
};

const User = UserTemplate(db, DataTypes);
const Activity = ActivityTemplate(db, DataTypes);
const Feedback = FeedbackTemplate(db, DataTypes);
const Participant = ParticipantTemplate(db, DataTypes);

User.hasMany(Activity, { foreignKey: 'professor_id', as: 'createdActivities' });
Activity.belongsTo(User, { foreignKey: 'professor_id', as: 'professor' });

User.belongsToMany(Activity, { through: Participant, foreignKey: 'student_id', as: 'participatedActivities' });
Activity.belongsToMany(User, { through: Participant, foreignKey: 'activity_id', as: 'activityParticipants' });

Activity.hasMany(Feedback, { foreignKey: 'activity_id', as: 'feedbacks' });
Feedback.belongsTo(Activity, { foreignKey: 'activity_id', as: 'activity' });

export {
    User,
    Activity,
    Feedback,
    Participant
};