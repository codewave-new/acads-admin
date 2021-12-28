import React, { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Invoice from "./invoice";

// Create styles
const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    flexDirection: "column",
  },

  tableContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
  },
  companyContainer: {
    marginTop: "30px",
  },
  header: {
    padding: "15px",
    textAlign: "center",
    width: "100%",
    color: "#30b7cf",
    fontSize: "18px",
    fontWeight: "bold",
  },
});

// Create Document Component
const MyDocument = (data) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Invoice info={data} />
    </Page>
  </Document>
);

const ShowInvoice = ({ data }) => {
  const [invoiceData, setInvoiceData] = useState();

  useEffect(() => {
    setInvoiceData(data);
    // console.log(JSON.parse(data));
    return () => {};
  }, [data]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PDFViewer
        style={{
          width: "80%",
          height: "90vh",
          background: "#fff",
        }}
      >
        <MyDocument data={invoiceData} />
      </PDFViewer>
    </div>
  );
};
export default ShowInvoice;
