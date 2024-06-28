"use client";
import React from "react";
import { useState } from "react";
import { Button, TextField } from "@radix-ui/themes";
import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "react-feather";
import FeatherIcon from 'feather-icons-react';
import { PDFDocument } from 'pdf-lib';
import { styled } from 'styled-components'


const WizardWrapper = styled.div({
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "360px",
  maxWidth: "800px",
});

const HeaderWrapper = styled.div({
  marginBottom: "16px",
  marginTop: "16px",
  fontSize: "20px",
});

const Grid = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  columnGap: "24px",
  rowGap: "16px",
  marginBottom: "15px"
});

const StyledTextField = styled(TextField.Root)({
  borderRadius: "4px",
});

const FieldShort = styled.div({
  gridColumn: "span 1",  
});

const FieldMedium = styled.div({
  gridColumn: "span 2",  
});

const FieldLong = styled.div({
  gridColumn: "span 3",  
});

const Flex = styled('div')({ display: 'flex' });

const CheckboxHeader = styled('label')({
  marginLeft: '8px',
})

const CheckboxRoot = styled(Checkbox.Root)({
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 1px 6px gray`,
  '&:hover': { backgroundColor: '#f1f3f7' },
  '&:focus': { boxShadow: `0 0 0 2px gray` },
});

const formFieldMap = {
  "Text1": "position",
  "Text2": "firstName",
  "Text3": "middleName",
  "Text4": "lastName",
  "Text5": "address",
  "Text6": "city",
  "Text7": "state",
  "Text8": "zipCode",
  "Text9": "email",
  "Text10": "phone",
  "Text11": "altPhone",
  "Check Box12": "currentEmployee",
  "Check Box13": "formerEmployee",
  /*"Check Box12": "currentEmployee",
  "Check Box13": "formerEmployee",
  "Text16": "formerEmployeeDepartment",
  "Check Box18": "anyRelatives",
  "Text20": "relativeDepartment",
  "Text23": "relativeRelationship",
  "Check Box24": "formerlyApplied",
  "Text26": "formerlyAppliedDepartment",
  "Check Box27": "everBeenFired",
  "Text29": "firedDepartment",
  "Text32": "firedReason",
  "Check Box35": "proofOfEligibility",
  "Check Box36": "convictedOfCrime",
  "Text38": "convictedOfCrimeDetails",
  "Check Box40": "pendingFelonyCharges",
  "Text43": "pendingFelonyChargesDetails",
  "Text45": "highestEducation",
  "Text46": "schoolName",
  "Text47": "schoolLocation",
  "Text49": "degreeOrCertificate",
  "Text50": "gpa",
  "Text51": "trainingDetails",
  "Text52": "militaryTrainingDetails",
  "Text53": "languages"*/
}

  /*
[
  "Text1",
  "Text2",
  "Text3",
  "Text4",
  "Text5",
  "Text6",
  "Text7",
  "Text8",
  "Text9",
  "Text10",
  "Text11",
  "Check Box12",
  "Check Box13",
  "Check Box14",
  "Check Box15",
  "Text16",
  "Text17",
  "Check Box18",
  "Check Box19",
  "Text20",
  "Check Box21",
  "Check Box22",
  "Text23",
  "Check Box24",
  "Check Box25",
  "Text26",
  "Check Box27",
  "Check Box28",
  "Check Box29",
  "Check Box30",
  "Check Box31",
  "Check Box32",
  "Check Box33",
  "Text34",
  "Check Box35",
  "Check Box36",
  "Text37",
  "Text38",
  "Text39",
  "Check Box40",
  "Check Box41",
  "Check Box42",
  "Text43",
  "Text44",
  "Text45",
  "Text46",
  "Check Box47",
  "Check Box48",
  "Text49",
  "Text50",
  "Text51",
  "Text52",
  "Text53",
  "Check Box54",
  "Check Box55",
  "Text56",
  "Text57",
  "Text58",
  "Text59",
  "Text60",
  "Check Box61",
  "Check Box62",
  "Text63",
  "Text64",
  "Text65",
  "Text66",
  "Text67",
  "Text68",
  "Text69",
  "Text70",
  "Text71",
  "Text72",
  "Text73",
  "Text74",
  "Text75",
  "Text76",
  "Text77",
  "Text78",
  "Text79",
  "Text80",
  "Check Box81",
  "Check Box82",
  "Text83",
  "Text84",
  "Text85",
  "Text86",
  "Check Box87",
  "Check Box88",
  "Check Box89",
  "Text90",
  "Text91",
  "Text92",
  "Text93",
  "Text94",
  "Text95",
  "Text96",
  "Text97",
  "Text98",
  "Text99",
  "Check Box100",
  "Check Box101",
  "Text102",
  "Text103",
  "Text104",
  "Text105",
  "Check Box106",
  "Check Box107",
  "Check Box108",
  "Text109",
  "Text110",
  "Text111",
  "Text112",
  "Text113",
  "Text114",
  "Text115",
  "Text116",
  "Text117",
  "Text118",
  "Check Box119",
  "Check Box120",
  "Text121",
  "Text122",
  "Text123",
  "Text124",
  "Check Box125",
  "Check Box126",
  "Check Box127",
  "Check Box128",
  "Check Box129",
  "Text130",
  "Text131",
  "Text132",
  "Text133",
  "Text134",
  "Text135",
  "Text136",
  "Text137",
  "Text138",
  "Text139",
  "Text140",
  "Text141",
  "Text142",
  "Text143",
  "Text144",
  "Check Box145",
  "Check Box146"
]
  */


export default function Form() {
  const [applicationInfo, setApplicationInfo] = useState({
    position: "Fire Fighter",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    altPhone: "",
    currentEmployee: false,
    formerEmployee: false,
    formerEmployeeDepartment: "",
    anyRelatives: false,
    relativeDepartment: "",
    relativeRelationship: "",
    formerlyApplied: false,
    formerlyAppliedDepartment: "",
    everBeenFired: false,
    firedDepartment: "",
    firedReason: "",
    proofOfEligibility: false,
    convictedOfCrime: false,
    convictedOfCrimeDetails: "",
    pendingFelonyCharges: false,
    pendingFelonyChargesDetails: "",
    highestEducation: "",
    schoolName: "",
    schoolLocation: "",
    degreeOrCertificate: "",
    gpa: "",
    trainingDetails: "",
    militaryTrainingDetails: "",
    languages: "",
  });

  const setApplicationInfoProp = (prop: keyof typeof applicationInfo, value: string|boolean) => {
    setApplicationInfo({
      ...applicationInfo,
      [prop]: value
    });
  };



  const [page, setPage] = useState(1);

  const getHeader = () => {
    switch (page) {
      case 1:
        return "Personal Details";
      case 2:
        return "Employment History";
      case 3:
        return "Eligibility";
      case 4:
        return "Education";
      default:
        return "";
    }
  };

  const getContent = () => {
    switch (page) {
      case 1:
      return (
        <Grid>
          <FieldShort>
            <div className="field-header">First Name</div>
            <StyledTextField value={applicationInfo.firstName} onChange={(e) => setApplicationInfoProp("firstName", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header">Middle Name</div>
            <StyledTextField value={applicationInfo.middleName} onChange={(e) => setApplicationInfoProp("middleName", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header">Last Name</div>
            <StyledTextField value={applicationInfo.lastName} onChange={(e) => setApplicationInfoProp("lastName", e.target.value)} />
          </FieldShort>
          <FieldLong>
            <div className="field-header"> Street Address</div>
            <StyledTextField value={applicationInfo.address} onChange={(e) => setApplicationInfoProp("address", e.target.value)} />
          </FieldLong>
          <FieldShort>
            <div className="field-header"> City </div>
            <StyledTextField value={applicationInfo.city} onChange={(e) => setApplicationInfoProp("city", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header"> State / Province </div>
            <StyledTextField value={applicationInfo.state} onChange={(e) => setApplicationInfoProp("state", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header"> Zip Code </div>
            <StyledTextField type="number" minLength={5} maxLength={9} value={applicationInfo.zipCode} onChange={(e) => setApplicationInfoProp("zipCode", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header"> Email </div>
            <StyledTextField type="email" value={applicationInfo.email} onChange={(e) => setApplicationInfoProp("email", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header"> Phone </div>
            <StyledTextField type="tel" value={applicationInfo.phone} onChange={(e) => setApplicationInfoProp("phone", e.target.value)} />
          </FieldShort>
          <FieldShort>
            <div className="field-header"> alt Phone </div>
            <StyledTextField type="tel" value={applicationInfo.altPhone} onChange={(e) => setApplicationInfoProp("altPhone", e.target.value)} />
          </FieldShort>
        </Grid>
      );
      case 2:
      return (
        <Grid>
          <FieldLong>
            <Flex>
              <CheckboxRoot className="CheckboxRoot" id="current-employee" onChange={(e) => setApplicationInfoProp("currentEmployee", e.currentTarget.value)}>
                <Checkbox.Indicator className="CheckboxIndicator">
                  <Check color="#1f2d5c"/>
                </Checkbox.Indicator>
              </CheckboxRoot>
              <CheckboxHeader className="field-header" htmlFor="curent-employee">Current employee?</CheckboxHeader>
            </Flex>
          </FieldLong>
          <FieldLong>
            <Flex>
              <CheckboxRoot className="CheckboxRoot" id="former-employee" onChange={(e) => {
                setApplicationInfoProp("formerEmployee", e.currentTarget.value);
                console.log(e.currentTarget.value)}}>
                <Checkbox.Indicator className="CheckboxIndicator">
                  <Check color="#1f2d5c"/>
                </Checkbox.Indicator>
              </CheckboxRoot>
              <CheckboxHeader className="field-header" htmlFor="former-employee">Former employee?</CheckboxHeader>
            </Flex>
          </FieldLong>
        </Grid>
      );
      case 3:
      return (
        <div className ="form-field">
        </div>
      );
      case 4:
      return (
        <div className ="form-field">
        </div>
      );
      default:
      return (<div/>);
    }

  };


  const download = async () => {
    const formUrl = '/hudsonville-employment-application.pdf';
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(formPdfBytes);
    const form = pdfDoc.getForm();

    console.log(form.getFields());
    for (const [key, value] of Object.entries(formFieldMap)) {
      if (/Text.*/.test(key)) {
        const field = form.getTextField(key);
        field.setText(applicationInfo[value]);
      } else if (/Check.*/.test(key) && applicationInfo[value] === true) {
        const field = form.getCheckBox(key);
        field.check();
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes]);
    const fileUrl = window.URL.createObjectURL(blob);

    let alink = document.createElement("a");
    alink.href = fileUrl;
    alink.download = "hudsonville-employment-application-FILLED.pdf";
    alink.click();
  }


  return (
    <WizardWrapper className="page-content">
      <HeaderWrapper>
        {getHeader()}
      </HeaderWrapper>
      {getContent()}

      <Grid>
        {/*<Button onClick={() => setPage(page - 1)} disabled={page === 1}><FeatherIcon icon="arrow-left"/> Previous</Button>*/}
        <div/>
        {/*page !== 4 ? 
          <Button onClick={() => setPage(page + 1)}>Next <FeatherIcon icon="arrow-right"/></Button> :
          <Button onClick={() => download()}>Download</Button>
        */}
        <Button onClick={() => download()}>Download</Button>
      </Grid>
    </WizardWrapper>
  );
}
