import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

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
    
    const itemsString = items.map((item: { quantity: number; product: { name: string } }) => `${item.quantity}x ${item.product.name}`).join('\n');
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const formData = new URLSearchParams();
    formData.append('entry.1289515362', details.name || '');
    formData.append('entry.841398653', details.email || '');
    formData.append('entry.1068202683', details.phone || '');
    
    // Combine items and notes into the Order Details field
    let orderDetails = `Order ID: ${orderId}\n\nItems:\n${itemsString}`;
    if (details.notes) {
      orderDetails += `\n\nNotes:\n${details.notes}`;
    }
    formData.append('entry.1927657256', orderDetails);
    
    formData.append('entry.1147881902', details.country || '');
    formData.append('entry.1411113354', details.province || '');
    formData.append('entry.1980160641', details.address || '');
    formData.append('entry.1385289147', total ? total.toString() : '0');

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_5eS5dX5iXRU6JvBvafqradZ5esz9d-5RrbHlUy2TSHWTBA/formResponse';
    
    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Forms returned status ${response.status}`);
    }

    return res.status(200).json({ success: true, orderId });
  } catch (error) {
    const err = error as { message?: string };
    console.error('Error submitting order to Google Forms:', err);
    let details = 'Unknown error';
    try {
      details = err.message || (typeof err === 'string' ? err : JSON.stringify(err));
    } catch {
      details = 'Error details could not be stringified';
    }
    return res.status(500).json({ error: 'Failed to save order', details });
  }
});

/**
 * Google Sheets API endpoint for Contact Messages
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    const formData = new URLSearchParams();
    formData.append('entry.1289515362', name || '');
    formData.append('entry.841398653', email || '');
    formData.append('entry.1068202683', phone || '');
    
    const details = `CONTACT MESSAGE\n\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message || ''}`;
    formData.append('entry.1927657256', details);
    
    formData.append('entry.1147881902', '-');
    formData.append('entry.1411113354', '-');
    formData.append('entry.1980160641', '-');
    formData.append('entry.1385289147', '0');

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_5eS5dX5iXRU6JvBvafqradZ5esz9d-5RrbHlUy2TSHWTBA/formResponse';
    
    const response = await fetch(formUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Forms returned status ${response.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    const err = error as { message?: string };
    console.error('Error submitting contact to Google Forms:', err);
    let details = 'Unknown error';
    try {
      details = err.message || (typeof err === 'string' ? err : JSON.stringify(err));
    } catch {
      details = 'Error details could not be stringified';
    }
    return res.status(500).json({ error: 'Failed to save contact message', details });
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
