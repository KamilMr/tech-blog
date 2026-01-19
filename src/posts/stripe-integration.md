---
title: My Second Time with Stripe
subtitle: A simple flow for one-time payments with webhooks
date: 2026-01-19
language: English
tags:
  - Stripe
---
For my booking website, I use Stripe to handle one-time payments for users who want to use my service. My first integration I did with Claude, and that speeded up the integration itself, but I wasn't able to actually understand or repeat the same integration later. So, my current job was actually done by myself. 

As with all the projects, the first step is to create a Stripe account. Stripe offers a sandbox that is easy to use. I created two sandboxes for my projects. Probably I could have created only one or used only one, but I have different hooks there and different ports. That's why I just created the second one and also to repeat my full flow. Once the sandbox is created, you actually don't need to do anything in the GUI at this point to start integrating Stripe into your project. I should have mentioned that I create a payment each time the user wants to pay. I don't use subscriptions or anything on the Stripe side, so my flow is very simple:

1. The user wants to pay for my service
2. I create the Stripe customer (or reuse existing one)
3. I create the checkout session on backend
4. Backend returns session URL to frontend
5. Frontend redirects user to Stripe checkout page
6. User pays via Stripe
7. Stripe redirects user back to my app

Let me show you the code for each step.

### Creating a customer (step 2)

```javascript
const customer = await stripe.customers.create({
  email: 'user@example.com',
  metadata: { user_id: 'your_internal_id' }
});
// customer.id = 'cus_xxx' - save this to your database
```

### Creating checkout session (steps 3-4)

```javascript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  customer: 'cus_xxx',
  line_items: [{
    price_data: {
      currency: 'pln',
      unit_amount: 1499,  // 14.99 PLN
      product_data: { name: 'Service Access' }
    },
    quantity: 1
  }],
  success_url: 'https://yoursite.com/success',
  cancel_url: 'https://yoursite.com/cancel'
});

// Return URL to frontend
res.json({ url: session.url });
```

### Frontend redirect (step 5)

```javascript
const { url } = await response.json();
window.location.href = url;
```

From here, I had to copy the secret key (sk_test_xxx) and set it up in my .env file. Another key that is needed when you are going to use webhooks is the webhook signing secret (whsec_xxx). You get this when creating a webhook endpoint in Stripe Dashboard. Save it to the same configuration file. 

In a normal flow, once the user pays for service, he will be redirected to a success or failure page. The Stripe documentation states that I should not rely on this redirection because the user may close the app, change page, or do something else. That is why we should rely on webhook. In my backend, I created an endpoint that Stripe is going to call when any event registered within that webhook on the Stripe website is going to be called. For example, when the payment has successfully (`event: checkout.session.completed`) completed and I added the webhook to listen on that event, then my endpoint is going to be called with that event and I have to listen to that event, to the completed event. When I receive that event, I have to save it to the database and update the user status. That is the proof that the payment was processed successfully.

### Webhook endpoint

```javascript
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Save to database, update user status
  }

  res.json({ received: true });
});
```

So good to know is: 
- stripe trigger checkout.session.completed  # Test success
- stripe trigger charge.refunded             # Test refund
- stripe trigger charge.dispute.created      # Test chargeback
- stripe listen --forward-to localhost:3000/api/webhook  # Local testing

 Keys that you can find on Stripe:
- pk_live_xxx / pk_test_xxx → Frontend (publishable)
- sk_live_xxx / sk_test_xxx → Backend only (secret)
- whsec_xxx → Webhook signature verification

[[stripe]]