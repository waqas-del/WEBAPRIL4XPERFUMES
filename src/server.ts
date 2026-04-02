import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());

const angularApp = new AngularNodeAppEngine();

/**
 * Google Sheets API endpoint for Orders
 */
app.post('/api/orders', async (req, res) => {
  try {
    const { items, details, total } = req.body;
    
    const sheetId = process.env['GOOGLE_SHEET_ID'];
    const clientEmail = process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
    let privateKey = process.env['GOOGLE_PRIVATE_KEY'];

    if (privateKey) {
      // Remove potential quotes and handle escaped newlines
      privateKey = privateKey.trim();
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.substring(1, privateKey.length - 1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    if (!sheetId || !clientEmail || !privateKey) {
      console.error('Missing Google Sheets configuration:', { 
        hasSheetId: !!sheetId, 
        hasEmail: !!clientEmail, 
        hasKey: !!privateKey 
      });
      return res.status(500).json({ error: 'Server configuration error: Missing credentials' });
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    
    const itemsString = items.map((item: { quantity: number; product: { name: string } }) => `${item.quantity}x ${item.product.name}`).join(', ');
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    await sheet.addRow({
      'Date': new Date().toLocaleString(),
      'Type': 'ORDER',
      'Order ID': orderId,
      'Status': 'Pending',
      'Name': details.name,
      'Email': details.email,
      'Phone': details.phone,
      'Country': details.country,
      'Province': details.province,
      'Address': details.address,
      'Items/Message': itemsString,
      'Total (AED)': total,
      'Notes/Subject': details.notes || ''
    });

    return res.status(200).json({ success: true, orderId });
  } catch (error) {
    const err = error as Error;
    console.error('Error adding order to Google Sheets:', err);
    return res.status(500).json({ error: 'Failed to save order', details: err.message });
  }
});

/**
 * Google Sheets API endpoint for Contact Messages
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const sheetId = process.env['GOOGLE_SHEET_ID'];
    const clientEmail = process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
    let privateKey = process.env['GOOGLE_PRIVATE_KEY'];

    if (privateKey) {
      privateKey = privateKey.trim();
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.substring(1, privateKey.length - 1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    if (!sheetId || !clientEmail || !privateKey) {
      return res.status(500).json({ error: 'Server configuration error: Missing credentials' });
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];

    await sheet.addRow({
      'Date': new Date().toLocaleString(),
      'Type': 'CONTACT',
      'Order ID': '-',
      'Status': 'New',
      'Name': name,
      'Email': email,
      'Phone': phone,
      'Country': '-',
      'Province': '-',
      'Address': '-',
      'Items/Message': message,
      'Total (AED)': '-',
      'Notes/Subject': subject
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    const err = error as Error;
    console.error('Error adding contact to Google Sheets:', err);
    return res.status(500).json({ error: 'Failed to save contact message', details: err.message });
  }
});

/**
 * Test endpoint to verify Google Sheets connection
 */
app.get('/api/test-sheets', async (req, res) => {
  try {
    const sheetId = process.env['GOOGLE_SHEET_ID'];
    const clientEmail = process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
    let privateKey = process.env['GOOGLE_PRIVATE_KEY'];

    if (privateKey) {
      privateKey = privateKey.trim();
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.substring(1, privateKey.length - 1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    if (!sheetId || !clientEmail || !privateKey) {
      return res.status(500).json({ 
        status: 'error', 
        message: 'Missing credentials',
        config: {
          hasSheetId: !!sheetId,
          hasEmail: !!clientEmail,
          hasKey: !!privateKey
        }
      });
    }

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow({
      'Date': new Date().toLocaleString(),
      'Type': 'TEST',
      'Order ID': `TEST-${Date.now()}`,
      'Status': 'Verified',
      'Name': 'Test System',
      'Email': 'test@humanspace.com',
      'Phone': '000-000-0000',
      'Country': 'UAE',
      'Province': 'Dubai',
      'Address': 'Test Office 101',
      'Items/Message': 'This is a automated test entry to verify the Google Sheets integration is working correctly with your new headers.',
      'Total (AED)': '0',
      'Notes/Subject': 'System Verification'
    });
    
    return res.status(200).json({ 
      status: 'success', 
      message: 'Test entry added successfully! Please check your Google Sheet.',
      title: doc.title,
      sheets: doc.sheetCount
    });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
