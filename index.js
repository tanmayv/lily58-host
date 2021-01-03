"use strict";
const hid = require("node-hid");
const KEYBOARD_NAME = "Lily58";
const KEYBOARD_USAGE_ID = 0x61;
const KEYBOARD_USAGE_PAGE = 0xff60;
const KEYBOARD_UPDATE_TIME = 1000;

let lily = null;

const receive = (input) => {};
const update = (keyboard) => {
  const today = new Date();
  let birthday = new Date();
  birthday.setMonth(0, 6);
  if (birthday < today) {
    birthday.setFullYear(birthday.getFullYear() + 1);
  }
  const diff = getDateDiff(today, birthday);
  if (diff === 0) {
    write("Happy birthday Sonal!", keyboard);
  } else if (diff < 6) {
    write(`Hpy Bday Mnth (T-${diff})`, keyboard);
  } else {
    write(`${diff} to go, hng in der`, keyboard);
  }
};

const getDateDiff = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return date1 < date2 ? diffDays : -diffDays;
};
const write = (message, keyboard) => {
  message =
    message +
    Array.from({ length: 21 - message.length }, (v, i) => " ").join("");
  keyboard.write(
    [0].concat(message.split("").map((v, i) => message.charCodeAt(i)))
  );
};

const init = (keyboard) => {
  keyboard.on("data", receive);
  keyboard.on("error", () => (lily = null));
};
setInterval(() => {
  if (!lily) {
    const devices = hid.devices();
    const keyboard = devices.find(
      (d) => d.product === KEYBOARD_NAME && d.usage === KEYBOARD_USAGE_ID
    );
    if (!!keyboard) {
      lily = new hid.HID(keyboard.path);
      init(lily);
    }
  } else {
    update(lily);
  }
}, KEYBOARD_UPDATE_TIME);
