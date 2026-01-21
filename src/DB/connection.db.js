import  {Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../../config/config.service.js';



// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql', 
  port:DB_PORT
});

export const testConnection =async()=>{
  try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:',error);
}
}   

export const syncConnection =async()=>{
  try {
  await sequelize.sync({alter:true,force:false});
  console.log('Connection  sync has been established successfully.');
} catch (error) {
  console.error('Unable to sync  connect to the database:',error);
}
} 