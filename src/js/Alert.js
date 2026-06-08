import { renderListWithTemplate } from './utils.mjs';

const alertElement = document.querySelector('.alert-list');

function alertTemplate(alert) {
  return `<p style='background: ${alert.background}; color: ${alert.color};'>${alert.message}</p>`;
}

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class Alert {
  construtor(alertPath) {
    this.alertPath = alertPath;
  }

  async init() {
    const alertData = await fetch(`../json/alerts.json`);
    const alertList = await convertToJson(alertData);
    this.renderAlerts(alertList);
  }

  renderAlerts(alertList) {
    if (alertList > 0) {
      renderListWithTemplate(alertTemplate, alertElement, alertList);
    }
  }
}