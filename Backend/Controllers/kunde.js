import {
  checkIfUserExists,
  registerUserDB,
  loginUser,
  changePasswordDB,
  sendPositionDB,
} from '../Models/models.js';
import validator from 'is-my-json-valid';
import { SendAuthCodePerMail, SendNewPasswordPerMail } from '../Mail/mail.js';

import fs from 'fs';

import path from 'path';

const dirname = path.resolve();

const validateUser = validator({
  required: true,
  type: 'object',
  properties: {
    vorname: {
      required: true,
      type: 'string',
    },
    nachname: {
      required: true,
      type: 'string',
    },
    email: {
      required: true,
      type: 'string',
    },
    passwort: {
      required: true,
      type: 'string',
    },
    strasse: {
      required: true,
      type: 'string',
    },
    plz: {
      required: true,
      type: 'string',
    },
    ort: {
      required: true,
      type: 'string',
    },
    hobbysinteressen: {
      require: true,
      type: 'string',
    },
    geburtsdatum: {
      require: true,
      type: 'string',
    },
  },
});

//Generiert einen Code (Passwort vergessen + Auth-Code)
let makeAuthCode = (length) => {
  let code = '';
  let auswahl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  //Auth-Code generieren wenn Kunde noch nicht vorhanden
  for (let index = 0; index < length; index++) {
    let rand = Math.round(Math.random() * (auswahl.length - 0));
    code += auswahl[rand];
  }
  return code;
};

const sendCodeUser = async (req, res) => {
  console.log('Route wurde aufgerufen');
  const { email, vorname, nachname } = req.body;

  //Schauen ob der User schon in der DB vorhanden ist
  const vorhanden = await checkIfUserExists(email);
  console.log('Vorhanden: ', vorhanden);

  // Wenn der User schon vorhanden ist 400 zurückschicken
  if (vorhanden) return res.status(400).send('Der User ist bereits vorhanden');
  console.log('Vorhanden', vorhanden);

  // Code generieren
  const code = makeAuthCode(6);

  //Code an den User schicken
  SendAuthCodePerMail(code, email, vorname, nachname, res);
};

const sendThumbnail = async (req, res) => {
  try {
    const { titel, datentyp } = req.body;
    console.log(titel, datentyp);
    const uniqueImageName = path.join(dirname, `public/images/${titel}.${datentyp}`);
    //schauen ob das Bild schon existiert, wenn ja löschen und neu erstellen
    if (fs.existsSync(`${dirname}/public/images/${titel}.${datentyp}`)) {
      fs.unlinkSync(`${dirname}/public/images/${titel}.${datentyp}`);
    }

    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(404).send('Something went wrong');
  }
};

const sendDataRegister = async (req, res) => {
  console.log(req.body);
  const result = await registerUserDB(req.body);

  if (result) return res.status(200).send('Erfolgreich registriert');

  return res.status(500).send('Fehler beim Registrieren');
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const result = await loginUser(email, password);
  console.log('result: ', result);

  //Schauen ob der User ein Admin ist, wenn ja Mail schicken, sonst normal anmelden
  if (result) {
    if (result.isadmin) {
      const code = makeAuthCode(6);
      SendAuthCodePerMail(code, email, `${result.vorname} ${result.nachname}`, code, res, result);
      return res.status(200).send(JSON.stringify({ foundUser: result, code: code }));
    } else if (!result.isAdmin)
      return res.status(200).send(JSON.stringify({ foundUser: result, code: 'kein Admin' }));
  }

  return res.status(500).send('Fehler beim Login');
};

const sendPosition = async (req, res) => {
  const position = req.body;

  const result = await sendPositionDB(position);

  if (result) return res.status(200).send('Position successfully sent');

  res.status(500).send('Error when sending position');
};

const sendNewPassword = async (req, res) => {
  //Daten holen
  const { email } = req.body;

  //Neues Passwort generieren
  const newPw = makeAuthCode(11);

  //Neues Passwort in DB schreiben
  const result = await changePasswordDB(email, newPw);

  if (result) {
    //Email an User senden + Serverfeedback zurückgeben
    SendNewPasswordPerMail(newPw, email, res);
  } else {
    //ServerFeedback und Email an den User schicken
    res.status(210).send('Fehler beim Erstellen des neuen Passwortes');
  }
};

export { sendCodeUser, sendThumbnail, sendDataRegister, login, sendPosition, sendNewPassword };
