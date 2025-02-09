import express from 'express';
import { saveSentEmail, getEmails, moveEmailsToBin ,toggleStarredEmails,deleteEmail} from '../controller/email-controller.js';

const routes = express.Router();

routes.post('/save', saveSentEmail);
routes.get('/emails/:type', getEmails);
routes.post('/save-draft', saveSentEmail);
routes.post('/bin', moveEmailsToBin); // Modified for soft and permanent deletion
routes.post('/starred',toggleStarredEmails);
routes.delete('/delete',deleteEmail);
export default routes;
