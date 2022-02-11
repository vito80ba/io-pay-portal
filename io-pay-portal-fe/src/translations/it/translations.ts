export const TRANSLATIONS_IT = {
  mainPage: {
    footer: {
      accessibility: "Accessibilità",
      help: "Aiuto",
    },
  },
  paymentPage: {
    title: "Cosa devi pagare?",
    description: "Inserisci i dati come riportato sull’avviso di pagamento.",
    helpLink: "Dove trovo i dati?",
    privacyDesc: "Premendo 'Continua' dichiari di aver letto e compreso l'",
    googleDesc: "Form protetto tramite reCAPTCHA e Google",
    privacy: "Informativa Privacy e i Termini e condizioni d'uso del servizio.",
    privacyPolicy: "Privacy Policy",
    serviceTerms: "Termini di servizio",
    formFields: {
      billCode: "Codice Avviso",
      cf: "Codice Fiscale Ente Creditore",
    },
    formErrors: {
      required: "Campo obbligatorio",
      minCode: "Inserisci 18 cifre",
      minCf: "Inserisci 11 cifre",
    },
    formButtons: {
      cancel: "Indietro",
      submit: "Continua",
    },
  },
  paymentSummaryPage: {
    title: "Avviso di pagamento",
    description:
      "pagoPA aggiorna automaticamente l'importo per assicurarti di aver pagato esattamente quanto dovuto ed evitarsi così more o altri interessi",
    amount: "Importo aggiornato",
    creditor: "Ente Creditore",
    causal: "Causale",
    cf: "Codice Fiscale Ente Creditore",
    iuv: "Codice IUV",
    buttons: {
      cancel: "Indietro",
      submit: "Paga questo avviso",
    },
  },
  paymentEmailPage: {
    title: "Inserisci la tua email",
    description: "Riceverai l'esito del pagamento a questo indirizzo",
    formFields: {
      email: "Il tuo indirizzo email",
      confirmEmail: "Ripeti di nuovo",
    },
    formErrors: {
      required: "Campo obbligatorio",
      invalid: "Inserisci un indirizzo email valido",
      notEqual: "Gli indirizzi email devono coincidere",
    },
    formButtons: {
      submit: "Continua",
    },
  },
  indexPage: {
    title: "Paga un avviso",
    description:
      "Puoi usare la tua carta di debito o credito, senza fare alcun login. Riceverai l'esito del pagamento via email.",
  },
  paymentChoice: {
    qr: {
      title: "Inquadra il codice QR",
      description: "Usa la tua webcam o fotocamera",
    },
    form: {
      title: "Inserisci tu i dati",
      description: "Codice Avviso e Codice Fiscale Ente",
    },
  },
  general: {
    and: "e",
  },
  inputCardPage: {
    title: "Inserisci i dati della carta",
    formFields: {
      name: "Titolare carta",
      number: "Numero carta",
      expirationDate: "Scadenza",
      cvv: "Codice di sicurezza",
      cid: "CID (4 cifre)",
    },
    formErrors: {
      required: "Campo obbligatorio",
      name: "Inserisci come riportato sulla carta",
      number: "Inserisci un numero valido",
      expirationDate: "Inserisci mm/aa",
      cvv: "Inserisci 3 cifre",
      cid: "Inserisci 4 cifre",
    },
    privacyDesc: "Ho letto e compreso ",
    privacyTerms:
      "l'informativa privacy e accetto i termini e condizioni d'uso",
    helpLink: "Dove trovo il codice di sicurezza?",
    modal: {
      title: "Codice di sicurezza",
      description:
        "È un codice a tre cifre, chiamato CVV o CVS, che puoi trovare sul retro della tua carta.",
      descriptionAE:
        "Sulle carte American Express il codice (CID) è a quattro cifre ed è posizionato sul fronte.",
    },
  },
  errorButton: {
    help: "Contatta l'assistenza",
    close: "Chiudi",
  },
  ERRORE_EC: {
    title: "Spiacenti, l’Ente Creditore sta avendo problemi nella risposta",
    buttons: {
      help: "Contatta l'assistenza",
      close: "Chiudi",
    },
  },
  ERRORE_TECNICO: {
    title: "Spiacenti, c’è un problema tecnico con questo avviso",
  },
  ERRORE_DATI: {
    title: "Spiacenti, i dati dell'avviso non sono corretti",
  },
  NOTLISTED: {
    title: "Spiacenti, si è verificato un errore imprevisto",
    body: "Prova di nuovo o contattaci per ricevere assistenza.",
  },
  PAA_PAGAMENTO_DUPLICATO: {
    title: "Questo avviso è stato già pagato!",
    body:
      "La ricevuta è stata inviata all'indirizzo email che hai indicato durante il pagamento.",
  },
  PAA_PAGAMENTO_IN_CORSO: {
    title: "Il pagamento è già in corso, riprova tra qualche minuto",
    body: "Se è passato troppo tempo, segnalacelo!",
  },
  PPT_PAGAMENTO_DUPLICATO: {
    title: "Questo avviso è stato già pagato!",
    body:
      "La ricevuta è stata inviata all'indirizzo email che hai indicato durante il pagamento.",
  },
  PPT_PAGAMENTO_IN_CORSO: {
    title: "Il pagamento è già in corso, riprova tra qualche minuto",
    body: "Se è passato troppo tempo, segnalacelo!",
  },
  PAA_PAGAMENTO_ANNULLATO: {
    title: "Spiacenti, l’Ente Creditore ha revocato questo avviso",
    body: "Contatta l’Ente per maggiori informazioni.",
  },
  PAA_PAGAMENTO_SCADUTO: {
    title: "Spiacenti, l’avviso è scaduto e non è più possibile pagarlo",
    body: "Contatta l’Ente per maggiori informazioni.",
  },
  ErrorCodeDescription: "Codice di errore per l'assistenza",
  clipboard: {
    copy: "Copia",
    copied: "Copiato",
  },
  GenericError: {
    title: "Spiacenti, si è verificato un errore imprevisto",
    body: "Prova di nuovo o contattaci per ricevere assistenza.",
  },
};
