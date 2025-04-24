
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { Quote, QuoteItem } from "@/types/crm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#9b87f5',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 'auto',
  },
  companyInfo: {
    textAlign: 'right',
  },
  quoteInfo: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#1A1F2C',
  },
  clientInfo: {
    marginBottom: 20,
  },
  infoLabel: {
    color: '#8E9196',
    marginBottom: 5,
  },
  infoValue: {
    marginBottom: 10,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F0FB',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#9b87f5',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5DEFF',
    padding: 10,
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
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  totalLabel: {
    width: 100,
    color: '#8E9196',
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1A1F2C',
    borderTopWidth: 1,
    borderTopColor: '#9b87f5',
    paddingTop: 5,
    marginTop: 5,
  },
  terms: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#F6F6F7',
    borderRadius: 4,
  },
  termsTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: '#1A1F2C',
  },
  termsText: {
    color: '#8E9196',
    fontSize: 10,
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5DEFF',
    paddingTop: 20,
    fontSize: 10,
    color: '#8E9196',
  }
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM 'de' yyyy", { locale: es });
};

export const QuotePDF = ({ quote }: { quote: Quote }) => (
  <PDFViewer style={{ width: '100%', height: '600px' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image 
            src="/public/img/logo.png"
            style={styles.logo}
          />
          <View style={styles.companyInfo}>
            <Text>Tu Empresa S.L.</Text>
            <Text>Calle Principal, 123</Text>
            <Text>28001 Madrid</Text>
            <Text>Tel: +34 911 234 567</Text>
          </View>
        </View>

        {/* Quote Info */}
        <View style={styles.quoteInfo}>
          <Text style={styles.title}>{quote.name}</Text>
          <View style={styles.clientInfo}>
            <Text style={styles.infoLabel}>Cliente:</Text>
            <Text style={styles.infoValue}>{quote.clientName}</Text>
            <Text style={styles.infoLabel}>Fecha de emisión:</Text>
            <Text style={styles.infoValue}>{formatDate(quote.createdAt)}</Text>
            <Text style={styles.infoLabel}>Válida hasta:</Text>
            <Text style={styles.infoValue}>{formatDate(quote.validUntil)}</Text>
          </View>
        </View>

        {/* Items Table */}
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

        {/* Totals */}
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
            <Text style={[styles.totalLabel, styles.totalAmount]}>Total:</Text>
            <Text style={[styles.totalValue, styles.totalAmount]}>
              {formatCurrency(quote.totalAmount)}
            </Text>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.terms}>
          <Text style={styles.termsTitle}>Términos y Condiciones</Text>
          <Text style={styles.termsText}>
            {quote.notes || `
              1. Esta cotización es válida por 30 días desde la fecha de emisión.
              2. Los precios no incluyen gastos de envío ni instalación, salvo que se especifique lo contrario.
              3. El plazo de entrega estimado es de 15-30 días laborables tras la confirmación del pedido.
              4. Forma de pago: 50% al confirmar el pedido, 50% antes de la entrega.
              5. La garantía de los productos es de 2 años según la legislación vigente.
            `}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Gracias por confiar en nosotros. Para cualquier consulta, no dude en contactarnos.
          </Text>
          <Text style={{ marginTop: 5 }}>
            www.tuempresa.com | info@tuempresa.com | Tel: +34 911 234 567
          </Text>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

