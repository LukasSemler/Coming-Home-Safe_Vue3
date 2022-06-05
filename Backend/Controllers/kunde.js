import { checkIfUserExists, registerUser, loginUser, changePasswordDB } from '../Models/models.js';
import validator from 'is-my-json-valid';
import sendCode from '../Mail/mail.js';

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

//Generiert einen Authentifikations-Code
let makeAuthCode = () => {
  let code = '';
  let auswahl = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  //Auth-Code generieren wenn Kunde noch nicht vorhanden
  for (let index = 0; index < 6; index++) {
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
  const code = makeAuthCode();

  //Code an den User schicken
  sendCode(code, email, vorname, nachname, res);
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

export { sendCodeUser, sendThumbnail };
