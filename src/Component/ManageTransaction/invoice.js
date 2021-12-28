import { StyleSheet, Text, View, Image } from "@react-pdf/renderer";
import moment from "moment";
import React, { useEffect, useState } from "react";


const styles = StyleSheet.create({
  container: {
    padding: "20rem",
  },
  header: {
    // border: "2px solid black",
    height: 120,
    borderBottom: "2px solid #eda432",
    display: "flex",
    flexDirection: "row",
  },
  addressSection: {
    // border: "2px solid black",
    height: 200,
    display: "flex",
    flexDirection: "row",
  },
  headerImage: {
    width: "40%",
  },
  headerInfo: {
    width: "60%",
    // border: "2px solid black",
  },
  img: {
    width: 100,
    height: 100,
  },
  headerInfoText: {
    margin: "0 0 0 120rem",
    color: "#eda432",
    fontSize: "20px",
    fontWeight: "bold",
  },
  headerInfoText1: {
    marginRight: 10,
    fontSize: 11,
    fontWeight: "bold",
  },
  headerInfoText2: {
    fontSize: 10,
    fontWeight: "medium",
  },
  addressSectionDivs: {
    width: "33.333%",
    padding: 10,
  },
  addressSectionDivsHeaders: {
    color: "#eda432",
    fontSize: 13,
    fontWeight: "bold",
  },
  //   table section
  tableSection: {
    borderBottom: "2px solid #eda432",
    borderTop: "2px solid #eda432",
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  tableSectionDiv1: {
    width: "5%",
  },
  tableSectionDiv2: {
    width: "30%",
  },
  tableSectionDiv3: {
    width: "10%",
  },
  tableSectionDiv4: {
    width: "7%",
  },
  tableSectionDiv5: {
    width: "15%",
  },
  tableSectionDiv6: {
    width: "10%",
  },
  tableSectionDiv7: {
    width: "10%",
  },
  tableSectionDiv8: {
    width: "10%",
  },
  tableSubSection: {
    height: 180,
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  tableTotalText: {
    color: "#eda432",
    textAlign: "center",
    fontSize: 11,
  },
  tableTotalTextMain: {
    color: "#eda432",
    textAlign: "center",
    fontSize: 11,
    marginRight: 15,
  },
  tableTotalTextSub: {
    color: "#eda432",
    textAlign: "end",
    fontSize: 11,
    width: "30%",
  },
  tableTotalSection: {
    marginTop: 10,
    flexDirection: "column",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  tableTotal: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "40%",
    marginTop: 7,
  },
});
const Invoice = ({ info }) => {
    console.log(info)
  const [d, setD] = useState();
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    setD(info.data);
    setOrderData(info?.data?.orderData);
    return () => {
      setD();
    };
  }, [info]);

  useEffect(() => {
    if (d) console.log("d", d);
    return () => {};
  }, [d]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerImage}>
          <Image src="../../../Assets/ada.png" style={styles.img} />
        </View>
        <View style={styles.headerInfo}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.headerInfoText}>
              Invoice {d && d.invoiceNumber ? d.invoiceNumber : "--"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10rem",
            }}
          >
            <Text style={styles.headerInfoText1}>Date</Text>
            <Text style={styles.headerInfoText2}>
              {d && d.dateOfEncashment
                ? moment(d.dateOfEncashment).format("ll")
                : "-"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10rem",
            }}
          >
            <Text style={styles.headerInfoText1}>{`${
              d && d.dueDate ? "Due Date" : ""
            }`}</Text>
            <Text style={styles.headerInfoText2}>
              {d && d.dueDate ? moment(d.dueDate).format("ll") : ""}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "10rem",
            }}
          >
            <Text style={styles.headerInfoText1}>{`${
              d && d.ponumber ? "P.O. Number" : ""
            }`}</Text>
            <Text style={styles.headerInfoText2}>
              {" "}
              {d && d.ponumber ? d.ponumber : ""}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.addressSection}>
        <View style={styles.addressSectionDivs}>
          <View>
            <Text style={styles.addressSectionDivsHeaders}>
              RightAcad Private Limited
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.headerInfoText2}>
              #173, Neeladri, Near M.S.Ramaiah Hospital, Dollars Colony.
              Bangalore, Karnataka (KA - 29), PIN Code 560094, India
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>+91 9008958899</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>sowmyaa.arun@acadshr.com</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>www.acadshr.com</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>SAC Code: 998311</Text>
            <Text style={styles.headerInfoText2}>GSTIN: 29AAICR1229B2ZL</Text>
            <Text style={styles.headerInfoText2}>PAN: AAICR1229B</Text>
          </View>
        </View>

        <View style={styles.addressSectionDivs}>
          <View>
            <Text style={styles.addressSectionDivsHeaders}>Bill To:</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.headerInfoText2}>
              {d && d.instituteData && d.instituteData.institution_name
                ? d.instituteData.institution_name
                : ""}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>
              {d &&
              d.instituteData &&
              d.instituteData.institutionDetails &&
              d.instituteData.institutionDetails.institute_address
                ? d.instituteData.institutionDetails.institute_address
                : ""}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>
              Place of Supply:
              {d &&
              d.instituteData &&
              d.instituteData.institutionDetails &&
              d.instituteData.institutionDetails.institute_location
                ? `${
                    d.instituteData.institutionDetails.institute_location
                      ?.state ?? ""
                  } (${
                    d.instituteData.institutionDetails.institute_location
                      ?.pin ?? ""
                  })`
                : ""}
            </Text>
            <Text style={styles.headerInfoText2}>
              GSTIN: {orderData && orderData.gstTIN ? orderData.gstTIN : ""}
            </Text>
          </View>
        </View>

        <View style={styles.addressSectionDivs}>
          <View>
            <Text style={styles.addressSectionDivsHeaders}>Ship To:</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.headerInfoText2}>
              {d && d.instituteData && d.instituteData.institution_name
                ? d.instituteData.institution_name
                : ""}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>
              {d &&
              d.instituteData &&
              d.instituteData.institutionDetails &&
              d.instituteData.institutionDetails.institute_address
                ? d.instituteData.institutionDetails.institute_address
                : ""}
            </Text>
            <Text style={styles.headerInfoText2}>
              {d &&
              d.instituteData &&
              d.instituteData.institutionDetails &&
              d.instituteData.institutionDetails.institute_location
                ? `${
                    d.instituteData.institutionDetails.institute_location
                      ?.state ?? ""
                  }, PIN CODE ${
                    d.instituteData.institutionDetails.institute_location
                      ?.pin ?? ""
                  },  ${
                    d.instituteData.institutionDetails.institute_location
                      ?.country ?? ""
                  }`
                : ""}
            </Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text style={styles.headerInfoText2}>
              {d &&
              d.instituteData &&
              d.instituteData.institutionContactDetails &&
              d.instituteData.institutionContactDetails.institution_contact_name
                ? d.instituteData.institutionContactDetails
                    .institution_contact_name
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.tableSection}>
        <View style={styles.tableSectionDiv1}>
          <Text>NO</Text>
        </View>
        <View style={styles.tableSectionDiv2}>
          <Text>PRODUCT / SERVICE NAME</Text>
        </View>
        <View style={styles.tableSectionDiv3}>
          <Text>HSN/SAC</Text>
        </View>
        <View style={styles.tableSectionDiv4}>
          <Text>QTY</Text>
        </View>
        <View style={styles.tableSectionDiv5}>
          <Text>UNIT PRICE</Text>
        </View>
        <View style={styles.tableSectionDiv6}>
          <Text>CGST</Text>
        </View>
        <View style={styles.tableSectionDiv7}>
          <Text>SGST</Text>
        </View>
        <View style={styles.tableSectionDiv8}>
          <Text>AMOUNT</Text>
        </View>
      </View>
      <View style={styles.tableSubSection}>
        <View style={styles.tableSectionDiv1}>
          <Text>1</Text>
        </View>
        <View style={styles.tableSectionDiv2}>
          <Text>-</Text>
        </View>
        <View style={styles.tableSectionDiv3}>
          <Text>-</Text>
        </View>
        <View style={styles.tableSectionDiv4}>
          <Text>1</Text>
        </View>
        <View style={styles.tableSectionDiv5}>
          <Text>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
        <View style={styles.tableSectionDiv6}>
          <Text>-</Text>
        </View>
        <View style={styles.tableSectionDiv7}>
          <Text>-</Text>
        </View>
        <View style={styles.tableSectionDiv8}>
          <Text>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
      </View>
      <View style={styles.tableSection}>
        <View style={styles.tableSectionDiv1}>
          <Text></Text>
        </View>
        <View style={styles.tableSectionDiv2}>
          <Text style={styles.tableTotalText}>TOTAL</Text>
        </View>
        <View style={styles.tableSectionDiv3}>
          <Text style={styles.tableTotalText}></Text>
        </View>
        <View style={styles.tableSectionDiv4}>
          <Text style={styles.tableTotalText}>1</Text>
        </View>
        <View style={styles.tableSectionDiv5}>
          <Text style={styles.tableTotalText}>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
        <View style={styles.tableSectionDiv6}>
          <Text style={styles.tableTotalText}>-</Text>
        </View>
        <View style={styles.tableSectionDiv7}>
          <Text style={styles.tableTotalText}>-</Text>
        </View>
        <View style={styles.tableSectionDiv8}>
          <Text style={styles.tableTotalText}>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
      </View>
      <View style={styles.tableTotalSection}>
        <View style={styles.tableTotal}>
          <Text style={styles.tableTotalTextMain}>TOTAL BEFORE TAX</Text>
          <Text style={styles.tableTotalTextSub}>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
        <View style={styles.tableTotal}>
          <Text style={styles.tableTotalTextMain}>TOTAL TAX AMOUNT</Text>
          <Text style={styles.tableTotalTextSub}>0.00</Text>
        </View>
        <View style={styles.tableTotal}>
          <Text style={styles.tableTotalTextMain}>ROUNDED OFF</Text>
          <Text style={styles.tableTotalTextSub}>0.00</Text>
        </View>
        <View style={styles.tableTotal}>
          <Text style={styles.tableTotalTextMain}>TOTAL AMOUNT</Text>
          <Text style={styles.tableTotalTextSub}>
            {orderData && orderData.totalAmount ? orderData.totalAmount : "-"}
          </Text>
        </View>
        <View style={styles.tableTotal}>
          <Text style={styles.tableTotalTextMain}>AMOUNT DUE</Text>
          <Text style={styles.tableTotalTextSub}>0.00</Text>
        </View>
      </View>
    </View>
  );
};
export default Invoice;
