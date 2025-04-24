
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { Quote, QuoteItem } from "@/types/crm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
  },
  col1: {
    flex: 3,
  },
  col2: {
    flex: 1,
    textAlign: 'right',
  },
  col3: {
    flex: 1,
    textAlign: 'right',
  },
  col4: {
    flex: 1,
    textAlign: 'right',
  },
  totals: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  totalLabel: {
    width: 100,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  notes: {
    marginTop: 40,
    fontSize: 10,
    color: '#666',
  }
});

interface QuotePDFProps {
  quote: Quote;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
};

export const QuotePDF = ({ quote }: QuotePDFProps) => (
  <PDFViewer style={{ width: '100%', height: '600px' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{quote.name}</Text>
          <Text style={styles.info}>Cliente: {quote.clientName}</Text>
          <Text style={styles.info}>Fecha: {formatDate(quote.createdAt)}</Text>
          <Text style={styles.info}>Válida hasta: {formatDate(quote.validUntil)}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Producto/Servicio</Text>
            <Text style={styles.col2}>Cantidad</Text>
            <Text style={styles.col3}>Precio</Text>
            <Text style={styles.col4}>Total</Text>
          </View>

          {quote.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.productName}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.col4}>{formatCurrency(item.totalPrice)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(quote.amount)}</Text>
          </View>
          {quote.discount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Descuento:</Text>
              <Text style={styles.totalValue}>{formatCurrency(quote.discount)}</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IVA ({quote.tax}%):</Text>
            <Text style={styles.totalValue}>
              {formatCurrency((quote.amount - (quote.discount || 0)) * (quote.tax / 100))}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { fontFamily: 'Helvetica-Bold' }]}>Total:</Text>
            <Text style={[styles.totalValue, { fontFamily: 'Helvetica-Bold' }]}>
              {formatCurrency(quote.totalAmount)}
            </Text>
          </View>
        </View>

        {quote.notes && (
          <View style={styles.notes}>
            <Text>Notas:</Text>
            <Text>{quote.notes}</Text>
          </View>
        )}
      </Page>
    </Document>
  </PDFViewer>
);
