import json

cases = [
  {
    "id": "case-sam-sumana-2015",
    "citation": "S.C. No. 4/2015 [2015] SLSC 1",
    "title": "Alhaji Samuel Sam-Sumana v. Attorney-General & Victor Bockarie Foh",
    "court": "Supreme Court of Sierra Leone",
    "year": 2015,
    "judges": ["V.M. Solomon JSC", "N.C. Browne-Marke JSC", "E.E. Roberts JSC", "P.O. Hamilton JSC", "A.D. Deen JSC"],
    "areaOfLaw": "Constitutional Law & Executive Powers",
    "facts": "The elected Vice-President Alhaji Samuel Sam-Sumana was expelled from the ruling All People's Congress (APC) party. Following this expulsion, the President relieved him of his duties as Vice-President on the premise that he no longer satisfied the continuous political party membership requirement under Section 41(b) and appointed Victor Foh. The Plaintiff filed an Originating Notice of Motion in the Supreme Court pursuant to Sections 124(1) and 28 of the 1991 Constitution, contending that his removal was unconstitutional and that a Vice-President could only be removed through the legislative impeachment procedure set out under Section 51.",
    "legalIssues": [
      "Whether the President has executive authority under Sections 40(1) and 54 to relieve a Vice-President of his office.",
      "Whether the requirement to belong to a political party under Section 41(b) is a continuous qualification throughout the term of office.",
      "Whether Section 51 impeachment is the sole constitutional avenue for vacancy in the office of Vice-President."
    ],
    "holding": "The Supreme Court unanimously held that continuous membership of a political party is a mandatory constitutional requirement to remain in the office of Vice-President, and the President, as Supreme Executive Authority under Section 40(1), was entitled to treat the office as vacated.",
    "ratioDecidendi": "Sections 40(1), 41(b), and 54 of the 1991 Constitution must be read together harmoniously. A Vice-President who loses the political party sponsorship upon which he was elected ceases to satisfy the fundamental constitutional qualification for the executive office, empowering the supreme executive authority to fill the vacancy.",
    "significance": "A landmark constitutional ruling on presidential executive powers, qualifications for high state office, and the interpretation of executive tenure under the 1991 Constitution.",
    "relatedSections": ["Section 40", "Section 41", "Section 51", "Section 54", "Section 124"]
  },
  {
    "id": "case-blyden-ecsl-2023",
    "citation": "S.C. Misc. App. No. 2/2023",
    "title": "Dr. Sylvia Olayinka Blyden v. Electoral Commission for Sierra Leone (ECSL) & Chief Electoral Commissioner",
    "court": "Supreme Court of Sierra Leone",
    "year": 2023,
    "judges": ["B. Roberts JSC (Presiding)", "F.B. Conteh JSC", "A. Sesay JSC"],
    "areaOfLaw": "Constitutional Law & Electoral Rights",
    "facts": "The Applicant instituted an Originating Notice of Motion before the Supreme Court under Section 28 of the 1991 Constitution and the Supreme Court Rules 1982, alleging that the Electoral Commission failed to publish full voter disaggregated data and procedural protocols, violating her fundamental right to participate in governance under Section 5(2)(c) and freedom of expression/information under Section 25.",
    "legalIssues": [
      "Whether an individual citizen has locus standi to invoke the original enforcement jurisdiction under Section 28 for electoral transparency.",
      "Whether the statutory powers of the Electoral Commission under Section 32 are subject to constitutional oversight by the Supreme Court."
    ],
    "holding": "The Supreme Court confirmed that the courts retain supervisory constitutional authority to ensure public statutory bodies exercise their mandates strictly in accordance with constitutional due process and citizen rights.",
    "ratioDecidendi": "Section 28 provides an open constitutional portal for any citizen who demonstrates that a protected fundamental right is likely to be contravened by public administrative actions.",
    "significance": "Reaffirms the active jurisdiction of the Supreme Court to hear citizen rights applications under Section 28 relating to democratic governance.",
    "relatedSections": ["Section 25", "Section 28", "Section 32", "Section 124"]
  },
  {
    "id": "case-state-turay-bail",
    "citation": "[2018] SLCA 14",
    "title": "The State v. Alieu Badara Turay & Others",
    "court": "Court of Appeal",
    "year": 2018,
    "judges": ["K. Stevens JA", "M. Sengu Koroma JA"],
    "areaOfLaw": "Criminal Procedure & Constitutional Due Process",
    "facts": "The accused was detained for over 30 days without indictment or formal arraignment before a competent court following an arrest for alleged conspiracy and larceny. Counsel applied to the High Court for bail under Section 79 of the Criminal Procedure Act 1965, which was refused without written reasons. The decision was appealed to the Court of Appeal.",
    "legalIssues": [
      "Whether prolonged pre-trial detention violates Section 17(3) of the 1991 Constitution.",
      "What principles govern the judicial exercise of discretion in granting bail in non-capital felony cases."
    ],
    "holding": "The Court of Appeal overturned the refusal and granted bail, ruling that detention exceeding statutory limits without swift trial violates constitutional liberties.",
    "ratioDecidendi": "Bail is not punitive; it is procedural to ensure attendance at trial. Under Section 17(4) and Section 23(2)(a), the presumption of innocence requires that bail should normally be granted unless the prosecution adduces cogent sworn evidence of flight risk, witness interference, or commission of further offences.",
    "significance": "The leading modern authority on bail principles, personal liberty under Section 17, and the duty of courts to provide reasoned rulings on bail applications.",
    "relatedSections": ["Section 17", "Section 23", "Section 79 CPA 1965"]
  },
  {
    "id": "case-simeon-cole-proof",
    "citation": "[1998] SLSC 4",
    "title": "Simeon Cole v. The State",
    "court": "Supreme Court of Sierra Leone",
    "year": 1998,
    "judges": ["Beccles-Davies JSC", "Gelaga-King JSC", "Taju-Deen JSC"],
    "areaOfLaw": "Criminal Law & Evidence",
    "facts": "The Appellant was convicted of armed robbery based solely on circumstantial identification evidence where the trial judge shifted the evidential burden to the defense to prove where he was on the night of the incident.",
    "legalIssues": [
      "Whether a trial judge can place any legal burden on the accused to prove an alibi or innocence.",
      "The standard of proof required under Section 23(2) of the 1991 Constitution."
    ],
    "holding": "The conviction was quashed. The Supreme Court held that the prosecution bears the evidential and legal burden throughout the criminal proceeding.",
    "ratioDecidendi": "The golden thread of criminal jurisprudence in Sierra Leone, grounded in Section 23 of the Constitution, is that the burden of proving every essential element of an offence beyond reasonable doubt rests permanently on the prosecution.",
    "significance": "Definitive authority cited in all Sierra Leone criminal courts on the presumption of innocence and the strict burden of proof.",
    "relatedSections": ["Section 23", "Criminal Procedure Act 1965"]
  }
]

out = "import { LandmarkCase } from '../types/legal';\n\nexport const SIERRA_LEONE_CASES: LandmarkCase[] = " + json.dumps(cases, indent=2) + ";\n"

with open("src/data/caseLawData.ts", "w", encoding="utf-8") as f:
  f.write(out)

print("caseLawData.ts created successfully!")
