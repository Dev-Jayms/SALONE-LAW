import { LegalTemplate } from '../types/legal';

export const SIERRA_LEONE_LEGAL_TEMPLATES: LegalTemplate[] = [
  {
    "id": "tpl-bail-affidavit",
    "title": "Affidavit in Support of Bail Application (High Court)",
    "category": "Criminal Practice",
    "description": "Standard High Court affidavit template for urgent bail applications pursuant to Section 79 of the Criminal Procedure Act 1965 and Section 17 of the 1991 Constitution.",
    "fields": [
      {
        "key": "courtJurisdiction",
        "label": "Court & Location",
        "placeholder": "IN THE HIGH COURT OF SIERRA LEONE (CRIMINAL JURISDICTION) HOLDEN AT FREETOWN",
        "defaultValue": "IN THE HIGH COURT OF SIERRA LEONE (CRIMINAL JURISDICTION) HOLDEN AT FREETOWN"
      },
      {
        "key": "caseNumber",
        "label": "Case / Suit Number",
        "placeholder": "MISC. APP. NO: /2026",
        "defaultValue": "MISC. APP. NO: /2026"
      },
      {
        "key": "accusedName",
        "label": "Applicant / Accused Name",
        "placeholder": "John Sesay",
        "defaultValue": "John Sesay"
      },
      {
        "key": "deponentName",
        "label": "Deponent Name (Surety/Relative)",
        "placeholder": "Fatmata Sesay",
        "defaultValue": "Fatmata Sesay"
      },
      {
        "key": "deponentAddress",
        "label": "Deponent Address",
        "placeholder": "No. 14 Siaka Stevens Street, Freetown",
        "defaultValue": "No. 14 Siaka Stevens Street, Freetown"
      },
      {
        "key": "chargeDescription",
        "label": "Offence / Allegation",
        "placeholder": "Alleged Larceny contrary to Larceny Act",
        "defaultValue": "Alleged Larceny"
      },
      {
        "key": "counselName",
        "label": "Applicant's Legal Counsel",
        "placeholder": "Konomanyi & Associates, Legal Practitioners",
        "defaultValue": "Konomanyi & Associates, Legal Practitioners"
      }
    ],
    "templateText": "IN THE HIGH COURT OF SIERRA LEONE\n(CRIMINAL JURISDICTION)\nHOLDEN AT FREETOWN\n\n{{caseNumber}}\n\nIN THE MATTER OF AN APPLICATION FOR BAIL UNDER SECTION 79 OF THE CRIMINAL PROCEDURE ACT, 1965 (ACT NO. 32 OF 1965)\nAND\nIN THE MATTER OF SECTION 17(4) AND SECTION 23 OF THE CONSTITUTION OF SIERRA LEONE, 1991 (ACT NO. 6 OF 1991)\n\nBETWEEN:\nTHE STATE - COMPLAINANT\nAND\n{{accusedName}} - APPLICANT / ACCUSED\n\nAFFIDAVIT IN SUPPORT OF APPLICATION FOR BAIL\n\nI, {{deponentName}}, citizen of Sierra Leone residing at {{deponentAddress}}, make oath and state as follows:\n\n1. That I am the reliable surety and relative of the Applicant herein, {{accusedName}}, and I have the authority of the Applicant to swear to this affidavit on his behalf.\n2. That the Applicant was arrested on allegations of {{chargeDescription}} and has been in police/remand custody since that date.\n3. That the Applicant has not been admitted to bail and is currently suffering severe hardship in custodial confinement.\n4. That the Applicant is a person of good character, has fixed place of abode within the jurisdiction of this Honourable Court, and is not a flight risk.\n5. That the Applicant undertakes to attend all hearings of this Honourable Court whenever required and will not interfere with prosecution witnesses.\n6. That I, together with other credible sureties, stand ready to enter into reasonable recognizance for the Applicant's appearance.\n7. That it is in the interest of justice and fundamental human rights under Section 17 of the Constitution that the Applicant be admitted to bail.\n8. That the contents of this affidavit are true and correct to the best of my knowledge, information, and belief.\n\nSWORN at Freetown this _____ day of _______________ 2026.\n\n_______________________\nDEPONENT\n\nBEFORE ME:\nCOMMISSIONER FOR OATHS\n\nFILED BY:\n{{counselName}}\nSolicitors for the Applicant"
  },
  {
    "id": "tpl-demand-letter",
    "title": "Formal Letter of Demand (Pre-Action Notice)",
    "category": "Notices & Letters",
    "description": "Statutory pre-action demand letter citing breach of contract or unpaid debt under Sierra Leone Commercial Law.",
    "fields": [
      {
        "key": "firmName",
        "label": "Law Firm Name",
        "placeholder": "SALONE LAW CHAMBERS",
        "defaultValue": "SALONE LAW CHAMBERS"
      },
      {
        "key": "firmAddress",
        "label": "Firm Address",
        "placeholder": "Rawdon Street, Freetown, Sierra Leone",
        "defaultValue": "Rawdon Street, Freetown, Sierra Leone"
      },
      {
        "key": "debtorName",
        "label": "Recipient / Debtor Name",
        "placeholder": "Managing Director, Apex Trading Ltd",
        "defaultValue": "Managing Director, Apex Trading Ltd"
      },
      {
        "key": "clientName",
        "label": "Client Name",
        "placeholder": "Alpha Enterprises SL",
        "defaultValue": "Alpha Enterprises SL"
      },
      {
        "key": "amountClaimed",
        "label": "Amount Claimed (NLe)",
        "placeholder": "NLe 250,000 (Two Hundred and Fifty Thousand Leones)",
        "defaultValue": "NLe 250,000"
      },
      {
        "key": "deadlineDays",
        "label": "Notice Period (Days)",
        "placeholder": "7",
        "defaultValue": "7"
      }
    ],
    "templateText": "{{firmName}}\nBARRISTERS & SOLICITORS OF THE SUPERIOR COURT OF SIERRA LEONE\n{{firmAddress}}\nEmail: legal@salonelaw.sl | Tel: +232-76-000000\n\nDate: ________________________\n\nTO:\n{{debtorName}}\n\nWITHOUT PREJUDICE (SAVE AS TO COSTS)\n\nFORMAL LETTER OF DEMAND: OUTSTANDING LIQUIDATED SUM OF {{amountClaimed}}\n\nWe act as Legal Counsel to {{clientName}} (hereinafter referred to as 'Our Client'), on whose explicit instructions we write to you.\n\nOur Client informs us that pursuant to commercial transactions between yourself and Our Client, there remains an outstanding, due, and liquidated debt in the sum of {{amountClaimed}}.\n\nDespite repeated oral and written reminders, you have neglected, failed, and/or refused to liquidate this outstanding balance.\n\nTAKE NOTICE that we hereby formally DEMAND the immediate payment of the full sum of {{amountClaimed}} within {{deadlineDays}} ({{deadlineDays}}) DAYS from the date of receipt of this notice.\n\nTAKE FURTHER NOTICE that should you default in complying with this demand, we hold strict instructions to institute civil legal proceedings against you in the High Court of Sierra Leone for:\n1. The immediate recovery of {{amountClaimed}};\n2. Commercial interest at the prevailing Bank of Sierra Leone lending rate;\n3. Substantial punitive costs on a full indemnity solicitor-and-own-client basis.\n\nGovern yourself accordingly.\n\nYours faithfully,\n\n________________________________\n{{firmName}}\nSolicitors for the Claimant"
  }
];
